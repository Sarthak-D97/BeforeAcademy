'use client';

import { useState } from 'react';
import Image from 'next/image';
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
  Badge,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';

import { Curriculum, Curriculum_Subjects, Curriculum_Topics, Materials } from '../types/curriculum';

import SubjectGrid from './curriculum/SubjectGrid';
import Sidebar from './curriculum/SideBar'; 
import ContentViewer from './curriculum/ContentViewer';
import CurriculumOverview from './curriculum/CurriculumOverview';
import ThemeToggle from './ThemeToggle';

export default function CurriculumRenderer({ data }: { data: Curriculum }) {
  const [activeSubject, setActiveSubject] = useState<Curriculum_Subjects | null>(null);
  const [activeTopic, setActiveTopic] = useState<Curriculum_Topics | null>(null);
  const [activeMaterial, setActiveMaterial] = useState<Materials | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubjectSelect = (s: Curriculum_Subjects) => {
    setActiveSubject(s);
    setActiveTopic(null);
    setActiveMaterial(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTopicSelect = (t: Curriculum_Topics) => {
    setActiveTopic(t);
    setActiveMaterial(null);
    if (isMobile) setMobileOpen(false);
  };

  const handleMaterialSelect = (m: Materials) => {
    setActiveMaterial(m);
    if (isMobile) setMobileOpen(false);
  };

  const handleBack = () => {
    if (activeMaterial) {
      setActiveMaterial(null);
    } else if (activeTopic) {
      setActiveTopic(null);
    } else {
      setActiveSubject(null);
    }
  };

  const TopBarActions = () => (
    <Stack direction="row" spacing={{ xs: 0.5, sm: 1.5 }} alignItems="center">
      <Paper 
        elevation={0} 
        sx={{ 
          p: '2px 8px', 
          display: { xs: 'none', lg: 'flex' }, 
          alignItems: 'center', 
          width: { md: 200, lg: 240 }, 
          bgcolor: 'action.hover', 
          border: '1px solid', 
          borderColor: 'divider', 
          borderRadius: 2 
        }}
      >
        <SearchIcon fontSize="small" color="action" />
        <InputBase sx={{ ml: 1, flex: 1, fontSize: '0.875rem' }} placeholder="Search curriculum..." />
      </Paper>
      <ThemeToggle />
      <IconButton size="small" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
        <Badge variant="dot" color="error">
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>
      <Avatar 
        src="/profile.jpeg" 
        sx={{ 
          width: { xs: 32, sm: 36 }, 
          height: { xs: 32, sm: 36 }, 
          border: '2px solid', 
          borderColor: 'primary.main',
          cursor: 'pointer'
        }} 
      />
    </Stack>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {!activeSubject ? (
          <motion.div 
            key="lib" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <AppBar 
              position="sticky" 
              color="default" 
              elevation={0} 
              sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
            >
              <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ minHeight: { xs: 56, sm: 64 } }}>
                   <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Image src="/logo.svg" alt="Logo" width={32} height={32} style={{ height: 'auto' }} />
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 800, 
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        color: 'primary.main',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      AfterAcademy
                    </Typography>
                  </Box>
                  <TopBarActions />
                </Toolbar>
              </Container>
            </AppBar>
            <SubjectGrid subjects={data.subjects} onSelect={handleSubjectSelect} />
          </motion.div>
        ) : (
          <motion.div 
            key="learning" 
            initial={{ x: 50, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            exit={{ x: 50, opacity: 0 }} 
            style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}
          >
            {/* Desktop Sidebar */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Sidebar
                subjects={data.subjects}
                activeSubjectId={activeSubject._id}
                activeMaterialId={activeMaterial?._id}
                onMaterialSelect={handleMaterialSelect}
                onTopicSelect={handleTopicSelect} 
              />
            </Box>

            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
              }}
            >
              <Sidebar
                subjects={data.subjects}
                activeSubjectId={activeSubject._id}
                activeMaterialId={activeMaterial?._id}
                onMaterialSelect={handleMaterialSelect}
                onTopicSelect={handleTopicSelect} 
              />
            </Drawer>
            
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <AppBar 
                position="sticky" 
                color="default" 
                elevation={0} 
                sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', zIndex: 10 }}
              >
                <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, px: { xs: 1, sm: 2 } }}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 1, display: { md: 'none' } }}
                  >
                    <MenuIcon />
                  </IconButton>

                  <Button 
                    startIcon={<ArrowBackIcon />} 
                    onClick={handleBack} 
                    sx={{ 
                      textTransform: 'none', 
                      fontWeight: 'bold', 
                      color: 'text.primary',
                      fontSize: { xs: '0.8rem', sm: '0.875rem' },
                      minWidth: 'auto',
                      px: { xs: 1, sm: 2 }
                    }}
                  >
                    {activeMaterial || activeTopic ? (isMobile ? "Back" : "Back to Overview") : (isMobile ? "Library" : "Back to Library")}
                  </Button>
                  <Box sx={{ flexGrow: 1 }} />
                  <TopBarActions />
                </Toolbar>
              </AppBar>

              <Box 
                id="main-content-area" 
                sx={{ flexGrow: 1, overflowY: 'auto', bgcolor: 'background.default' }}
              >
                <AnimatePresence mode="wait">
                  {activeMaterial ? (
                    <motion.div 
                      key={activeMaterial._id} 
                      initial={{ y: 10, opacity: 0 }} 
                      animate={{ y: 0, opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      style={{ height: '100%' }}
                    >
                      <ContentViewer material={activeMaterial} />
                    </motion.div>
                  ) : (

                    <motion.div 
                      key={activeTopic?._id || activeSubject._id} 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                    >
                       <CurriculumOverview 
                         subject={activeSubject} 
                         topic={activeTopic} 
                       />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}