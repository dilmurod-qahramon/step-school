import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

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
];

const AboutSection = () => {
  return (
    <Box
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#f8fafc',
      }}
    >
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

        {/* Highlighted Results Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            borderRadius: 4,
            background: 'linear-gradient(135deg, #144172 0%, #1e5a9a 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background decoration */}
          <Box
            sx={{
              position: 'absolute',
              top: '-50%',
              right: '-20%',
              width: '50%',
              height: '150%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box 
              sx={{ 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                p: 2,
                mb: 3,
              }}
            >
              <EmojiEventsIcon sx={{ fontSize: 48 }} />
            </Box>
            
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
              }}
            >
              Haqiqiy natijalar
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: 600,
                mx: 'auto',
                mb: 4,
                lineHeight: 1.8,
                fontSize: '1.1rem',
              }}
            >
              O'quvchilarimiz IELTS imtihonida yuqori ballar to'plab, xorijiy universitetlarga qabul qilinmoqda
            </Typography>

            <Grid container spacing={4} justifyContent="center">
              {[
                { value: '500+', label: "O'quvchilar soni", icon: '👨‍🎓' },
                { value: '7.0+', label: 'O\'rtacha IELTS ball', icon: '🎯' },
                { value: '95%', label: "Muvaffaqiyat darajasi", icon: '🏆' },
                { value: '50+', label: "Xorijga o'qishga", icon: '🌍' },
              ].map((stat, index) => (
                <Grid size={{ xs: 6, md: 3 }} key={index}>
                  <Box
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 3,
                      p: 3,
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.15)',
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: '2rem', mb: 1 }}>{stat.icon}</Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        mb: 0.5,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: 500,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutSection;
