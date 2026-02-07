import { Box, Container, Typography, TextField, Button, AppBar, Toolbar, IconButton, Card, CardContent, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';

const BookMeeting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { teacherId } = useParams();
  const teacherName = location.state?.teacherName || 'O\'qituvchi';
  
  const [formData, setFormData] = useState({
    studentName: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to a backend
    console.log('Meeting request:', { teacherId, teacherName, ...formData });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
        <AppBar 
          position="fixed" 
          elevation={0}
          sx={{ bgcolor: '#144172' }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <IconButton 
                onClick={() => navigate('/')} 
                sx={{ color: 'white', mr: 2 }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                Uchrashuv belgilash
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>

        <Container maxWidth="sm" sx={{ pt: 16, pb: 6 }}>
          <Card elevation={0} sx={{ borderRadius: 4, textAlign: 'center', p: 4 }}>
            <CheckCircleIcon sx={{ fontSize: 80, color: '#22c55e', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b', mb: 2 }}>
              So'rovingiz qabul qilindi!
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
              {teacherName} bilan uchrashuv so'rovi yuborildi. Tez orada siz bilan bog'lanamiz.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/')}
              sx={{
                bgcolor: '#144172',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { bgcolor: '#0d2d4f' },
              }}
            >
              Bosh sahifaga qaytish
            </Button>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ bgcolor: '#144172' }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <IconButton 
              onClick={() => navigate('/support-teachers')} 
              sx={{ color: 'white', mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
              Uchrashuv belgilash
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="sm" sx={{ pt: 12, pb: 6 }}>
        <Card elevation={0} sx={{ borderRadius: 4, overflow: 'visible' }}>
          <CardContent sx={{ p: 4 }}>
            {/* Teacher Info */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  bgcolor: '#144172',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <PersonIcon sx={{ fontSize: 50, color: 'white' }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
                {teacherName}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Support o'qituvchi
              </Typography>
            </Box>

            <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
              Uchrashuv belgilash uchun quyidagi ma'lumotlarni to'ldiring
            </Alert>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Ismingiz"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Telefon raqamingiz"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+998 90 123 45 67"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Qulay sana"
                name="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Qulay vaqt"
                name="preferredTime"
                type="time"
                value={formData.preferredTime}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Qo'shimcha xabar (ixtiyoriy)"
                name="message"
                value={formData.message}
                onChange={handleChange}
                multiline
                rows={3}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  bgcolor: '#144172',
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  '&:hover': { bgcolor: '#0d2d4f' },
                }}
              >
                Uchrashuv belgilash
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default BookMeeting;
