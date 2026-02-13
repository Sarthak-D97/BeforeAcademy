'use client';

import React, { useState, useEffect } from 'react';
import { 
  Paper, Box, List, ListItemButton, ListItemIcon, ListItemText, 
  Typography, Collapse, Divider, Tooltip, alpha, useTheme, IconButton
} from '@mui/material';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArticleIcon from '@mui/icons-material/Article';
import CodeIcon from '@mui/icons-material/Code';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import FolderIcon from '@mui/icons-material/Folder';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import { Curriculum_Subjects, Curriculum_Topics, Materials } from '../../types/curriculum';

const getIcon = (type: string) => {
  if (type === 'video') return <PlayCircleIcon fontSize="small" sx={{ color: 'secondary.main' }} />;
  if (type === 'problem') return <CodeIcon fontSize="small" sx={{ color: 'warning.main' }} />;
  return <ArticleIcon fontSize="small" sx={{ color: 'primary.main' }} />;
};

interface Props {
  subjects: Curriculum_Subjects[];
  activeSubjectId?: string;
  activeMaterialId?: string;
  onMaterialSelect: (m: Materials) => void;
  onTopicSelect: (t: Curriculum_Topics) => void; 
  onClose?: () => void;
}

export default function Sidebar({ 
  subjects, 
  activeSubjectId, 
  activeMaterialId, 
  onMaterialSelect,
  onTopicSelect,
  onClose
}: Props) {
  const theme = useTheme();
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  useEffect(() => {
    if (activeSubjectId) setExpandedSubject(activeSubjectId);
  }, [activeSubjectId]);

  const handleMaterialClick = (mat: Materials) => {
    if (mat.category === 'article' || mat.category === 'problem') {
      window.open(`/material/${mat.slug}`, '_blank');
    } else {
      onMaterialSelect(mat);
    }
  };

  const handleTopicClick = (topic: Curriculum_Topics) => {
    setExpandedTopic(expandedTopic === topic._id ? null : topic._id);
    onTopicSelect(topic);
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        width: { xs: '100%', md: 320 }, 
        flexShrink: 0,
        borderRight: { xs: 'none', md: '1px solid' }, 
        borderColor: 'divider',
        height: '100%',
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRadius: 0
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="overline" fontWeight="900" color="text.secondary" letterSpacing={1.2}>
          Course Content
        </Typography>
        {onClose && (
          <IconButton 
            onClick={onClose} 
            size="small" 
            sx={{ 
              display: { xs: 'inline-flex', md: 'none' },
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' }
            }}
          >
            <MenuOpenIcon />
          </IconButton>
        )}
      </Box>

      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        <List disablePadding>
          {subjects.map((subject) => {
            const isSubExpanded = expandedSubject === subject._id;

            return (
              <Box key={subject._id}>
                <ListItemButton 
                  onClick={() => setExpandedSubject(isSubExpanded ? null : subject._id)}
                  sx={{ 
                    py: 1.5, 
                    borderLeft: isSubExpanded ? '4px solid' : '4px solid transparent', 
                    borderColor: 'primary.main',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    <SchoolIcon fontSize="small" color={isSubExpanded ? "primary" : "action"} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={subject.title} 
                    primaryTypographyProps={{ fontWeight: isSubExpanded ? 800 : 500, fontSize: { xs: '0.85rem', md: '0.9rem' } }} 
                  />
                  {isSubExpanded ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={isSubExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: 1 }}>
                    {subject.topics.map((topic) => {
                      const isTopicExpanded = expandedTopic === topic._id;

                      return (
                        <Box key={topic._id}>
                          <ListItemButton 
                            onClick={() => handleTopicClick(topic)}
                            sx={{ 
                              py: 1.2, 
                              pl: 2.5,
                              borderRadius: 0,
                              '&:hover': {
                                bgcolor: 'action.hover',
                              }
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <FolderIcon fontSize="inherit" color={isTopicExpanded ? "primary" : "disabled"} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={topic.title} 
                              primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: isTopicExpanded ? 700 : 400 }} 
                            />
                            {isTopicExpanded ? <ExpandLess fontSize="inherit" /> : <ExpandMore fontSize="inherit" />}
                          </ListItemButton>

                          <Collapse in={isTopicExpanded} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding sx={{ bgcolor: 'action.hover', ml: 2 }}>
                              {topic.subtopics?.map((sub) => (
                                <Box key={sub._id}>
                                  <Box sx={{ px: 3, py: 0.5 }}>
                                    <Typography variant="caption" fontWeight="900" color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: '0.6rem' }}>
                                      {sub.title}
                                    </Typography>
                                  </Box>
                                  {sub.materials?.map((mat) => {
                                    const isExternal = mat.category === 'article' || mat.category === 'problem';
                                    
                                    return (
                                      <ListItemButton 
                                        key={mat._id} 
                                        selected={mat._id === activeMaterialId} 
                                        onClick={() => handleMaterialClick(mat)}
                                        sx={{ 
                                          pl: 4, 
                                          py: 1,
                                          '&.Mui-selected': {
                                            bgcolor: alpha(theme.palette.primary.main, 0.08),
                                            color: 'primary.main',
                                            '&:hover': {
                                              bgcolor: alpha(theme.palette.primary.main, 0.12),
                                            },
                                            '& .MuiListItemIcon-root': {
                                              color: 'primary.main',
                                            }
                                          }
                                        }}
                                      >
                                        <ListItemIcon sx={{ minWidth: 25 }}>
                                          {getIcon(mat.category)}
                                        </ListItemIcon>
                                        <ListItemText 
                                          primary={mat.title} 
                                          primaryTypographyProps={{ 
                                            fontSize: '0.75rem', 
                                            fontWeight: mat._id === activeMaterialId ? 700 : 400,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5
                                          }} 
                                        />
                                        {isExternal && (
                                          <Tooltip title="Opens in new window" placement="right">
                                            <OpenInNewIcon sx={{ fontSize: '0.7rem', opacity: 0.5, ml: 0.5 }} />
                                          </Tooltip>
                                        )}
                                      </ListItemButton>
                                    );
                                  })}
                                </Box>
                              ))}
                            </List>
                          </Collapse>
                        </Box>
                      );
                    })}
                  </List>
                </Collapse>
                <Divider />
              </Box>
            );
          })}
        </List>
      </Box>
    </Paper>
  );
}