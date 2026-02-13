'use client';

import React, { useState, useRef } from 'react';
import { 
  Container, Box, Typography, Chip, Paper, Divider, Stack, IconButton, 
  Tooltip, useTheme, useMediaQuery, Fade 
} from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'; // Import Play Icon

import { Materials } from '../../types/curriculum';
import VideoPlayer from './VideoPlayer'; 

interface Props {
  material: Materials;
}

export default function ContentViewer({ material }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect Mobile
  const videoContainerRef = useRef<HTMLDivElement>(null); // Ref for fullscreen
  
  const [reactions, setReactions] = useState(material.reactions || { fire: 0, thumbsUp: 0, thumbsDown: 0, heart: 0 });
  // State to track if user has clicked play on mobile
  const [mobileVideoActive, setMobileVideoActive] = useState(false);

  const handleReaction = (type: keyof typeof reactions) => {
    setReactions(prev => ({ ...prev, [type]: (prev[type] || 0) + 1 }));
  };

  // --- LOGIC: Handle Mobile Play, Rotate & Fullscreen ---
  const handleMobilePlay = async () => {
    if (!videoContainerRef.current) return;

    try {
      // 1. Request Fullscreen
      const elem = videoContainerRef.current as any;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        await elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        await elem.msRequestFullscreen();
      }

      // 2. Lock Orientation to Landscape (Android/Chrome mostly)
      // Note: iOS Safari does not support screen.orientation.lock, so we wrap in try/catch
      if (screen.orientation && (screen.orientation as any).lock) {
        await (screen.orientation as any).lock('landscape');
      }

    } catch (error) {
      console.log('Fullscreen/Rotation prevented:', error);
    } finally {
      // 3. Reveal the actual player
      setMobileVideoActive(true);
    }
  };

  const hasNewVideoSchema = material.category === 'video' && material.video && material.video.length > 0;
  const legacyVideoUrl = material.path;
  const isVideo = material.category === 'video';

  return (
    <Container 
      maxWidth={isVideo ? "lg" : 'lg'} 
      sx={{ 
        py: { xs: 2, md: isVideo ? 1.5 : 4 }, 
        px: { xs: 2, sm: 3 },
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ mb: { xs: 2, md: isVideo ? 1 : 4 }, flexShrink: 0 }}>
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
        <Typography variant={isVideo ? "h5" : "h3"} fontWeight="800" sx={{ lineHeight: 1.1, fontSize: { xs: isVideo ? '1.25rem' : '1.75rem', md: isVideo ? '1.5rem' : '3rem' } }}>
          {material.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
           Published by AfterAcademy
        </Typography>
      </Box>
      
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
          {/* VIDEO CONTAINER WRAPPER */}
          <Box 
            ref={videoContainerRef}
            sx={{ 
              width: '100%', 
              maxWidth: '125vh', 
              mx: 'auto',
              position: 'relative', // Needed for overlay positioning
              bgcolor: '#000', // Background black for fullscreen experience
            }}
          >
            {/* Custom Mobile Overlay: Only shows if Mobile AND video hasn't started */}
            {isMobile && !mobileVideoActive && (
              <Box
                onClick={handleMobilePlay}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'rgba(0,0,0,0.4)',
                  cursor: 'pointer',
                  borderRadius: 2,
                  transition: 'background 0.3s',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.6)',
                  }
                }}
              >
                 <PlayCircleFilledWhiteIcon sx={{ fontSize: 80, color: '#fff' }} />
              </Box>
            )}

            {/* Actual Video Player */}
            <Box sx={{ opacity: (isMobile && !mobileVideoActive) ? 0.3 : 1, transition: 'opacity 0.5s' }}>
              {hasNewVideoSchema ? (
                // If you have access to VideoPlayer, pass an 'playing={mobileVideoActive}' prop if supported
                // to auto-start the video after rotation.
                <VideoPlayer vimeoId={material.video![0].vimeoId} />
              ) : legacyVideoUrl ? (
                <Paper elevation={0} sx={{ position: 'relative', pt: '56.25%', borderRadius: 2, overflow: 'hidden', bgcolor: '#000', boxShadow: theme.shadows[2] }}>
                  <iframe
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    src={material.path?.replace('watch?v=', 'embed/')}
                    title={material.title}
                    frameBorder="0"
                    allowFullScreen
                  />
                </Paper>
              ) : (
                <Typography color="error">Video source missing.</Typography>
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <Paper elevation={0} sx={{ flexGrow: 1, overflowY: 'auto', p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
          <Typography component="div" variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {material.content || material.solution}
          </Typography>
        </Paper>
      )}

      <Box sx={{ flexShrink: 0, mt: 'auto' }}>
        <Divider sx={{ mb: 1.5 }} />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={{ xs: 0, sm: 1 }}>
            <Tooltip title="Insightful">
              <IconButton onClick={() => handleReaction('fire')} size="small" color={reactions.fire > 0 ? "error" : "default"}>
                <LocalFireDepartmentIcon fontSize="small" />
                <Typography variant="caption" sx={{ ml: 0.5 }}>{reactions.fire}</Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Love this">
              <IconButton onClick={() => handleReaction('heart')} size="small" color={reactions.heart > 0 ? "error" : "default"}>
                <FavoriteIcon fontSize="small" />
                <Typography variant="caption" sx={{ ml: 0.5 }}>{reactions.heart}</Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Helpful">
              <IconButton onClick={() => handleReaction('thumbsUp')} size="small" color={reactions.thumbsUp > 0 ? "primary" : "default"}>
                <ThumbUpIcon fontSize="small" />
                <Typography variant="caption" sx={{ ml: 0.5 }}>{reactions.thumbsUp}</Typography>
              </IconButton>
            </Tooltip>
          </Stack>

          <Stack direction="row" spacing={1}>
            <IconButton size="small">
              <ShareIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}