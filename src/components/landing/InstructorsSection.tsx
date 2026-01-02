import { Box, Container, Typography, Card, CardContent, Avatar, Chip } from '@mui/material';

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

        <Box
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            pb: 2,
            px: { xs: 2, md: 0 },
            mx: { xs: -2, md: 0 },
            scrollSnapType: 'x mandatory',
            '&::-webkit-scrollbar': {
              height: 8,
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: '#e2e8f0',
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: '#144172',
              borderRadius: 4,
              '&:hover': {
                bgcolor: '#0d2d4f',
              },
            },
          }}
        >
          {instructors.map((instructor, index) => (
            <Card
              key={index}
              elevation={0}
              sx={{
                minWidth: { xs: 260, sm: 280 },
                maxWidth: { xs: 260, sm: 280 },
                flexShrink: 0,
                scrollSnapAlign: 'start',
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
                      width: 100,
                      height: 100,
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
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      boxShadow: '0 4px 12px rgba(20, 65, 114, 0.3)',
                      whiteSpace: 'nowrap',
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
                    fontSize: '1rem',
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
                    fontSize: '0.85rem',
                  }}
                >
                  {instructor.role}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#64748b',
                    mb: 2,
                    fontSize: '0.8rem',
                  }}
                >
                  {instructor.experience}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0.5 }}>
                  {instructor.skills.map((skill, idx) => (
                    <Chip
                      key={idx}
                      label={skill}
                      size="small"
                      sx={{
                        bgcolor: '#e0f2fe',
                        color: '#0369a1',
                        fontSize: '0.7rem',
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default InstructorsSection;
