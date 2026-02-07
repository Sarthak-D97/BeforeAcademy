'use client';
import { Box, Typography, Paper, Divider, Chip, Container } from '@mui/material';
import { Materials } from '@/types/curriculum';

interface Props {
  material: Materials;
}

export default function ContentViewer({ material }: Props) {
  return (
    <Container maxWidth="lg" sx={{ py: 4, height: '100%', overflowY: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <Chip label={material.category} color="primary" size="small" sx={{ mb: 1, textTransform: 'uppercase', fontWeight: 'bold' }} />
        <Typography variant="h4" fontWeight="800">{material.title}</Typography>
      </Box>
      {material.category === 'video' ? (
        <Box sx={{ position: 'relative', pt: '56.25%', borderRadius: 4, overflow: 'hidden', bgcolor: '#000', boxShadow: 3 }}>
          <iframe
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            src={material.path?.replace('watch?v=', 'embed/')}
            title={material.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      ) : (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
            {material.solution || "This article content is being prepared. Please check back later."}
          </Typography>
        </Paper>
      )}
    </Container>
  );
}