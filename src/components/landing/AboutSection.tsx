import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ScheduleIcon from '@mui/icons-material/Schedule';

const features = [
  {
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    title: "Professional o'qituvchilar",
    description: "IELTS sertifikatiga ega, tajribali va zamonaviy metodlarga asoslangan ustozlar jamoasi",
  },
  {
    icon: <AutoStoriesIcon sx={{ fontSize: 40 }} />,
    title: "Zamonaviy usullar",
    description: "Interaktiv darslar, amaliy mashg'ulotlar va individual yondashuv bilan ta'lim",
  },
   {
    icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
    title: " Haqiqiy natijalar",
    description: "O'quvchilarimiz IELTS imtihonida yuqori ballar to'plab, xorijiy universitetlarga qabul qilinmoqda",
  },
  {
    icon: <ScheduleIcon sx={{ fontSize: 40 }} />,
    title: "Moslashuvchan jadval",
    description: "Turli darajadagi vaqtlarga moslashuvchan guruh va individual darslar",
  },
];

const AboutSection = () => {
  return (
    <Box
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#f8fafc',
      }}>
          <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: '#144172',
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
            }}
          >
            Biz haqimizda
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#64748b',
              maxWidth: 600,
              mx: 'auto',
              fontSize: '1.1rem',
              lineHeight: 1.8,
            }}
          >
            Step School — ingliz tili va IELTS tayyorloviga ixtisoslashgan zamonaviy ta'lim markazi. 
            Bizning maqsadimiz har bir o'quvchiga sifatli ta'lim berib, kelajagiga poydevor yaratish.
          </Typography>
        </Box>

        {/* Features row */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 3,
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(20, 65, 114, 0.1)',
                    borderColor: '#144172',
                  },
                }}
              >
                <Box sx={{ color: '#144172', mb: 2 }}>{feature.icon}</Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#1e293b',
                    mb: 2,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#64748b',
                    lineHeight: 1.7,
                  }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;
