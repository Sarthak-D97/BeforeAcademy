'use client';

import React, { useEffect, useRef, useState } from 'react';
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
}

export default function VideoPlayer({ vimeoId, autoplay = 0, color = 'FF7739' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const thresholdPct = 0.8;

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

  const handleMobileFullscreen = async () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (!isMobile) return;

    try {
      const container = containerRef.current;
      if (container) {
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if ((container as any).webkitRequestFullscreen) {
          await (container as any).webkitRequestFullscreen();
        }

        // Try to rotate to landscape if supported
        if (screen.orientation && (screen.orientation as any).lock) {
          await (screen.orientation as any).lock('landscape').catch((err: any) => {
            console.warn('Orientation lock failed:', err);
          });
        }
      }
    } catch (error) {
      console.error('Fullscreen request failed:', error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      // Unlock orientation when exiting fullscreen
      if (!document.fullscreenElement && !(document as any).webkitFullscreenElement && screen.orientation && screen.orientation.unlock) {
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

  useEffect(() => {
    if (!isSdkLoaded || !containerRef.current || !window.Vimeo) return;
    const iframe = document.createElement('iframe');
    iframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=${autoplay}&color=${color}&badge=0&autopause=0&player_id=0&app_id=58479`;
    iframe.style.border = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.allow = "autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media";
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(iframe);
    const player = new window.Vimeo.Player(iframe);
    player.setLoop(false);
    player.on('loaded', (data: any) => bridgeEvent.loaded(data));
    player.on('play', (data: any) => {
      bridgeEvent.play(data);
      handleMobileFullscreen();
    });
    player.on('pause', (data: any) => bridgeEvent.pause(data));
    player.on('timeupdate', (data: any) => {
      if (data && data.percent && data.percent >= thresholdPct) {
        bridgeEvent.threshold(data);
      }
    });
    player.on('ended', (data: any) => bridgeEvent.completed(data));
    player.on('error', (data: any) => bridgeEvent.error(data));
  }, [isSdkLoaded, vimeoId]);

  return (
    <Box sx={{ width: '100%', borderRadius: { xs: 2, md: 4 }, overflow: 'hidden', bgcolor: 'black', boxShadow: 3 }}>
      <Script 
        src="https://player.vimeo.com/api/player.js" 
        onLoad={() => setIsSdkLoaded(true)}
      />
      <Box 
        ref={containerRef} 
        sx={{ 
          position: 'relative', 
          pt: '56.25%', // 16:9 Aspect Ratio
          bgcolor: '#000',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {!isSdkLoaded && (
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress color="primary" />
            <Typography variant="caption" sx={{ mt: 1, color: 'grey.500' }}>Initializing secure player...</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}