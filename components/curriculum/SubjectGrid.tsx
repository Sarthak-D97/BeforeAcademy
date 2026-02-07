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
  useTheme 
} from '@mui/material';
import { Curriculum_Subjects } from '../../types/curriculum';
interface Props {
  subjects: Curriculum_Subjects[];
  onSelect: (s: Curriculum_Subjects) => void;
}
export default function SubjectGrid({ subjects, onSelect }: Props) {
  const theme = useTheme();
  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography 
        variant="h3" 
        fontWeight="900" 
        gutterBottom 
        sx={{ 
          background: 'linear-gradient(45deg, #328af1 30%, #ec4899 90%)', 
          backgroundClip: 'text', 
          textFillColor: 'transparent', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent' 
        }}
      >
        Curriculum Library
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
        Select a domain to start your journey.
      </Typography>

      <Grid container spacing={4}>
        {subjects.map((subject) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={subject._id}>
            <Card 
              elevation={0}
              sx={{ 
                height: '100%',
                borderRadius: 4, 
                border: '1px solid', 
                borderColor: 'divider',
                bgcolor: 'background.paper', 
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-4px)', 
                  borderColor: 'primary.main', 
                  boxShadow: theme.shadows[10] 
                }
              }}
            >
              <CardActionArea 
                onClick={() => onSelect(subject)}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={subject.coverImgUrl || `https://placehold.co/600x400/png?text=${subject.title.substring(0,3)}`}
                  alt={subject.title}
                  sx={{ 
                    objectFit: 'cover',
                    filter: theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none' 
                  }} 
                />
                <CardContent sx={{ p: 3, width: '100%' }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom noWrap color="text.primary">
                    {subject.title}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip label={`${subject.topics.length} Modules`} size="small" />
                    {subject.score && (
                      <Chip label={`⭐ ${subject.score}`} size="small" color="primary" variant="outlined" />
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