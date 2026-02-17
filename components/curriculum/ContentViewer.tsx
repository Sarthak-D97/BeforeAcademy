'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Container, Box, Typography, Chip, Paper, Divider, Stack, IconButton, 
  Tooltip, useTheme, useMediaQuery, Fade, LinearProgress, Button
} from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import { Materials } from '../../types/curriculum';
import VideoPlayer from './VideoPlayer'; 

interface Props {
  material: Materials;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
  progress?: number;
}

// ─── Detect iOS (Safari / WKWebView) ───────────────────────────────────────
const isIOS = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};

export default function ContentViewer({ material, onNext, onPrev, hasNext, hasPrev, progress }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  const [reactions, setReactions] = useState(material.reactions || { fire: 0, thumbsUp: 0, thumbsDown: 0, heart: 0 });
  const [mobileVideoActive, setMobileVideoActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Controls start visible; auto-hide after inactivity
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);

  // ─── Fullscreen change listener ─────────────────────────────────────────
  useEffect(() => {
    const handleFsChange = () => {
      const inFs = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement
      );
      setIsFullscreen(inFs);

      if (inFs) {
        // Show controls immediately on entering fullscreen, then auto-hide
        setShowControls(true);
        scheduleHide();
      } else {
        // Restore controls visibility when leaving fullscreen
        setShowControls(true);
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);

        // Unlock orientation when leaving fullscreen
        try {
          if (screen.orientation && (screen.orientation as any).unlock) {
            (screen.orientation as any).unlock();
          }
        } catch (_) {}
      }
    };

    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    setMounted(true);

    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  // ─── Schedule auto-hide of controls ─────────────────────────────────────
  const scheduleHide = useCallback(() => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    // Longer timeout on mobile (5 s) so controls are easy to use on touch
    const delay = isMobile ? 5000 : 3000;
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), delay);
  }, [isMobile]);

  // ─── Any user activity → show controls and restart hide timer ───────────
  const handleUserActivity = useCallback(() => {
    if (!isFullscreen) return;
    setShowControls(true);
    scheduleHide();
  }, [isFullscreen, scheduleHide]);

  // ─── Tap on touch-capture overlay ───────────────────────────────────────
  const handleTouchCapture = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!isFullscreen) return;
    // Toggle controls on tap so user can show/hide deliberately
    setShowControls(prev => {
      const next = !prev;
      if (next) scheduleHide();
      else if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      return next;
    });
  }, [isFullscreen, scheduleHide]);

  // ─── Exit fullscreen ─────────────────────────────────────────────────────
  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    }
  };

  // ─── Reactions ──────────────────────────────────────────────────────────
  const handleReaction = (type: keyof typeof reactions) => {
    setReactions(prev => ({ ...prev, [type]: (prev[type] || 0) + 1 }));
  };

  // ─── Mobile play → fullscreen + landscape lock ──────────────────────────
  const handleMobilePlay = async () => {
    // Activate video immediately so it renders/starts loading
    setMobileVideoActive(true);

    // iOS Safari cannot fullscreen arbitrary divs — let the native <video>
    // element handle its own fullscreen through the Vimeo player UI.
    if (isIOS()) return;

    // Android / modern browsers: fullscreen the wrapper div + lock orientation
    if (!videoContainerRef.current) return;
    try {
      const elem = videoContainerRef.current as any;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        await elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        await elem.msRequestFullscreen();
      }

      // Lock to landscape after fullscreen is granted
      if (screen.orientation && (screen.orientation as any).lock) {
        await (screen.orientation as any).lock('landscape').catch(() => {});
      }
    } catch (error) {
      console.log('Fullscreen/rotation prevented:', error);
    }
  };

  const hasNewVideoSchema = material.category === 'video' && material.video && material.video.length > 0;
  const legacyVideoUrl = material.path;
  const isVideo = material.category === 'video';

  return (
    <Container 
      maxWidth="lg"
      sx={{ 
        py: { xs: 2, md: isVideo ? 1.5 : 4 }, 
        px: { xs: 1.5, sm: 3 },   // tighter side padding on very small screens
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <Box sx={{ mb: { xs: 1.5, md: isVideo ? 1 : 4 }, flexShrink: 0 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 0.5 }}>
          <Chip 
            label={material.category} 
            color={isVideo ? 'error' : 'primary'} 
            size="small" 
            sx={{ height: 20, fontSize: '0.65rem', fontWeight: 'bold', textTransform: 'uppercase' }} 
          />
          {material.difficulty && (
            <Chip label={material.difficulty} variant="outlined" size="small" sx={{ height: 20, fontSize: '0.65rem', textTransform: 'capitalize' }} />
          )}
        </Stack>
        <Typography
          variant={isVideo ? 'h5' : 'h3'}
          fontWeight="800"
          sx={{ lineHeight: 1.1, fontSize: { xs: isVideo ? '1.1rem' : '1.5rem', sm: isVideo ? '1.25rem' : '2rem', md: isVideo ? '1.5rem' : '3rem' } }}
        >
          {material.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Published by AfterAcademy
        </Typography>
      </Box>
      
      {/* ── Content area ────────────────────────────────────────────────── */}
      {isVideo ? (
        <Box 
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: 0, 
            mb: 1
          }}
        > 
          {/* ── Video wrapper (the element we fullscreen) ──────────────── */}
          <Box 
            ref={videoContainerRef}
            onMouseMove={handleUserActivity}
            sx={{ 
              width: '100%', 
              maxWidth: '125vh', 
              mx: 'auto',
              position: 'relative', 
              bgcolor: '#000', 
              borderRadius: isFullscreen ? 0 : 2,
              overflow: 'hidden',
              aspectRatio: '16/9',
            }}
          >

            {/* ── Fullscreen: transparent touch-capture overlay ─────────
                Sits above the iframe so touch/tap events reach our handlers.
                In fullscreen the iframe eats all pointer events otherwise.  */}
            {isFullscreen && (
              <Box
                onTouchStart={handleTouchCapture}
                onTouchEnd={(e) => e.stopPropagation()}
                onClick={handleTouchCapture}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 15,           // above video, below controls overlay
                  cursor: 'pointer',
                  // Completely transparent — just here to capture events
                  bgcolor: 'transparent',
                }}
              />
            )}

            {/* ── Fullscreen: custom controls overlay ──────────────────── */}
            {isFullscreen && (
              <Fade in={showControls} timeout={300}>
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 0, left: 0, right: 0, bottom: 0, 
                    zIndex: 20,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.85) 100%)',
                    // Pointer events OFF on container so taps go to capture overlay,
                    // but ON for the actual buttons inside
                    pointerEvents: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    // Extra bottom padding so custom controls sit above
                    // any native browser UI bar in landscape
                    p: { xs: 1.5, sm: 2 }, 
                    pb: { xs: 3, sm: 3, md: 4 },
                    pt: { xs: 2, sm: 2 },
                  }}
                >
                  {/* Top bar */}
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ pointerEvents: 'auto' }}>
                    <Box sx={{ flex: 1, pr: 2 }}>
                      <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, fontSize: { xs: '0.6rem', sm: '0.75rem' } }}>
                        Now Playing
                      </Typography>
                      <Typography
                        sx={{
                          color: '#fff',
                          fontWeight: 800,
                          lineHeight: 1.2,
                          fontSize: { xs: '0.85rem', sm: '1.1rem', md: '1.25rem' },
                          // Truncate long titles on small screens
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {material.title}
                      </Typography>
                    </Box>
                    {/* Larger touch target for exit button on mobile */}
                    <IconButton
                      onClick={(e) => { e.stopPropagation(); exitFullscreen(); }}
                      sx={{
                        color: '#fff',
                        bgcolor: 'rgba(255,255,255,0.15)',
                        // Minimum 44×44 px touch target (Apple HIG)
                        minWidth: { xs: 44, sm: 40 },
                        minHeight: { xs: 44, sm: 40 },
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
                      }}
                    >
                      <FullscreenExitIcon sx={{ fontSize: { xs: '1.4rem', sm: '1.5rem' } }} />
                    </IconButton>
                  </Stack>

                  {/* Bottom bar: progress + prev/next */}
                  <Box sx={{ pointerEvents: 'auto' }}>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: { xs: 1.5, sm: 2 } }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600, minWidth: 36, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                        {Math.round(progress || 0)}%
                      </Typography>
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={progress || 0} 
                          sx={{ 
                            height: { xs: 5, sm: 6 }, 
                            borderRadius: 3, 
                            bgcolor: 'rgba(255,255,255,0.2)', 
                            '& .MuiLinearProgress-bar': { bgcolor: 'primary.main', borderRadius: 3 } 
                          }} 
                        />
                      </Box>
                    </Stack>
                    
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Button 
                        variant="contained"
                        startIcon={<NavigateBeforeIcon />} 
                        disabled={!hasPrev} 
                        onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
                        size={isMobile ? 'medium' : 'medium'}
                        sx={{ 
                          bgcolor: 'rgba(255,255,255,0.15)', 
                          color: '#fff', 
                          fontWeight: 700,
                          backdropFilter: 'blur(4px)',
                          minHeight: { xs: 44, sm: 40 },  // Touch-friendly height
                          px: { xs: 2, sm: 2 },
                          fontSize: { xs: '0.8rem', sm: '0.875rem' },
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
                          '&.Mui-disabled': { color: 'rgba(255,255,255,0.3)' },
                        }}
                      >
                        Prev
                      </Button>

                      {/* Tap-to-show hint — only shows when controls are visible */}
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem', display: { xs: 'block', sm: 'none' } }}>
                        Tap to toggle controls
                      </Typography>

                      <Button 
                        variant="contained"
                        endIcon={<NavigateNextIcon />} 
                        disabled={!hasNext} 
                        onClick={(e) => { e.stopPropagation(); onNext?.(); }}
                        size={isMobile ? 'medium' : 'medium'}
                        sx={{
                          fontWeight: 700,
                          minHeight: { xs: 44, sm: 40 },  // Touch-friendly height
                          px: { xs: 2, sm: 2 },
                          fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        }}
                      >
                        Next
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Fade>
            )}

            {/* ── Mobile click-to-play overlay (pre-play state) ─────────── */}
            {isMobile && !mobileVideoActive && (
              <Box
                onClick={handleMobilePlay}
                sx={{
                  position: 'absolute', inset: 0, zIndex: 10,
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: 1,
                  bgcolor: 'rgba(0,0,0,0.5)', 
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' },
                  '&:active': { bgcolor: 'rgba(0,0,0,0.7)' },
                }}
              >
                <PlayCircleFilledWhiteIcon sx={{ fontSize: { xs: 72, sm: 80 }, color: '#fff', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }} />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600, letterSpacing: 0.5 }}>
                  {isIOS() ? 'Tap to play' : 'Tap for fullscreen'}
                </Typography>
              </Box>
            )}

            {/* ── Actual video player ──────────────────────────────────── */}
            <Box sx={{
              width: '100%',
              height: '100%',
              opacity: (isMobile && !mobileVideoActive) ? 0.25 : 1,
              transition: 'opacity 0.4s ease',
            }}>
              {hasNewVideoSchema ? (
                <VideoPlayer 
                  vimeoId={material.video![0].vimeoId} 
                  {...({ playing: isMobile ? mobileVideoActive : false } as any)}
                />
              ) : legacyVideoUrl ? (
                <Paper elevation={0} sx={{ width: '100%', height: '100%', bgcolor: '#000' }}>
                  <iframe
                    style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                    src={`${material.path?.replace('watch?v=', 'embed/')}?autoplay=${mobileVideoActive ? 1 : 0}&playsinline=1`}
                    title={material.title}
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; fullscreen; picture-in-picture"
                  />
                </Paper>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography color="error">Video source missing.</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        /* ── Non-video content ────────────────────────────────────────── */
        <Paper
          elevation={0}
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            // Allow smooth scroll on iOS
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <Typography component="div" variant="body1" sx={{ whiteSpace: 'pre-line', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            {material.content || material.solution}
          </Typography>
        </Paper>
      )}

      {/* ── Footer: reactions + navigation ──────────────────────────────── */}
      <Box sx={{ flexShrink: 0, mt: 'auto' }}>
        <Divider sx={{ mb: 1.5 }} />
        <Stack direction="row" justifyContent="space-between" alignItems="center">

          {/* Reactions */}
          <Stack direction="row" spacing={{ xs: 0, sm: 0.5 }}>
            <Tooltip title="Insightful" enterTouchDelay={0}>
              <IconButton
                onClick={() => handleReaction('fire')}
                size="small"
                color={reactions.fire > 0 ? 'error' : 'default'}
                sx={{ minWidth: { xs: 40, sm: 'auto' }, minHeight: { xs: 40, sm: 'auto' } }}
              >
                <LocalFireDepartmentIcon fontSize="small" />
                <Typography variant="caption" sx={{ ml: 0.5 }}>{mounted ? reactions.fire : 0}</Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Love this" enterTouchDelay={0}>
              <IconButton
                onClick={() => handleReaction('heart')}
                size="small"
                color={reactions.heart > 0 ? 'error' : 'default'}
                sx={{ minWidth: { xs: 40, sm: 'auto' }, minHeight: { xs: 40, sm: 'auto' } }}
              >
                <FavoriteIcon fontSize="small" />
                <Typography variant="caption" sx={{ ml: 0.5 }}>{mounted ? reactions.heart : 0}</Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Helpful" enterTouchDelay={0}>
              <IconButton
                onClick={() => handleReaction('thumbsUp')}
                size="small"
                color={reactions.thumbsUp > 0 ? 'primary' : 'default'}
                sx={{ minWidth: { xs: 40, sm: 'auto' }, minHeight: { xs: 40, sm: 'auto' } }}
              >
                <ThumbUpIcon fontSize="small" />
                <Typography variant="caption" sx={{ ml: 0.5 }}>{mounted ? reactions.thumbsUp : 0}</Typography>
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Navigation */}
          <Stack direction="row" spacing={1} alignItems="center">
            {/* Desktop text buttons */}
            <Button 
              size="small" 
              startIcon={<NavigateBeforeIcon />} 
              disabled={!hasPrev} 
              onClick={onPrev}
              sx={{ display: { xs: 'none', sm: 'inline-flex' }, textTransform: 'none', fontWeight: 700 }}
            >
              Previous
            </Button>

            {/* Mobile icon buttons */}
            <IconButton
              size="small"
              disabled={!hasPrev}
              onClick={onPrev}
              sx={{ display: { xs: 'inline-flex', sm: 'none' }, minWidth: 40, minHeight: 40 }}
            >
              <NavigateBeforeIcon />
            </IconButton>

            <Box sx={{ width: 60, display: { xs: 'none', md: 'block' } }}>
              <LinearProgress variant="determinate" value={progress || 0} sx={{ height: 4, borderRadius: 2 }} />
            </Box>

            <IconButton
              size="small"
              disabled={!hasNext}
              onClick={onNext}
              sx={{ display: { xs: 'inline-flex', sm: 'none' }, minWidth: 40, minHeight: 40 }}
            >
              <NavigateNextIcon />
            </IconButton>

            <Button 
              size="small" 
              variant="contained"
              endIcon={<NavigateNextIcon />} 
              disabled={!hasNext} 
              onClick={onNext}
              sx={{ display: { xs: 'none', sm: 'inline-flex' }, textTransform: 'none', fontWeight: 700 }}
            >
              Next
            </Button>

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5, display: { xs: 'none', sm: 'block' } }} />
            <IconButton size="small" sx={{ minWidth: { xs: 40, sm: 'auto' }, minHeight: { xs: 40, sm: 'auto' } }}>
              <ShareIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}