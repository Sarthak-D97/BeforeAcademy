'use client';

import React, { useState } from 'react';
import { 
  Container, Box, Typography, Chip, Paper, Divider, Stack, IconButton, Tooltip, useTheme
} from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import { Materials } from '../../types/curriculum';
import VideoPlayer from './VideoPlayer'; 

interface Props {
  material: Materials;
}

export default function ContentViewer({ material }: Props) {
  const theme = useTheme();
  const [reactions, setReactions] = useState(material.reactions || { fire: 0, thumbsUp: 0, thumbsDown: 0, heart: 0 });

  const handleReaction = (type: keyof typeof reactions) => {
    setReactions(prev => ({ ...prev, [type]: (prev[type] || 0) + 1 }));
  };

  const hasNewVideoSchema = material.category === 'video' && material.video && material.video.length > 0;
  const legacyVideoUrl = material.path;
  const isVideo = material.category === 'video';

  return (
    <Container 
      maxWidth={isVideo ?"lg":'lg'} 
      sx={{ 
        py: isVideo ? 1.5 : 4, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ mb: isVideo ? 1 : 4, flexShrink: 0 }}>
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
        <Typography variant={isVideo ? "h5" : "h3"} fontWeight="800" sx={{ lineHeight: 1.1 }}>
          {material.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
           Published by BeforeAcademy
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
          <Box sx={{ width: '100%', maxWidth: '125vh', mx: 'auto' }}>
            {hasNewVideoSchema ? (
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
      ) : (
        <Paper elevation={0} sx={{ flexGrow: 1, overflowY: 'auto', p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
          <Typography component="div" variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {material.content || material.solution}
          </Typography>
        </Paper>
      )}

      <Box sx={{ flexShrink: 0 }}>
        <Divider sx={{ mb: 1.5 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography fontWeight="bold" color="text.secondary" variant="caption">Was this helpful?</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Insightful!"><Chip size="small" icon={<LocalFireDepartmentIcon />} label={reactions.fire || 0} onClick={() => handleReaction('fire')} sx={{ bgcolor: 'rgba(255, 87, 34, 0.1)', color: '#ff5722', fontWeight: 'bold' }} /></Tooltip>
            <Tooltip title="Love it"><Chip size="small" icon={<FavoriteIcon />} label={reactions.heart || 0} onClick={() => handleReaction('heart')} sx={{ bgcolor: 'rgba(233, 30, 99, 0.1)', color: '#e91e63', fontWeight: 'bold' }} /></Tooltip>
            <Tooltip title="Helpful"><Chip size="small" icon={<ThumbUpIcon />} label={reactions.thumbsUp || 0} onClick={() => handleReaction('thumbsUp')} sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', color: '#2196f3', fontWeight: 'bold' }} /></Tooltip>
            <Tooltip title="Not helpful"><Chip size="small" icon={<ThumbDownIcon />} label={reactions.thumbsDown || 0} onClick={() => handleReaction('thumbsDown')} sx={{ bgcolor: 'rgba(158, 158, 158, 0.1)', color: '#757575', fontWeight: 'bold' }} /></Tooltip>
            <Box sx={{ width: 1, height: 16, bgcolor: 'divider', mx: 0.5 }} />
            <IconButton size="small" sx={{ color: 'text.secondary' }}><ShareIcon fontSize="inherit" /></IconButton>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}