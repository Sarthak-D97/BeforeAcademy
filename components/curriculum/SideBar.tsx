'use client';
import { Paper, Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar, useTheme } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArticleIcon from '@mui/icons-material/Article';
import CodeIcon from '@mui/icons-material/Code';
import { Curriculum_Subjects, Curriculum_Topics, Materials } from '../../types/curriculum';

const getIcon = (type: string) => {
  if (type === 'video') return <PlayCircleIcon fontSize="small" />;
  if (type === 'problem') return <CodeIcon fontSize="small" />;
  return <ArticleIcon fontSize="small" />;
};

interface Props {
  mode: 'subjects' | 'topics';
  items: any[];
  activeId?: string;
  onSelect: (item: any) => void;
  title: string;
}

export default function Sidebar({ mode, items, activeId, onSelect, title }: Props) {
  const theme = useTheme();

  return (
    <Paper 
      elevation={0}
      sx={{ 
        width: { xs: '100%', md: 320 }, 
        flexShrink: 0,
        borderRight: '1px solid', 
        borderColor: 'divider', // Uses theme divider color
        height: '100%',
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: 'background.paper', // Dark in dark mode, White in light mode
        borderRadius: 0
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'action.hover' }}>
        <Typography variant="overline" fontWeight="900" color="text.secondary" letterSpacing={1.2}>
          {title}
        </Typography>
      </Box>

      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        <List disablePadding>
          {items.map((item: any) => {
            const isActive = item._id === activeId;
            
            if (mode === 'subjects') {
              return (
                <ListItemButton 
                  key={item._id} 
                  selected={isActive} 
                  onClick={() => onSelect(item)} 
                  sx={{ 
                    py: 2, 
                    borderLeft: isActive ? '4px solid' : '4px solid transparent', 
                    borderColor: 'primary.main',
                    '&.Mui-selected': { bgcolor: 'action.selected' } 
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Avatar sx={{ width: 28, height: 28, fontSize: '0.75rem', bgcolor: isActive ? 'primary.main' : 'action.disabled', color: '#fff' }}>
                      {item.title[0]}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary={item.title} primaryTypographyProps={{ fontWeight: isActive ? 700 : 500 }} />
                </ListItemButton>
              );
            }

            return (
              <Box key={item._id}>
                {/* Topic Header - Replaced Grey with Transparent/Divider */}
                <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="caption" fontWeight="bold" color="primary">{item.title.toUpperCase()}</Typography>
                </Box>
                {item.subtopics.map((sub: any) => (
                  sub.materials.map((mat: Materials) => (
                    <ListItemButton 
                      key={mat._id} 
                      selected={mat._id === activeId} 
                      onClick={() => onSelect(mat)}
                      sx={{ 
                        pl: 4, py: 1.5, 
                        borderLeft: mat._id === activeId ? '3px solid' : '3px solid transparent', 
                        borderColor: 'primary.main',
                        '&.Mui-selected': { bgcolor: 'action.selected' }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 30, color: mat._id === activeId ? 'primary.main' : 'text.secondary' }}>
                        {getIcon(mat.category)}
                      </ListItemIcon>
                      <ListItemText primary={mat.title} primaryTypographyProps={{ fontSize: '0.85rem', noWrap: true }} />
                    </ListItemButton>
                  ))
                ))}
              </Box>
            );
          })}
        </List>
      </Box>
    </Paper>
  );
}