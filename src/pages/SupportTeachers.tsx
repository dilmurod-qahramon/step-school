import { Box, Container, Typography, Card, CardContent, CardActionArea, AppBar, Toolbar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const supportTeachers = [
  { id: 1, name: "Javlon" },
  { id: 2, name: "Muhammaddiyor" },
  { id: 3, name: "Durdona" },
  { id: 4, name: "Muxlisa" },
  { id: 5, name: "Malika" },
  { id: 6, name: "Feruza" },
  { id: 7, name: "Shag'zoda" },
  { id: 8, name: "Shahnoza" },
];

const SupportTeachers = () => {
  const navigate = useNavigate();

  const handleTeacherSelect = (teacher: { id: number; name: string }) => {
    navigate(`/book-meeting/${encodeURIComponent(teacher.name)}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          bgcolor: '#144172',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <IconButton 
              onClick={() => navigate('/')} 
              sx={{ color: 'white', mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'white', 
                fontWeight: 700,
              }}
            >
              Support O'qituvchilar
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="md" sx={{ pt: 12, pb: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#144172',
              mb: 2,
            }}
          >
            Support o'qituvchini tanlang
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#64748b',
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            Uchrashuv belgilash uchun o'qituvchini tanlang
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {supportTeachers.map((teacher) => (
            <Card
              key={teacher.id}
              elevation={0}
              sx={{
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 15px 30px rgba(20, 65, 114, 0.15)',
                  borderColor: '#144172',
                },
              }}
            >
              <CardActionArea onClick={() => handleTeacherSelect(teacher)}>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: '#144172',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: '#1e293b',
                    }}
                  >
                    {teacher.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#64748b',
                      mt: 0.5,
                    }}
                  >
                    Support o'qituvchi
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default SupportTeachers;
