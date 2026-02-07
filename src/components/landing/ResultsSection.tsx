import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import StarIcon from '@mui/icons-material/Star';

const stats = [
  {
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    value: '7.0+',
    label: 'IELTS o\'rtacha natija',
    description: 'O\'quvchilarimizning ko\'pchiligi',
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 40 }} />,
    value: '900+',
    label: 'O\'quvchilar',
    description: 'Bizga ishonch bildirdi',
  },
  {
    icon: <WorkspacePremiumIcon sx={{ fontSize: 40 }} />,
    value: '10+',
    label: 'Tajribali ustozlar',
    description: 'IELTS sertifikatli',
  },
  {
    icon: <StarIcon sx={{ fontSize: 40 }} />,
    value: '95%',
    label: 'Muvaffaqiyat',
    description: 'Maqsadga erishgan o\'quvchilar',
  },
];

const ResultsSection = () => {
  return (
    <Box
      id="results"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #144172 0%, #0d2d4f 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: 'white',
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
            }}
          >
            Bizning natijalarimiz
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: 500,
              mx: 'auto',
              fontSize: '1.1rem',
            }}
          >
            Raqamlar o'z uchun gapiradi
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 6, md: 3 }} key={index} sx={{ display: 'flex' }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  textAlign: 'center',
                  borderRadius: 3,
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                  },
                }}
              >
                <Box sx={{ color: 'white', mb: 2, opacity: 0.9 }}>{stat.icon}</Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: 'white',
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    mb: 0.5,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: 'white',
                    mb: 0.5,
                  }}
                >
                  {stat.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                  }}
                >
                  {stat.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ResultsSection;
