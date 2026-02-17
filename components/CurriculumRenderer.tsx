'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

function CurriculumContent({ data }: { data: Curriculum }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeSubject, setActiveSubject] = useState<Curriculum_Subjects | null>(null);
  const [activeTopic, setActiveTopic] = useState<Curriculum_Topics | null>(null);
  const [activeMaterial, setActiveMaterial] = useState<Materials | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Initialize state from URL on mount and when searchParams change
  useEffect(() => {
    const subjectId = searchParams.get('subject');
    const topicId = searchParams.get('topic');
    const materialId = searchParams.get('material');

    if (subjectId) {
      const subject = data.subjects.find((s) => s._id === subjectId);
      if (subject) {
        setActiveSubject(subject);
        if (topicId) {
          const topic = subject.topics.find((t) => t._id === topicId);
          if (topic) {
            setActiveTopic(topic);
            if (materialId) {
              const material = topic.subtopics
                .flatMap((st) => st.materials)
                .find((m) => m._id === materialId);
              if (material) {
                setActiveMaterial(material);
              }
            }
          }
        }
      }
    } else {
      // Reset if no subject in URL
      setActiveSubject(null);
      setActiveTopic(null);
      setActiveMaterial(null);
    }
  }, [searchParams, data.subjects]);

  const updateUrl = (sId?: string, tId?: string, mId?: string) => {
    const params = new URLSearchParams();
    if (sId) params.set('subject', sId);
    if (tId) params.set('topic', tId);
    if (mId) params.set('material', mId);
    
    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : '/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubjectSelect = (s: Curriculum_Subjects) => {
    setActiveSubject(s);
    setActiveTopic(null);
    setActiveMaterial(null);
    updateUrl(s._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTopicSelect = (t: Curriculum_Topics) => {
    setActiveTopic(t);
    setActiveMaterial(null);
    if (activeSubject) {
      updateUrl(activeSubject._id, t._id);
    }
    if (isMobile) setMobileOpen(false);
  };

  const handleMaterialSelect = (m: Materials) => {
    setActiveMaterial(m);
    if (activeSubject && activeTopic) {
      updateUrl(activeSubject._id, activeTopic._id, m._id);
    }
    if (isMobile) setMobileOpen(false);
  };

  const getAllMaterials = () => {
    if (!activeTopic) return [];
    return activeTopic.subtopics.flatMap(st => st.materials);
  };

  const allMaterialsInTopic = getAllMaterials();
  const currentMaterialIndex = allMaterialsInTopic.findIndex(m => m._id === activeMaterial?._id);
  const hasNextMaterial = currentMaterialIndex !== -1 && currentMaterialIndex < allMaterialsInTopic.length - 1;
  const hasPrevMaterial = currentMaterialIndex > 0;
  const courseProgress = allMaterialsInTopic.length > 0 ? ((currentMaterialIndex + 1) / allMaterialsInTopic.length) * 100 : 0;

  const handleNextMaterial = () => {
    if (hasNextMaterial) {
      handleMaterialSelect(allMaterialsInTopic[currentMaterialIndex + 1]);
    }
  };

  const handlePrevMaterial = () => {
    if (hasPrevMaterial) {
      handleMaterialSelect(allMaterialsInTopic[currentMaterialIndex - 1]);
    }
  };

  const handleBack = () => {
    if (activeMaterial) {
      setActiveMaterial(null);
      if (activeSubject && activeTopic) updateUrl(activeSubject._id, activeTopic._id);
    } else if (activeTopic) {
      setActiveTopic(null);
      if (activeSubject) updateUrl(activeSubject._id);
    } else {
      setActiveSubject(null);
      updateUrl();
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
              position="fixed" // UPDATED: Changed from sticky to fixed
              color="default" 
              elevation={0} 
              sx={{ 
                borderBottom: '1px solid', 
                borderColor: 'divider', 
                bgcolor: 'background.paper',
                width: '100%',
                zIndex: 1100 
              }}
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
            {/* ADDED: Spacer Toolbar to prevent content from hiding behind fixed AppBar */}
            <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }} />
            
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
                onClose={handleDrawerToggle}
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
                onClose={handleDrawerToggle}
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
                      <ContentViewer 
                        material={activeMaterial} 
                      />
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

export default function CurriculumRenderer({ data }: { data: Curriculum }) {
  return (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</Box>}>
      <CurriculumContent data={data} />
    </Suspense>
  );
}