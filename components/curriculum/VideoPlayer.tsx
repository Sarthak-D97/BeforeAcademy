'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Script from 'next/script';

// 1. Declare Global Window Types
declare global {
  interface Window {
    Vimeo?: any;
    bridge?: {
      dispatch: (type: string, payload?: any) => void;
      error: (data: any) => void;
    };
  }
}

// 2. Define Action Types
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

// 3. Define the Props Interface
interface Props {
  vimeoId: string;
  autoplay?: number;
  color?: string;
  onPlay?: (data: any) => void;
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
  const wrapperRef = useRef<HTMLDivElement>(null); // Ref for the element going fullscreen
  const playerRef = useRef<any>(null);
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const thresholdPct = 0.8;

  // ─── Bridge Helper Functions ──────────────────────────────────────────────
  const sendAnalytics = (eventName: string) => {
    if (window.bridge) {
      window.bridge.dispatch(NativeActionType.ANALYTICS, eventName);
    } else {
      console.log(`[Mock Bridge] Analytics: ${eventName}`);
    }
  };

  // Define the bridgeEvent object with specific keys so TS knows 'play' exists
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

  // ─── Fullscreen & Rotation Logic ──────────────────────────────────────────
  const handleFullscreenAndRotate = async () => {
    const element = wrapperRef.current;
    if (!element) return;

    try {
      // 1. Request Fullscreen
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen();
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen();
      }

      // 2. Lock Orientation to Landscape (Mobile only)
      if (screen.orientation && (screen.orientation as any).lock) {
        await (screen.orientation as any).lock('landscape').catch((err: any) => {
          // Orientation lock might fail on desktops or incompatible devices, just ignore it.
          console.warn("Orientation lock failed (expected on non-mobile): ", err);
        });
      }
    } catch (error) {
      console.error("Fullscreen request failed:", error);
    }
  };

  // ─── Listen for Fullscreen Exit ───────────────────────────────────────────
  useEffect(() => {
    const handleFullscreenChange = () => {
      const inFs = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
      // If we just EXITED fullscreen, unlock orientation
      if (!inFs && screen.orientation && screen.orientation.unlock) {
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

  // ─── Init Vimeo Player ────────────────────────────────────────────────────
  useEffect(() => {
    if (!isSdkLoaded || !containerRef.current || !window.Vimeo) return;

    const iframe = document.createElement('iframe');
    iframe.src = [
      `https://player.vimeo.com/video/${vimeoId}`,
      `?autoplay=${autoplay}`,
      `&color=${color}`,
      `&badge=0`,
      `&autopause=0`,
      `&player_id=0`,
      `&app_id=58479`,
      `&playsinline=1`, // Important: keeps it in the DOM so we can control the container
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

    player.on('play', (data: any) => {
      // Attempt to go fullscreen on play.
      // Note: Browsers may block this if it isn't considered a direct user gesture.
      handleFullscreenAndRotate();
      
      bridgeEvent.play(data);
      if (onPlay) onPlay(data);
    });

    player.on('pause', (data: any) => {
      bridgeEvent.pause(data);
      if (onPause) onPause(data);
    });

    player.on('timeupdate', (data: any) => {
      if (data?.percent >= thresholdPct) {
        bridgeEvent.threshold(data);
      }
    });

    player.on('ended', (data: any) => bridgeEvent.completed(data));
    player.on('error', (data: any) => bridgeEvent.error(data));

    return () => {
      player.destroy().catch(() => {});
      playerRef.current = null;
    };
  }, [isSdkLoaded, vimeoId, autoplay, color]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      ref={wrapperRef}
      sx={{
        width: '100%',
        borderRadius: { xs: 2, md: 4 },
        overflow: 'hidden',
        bgcolor: 'black',
        boxShadow: 3,
        // When in fullscreen mode, remove rounding and fill viewport
        '&:fullscreen': {
          width: '100vw',
          height: '100vh',
          borderRadius: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '&:-webkit-full-screen': {
           width: '100vw',
           height: '100vh',
           borderRadius: 0,
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
        }
      }}
    >
      <Script
        src="https://player.vimeo.com/api/player.js"
        onLoad={() => setIsSdkLoaded(true)}
      />
      <Box
        ref={containerRef}
        // Clicking the container attempts to trigger fullscreen (for mobile taps)
        onClick={handleFullscreenAndRotate}
        sx={{
          position: 'relative',
          pt: '56.25%', // 16:9 aspect ratio
          bgcolor: '#000',
          width: '100%',
          // Fix for fullscreen child scaling
          ...(wrapperRef.current && document.fullscreenElement === wrapperRef.current
            ? { height: '100%', pt: 0 }
            : {}),
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