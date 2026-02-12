'use client';
import { 
  Container, 
  Card, 
  CardActionArea, 
  CardMedia, 
  CardContent, 
  Typography, 
  Chip, 
  Stack, 
  Grid,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import { Curriculum_Subjects } from '../../types/curriculum';
interface Props {
  subjects: Curriculum_Subjects[];
  onSelect: (s: Curriculum_Subjects) => void;
}
export default function SubjectGrid({ subjects, onSelect }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography 
        variant="h3" 
        fontWeight="900" 
        gutterBottom 
        sx={{ 
          background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)', 
          backgroundClip: 'text', 
          textFillColor: 'transparent', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          letterSpacing: '-0.02em',
          mb: 1
        }}
      >
        Curriculum Library
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: { xs: 4, md: 6 }, fontSize: { xs: '1rem', md: '1.25rem' }, fontWeight: 500 }}>
        High-quality resources to help you master tech skills.
      </Typography>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        {subjects.map((subject) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={subject._id}>
            <Card 
              elevation={0}
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardActionArea 
                onClick={() => onSelect(subject)}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <CardMedia
                  component="img"
                  height={isMobile ? "160" : "220"}
                  image={subject.coverImgUrl || `https://placehold.co/600x400/png?text=${subject.title.substring(0,3)}`}
                  alt={subject.title}
                  sx={{ 
                    height: { xs: 160, md: 220 },
                    objectFit: 'cover',
                    filter: theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none' 
                  }} 
                />
                <CardContent sx={{ p: { xs: 2, md: 3 }, width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h5" fontWeight="800" gutterBottom noWrap color="text.primary" sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' }, letterSpacing: '-0.01em' }}>
                    {subject.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '3em' }}>
                    {subject.description || `Master ${subject.title} with our structured learning path and real-world projects.`}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
                    <Chip label={`${subject.topics.length} Modules`} size="small" sx={{ fontWeight: 600, bgcolor: 'action.hover' }} />
                    {subject.score && (
                      <Chip label={`⭐ ${subject.score}`} size="small" color="primary" variant="outlined" sx={{ fontWeight: 700 }} />
                    )}
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}