import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Chip } from '@mui/material';

const instructors = [
  {
    name: "Sardor Karimov",
    role: "IELTS Expert",
    ieltsScore: "8.5",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    skills: ["Speaking", "Writing", "IELTS Strategy"],
    experience: "5+ yil tajriba",
  },
  {
    name: "Nilufar Rashidova",
    role: "General English",
    ieltsScore: "8.0",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
    skills: ["Grammar", "Vocabulary", "Conversation"],
    experience: "4+ yil tajriba",
  },
  {
    name: "Jasur Toshmatov",
    role: "IELTS Trainer",
    ieltsScore: "8.0",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    skills: ["Reading", "Listening", "Test Practice"],
    experience: "6+ yil tajriba",
  },
  {
    name: "Malika Usmonova",
    role: "Speaking Coach",
    ieltsScore: "8.5",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    skills: ["Pronunciation", "Fluency", "Academic English"],
    experience: "3+ yil tajriba",
  },
];

const InstructorsSection = () => {
  return (
    <Box
      id="instructors"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#f8fafc',
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
            Bizning o'qituvchilar
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#64748b',
              maxWidth: 600,
              mx: 'auto',
              fontSize: '1.1rem',
            }}
          >
            IELTS sertifikatiga ega, tajribali va professional o'qituvchilar jamoasi
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {instructors.map((instructor, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  border: '1px solid #e2e8f0',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  overflow: 'visible',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 25px 50px rgba(20, 65, 114, 0.15)',
                    borderColor: '#144172',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Avatar with IELTS badge */}
                  <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                    <Avatar
                      src={instructor.image}
                      alt={instructor.name}
                      sx={{
                        width: 120,
                        height: 120,
                        mx: 'auto',
                        border: '4px solid #144172',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: -8,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bgcolor: '#144172',
                        color: 'white',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        boxShadow: '0 4px 12px rgba(20, 65, 114, 0.3)',
                      }}
                    >
                      IELTS {instructor.ieltsScore}
                    </Box>
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#1e293b',
                      mb: 0.5,
                    }}
                  >
                    {instructor.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#144172',
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {instructor.role}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#64748b',
                      mb: 2,
                    }}
                  >
                    {instructor.experience}
                  </Typography>

                  <Box>
                    {instructor.skills.map((skill, idx) => (
                      <Chip
                        key={idx}
                        label={skill}
                        size="small"
                        sx={{
                          m: 0.25,
                          bgcolor: '#e0f2fe',
                          color: '#0369a1',
                          fontSize: '0.75rem',
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default InstructorsSection;
