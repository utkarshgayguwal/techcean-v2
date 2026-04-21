import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Fade,
  CircularProgress,
} from '@mui/material';
import {
  Email as EmailIcon,
  MarkEmailUnread as UnreadIcon,
  Drafts as ReadIcon,
  Reply as RepliedIcon,
} from '@mui/icons-material';
import chroma from 'chroma-js';
import { useMessageStats } from '../../hooks/useMessageStats';

const StatCard = ({ title, value, icon: Icon, color, index }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setAnimatedValue(value);
        clearInterval(timer);
      } else {
        setAnimatedValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const bgGradient = chroma(color).alpha(0.12).css();
  const glowColor = chroma(color).alpha(0.3).css();

  return (
    <Fade in timeout={400 + index * 150}>
      <Card
        sx={{
          height: '100%',
          background: `linear-gradient(135deg, ${bgGradient} 0%, rgba(26, 26, 26, 0.9) 100%)`,
          border: `1px solid ${chroma(color).alpha(0.2).css()}`,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, ${color} 0%, ${chroma(color).alpha(0.3).css()} 100%)`,
          },
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 8px 32px ${glowColor}`,
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                backgroundColor: chroma(color).alpha(0.15).css(),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon sx={{ color, fontSize: 24 }} />
            </Box>
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 700,
              color,
              mb: 0.5,
            }}
          >
            {animatedValue}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontWeight: 500,
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Fade>
  );
};

const Dashboard = () => {
  const { stats, loading, error } = useMessageStats();

  const statCards = [
    { 
      title: 'Total Messages', 
      value: stats?.total || 0, 
      icon: EmailIcon, 
      color: '#00d4ff' 
    },
    { 
      title: 'New Messages', 
      value: stats?.new || 0, 
      icon: UnreadIcon, 
      color: '#00ff9d' 
    },
    { 
      title: 'Read Messages', 
      value: stats?.read || 0, 
      icon: ReadIcon, 
      color: '#8b5cf6' 
    },
    { 
      title: 'Replied Messages', 
      value: stats?.replied || 0, 
      icon: RepliedIcon, 
      color: '#f59e0b' 
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress sx={{ color: '#00d4ff' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography color="error">Failed to load stats: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Fade in timeout={300}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 700,
              mb: 1,
            }}
          >
            Welcome back!
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Here's what's happening with your messages today.
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={3}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <StatCard {...stat} index={index} />
          </Grid>
        ))}

        <Grid item xs={12}>
          <Fade in timeout={800}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <CardContent sx={{ p: 3, textAlign: 'center', py: 6 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Quick Actions
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  Navigate to Contact / Messages to view and manage all incoming messages
                </Typography>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;