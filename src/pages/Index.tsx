import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import CoursesSection from '@/components/landing/CoursesSection';
import ResultsSection from '@/components/landing/ResultsSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#144172',
      dark: '#0d2d4f',
      light: '#1e5a9a',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

const Index = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <ResultsSection />
      <ContactSection />
      <Footer />
    </ThemeProvider>
  );
};

export default Index;
