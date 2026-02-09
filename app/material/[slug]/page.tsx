'use client';

import { useParams } from 'next/navigation';
import { mockCurriculum } from '@/data/mockCurriculum';
import ContentViewer from '@/components/curriculum/ContentViewer';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function FullMaterialPage() {
  const params = useParams();
  const slug = params.slug as string;

  const material = mockCurriculum.subjects
    .flatMap(s => s.topics)
    .flatMap(t => t.subtopics)
    .flatMap(st => st.materials)
    .find(m => m.slug === slug);

  if (!material) return <Typography sx={{ p: 4 }}>Material not found</Typography>;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar variant="dense">
          <Typography variant="subtitle2" sx={{ flexGrow: 1, fontWeight: 700 }}>
            BeforeAcademy Reader
          </Typography>
          <Button 
            size="small" 
            startIcon={<CloseIcon />} 
            onClick={() => window.close()}
            sx={{ textTransform: 'none' }}
          >
            Close
          </Button>
        </Toolbar>
      </AppBar>

      <ContentViewer material={material} />
    </Box>
  );
}