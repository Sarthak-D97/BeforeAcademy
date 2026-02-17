'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Script from 'next/script';

declare global {
  interface Window {
    Vimeo?: any;
    bridge?: {
      dispatch: (type: string, payload?: any) => void;
      error: (data: any) => void;
    };
  }
}

const NativeActionType = {
  ANALYTICS: 'ANALYTICS',
  CLOSE: 'CLOSE',
  RETRY: 'RETRY',
  LOADED: 'LOADED',
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  THRESHOLD: 'THRESHOLD',
  COMPLETED: 'COMPLETED',
};

interface Props {
  vimeoId: string;
  autoplay?: number;
  color?: string;
  /** Called when the video starts playing — use this in ContentViewer if you need to react to play events */
  onPlay?: (data: any) => void;
  /** Called when the video is paused */
  onPause?: (data: any) => void;
}

export default function VideoPlayer({
  vimeoId,
  autoplay = 0,
  color = 'FF7739',
  onPlay,
  onPause,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const thresholdPct = 0.8;

  // ─── Bridge helpers ───────────────────────────────────────────────────────
  const sendAnalytics = (eventName: string) => {
    if (window.bridge) {
      window.bridge.dispatch(NativeActionType.ANALYTICS, eventName);
    } else {
      console.log(`[Mock Bridge] Analytics: ${eventName}`);
    }
  };

  const bridgeEvent = {
    loaded: (data: any) => {
      sendAnalytics('WVP_LOADED');
      if (window.bridge) window.bridge.dispatch(NativeActionType.LOADED, JSON.stringify(data));
    },
    play: (data: any) => {
      if (window.bridge) window.bridge.dispatch(NativeActionType.PLAY, JSON.stringify(data));
    },
    pause: (data: any) => {
      if (window.bridge) window.bridge.dispatch(NativeActionType.PAUSE, JSON.stringify(data));
    },
    threshold: (data: any) => {
      if (window.bridge) window.bridge.dispatch(NativeActionType.THRESHOLD, JSON.stringify(data));
    },
    completed: (data: any) => {
      sendAnalytics('WVP_COMPLETED');
      if (window.bridge) window.bridge.dispatch(NativeActionType.COMPLETED, JSON.stringify(data));
    },
    error: (data: any) => {
      sendAnalytics('WVP_ERROR');
      if (window.bridge) window.bridge.error(data);
    },
  };

  // ─── Orientation unlock on fullscreen exit ────────────────────────────────
  // NOTE: This useEffect is fine — it only listens, never requests fullscreen.
  // Fullscreen requests MUST happen in a direct user-gesture handler (onClick),
  // which lives in ContentViewer. Calling requestFullscreen() from an async
  // Vimeo event callback or a useEffect causes: "Fullscreen request denied".
  useEffect(() => {
    const handleFullscreenChange = () => {
      const inFs = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
      if (!inFs && screen.orientation?.unlock) {
        screen.orientation.unlock();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // ─── Init Vimeo player ────────────────────────────────────────────────────
  useEffect(() => {
    if (!isSdkLoaded || !containerRef.current || !window.Vimeo) return;

    // Build iframe
    const iframe = document.createElement('iframe');
    iframe.src = [
      `https://player.vimeo.com/video/${vimeoId}`,
      `?autoplay=${autoplay}`,
      `&color=${color}`,
      `&badge=0`,
      `&autopause=0`,
      `&player_id=0`,
      `&app_id=58479`,
      `&playsinline=1`,   // ← Prevents iOS from hijacking into native fullscreen
    ].join('');
    iframe.style.border = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media';

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(iframe);

    const player = new window.Vimeo.Player(iframe);
    playerRef.current = player;

    player.setLoop(false);

    player.on('loaded', (data: any) => bridgeEvent.loaded(data));

    // ── play event: bridge + optional callback ──────────────────────────────
    // ❌ DO NOT call requestFullscreen() here.
    //    This callback fires asynchronously after the Vimeo iframe posts a message.
    //    It is NOT in the synchronous call stack of a user gesture, so the browser
    //    will throw "Fullscreen request denied" every time.
    //    Fullscreen is handled in ContentViewer.handleMobilePlay() → onClick.
    player.on('play', (data: any) => {
      bridgeEvent.play(data);
      onPlay?.(data);      // Let parent know if it needs to react
    });

    player.on('pause', (data: any) => {
      bridgeEvent.pause(data);
      onPause?.(data);
    });

    player.on('timeupdate', (data: any) => {
      if (data?.percent >= thresholdPct) {
        bridgeEvent.threshold(data);
      }
    });

    player.on('ended', (data: any) => bridgeEvent.completed(data));
    player.on('error',  (data: any) => bridgeEvent.error(data));

    // Cleanup: destroy player when vimeoId changes or component unmounts
    return () => {
      player.destroy().catch(() => {});
      playerRef.current = null;
    };
  }, [isSdkLoaded, vimeoId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: { xs: 2, md: 4 },
        overflow: 'hidden',
        bgcolor: 'black',
        boxShadow: 3,
      }}
    >
      <Script
        src="https://player.vimeo.com/api/player.js"
        onLoad={() => setIsSdkLoaded(true)}
      />
      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          pt: '56.25%',   // 16:9 aspect ratio
          bgcolor: '#000',
          width: '100%',
        }}
      >
        {!isSdkLoaded && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress color="primary" />
            <Typography variant="caption" sx={{ mt: 1, color: 'grey.500' }}>
              Initializing secure player...
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}