'use client';

import { useState } from 'react';
import {
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Avatar,
  InputBase,
  Paper,
  Stack,
  Badge
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Curriculum, Curriculum_Subjects, Materials } from '../types/curriculum';
import SubjectGrid from './curriculum/SubjectGrid';
import Sidebar from './curriculum/SideBar';
import TopicList from './curriculum/TopicList';
import ContentViewer from './curriculum/ContentViewer';
import ThemeToggle from './ThemeToggle';

interface Props {
  data: Curriculum;
}

export default function CurriculumRenderer({ data }: Props) {
  // --- STATE ---
  const [activeSubject, setActiveSubject] = useState<Curriculum_Subjects | null>(null);
  const [activeMaterial, setActiveMaterial] = useState<Materials | null>(null);

  // --- ACTIONS ---
  const handleSubjectSelect = (s: Curriculum_Subjects) => {
    setActiveSubject(s);
    setActiveMaterial(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMaterialSelect = (m: Materials) => {
    setActiveMaterial(m);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (activeMaterial) {
      setActiveMaterial(null);
    } else {
      setActiveSubject(null);
    }
  };

  // --- TOP BAR ACTIONS COMPONENT ---
  const TopBarActions = () => (
    <Stack direction="row" spacing={1.5} alignItems="center">

      {/* 1. Search Bar */}
      <Paper
        component="form"
        elevation={0}
        sx={{
          p: '2px 8px',
          display: 'flex', // Force flex to ensure visibility
          alignItems: 'center',
          width: { xs: 140, sm: 240 }, // Responsive width
          bgcolor: 'action.hover',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2
        }}
      >
        <SearchIcon fontSize="small" color="action" />
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: '0.875rem' }}
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search topics' }}
        />
      </Paper>

      {/* 2. Theme Toggle */}
      <ThemeToggle />

      {/* 3. Notifications */}
      <IconButton size="small" color="inherit">
        <Badge variant="dot" color="error" overlap="circular">
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>

      {/* 4. Profile Avatar */}
      <Avatar
        alt="User Profile"
        src="/profile.jpeg"
        sx={{
          width: 36,
          height: 36,
          border: '2px solid',
          borderColor: 'primary.main',
          cursor: 'pointer',
          boxShadow: 2
        }}
      />
    </Stack>
  );

  // --- VIEW 1: LIBRARY (HOME) ---
  if (!activeSubject) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>

        {/* Main Header */}
        <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ minHeight: 64 }}>
              <Typography
                variant="h4" 
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.8,
                  fontFamily: '"Caveat", cursive', 
                  fontWeight: 1600,
                  fontSize: '1.2rem',
                  letterSpacing: 3,
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <Box
                  component="img"
                  src="/logo1.png"
                  alt="B Logo"
                  sx={{
                    height: 38,
                    width: 'auto',
                    mr: 1,
                    display: 'block'
                  }}
                />
                BeforeAcademy
              </Typography>
              <TopBarActions />

            </Toolbar>
          </Container>
        </AppBar>

        {/* Content */}
        <SubjectGrid subjects={data.subjects} onSelect={handleSubjectSelect} />
      </Box>
    );
  }

  // --- VIEW 2: LEARNING MODE (SPLIT LAYOUT) ---
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', bgcolor: 'background.default' }}>

      {/* Sidebar */}
      <Sidebar
        mode={activeMaterial ? 'topics' : 'subjects'}
        title={activeMaterial ? activeSubject.title : "Library"}
        items={activeMaterial ? activeSubject.topics : data.subjects}
        activeId={activeMaterial ? activeMaterial._id : activeSubject._id}
        onSelect={activeMaterial ? handleMaterialSelect : handleSubjectSelect}
      />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* Internal Navigation Bar */}
        <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Toolbar sx={{ minHeight: 64 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              sx={{ textTransform: 'none', fontWeight: 'bold', color: 'text.primary' }}
            >
              {activeMaterial ? "Back to Overview" : "Library"}
            </Button>

            <Box sx={{ flexGrow: 1 }} />

            {/* ADDED ACTIONS HERE AS WELL */}
            <TopBarActions />

          </Toolbar>
        </AppBar>

        {/* Scrollable Area */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {activeMaterial ? (
            <ContentViewer material={activeMaterial} />
          ) : (
            <TopicList subject={activeSubject} onMaterialSelect={handleMaterialSelect} />
          )}
        </Box>

      </Box>
    </Box>
  );
}