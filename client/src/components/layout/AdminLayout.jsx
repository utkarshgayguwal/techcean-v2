import { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useAuth } from '../../context/AuthContext';

const DRAWER_WIDTH = 260;

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    document.body.classList.add('admin-panel');
    return () => {
      document.body.classList.remove('admin-panel');
    };
  }, []);

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />
      
      <Navbar onMenuClick={handleDrawerToggle} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: 10,
          width: { xs: '100%', md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { xs: 0, md: `${DRAWER_WIDTH}px` },
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Box
          sx={{
            maxWidth: 1400,
            mx: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;