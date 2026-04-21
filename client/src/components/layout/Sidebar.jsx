import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  Architecture as ProcessIcon,
  Work as WorkIcon,
  Handyman as ServicesIcon,
  ContactMail as ContactIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import chroma from 'chroma-js';
import { useAuth } from '../../context/AuthContext';

const DRAWER_WIDTH = 260;

const menuItems = [
  { title: 'Dashboard', path: '/admin/dashboard', icon: DashboardIcon },
  { 
    title: 'Home', 
    icon: HomeIcon,
    children: [
      { title: 'Stack', path: '/admin/home/stack' },
      { title: 'Testimonials', path: '/admin/home/testimonials' },
      { title: 'Stats', path: '/admin/home/stats' },
    ]
  },
  { 
    title: 'Process', 
    icon: ProcessIcon,
    children: [
      { title: 'Steps', path: '/admin/process/steps' },
      { title: 'FAQs', path: '/admin/process/faqs' },
      { title: 'Tools', path: '/admin/process/tools' },
    ]
  },
  { 
    title: 'Work', 
    icon: WorkIcon,
    children: [
      { title: 'Projects', path: '/admin/work/projects' },
      { title: 'Categories', path: '/admin/work/categories' },
    ]
  },
  { 
    title: 'Services', 
    icon: ServicesIcon,
    children: [
      { title: 'Services List', path: '/admin/services/list' },
      { title: 'FAQs', path: '/admin/services/faqs' },
    ]
  },
  { 
    title: 'Contact', 
    icon: ContactIcon,
    children: [
      { title: 'Info', path: '/admin/contact/info' },
      { title: 'Messages', path: '/admin/contact/messages' },
    ]
  },
];

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [expandedItems, setExpandedItems] = useState(['Home', 'Process', 'Work', 'Services', 'Contact']);

  const handleItemClick = (item) => {
    if (item.children) {
      setExpandedItems(prev => 
        prev.includes(item.title) 
          ? prev.filter(i => i !== item.title)
          : [...prev, item.title]
      );
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const isActive = (path) => location.pathname === path;
  const isParentActive = (item) => item.children?.some(child => location.pathname === child.path);

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #141414 0%, #0a0a0a 100%)',
          borderRight: '1px solid rgba(255, 255, 255, 0.06)',
        },
      }}
    >
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #00d4ff 0%, #00ff9d 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#000' }}>T</Typography>
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 700,
              fontSize: '1.1rem',
              lineHeight: 1.2,
            }}
          >
            TechCean
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
            Admin Panel
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.06)', mx: 2 }} />

      <Box sx={{ p: 2 }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontSize: '0.65rem', letterSpacing: '0.1em' }}
        >
          Menu
        </Typography>
      </Box>

      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <Box key={item.title}>
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleItemClick(item)}
                sx={{
                  borderRadius: '8px',
                  py: 1.25,
                  px: 1.5,
                  '&:hover': {
                    backgroundColor: chroma('#00d4ff').alpha(0.08).css(),
                  },
                  backgroundColor: isParentActive(item) 
                    ? chroma('#00d4ff').alpha(0.12).css()
                    : 'transparent',
                  ...(isParentActive(item) && {
                    borderLeft: `3px solid #00d4ff`,
                  }),
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <item.icon 
                    sx={{ 
                      fontSize: 20, 
                      color: isParentActive(item) ? '#00d4ff' : 'text.secondary' 
                    }} 
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isParentActive(item) ? 600 : 500,
                    color: isParentActive(item) ? '#00d4ff' : 'text.primary',
                  }}
                />
                {item.children && (
                  expandedItems.includes(item.title) 
                    ? <ExpandLess sx={{ color: 'text.secondary', fontSize: 18 }} />
                    : <ExpandMore sx={{ color: 'text.secondary', fontSize: 18 }} />
                )}
              </ListItemButton>
            </ListItem>

            {item.children && (
              <Collapse in={expandedItems.includes(item.title)} timeout="auto">
                <List disablePadding sx={{ pl: 2 }}>
                  {item.children.map((child) => (
                    <ListItem key={child.path} disablePadding sx={{ mb: 0.25 }}>
                      <ListItemButton
                        onClick={() => navigate(child.path)}
                        sx={{
                          borderRadius: '6px',
                          py: 0.75,
                          px: 2,
                          '&:hover': {
                            backgroundColor: chroma('#00d4ff').alpha(0.06).css(),
                          },
                          backgroundColor: isActive(child.path)
                            ? chroma('#00d4ff').alpha(0.1).css()
                            : 'transparent',
                        }}
                      >
                        <ListItemText
                          primary={child.title}
                          primaryTypographyProps={{
                            fontSize: '0.8rem',
                            fontWeight: isActive(child.path) ? 600 : 400,
                            color: isActive(child.path) ? '#00d4ff' : 'text.secondary',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.06)', mb: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #00d4ff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
              {user?.name?.charAt(0) || 'A'}
            </Typography>
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }} noWrap>
              {user?.name || 'Admin'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }} noWrap>
              {user?.email || 'admin@techcean.co.in'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;