"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Box, Grid, Button, Container, Tooltip} from '@mui/material';
import { IconShieldCheck, IconAward, IconRocket } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

// Framer Motion Effects
const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const scaleEffect = {
  whileHover: { scale: 1.1, transition: { duration: 0.3 } },
};

const AboutPage = () => {
  const t = useTranslations('about');

  return (
    <motion.div initial="initial" animate="animate">
      {/* Main Background Box */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #F4F4F4FF, #FFFAFAFF)',
          minHeight: '100vh',
          padding: '5rem 0',
          color: '#272536FF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Container>
          {/* Welcome Section */}
          <motion.div variants={fadeInUp}>
            <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: '2rem' }}>
              {t('welcome')}
            </Typography>
          </motion.div>

          {/* Description Section */}
          <motion.div variants={fadeInUp}>
            <Typography variant="h6" sx={{ marginBottom: '5rem', maxWidth: '800px', margin: '0 auto' }}>
              {t('description')}
            </Typography>
          </motion.div>

          <motion.div variants={stagger}>
            <Grid container spacing={4}>
              {/* Card Design 1 */}
              <Grid item xs={12} md={4}>
                <motion.div variants={fadeInLeft} {...scaleEffect}>
                  <Tooltip title={t('vision.title')} arrow>
                    <Box
                      sx={{
                        background: '#ffe100',
                        color: '#000',
                        padding: '2rem',
                        borderRadius: '10px',
                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease',
                        textAlign: 'center',
                      }}
                    >
                      <IconRocket size={48} strokeWidth={2} />
                      <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: '1rem' }}>
                        {t('vision.title')}
                      </Typography>
                      <Typography variant="body1" sx={{ marginTop: '1rem' }}>
                        {t('vision.content')}
                      </Typography>
                    </Box>
                  </Tooltip>
                </motion.div>
              </Grid>

              {/* Card Design 2 */}
              <Grid item xs={12} md={4}>
                <motion.div variants={fadeInRight} {...scaleEffect}>
                  <Tooltip title={t('mission.title')} arrow>
                    <Box
                      sx={{
                        background: '#ff5733',
                        color: '#fff',
                        padding: '2rem',
                        borderRadius: '10px',
                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease',
                        textAlign: 'center',
                      }}
                    >
                      <IconShieldCheck size={48} strokeWidth={2} />
                      <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: '1rem' }}>
                        {t('mission.title')}
                      </Typography>
                      <Typography variant="body1" sx={{ marginTop: '1rem' }}>
                        {t('mission.content')}
                      </Typography>
                    </Box>
                  </Tooltip>
                </motion.div>
              </Grid>

              {/* Card Design 3 */}
              <Grid item xs={12} md={4}>
                <motion.div variants={fadeInLeft} {...scaleEffect}>
                  <Tooltip title={t('values.title')} arrow>
                    <Box
                      sx={{
                        background: '#28a745',
                        color: '#fff',
                        padding: '2rem',
                        borderRadius: '10px',
                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease',
                        textAlign: 'center',
                      }}
                    >
                      <IconAward size={48} strokeWidth={2} />
                      <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: '1rem' }}>
                        {t('values.title')}
                      </Typography>
                      <Typography variant="body1" sx={{ marginTop: '1rem' }}>
                        {t('values.content')}
                      </Typography>
                    </Box>
                  </Tooltip>
                </motion.div>
              </Grid>

              <Grid item xs={12}>
                <motion.div variants={fadeInUp}>
                  <Button variant="contained" color="primary" sx={{ marginTop: '2rem' }}>
                    {t('poweringProgress.joinUs')}
                  </Button>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </motion.div>
  );
};

export default AboutPage;
