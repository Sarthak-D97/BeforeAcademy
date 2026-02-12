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
      <Box sx={{ p: { xs: 2, sm: 3, md: 6 }, maxWidth: '900px', mx: 'auto' }}>
        <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 1.5, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
          Module Discussion Plan
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>{topic.title}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: { xs: '0.95rem', md: '1.1rem' }, lineHeight: 1.6 }}>
          {topic.description || `Conceptual deep dive into ${topic.title}.`}
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }}>
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
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: 'primary.main', 
                        width: { xs: 30, md: 36 }, 
                        height: { xs: 30, md: 36 }, 
                        fontSize: { xs: '0.875rem', md: '1rem' }, 
                        fontWeight: 'bold' 
                      }}
                    >
                      {idx + 1}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 800, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                      {sub.title}
                    </Typography>
                  </Stack>

                  <Box sx={{ pl: { xs: 0, sm: 6.5 } }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: { xs: '0.875rem', md: '1rem' } }}>
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
    <Box sx={{ p: { xs: 4, md: 8 }, textAlign: 'center', maxWidth: '850px', mx: 'auto' }}>
      <SchoolIcon sx={{ fontSize: { xs: 60, md: 80 }, color: 'primary.main', mb: 2, opacity: 0.9 }} />
      <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: '-0.02em', fontSize: { xs: '2.5rem', md: '3.75rem' } }} gutterBottom>
        Welcome to {subject.title}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 6, fontWeight: 500, lineHeight: 1.6 }}>
        Accelerate your career with high-quality resources, real-world projects, and a community of professionals. 
        Select a module from the sidebar to start your learning journey.
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {[
          { icon: <MenuBookIcon sx={{ fontSize: 32 }} />, label: 'Comprehensive Content', sub: 'In-depth articles & videos' },
          { icon: <TipsAndUpdatesIcon sx={{ fontSize: 32 }} />, label: 'Expert Insights', sub: 'Industry best practices' },
          { icon: <SchoolIcon sx={{ fontSize: 32 }} />, label: 'Guided Path', sub: 'Structured learning journey' }
        ].map((item, i) => (
          <Grid key={i} size={{ xs: 12, sm: 4 }}>
            <Box sx={{ p: 2 }}>
              <Box sx={{ color: 'primary.main', mb: 1 }}>{item.icon}</Box>
              <Typography variant="subtitle1" fontWeight="bold">{item.label}</Typography>
              <Typography variant="body2" color="text.secondary">{item.sub}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}