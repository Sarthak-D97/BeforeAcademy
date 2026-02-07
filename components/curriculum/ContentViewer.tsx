'use client';
import { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Chip, 
  Paper, 
  Divider, 
  Stack, 
  IconButton, 
  Tooltip, 
  useTheme
} from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Materials } from '../../types/curriculum';

interface Props {
  material: Materials;
}

export default function ContentViewer({ material }: Props) {
  const theme = useTheme();
  const [reactions, setReactions] = useState(material.reactions || {
    fire: 0,
    thumbsUp: 0,
    thumbsDown: 0,
    heart: 0
  });

  const handleReaction = (type: keyof typeof reactions) => {
    setReactions(prev => ({ ...prev, [type]: (prev[type] || 0) + 1 }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, height: '100%', overflowY: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip 
            label={material.category} 
            color={material.category === 'video' ? 'error' : 'primary'} 
            size="small" 
            sx={{ fontWeight: 'bold', textTransform: 'uppercase', borderRadius: 1 }} 
          />
          {material.difficulty && (
            <Chip 
              label={material.difficulty} 
              variant="outlined" 
              size="small" 
              sx={{ textTransform: 'capitalize', fontWeight: 600 }} 
            />
          )}
        </Stack>
        <Typography variant="h3" fontWeight="800" gutterBottom sx={{ lineHeight: 1.2 }}>
          {material.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
           10 min read • Published by BeforeAcademy
        </Typography>
      </Box>
      {material.category === 'video' ? (
        <Paper 
          elevation={0}
          sx={{ 
            position: 'relative', 
            pt: '56.25%', 
            borderRadius: 4, 
            overflow: 'hidden', 
            bgcolor: '#000', 
            boxShadow: theme.shadows[4],
            mb: 4
          }}
        >
          <iframe
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            src={material.path?.replace('watch?v=', 'embed/')}
            title={material.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Paper>
      ) : (
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            borderRadius: 4, 
            border: '1px solid', 
            borderColor: 'divider',
            bgcolor: 'background.paper',
            mb: 4 
          }}
        >
          <Typography 
            component="div" 
            variant="body1" 
            sx={{ 
              lineHeight: 1.8, 
              fontSize: '1.125rem',
              color: 'text.primary',
              whiteSpace: 'pre-line',
              '& h1': { fontSize: '2rem', fontWeight: 700, mt: 4, mb: 2 },
              '& h2': { fontSize: '1.5rem', fontWeight: 600, mt: 3, mb: 2, color: 'primary.main' },
              '& ul': { pl: 3, mb: 2 },
              '& li': { mb: 1 },
              '& code': { bgcolor: 'action.hover', px: 1, py: 0.5, borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9em' }
            }}
          >
            {material.content || material.solution || "Content is being generated for this module."}
          </Typography>
        </Paper>
      )}
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Typography fontWeight="bold" color="text.secondary" variant="body2">
          Was this helpful?
        </Typography>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Tooltip title="Insightful!">
            <Chip 
              icon={<LocalFireDepartmentIcon />} 
              label={reactions.fire || 0} 
              onClick={() => handleReaction('fire')}
              sx={{ 
                bgcolor: 'rgba(255, 87, 34, 0.1)', 
                color: '#ff5722', 
                fontWeight: 'bold', 
                height: 36,
                borderRadius: 20,
                border: '1px solid transparent',
                '&:hover': { bgcolor: 'rgba(255, 87, 34, 0.2)', borderColor: '#ff5722' },
                '& .MuiChip-icon': { color: '#ff5722' }
              }} 
            />
          </Tooltip>
          <Tooltip title="Love it">
            <Chip 
              icon={<FavoriteIcon />} 
              label={reactions.heart || 0} 
              onClick={() => handleReaction('heart')}
              sx={{ 
                bgcolor: 'rgba(233, 30, 99, 0.1)', 
                color: '#e91e63', 
                fontWeight: 'bold',
                height: 36,
                borderRadius: 20,
                '&:hover': { bgcolor: 'rgba(233, 30, 99, 0.2)' },
                '& .MuiChip-icon': { color: '#e91e63' }
              }} 
            />
          </Tooltip>
          <Tooltip title="Helpful">
            <Chip 
              icon={<ThumbUpIcon />} 
              label={reactions.thumbsUp || 0} 
              onClick={() => handleReaction('thumbsUp')}
              sx={{ 
                bgcolor: 'rgba(33, 150, 243, 0.1)', 
                color: '#2196f3', 
                fontWeight: 'bold',
                height: 36,
                borderRadius: 20,
                '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.2)' },
                '& .MuiChip-icon': { color: '#2196f3' }
              }} 
            />
          </Tooltip>
          <Tooltip title="Not helpful">
            <Chip 
              icon={<ThumbDownIcon />} 
              label={reactions.thumbsDown || 0} 
              onClick={() => handleReaction('thumbsDown')}
              sx={{ 
                bgcolor: 'rgba(158, 158, 158, 0.1)', 
                color: '#757575',
                fontWeight: 'bold',
                height: 36,
                borderRadius: 20,
                '&:hover': { bgcolor: 'rgba(158, 158, 158, 0.2)' },
                '& .MuiChip-icon': { color: '#757575' }
              }} 
            />
          </Tooltip>
          <Box sx={{ width: 1, height: 24, bgcolor: 'divider', mx: 1 }} />
          <Tooltip title="Share">
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <ShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </Container>
  );
}