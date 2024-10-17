

"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Box, Grid, Button, Container, Tooltip, Card, CardContent, Avatar } from '@mui/material';
import {  IconShieldCheck, IconAward, IconRocket,  IconTrendingUp, IconSun, IconMoon, IconBolt, IconBarbell } from '@tabler/icons-react';

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
              Welcome to Wamda Electronics - Explore the Future!
            </Typography>
          </motion.div>

          {/* Description Section */}
          <motion.div variants={fadeInUp}>
            <Typography variant="h6" sx={{ marginBottom: '5rem', maxWidth: '800px', margin: '0 auto' }}>
              At Wamda, we’re not just about electronics, we’re about creating a connected, innovative future. From smart devices to futuristic tech solutions, we're here to offer you more than just products, but a vision of the future!
            </Typography>
          </motion.div>

          <motion.div variants={stagger}>
            <Grid container spacing={4}>
              {/* Card Design 1 */}
              <Grid item xs={12} md={4}>
                <motion.div variants={fadeInLeft} {...scaleEffect}>
                  <Tooltip title="Our Vision for the Future" arrow>
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
                        Vision
                      </Typography>
                      <Typography variant="body1" sx={{ marginTop: '1rem' }}>
                        We see a world connected through smart solutions, where every device is designed to enhance daily life.
                      </Typography>
                    </Box>
                  </Tooltip>
                </motion.div>
              </Grid>

              {/* Card Design 2 */}
              <Grid item xs={12} md={4}>
                <motion.div variants={fadeInRight} {...scaleEffect}>
                  <Tooltip title="Our Mission to Serve You" arrow>
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
                        Mission
                      </Typography>
                      <Typography variant="body1" sx={{ marginTop: '1rem' }}>
                        To deliver cutting-edge technology with integrity, reliability, and outstanding customer service.
                      </Typography>
                    </Box>
                  </Tooltip>
                </motion.div>
              </Grid>

              {/* Card Design 3 */}
              <Grid item xs={12} md={4}>
                <motion.div variants={fadeInLeft} {...scaleEffect}>
                  <Tooltip title="Our Values That Drive Us" arrow>
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
                        Values
                      </Typography>
                      <Typography variant="body1" sx={{ marginTop: '1rem' }}>
                        Excellence, innovation, and transparency are at the heart of everything we do.
                      </Typography>
                    </Box>
                  </Tooltip>
                </motion.div>
              </Grid>

              {/* Card Design 4 */}
              <Grid item xs={12} md={6}>
                <motion.div variants={fadeInRight} {...scaleEffect}>
                  <Tooltip title="Our Innovations" arrow>
                    <Card
                      sx={{
                        background: '#007bff',
                        color: '#fff',
                        padding: '2rem',
                        borderRadius: '10px',
                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease',
                        textAlign: 'center',
                      }}
                    >
                      <CardContent>
                        <IconBarbell size={48} strokeWidth={2} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: '1rem' }}>
                          Innovations
                        </Typography>
                        <Typography variant="body1" sx={{ marginTop: '1rem' }}>
                          Pioneering cutting-edge solutions that shape the future of technology and redefine convenience.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Tooltip>
                </motion.div>
              </Grid>

              {/* Card Design 5 */}
              <Grid item xs={12} md={6}>
                <motion.div variants={fadeInLeft} {...scaleEffect}>
                  <Tooltip title="Our Growth and Achievements" arrow>
                    <Card
                      sx={{
                        background: '#6f42c1',
                        color: '#fff',
                        padding: '2rem',
                        borderRadius: '10px',
                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease',
                        textAlign: 'center',
                      }}
                    >
                      <CardContent>
                        <IconTrendingUp size={48} strokeWidth={2} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: '1rem' }}>
                          Achievements
                        </Typography>
                        <Typography variant="body1" sx={{ marginTop: '1rem' }}>
                          Recognized as industry leaders in innovation, continuously pushing the boundaries of technology.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Tooltip>
                </motion.div>
              </Grid>

              {/* Extra Sections for More Creativity */}
              <Grid item xs={12} md={6}>
                <motion.div variants={fadeInUp} {...scaleEffect}>
                  <Box
                    sx={{
                      background: '#343a40',
                      color: '#fff',
                      padding: '2rem',
                      borderRadius: '10px',
                      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                      textAlign: 'center',
                    }}
                  >
                    <Avatar sx={{ margin: '0 auto', backgroundColor: '#e91e63' }}>
                      <IconSun size={48} />
                    </Avatar>
<Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: '1rem' }}>
                      Bright Future
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: '1rem' }}>
                      Lighting the path to a brighter, more connected world with innovative solutions.
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={6}>
                <motion.div variants={fadeInUp} {...scaleEffect}>
                  <Box
                    sx={{
                      background: '#343a40',
                      color: '#fff',
                      padding: '2rem',
                      borderRadius: '10px',
                      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                      textAlign: 'center',
                    }}
                  >
                    <Avatar sx={{ margin: '0 auto', backgroundColor: '#ff9800' }}>
                      <IconMoon size={48} />
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: '1rem' }}>
                      Bold Steps
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: '1rem' }}>
                      Taking bold strides towards technological excellence.
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>

              {/* Final Card Design */}
              <Grid item xs={12} md={12}>
                <motion.div variants={fadeInUp} {...scaleEffect}>
                  <Box
                    sx={{
                      background: '#ff5722',
                      color: '#fff',
                      padding: '3rem',
                      borderRadius: '10px',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                      textAlign: 'center',
                    }}
                  >
                    <Avatar sx={{ margin: '0 auto', backgroundColor: '#4caf50' }}>
                      <IconBolt size={48} />
                    </Avatar>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: '1rem' }}>
                      Powering Progress
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: '1.5rem' }}>
                      At Wamda Electronics, we believe in empowering progress through innovative solutions that meet the demands of the digital age.
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ marginTop: '2rem', backgroundColor: '#00796b', color: '#fff' }}
                    >
                      Join Us Today
                    </Button>
                  </Box>
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