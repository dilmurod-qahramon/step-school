import { Box, Container, Typography, Grid, Card, CardContent, Chip, Button } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DescriptionIcon from '@mui/icons-material/Description';

const courses = [
  {
    icon: <MenuBookIcon sx={{ fontSize: 56 }} />,
    title: "General English",
    description: "Kundalik hayot uchun ingliz tilini o'rganing. Grammar, vocabulary, speaking va listening ko'nikmalarini rivojlantiring.",
    features: ["Grammar asoslari", "So'zlashuv amaliyoti", "Tinglash mashqlari", "Yozuv ko'nikmalari"],
    level: "Barcha darajalar",
  },
  {
    icon: <DescriptionIcon sx={{ fontSize: 56 }} />,
    title: "IELTS Tayyorlov",
    description: "IELTS imtihoniga professional tayyorgarlik. To'rtta bo'lim bo'yicha chuqur bilim va strategiyalar.",
    features: ["Reading strategiyalari", "Writing Task 1 & 2", "Speaking practice", "Listening skills"],
    level: "7.0+ maqsad",
  },
];

const CoursesSection = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      id="courses"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: '#144172',
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
            }}
          >
            Bizning kurslar
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#64748b',
              maxWidth: 500,
              mx: 'auto',
              fontSize: '1.1rem',
            }}
          >
            Sizning maqsadingizga mos kursni tanlang
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {courses.map((course, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  border: '2px solid #e2e8f0',
                  transition: 'all 0.3s ease',
                  overflow: 'visible',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 25px 50px rgba(20, 65, 114, 0.15)',
                    borderColor: '#144172',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: '#144172',
                        color: 'white',
                        p: 2,
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {course.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: '#1e293b',
                        }}
                      >
                        {course.title}
                      </Typography>
                      <Chip
                        label={course.level}
                        size="small"
                        sx={{
                          bgcolor: '#e0f2fe',
                          color: '#0369a1',
                          fontWeight: 500,
                          mt: 0.5,
                        }}
                      />
                    </Box>
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      color: '#64748b',
                      mb: 3,
                      lineHeight: 1.7,
                    }}
                  >
                    {course.description}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    {course.features.map((feature, idx) => (
                      <Chip
                        key={idx}
                        label={feature}
                        size="small"
                        sx={{
                          mr: 1,
                          mb: 1,
                          bgcolor: '#f1f5f9',
                          color: '#475569',
                        }}
                      />
                    ))}
                  </Box>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={scrollToContact}
                    sx={{
                      borderColor: '#144172',
                      color: '#144172',
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 600,
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: '#144172',
                        color: 'white',
                        borderColor: '#144172',
                      },
                    }}
                  >
                    Kursga yozilish
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CoursesSection;
