import { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Modal, IconButton, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import durdona_8 from '../../assets/durdona_8.png';
import bexruzjon_8 from '../../assets/bexruzjon_8.png';
import xusnora_8 from '../../assets/xusnora_8.png';
// import ibrohim_8 from '../../assets/ibrohim_8.png';
// import ZARNIGOR_7_5 from '../../assets/zarnigor_7-5.png';
// import samandar_7_5 from '../../assets/samandar_7-5.png';
// import otabek_7_5 from '../../assets/otabek_7-5.png';
// import azizbek_7 from '../../assets/azizbek_7.png';
// import asliddin_7 from '../../assets/asliddin_7.png';
// import sarvinoz_7 from '../../assets/sarvinoz_7.png';
// import bekzod_7 from '../../assets/bekzod_7.png';
// import damira_7 from '../../assets/damira_7.png';
import muxlisa_7_5 from '../../assets/muxlisa_7-5.png';
import malika_7_5 from '../../assets/malika_7-5.png';
import sherzod_7 from '../../assets/sherzod_7.png';
import asadbek_7 from '../../assets/asadbek_7.png';
import yulduz_7 from '../../assets/yulduz_7.png';
import guaxar_7 from '../../assets/guaxar_7.png';

// PDF fayllardan olingan barcha 16 nafar o'quvchining haqiqiy natijalari
const certificateData = [
  { name: 'Durdona Baxodirova', overall: '8.0', date: '12/JAN/2026', img: durdona_8 }, 
  { name: 'Bexruzjon Raimjonov', overall: '8.0', date: '26/AUG/2023', img: bexruzjon_8 }, 
  { name: 'Xusnora Sharipova', overall: '8.0', date: '15/APR/2023', img: xusnora_8 }, 
  // { name: 'Ibrohim To\'lanberdijonov', overall: '8.0', date: '14/DEC/2024', img: ibrohim_8 }, 
  { name: 'Muxlisa Abdumannopova', overall: '7.5', date: '09/JAN/2026', img: muxlisa_7_5 }, 
  // { name: 'Samandar Jamoliddinov', overall: '7.5', date: '14/DEC/2024', img: samandar_7_5 }, 
  // { name: 'Otabek Abduqodirov', overall: '7.5', date: '26/AUG/2023', img: otabek_7_5 }, 
  { name: 'Malika To\'rayeva', overall: '7.5', date: '09/JAN/2026', img: malika_7_5 }, 
  // { name: 'Zarnigor Mirsaidova', overall: '7.5', date: '26/AUG/2023', img: ZARNIGOR_7_5 }, 
  { name: 'Asadbek Xonimqulov', overall: '7.0', date: '09/JAN/2026', img: asadbek_7 }, 
  { name: 'Alimov Sherzod', overall: '7.0', date: '09/JAN/2026', img: sherzod_7 }, 
  // { name: 'Azizbek Shavkatov', overall: '7.0', date: '17/AUG/2024', img: azizbek_7 }, 
  // { name: 'Asliddin Muxtorov', overall: '7.0', date: '24/AUG/2024', img: asliddin_7 }, 
  // { name: 'Sarvinoz O\'rinboyeva', overall: '7.0', date: '28/DEC/2024', img: sarvinoz_7 }, 
  // { name: 'Behzod Abdurasulov', overall: '7.0', date: '26/AUG/2023', img: bekzod_7 }, 
  { name: 'Yulduzxon Xo\'jayeva', overall: '7.0', date: '09/JAN/2026', img: yulduz_7 }, 
  // { name: 'Abjalova Damira', overall: '7.0', date: '09/JAN/2026', img: damira_7 }, 
  { name: 'Abdujalilova Gauxar', overall: '7.0', date: '09/JAN/2026', img: guaxar_7 }, 
  // { name: 'Gauxar Abdujalilova', overall: '7.0', date: '09/JAN/2026', img: '/certs/gauxar_7.jpg' }, 

];

const ResultsGallery = () => {
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState('');

  const handleOpen = (img) => {
    setSelectedImg(img);
    setOpen(true);
  };

  return (
    <Box sx={{ py: 10, bgcolor: '#f8fafd' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" sx={{ fontWeight: 800, mb: 2, color: '#144172' }}>
          Rasmiy Sertifikatlar
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 6, color: '#666' }}>
          Muvaffaqiyatli o'quvchilarimizning tasdiqlangan IELTS natijalari galereyasi.
        </Typography>

        <Grid container spacing={3}>
          {certificateData.map((cert, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index} sx={{ display: 'flex' }}>
              <Paper
                elevation={2}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  borderRadius: 2,
                  transition: '0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  width: '100%',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    '& .overlay': { opacity: 1 }
                  }
                }}
                onClick={() => handleOpen(cert.img)}
              >
                {/* Skrinshot o'rni - bu yerga haqiqiy rasm yo'lini qo'ying */}
                <Box
                  component="img"
                  src={cert.img}
                  alt={cert.name}
                  sx={{ width: '100%', height: '350px', objectFit: 'cover', display: 'block', bgcolor: '#e0e0e0' }}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => { 
                    e.currentTarget.src = 'https://via.placeholder.com/300x400?text=IELTS+Certificate'; 
                  }}
                />
                
                {/* Ustki qavat (Overlay) */}
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    bgcolor: 'rgba(20, 65, 114, 0.7)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                    opacity: 0, transition: '0.3s', color: 'white', textAlign: 'center', p: 2
                  }}
                >
                  <ZoomInIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{cert.name}</Typography>
                  <Typography variant="body2">Overall: {cert.overall}</Typography>
                  <Typography variant="caption">{cert.date}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Kattalashtirib ko'rish uchun Modal */}
      <Modal open={open} onClose={() => setOpen(false)} closeAfterTransition>
        <Fade in={open}>
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            maxWidth: '90vw', maxHeight: '90vh', outline: 'none'
          }}>
            <IconButton 
              onClick={() => setOpen(false)} 
              sx={{ position: 'absolute', right: -40, top: -40, color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
            <Box 
              component="img" 
              src={selectedImg} 
              sx={{ width: '100%', height: 'auto', borderRadius: 2, boxShadow: 24 }} 
            />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ResultsGallery;