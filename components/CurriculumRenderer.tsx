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
  Badge,
  useTheme
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Curriculum, Curriculum_Subjects, Materials } from '../types/curriculum';
import SubjectGrid from './curriculum/SubjectGrid';
import Sidebar from './curriculum/SideBar';
import TopicList from './curriculum/TopicList';
import ContentViewer from './curriculum/ContentViewer';
import ThemeToggle from './ThemeToggle';
const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

interface Props {
  data: Curriculum;
}

export default function CurriculumRenderer({ data }: Props) {
  const theme = useTheme();
  const [activeSubject, setActiveSubject] = useState<Curriculum_Subjects | null>(null);
  const [activeMaterial, setActiveMaterial] = useState<Materials | null>(null);

  const handleSubjectSelect = (s: Curriculum_Subjects) => {
    setActiveSubject(s);
    setActiveMaterial(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMaterialSelect = (m: Materials) => {
    setActiveMaterial(m);
    const contentBox = document.getElementById('main-content-area');
    if(contentBox) contentBox.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (activeMaterial) {
      setActiveMaterial(null);
    } else {
      setActiveSubject(null);
    }
  };
  const TopBarActions = () => (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Paper
        component="form"
        elevation={0}
        sx={{
          p: '2px 8px',
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          width: { sm: 200, md: 240 },
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
      <ThemeToggle />
      <IconButton size="small" color="inherit">
        <Badge variant="dot" color="error" overlap="circular">
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>
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

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {!activeSubject ? (
          <motion.div
            key="library-view"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', height: '100%' }}
          >
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
                      fontWeight: 700,
                      fontSize: '1.8rem',
                      letterSpacing: 1,
                      cursor: 'pointer',
                      userSelect: 'none',
                      color: 'text.primary'
                    }}
                  >
                    <Box
                      component="img"
                      src="/logo1.png"
                      alt="B Logo"
                      sx={{ height: 38, width: 'auto', mr: 1, display: 'block' }}
                    />
                    BeforeAcademy
                  </Typography>
                  <TopBarActions />
                </Toolbar>
              </Container>
            </AppBar>
            <SubjectGrid subjects={data.subjects} onSelect={handleSubjectSelect} />
          </motion.div>
        ) : (
          <motion.div
            key="curriculum-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }} 
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}
          >
            <Sidebar
              mode={activeMaterial ? 'topics' : 'subjects'}
              title={activeMaterial ? activeSubject.title : "Library"}
              items={activeMaterial ? activeSubject.topics : data.subjects}
              activeId={activeMaterial ? activeMaterial._id : activeSubject._id}
              onSelect={activeMaterial ? handleMaterialSelect : handleSubjectSelect}
            />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', zIndex: 10 }}>
                <Toolbar sx={{ minHeight: 64 }}>
                  <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                    sx={{ textTransform: 'none', fontWeight: 'bold', color: 'text.primary' }}
                  >
                    {activeMaterial ? "Back to Overview" : "Back to Library"}
                  </Button>
                  <Box sx={{ flexGrow: 1 }} />
                  <TopBarActions />
                </Toolbar>
              </AppBar>

              {/* Dynamic Content Area with Animation */}
              <Box 
                id="main-content-area"
                sx={{ flexGrow: 1, overflowY: 'auto', bgcolor: 'background.default' }}
              >
                <AnimatePresence mode="wait">
                  {activeMaterial ? (
                    <motion.div
                      key="content-viewer"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={contentVariants}
                      transition={{ duration: 0.25 }}
                    >
                      <ContentViewer material={activeMaterial} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="topic-list"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={contentVariants}
                      transition={{ duration: 0.25 }}
                    >
                      <TopicList subject={activeSubject} onMaterialSelect={handleMaterialSelect} />
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