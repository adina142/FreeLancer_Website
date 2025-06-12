import React, { useEffect } from 'react';
import { usePageTitle } from '../../context/PageTitleContext';
import { Box, Typography, Avatar, useMediaQuery, useTheme, Button, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const { setPageTitle } = usePageTitle();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  useEffect(() => {
    setPageTitle('Home - Freelancers & Collaborators Network');
  }, [setPageTitle]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const stats = [
    { value: '10K+', label: 'Active Members' },
    { value: '5K+', label: 'Projects Completed' },
    { value: '200+', label: 'Skills Available' },
    { value: '98%', label: 'Satisfaction Rate' }
  ];

  return (
    <Box
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 120px)',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
        padding: isMobile ? 2 : 4,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(25,118,210,0.1) 0%, transparent 70%)',
          zIndex: 0
        }
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Main Hero Section */}
        <Grid container spacing={6} alignItems="center" sx={{ py: isMobile ? 2 : 6 }}>
          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              variants={itemVariants}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              <Typography
                variant={isMobile ? 'h3' : 'h2'}
                fontWeight={800}
                sx={{
                  background: 'linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.2,
                  letterSpacing: '-1px',
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Build Your Dream Team in Minutes
              </Typography>
              
              <Typography
                variant={isMobile ? 'h5' : 'h4'}
                fontWeight={600}
                sx={{
                  color: theme.palette.text.primary,
                  lineHeight: 1.3,
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                The Ultimate Platform for <span style={{ color: theme.palette.primary.main }}>Freelancers</span> and <span style={{ color: theme.palette.secondary.main }}>Collaborators</span>
              </Typography>

              <Typography
                variant={isMobile ? 'body1' : 'h6'}
                sx={{
                  color: theme.palette.text.secondary,
                  lineHeight: 1.7,
                  maxWidth: '600px',
                  mx: isMobile ? 'auto' : 'inherit',
                }}
              >
                Join thousands of professionals finding meaningful work and building incredible projects together. 
                Whether you're hiring or looking for work, we've got you covered.
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  mt: 2,
                  justifyContent: isMobile ? 'center' : 'flex-start',
                }}
              >
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: '50px',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Get Started
                </Button>
                <Button
                  component={Link}
                  to="/projects"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: '50px',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    borderWidth: '2px',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      borderWidth: '2px',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Browse Projects
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              variants={itemVariants}
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: '600px',
                  position: 'relative',
                  '&:hover': {
                    '& .main-image': {
                      transform: 'translateY(-5px)',
                    },
                    '& .floating-element-1': {
                      transform: 'translate(15px, -15px) rotate(5deg)',
                    },
                    '& .floating-element-2': {
                      transform: 'translate(-15px, 15px) rotate(-5deg)',
                    }
                  }
                }}
              >
                <Avatar
                  alt="Freelancer Collaboration"
                  src="/assets/freelance-network.png"
                  className="main-image"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '1/1',
                    borderRadius: '20px',
                    objectFit: 'cover',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    border: '8px solid white',
                    transition: 'all 0.4s ease-in-out',
                    zIndex: 2,
                    position: 'relative',
                  }}
                />
                
                {/* Floating elements for depth */}
                <Box
                  className="floating-element-1"
                  sx={{
                    position: 'absolute',
                    top: '-20px',
                    left: '-20px',
                    width: '100%',
                    height: '100%',
                    borderRadius: '20px',
                    backgroundColor: theme.palette.primary.light,
                    opacity: 0.3,
                    zIndex: 1,
                    transition: 'all 0.4s ease-in-out',
                  }}
                />
                <Box
                  className="floating-element-2"
                  sx={{
                    position: 'absolute',
                    bottom: '-20px',
                    right: '-20px',
                    width: '100%',
                    height: '100%',
                    borderRadius: '20px',
                    backgroundColor: theme.palette.secondary.light,
                    opacity: 0.3,
                    zIndex: 1,
                    transition: 'all 0.4s ease-in-out',
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Stats Section */}
        <Box
          component={motion.div}
          variants={containerVariants}
          sx={{
            mt: 8,
            mb: 6,
            px: isMobile ? 2 : 0,
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Paper
                  component={motion.div}
                  variants={itemVariants}
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                >
                  <Typography variant="h4" fontWeight={700} color="primary">
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

      {/* Value Proposition Section */}
<Box
  component={motion.div}
  variants={containerVariants}
  sx={{
    mt: 10,
    mb: 6,
    textAlign: 'center',
    px: isMobile ? 2 : 0,
  }}
>
  <Typography
    component={motion.div}
    variants={itemVariants}
    variant="h3"
    fontWeight={700}
    sx={{
      mb: 4,
      background: 'linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontFamily: '"Poppins", sans-serif',
    }}
  >
    Why Choose Our Platform?
  </Typography>

  <Grid 
    container 
    spacing={4} 
    justifyContent="center"
    sx={{
      px: isMobile ? 2 : 4,
    }}
  >
    {[
      {
        icon: '🚀',
        title: 'Fast Matching',
        description: 'Our AI-powered system connects you with the perfect collaborators in seconds'
      },
      {
        icon: '💼',
        title: 'Diverse Projects',
        description: 'From small gigs to large-scale collaborations, find work that fits your skills'
      },
      {
        icon: '🔒',
        title: 'Secure Payments',
        description: 'Escrow protection ensures you get paid for your work, every time'
      },
      {
        icon: '🌐',
        title: 'Global Network',
        description: 'Connect with professionals from around the world, across all time zones'
      }
    ].map((feature, index) => (
      <Grid 
        item 
        xs={12} 
        sm={6} 
        md={3} 
        key={index}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Paper
          component={motion.div}
          variants={itemVariants}
          whileHover={{ y: -5 }}
          sx={{
            p: 3,
            width: '100%',
            minHeight: '280px',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '16px',
            background: 'white',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease',
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="h2">
              {feature.icon}
            </Typography>
          </Box>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
            {feature.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {feature.description}
          </Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
</Box>
  
      </Box>
    </Box>
  );
};

export default Home;