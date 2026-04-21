import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DRAWER_WIDTH = 260;

const pageTitles = {
  '/admin/dashboard': 'Dashboard',
  '/admin/home/stack': 'Home / Stack',
  '/admin/home/testimonials': 'Home / Testimonials',
  '/admin/home/stats': 'Home / Stats',
  '/admin/process/steps': 'Process / Steps',
  '/admin/process/faqs': 'Process / FAQs',
  '/admin/process/tools': 'Process / Tools',
  '/admin/work/projects': 'Work / Projects',
  '/admin/work/categories': 'Work / Categories',
  '/admin/services/list': 'Services / Services List',
  '/admin/services/faqs': 'Services / FAQs',
  '/admin/contact/info': 'Contact / Info',
  '/admin/contact/messages': 'Contact / Messages',
};

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const pageTitle = pageTitles[location.pathname] || 'Admin Panel';

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { xs: '100%', md: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { xs: 0, md: `${DRAWER_WIDTH}px` },
        backgroundColor: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            {pageTitle}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            startIcon={<LogoutIcon sx={{ fontSize: 18 }} />}
            onClick={handleLogout}
            sx={{
              color: 'text.secondary',
              textTransform: 'none',
              fontSize: '0.8rem',
              '&:hover': {
                backgroundColor: 'rgba(255, 82, 82, 0.1)',
                color: '#ff5252',
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;