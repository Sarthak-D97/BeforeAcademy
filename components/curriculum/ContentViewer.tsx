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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

export default function ContentViewer({ material, onNext, onPrev, hasNext, hasPrev, progress }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const [reactions, setReactions] = useState(material.reactions || { fire: 0, thumbsUp: 0, thumbsDown: 0, heart: 0 });
  const [mobileVideoActive, setMobileVideoActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);

  // Sync state with browser fullscreen changes (e.g., hitting ESC or swiping)
  useEffect(() => {
    const handleFsChange = () => {
      const isFs = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
      setIsFullscreen(isFs);
      if (!isFs) {
        setMobileVideoActive(false);
        // Unlock orientation when exiting
        if (screen.orientation && (screen.orientation as any).unlock) {
          (screen.orientation as any).unlock();
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    setMounted(true);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
    };
  }, []);

  const handleUserActivity = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    }
  };

  const handleMobilePlay = async () => {
    if (!videoContainerRef.current) return;

    try {
      const elem = videoContainerRef.current as any;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        await elem.webkitRequestFullscreen();
      }

      if (screen.orientation && (screen.orientation as any).lock) {
        // Attempt landscape lock - will work on Android/Chrome
        await (screen.orientation as any).lock('landscape').catch(() => { });
      }
      setMobileVideoActive(true);
    } catch (error) {
      console.error('Fullscreen engagement failed:', error);
      // Fallback: Just set active if FS fails
      setMobileVideoActive(true);
    }
  };

  const isVideo = material.category === 'video';
  const hasNewVideoSchema = isVideo && material.video && material.video.length > 0;
  const legacyVideoUrl = material.path;

  return (
    <Container
      maxWidth={isVideo ? "lg" : 'md'} // Text is easier to read on 'md'
      sx={{
        py: { xs: 2, md: 4 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* HEADER SECTION */}
      <Box sx={{ mb: { xs: 2, md: 3 }, flexShrink: 0 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
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
        <Typography variant="h4" fontWeight="800" sx={{ lineHeight: 1.2, fontSize: { xs: '1.5rem', md: '2.25rem' } }}>
          {material.title}
        </Typography>
      </Box>

      {isVideo ? (
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            mb: 3
          }}
        >
          <Box
            ref={videoContainerRef}
            onMouseMove={handleUserActivity}
            onTouchStart={handleUserActivity}
            sx={{
              width: '100%',
              position: 'relative',
              bgcolor: '#000',
              borderRadius: isFullscreen ? 0 : 3,
              overflow: 'hidden',
              boxShadow: theme.shadows[10],
              aspectRatio: '16/9'
            }}
          >
            {/* FULLSCREEN CONTROLS */}
            <Fade in={isFullscreen && showControls}>
              <Box
                sx={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  zIndex: 20,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.9) 100%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  p: { xs: 2, md: 4 },
                  pointerEvents: 'none'
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ pointerEvents: 'auto' }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 800, textTransform: 'uppercase' }}>Now Playing</Typography>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>{material.title}</Typography>
                  </Box>
                  <IconButton onClick={exitFullscreen} sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.1)' }}>
                    <FullscreenExitIcon />
                  </IconButton>
                </Stack>

                <Box sx={{ pointerEvents: 'auto' }}>
                  <LinearProgress
                    variant="determinate"
                    value={progress || 0}
                    sx={{ height: 6, borderRadius: 3, mb: 2, bgcolor: 'rgba(255,255,255,0.2)' }}
                  />
                  <Stack direction="row" justifyContent="space-between">
                    <Button startIcon={<NavigateBeforeIcon />} disabled={!hasPrev} onClick={onPrev} sx={{ color: '#fff' }}>Prev</Button>
                    <Button endIcon={<NavigateNextIcon />} disabled={!hasNext} onClick={onNext} variant="contained">Next Lesson</Button>
                  </Stack>
                </Box>
              </Box>
            </Fade>

            {/* MOBILE PLAY OVERLAY */}
            {isMobile && !mobileVideoActive && (
              <Box
                onClick={handleMobilePlay}
                sx={{
                  position: 'absolute', inset: 0, zIndex: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  bgcolor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
                  cursor: 'pointer'
                }}
              >
                <Stack alignItems="center" spacing={2}>
                  <PlayCircleFilledWhiteIcon sx={{ fontSize: 80, color: '#fff' }} />
                  <Typography color="#fff" fontWeight="700">Click to Play Fullscreen</Typography>
                </Stack>
              </Box>
            )}

            {/* PLAYER RENDERER */}
            <Box sx={{ width: '100%', height: '100%' }}>
              {hasNewVideoSchema ? (
                <VideoPlayer
                  vimeoId={material.video![0].vimeoId}
                  {...({ playing: isMobile ? mobileVideoActive : true } as any)}
                />
              ) : legacyVideoUrl ? (
                <iframe
                  style={{ width: '100%', height: '100%', border: 0 }}
                  src={`${material.path?.replace('watch?v=', 'embed/')}?autoplay=${mobileVideoActive ? 1 : 0}`}
                  allow="autoplay; fullscreen"
                />
              ) : (
                <Stack sx={{ height: '100%' }} alignItems="center" justifyContent="center">
                  <Typography color="grey.500">Video source missing.</Typography>
                </Stack>
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <Paper
          elevation={0}
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            p: { xs: 2, md: 5 },
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            mb: 3
          }}
        >
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-line',
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: 'text.primary'
            }}
          >
            {material.content || material.solution}
          </Typography>
        </Paper>
      )}

      {/* FOOTER NAVIGATION & REACTIONS */}
      <Box sx={{ flexShrink: 0 }}>
        <Divider sx={{ mb: 2 }} />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1}>
            {[
              { key: 'fire', icon: <LocalFireDepartmentIcon fontSize="small" />, label: 'Fire', color: 'error' },
              { key: 'heart', icon: <FavoriteIcon fontSize="small" />, label: 'Love', color: 'error' },
              { key: 'thumbsUp', icon: <ThumbUpIcon fontSize="small" />, label: 'Up', color: 'primary' }
            ].map((reaction) => (
              <Button
                key={reaction.key}
                size="small"
                variant="outlined"
                startIcon={reaction.icon}
                onClick={() => setReactions(prev => ({ ...prev, [reaction.key]: (prev[reaction.key as keyof typeof reactions] || 0) + 1 }))}
                sx={{
                  borderRadius: 20,
                  borderColor: 'divider',
                  color: reactions[reaction.key as keyof typeof reactions] > 0 ? `${reaction.color}.main` : 'text.secondary'
                }}
              >
                {mounted ? reactions[reaction.key as keyof typeof reactions] : 0}
              </Button>
            ))}
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton onClick={onPrev} disabled={!hasPrev} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <NavigateBeforeIcon />
            </IconButton>

            <Box sx={{ textAlign: 'center', minWidth: 100 }}>
              <Typography variant="caption" fontWeight="700" color="text.secondary" display="block">
                {Math.round(progress || 0)}% COMPLETE
              </Typography>
              <LinearProgress variant="determinate" value={progress || 0} sx={{ height: 4, borderRadius: 2, mt: 0.5 }} />
            </Box>

            <Button
              variant="contained"
              onClick={onNext}
              disabled={!hasNext}
              endIcon={<NavigateNextIcon />}
              sx={{ borderRadius: 2, px: 3, fontWeight: 700, textTransform: 'none' }}
            >
              Next
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}