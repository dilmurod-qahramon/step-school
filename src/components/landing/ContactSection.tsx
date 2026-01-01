import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Alert, Snackbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', phone: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Ismingizni kiriting';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Ism kamida 2 ta harfdan iborat bo\'lishi kerak';
      isValid = false;
    }

    const phoneRegex = /^\+?[0-9]{9,13}$/;
    const cleanPhone = formData.phone.replace(/\s/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Telefon raqamingizni kiriting';
      isValid = false;
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = 'To\'g\'ri telefon raqam kiriting';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSuccess(true);
      setFormData({ name: '', phone: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#f8fafc',
      }}
    >
      <Container maxWidth="sm">
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
            Bepul maslahat oling
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#64748b',
              fontSize: '1.1rem',
            }}
          >
            Ma'lumotlaringizni qoldiring, biz siz bilan bog'lanamiz
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 40px rgba(20, 65, 114, 0.08)',
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Ismingiz"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&.Mui-focused fieldset': {
                    borderColor: '#144172',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#144172',
                },
              }}
            />
            <TextField
              fullWidth
              label="Telefon raqam"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              placeholder="+998 90 123 45 67"
              sx={{
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&.Mui-focused fieldset': {
                    borderColor: '#144172',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#144172',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              endIcon={<SendIcon />}
              sx={{
                bgcolor: '#144172',
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: '#0d2d4f',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Yuborish
            </Button>
          </form>
        </Paper>
      </Container>

      <Snackbar
        open={showSuccess}
        autoHideDuration={5000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Murojaatingiz qabul qilindi! Tez orada siz bilan bog'lanamiz.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactSection;
