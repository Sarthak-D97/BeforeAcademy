'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Chip, 
  Container 
} from '@mui/material';

// Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArticleIcon from '@mui/icons-material/Article';
import CodeIcon from '@mui/icons-material/Code';

import { Curriculum_Subjects, Materials } from '../../types/curriculum';

interface Props {
  subject: Curriculum_Subjects;
  onMaterialSelect: (m: Materials) => void;
}

export default function TopicList({ subject, onMaterialSelect }: Props) {
  
  // 2. Helper function to choose the right icon
  const getIcon = (category: string) => {
    switch (category) {
      case 'video': return <PlayCircleIcon />;
      case 'problem': return <CodeIcon />;
      default: return <ArticleIcon />;
    }
  };

  // 3. Helper function for distinct colors
  const getIconColor = (category: string) => {
    switch (category) {
      case 'video': return 'secondary.main'; // Pink/Red
      case 'problem': return 'warning.main';   // Orange for Code
      default: return 'primary.main';        // Blue for Articles
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="overline" color="primary" fontWeight="bold">MODULES</Typography>
        <Typography variant="h3" fontWeight="800" sx={{ mb: 1 }}>{subject.title}</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 600 }}>{subject.description}</Typography>
      </Box>

      {subject.topics.map((topic) => (
        <Accordion 
          key={topic._id} 
          defaultExpanded 
          elevation={0}
          sx={{ 
            mb: 2, 
            border: '1px solid', 
            borderColor: 'divider',
            bgcolor: 'background.paper', 
            borderRadius: '8px !important',
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3 }}>
            <Typography variant="h6" fontWeight="600">{topic.title}</Typography>
          </AccordionSummary>
          
          <AccordionDetails sx={{ p: 0 }}>
            {topic.subtopics.map((sub) => (
              <Box key={sub._id}>
                {sub.title && (
                  <Box sx={{ px: 3, py: 1, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'action.hover' }}>
                    <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                      {sub.title}
                    </Typography>
                  </Box>
                )}
                <List disablePadding>
                  {sub.materials.map((mat) => (
                    <ListItemButton key={mat._id} onClick={() => onMaterialSelect(mat)} sx={{ px: 3, py: 2 }}>
                      
                      {/* 4. Updated Icon Logic */}
                      <ListItemIcon sx={{ minWidth: 40, color: getIconColor(mat.category) }}>
                        {getIcon(mat.category)}
                      </ListItemIcon>

                      <ListItemText 
                        primary={mat.title} 
                        secondaryTypographyProps={{ component: 'div' }} 
                        secondary={
                          mat.difficulty && (
                            <Chip 
                              label={mat.difficulty} 
                              size="small" 
                              variant="outlined" 
                              sx={{ mt: 0.5, height: 20, fontSize: '0.6rem', borderColor: 'divider' }} 
                            />
                          )
                        }
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}