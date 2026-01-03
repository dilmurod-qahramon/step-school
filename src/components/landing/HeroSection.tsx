import { Box, Container, Typography, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import logo from '@/assets/step_school_logo-white.png';

const navLinks = [
  { label: "Biz haqimizda", target: "about" },
  { label: "Kurslar", target: "courses" },
  { label: "Natijalar", target: "results" },
  { label: "O'qituvchilar", target: "instructors" },
  { label: "Aloqa", target: "contact" },
];

const HeroSection = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      id="hero"
      sx={{
        background: 'linear-gradient(135deg, #144172 0%, #0d2d4f 50%, #144172 100%)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '50%',
          height: '70%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-30%',
          left: '-15%',
          width: '60%',
          height: '80%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Navigation */}
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          bgcolor: 'rgba(20, 65, 114, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                component="img"
                src={logo}
                alt="Step School"
                sx={{ height: 36 }}
              />
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 700,
                  display: { xs: 'none', sm: 'block' },
                  letterSpacing: 0.5,
                }}
              >
                Step School
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.target}
                  onClick={() => scrollToSection(link.target)}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 2,
                    '&:hover': {
                      color: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              sx={{ display: { md: 'none' }, color: 'white' }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: { 
            bgcolor: '#144172',
            width: 250,
          }
        }}
      >
        <List sx={{ pt: 4 }}>
          {navLinks.map((link) => (
            <ListItem key={link.target} disablePadding>
              <ListItemButton onClick={() => scrollToSection(link.target)}>
                <ListItemText 
                  primary={link.label} 
                  sx={{ 
                    color: 'white',
                    '& .MuiTypography-root': { fontWeight: 500 }
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Hero Content */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          pt: { xs: 16, md: 0 },
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 6,
            py: { xs: 8, md: 0 },
            width: '100%',
          }}
        >
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, position: 'relative', zIndex: 1 }}>
            <Box
              sx={{
                display: 'inline-block',
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                px: 2,
                py: 0.5,
                borderRadius: 5,
                mb: 3,
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 500,
                  letterSpacing: 1,
                }}
              >
                🎓 #1 Ingliz tili markazi
              </Typography>
            </Box>
            
            <Typography
              variant="h1"
              sx={{
                color: 'white',
                fontWeight: 800,
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                mb: 2,
                lineHeight: 1.1,
              }}
            >
              Step School
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 400,
                mb: 4,
                maxWidth: 550,
                mx: { xs: 'auto', md: 0 },
                lineHeight: 1.7,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
              }}
            >
              Ingliz tilini ishonch bilan o'rganing va IELTS'da yuqori natijalarga erishing
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Button
                variant="contained"
                size="large"
                onClick={scrollToContact}
                sx={{
                  bgcolor: 'white',
                  color: '#144172',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.25)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Bepul maslahat olish
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => scrollToSection('courses')}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Kurslarni ko'rish
              </Button>
            </Box>

            {/* Stats */}
            <Box 
              sx={{ 
                display: 'flex', 
                gap: { xs: 3, md: 5 }, 
                mt: 6,
                justifyContent: { xs: 'center', md: 'flex-start' },
                flexWrap: 'wrap',
              }}
            >
              {[
                { value: '500+', label: "O'quvchilar" },
                { value: '7.5+', label: "IELTS natija" },
                { value: '5+', label: "Yillik tajriba" },
              ].map((stat, index) => (
                <Box key={index} sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: 'white', 
                      fontWeight: 700,
                      fontSize: { xs: '1.75rem', md: '2rem' },
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: { xs: 280, md: 400 },
                height: { xs: 280, md: 400 },
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
                filter: 'blur(40px)',
              }}
            />
            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                bgcolor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 6,
                p: { xs: 4, md: 6 },
                border: '2px solid rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Step School Logo"
                sx={{
                  maxWidth: { xs: 180, md: 280 },
                  width: '100%',
                  height: 'auto',
                  filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2))',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
