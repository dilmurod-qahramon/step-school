import { Box, Container, Typography, Link, Stack } from '@mui/material';
import logo from '../../assets/step_school_logo.png';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0d2d4f',
        color: 'white',
        py: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: 'space-between',
            gap: 4,
            mb: 4,
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Box
              component="img"
              src={logo}
              alt="Step School"
              sx={{
                height: 180,
                mb: 2,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: 300,
                lineHeight: 1.7,
              }}
            >
              Ingliz tilini o'rganish — kelajakka investitsiya. 
              Step School bilan maqsadlaringizga erishing!
            </Typography>
          </Box>

          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
              }}
            >
              Bog'lanish
            </Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <PhoneIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                <Link
                  href="tel:+998991414948"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    '&:hover': { color: 'white' },
                  }}
                >
                  +998 99-141-49-48
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <PhoneIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                <Link
                  href="tel:+998901314948"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    '&:hover': { color: 'white' },
                  }}
                >
                  +998 90-131-49-48
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <EmailIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                <Link
                  href="mailto:info@stepschool.uz"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    '&:hover': { color: 'white' },
                  }}
                >
                  info@stepschool.uz
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <LocationOnIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Nurafshon shahri
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
              }}
            >
              Sahifalar
            </Typography>
            <Stack spacing={1}>
              {['Bosh sahifa', 'Biz haqimizda', 'Kurslar', 'Natijalar', 'Aloqa'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, '')}`}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    '&:hover': { color: 'white' },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            pt: 4,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            © {new Date().getFullYear()} Step School. Barcha huquqlar himoyalangan.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
