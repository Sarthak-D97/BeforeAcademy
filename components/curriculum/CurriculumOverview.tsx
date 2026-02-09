'use client';

import React from 'react';
import { 
  Box, Typography, Card, CardContent, 
  Divider, Chip, Stack, Avatar , Grid
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

import { Curriculum_Subjects, Curriculum_Topics } from '../../types/curriculum';

interface Props {
  subject: Curriculum_Subjects;
  topic: Curriculum_Topics | null;
}

export default function CurriculumOverview({ subject, topic }: Props) {
  if (topic) {
    return (
      <Box sx={{ p: { xs: 3, md: 6 }, maxWidth: '900px', mx: 'auto' }}>
        <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 1.5 }}>
          Module Discussion Plan
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1 }}>{topic.title}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.6 }}>
          {topic.description || `Conceptual deep dive into ${topic.title}.`}
        </Typography>

        <Grid container spacing={3}>
          {topic.subtopics.map((sub, idx) => (
            <Grid key={sub._id} size={12}>
              <Card 
                variant="outlined" 
                sx={{ 
                  borderRadius: 3, 
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': { borderColor: 'primary.main' }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: 'primary.main', 
                        width: 36, 
                        height: 36, 
                        fontSize: '1rem', 
                        fontWeight: 'bold' 
                      }}
                    >
                      {idx + 1}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {sub.title}
                    </Typography>
                  </Stack>

                  <Box sx={{ pl: 6.5 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {sub.description || "We will discuss the architectural foundations and implementation patterns of this module."}
                    </Typography>
                    
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      <Chip 
                        size="small" 
                        icon={<TipsAndUpdatesIcon sx={{ fontSize: '1rem !important' }} />} 
                        label="Core Theory" 
                        variant="outlined" 
                      />
                      <Chip 
                        size="small" 
                        icon={<TipsAndUpdatesIcon sx={{ fontSize: '1rem !important' }} />} 
                        label="Best Practices" 
                        variant="outlined" 
                      />
                      <Chip 
                        size="small" 
                        icon={<TipsAndUpdatesIcon sx={{ fontSize: '1rem !important' }} />} 
                        label="System Design" 
                        variant="outlined" 
                      />
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 3, md: 8 }, textAlign: 'center', maxWidth: '850px', mx: 'auto' }}>
      <SchoolIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2, opacity: 0.9 }} />
      <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: '-1.5px' }} gutterBottom>
        {subject.title}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 6, fontWeight: 400, lineHeight: 1.6, maxWidth: '650px', mx: 'auto' }}>
        {subject.description || `Welcome! We will discuss the professional roadmap of ${subject.title} using a module-by-module architectural approach.`}
      </Typography>

      <Divider sx={{ mb: 6 }}>
        <Chip 
          icon={<MenuBookIcon />} 
          label="DISCUSSION ROADMAP" 
          sx={{ fontWeight: 800, px: 2, bgcolor: 'action.selected', letterSpacing: 0.5 }} 
        />
      </Divider>

      <Grid container spacing={2.5}>
        {subject.topics.map((t, idx) => (
          <Grid key={t._id} size={{ xs: 12, sm: 6 }}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2.5, 
                textAlign: 'left', 
                p: 3, 
                borderRadius: 3, 
                border: '1px solid', 
                borderColor: 'divider',
                bgcolor: 'background.paper',
                transition: 'all 0.2s ease-in-out',
                '&:hover': { 
                  borderColor: 'primary.main', 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 900, 
                  color: 'primary.main', 
                  opacity: 0.15,
                  minWidth: '45px'
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </Typography>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2, mb: 0.5 }}>
                  {t.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {t.subtopics.length} Key Discussion Points
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}