import { createTheme } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';

const theme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.2)',
    '0px 4px 8px rgba(0,0,0,0.25)',
    '0px 6px 12px rgba(0,0,0,0.3)',
    '0px 8px 16px rgba(0,0,0,0.35)',
    '0px 10px 20px rgba(0,0,0,0.4)',
    '0px 12px 24px rgba(0,0,0,0.45)',
    '0px 14px 28px rgba(0,0,0,0.5)',
    '0px 16px 32px rgba(0,0,0,0.55)',
    '0px 18px 36px rgba(0,0,0,0.6)',
    '0px 20px 40px rgba(0,0,0,0.65)',
    '0px 22px 44px rgba(0,0,0,0.7)',
    '0px 24px 48px rgba(0,0,0,0.75)',
    '0px 26px 52px rgba(0,0,0,0.8)',
    '0px 28px 56px rgba(0,0,0,0.85)',
    '0px 30px 60px rgba(0,0,0,0.9)',
    '0px 32px 64px rgba(0,0,0,0.95)',
    '0px 34px 68px rgba(0,0,0,1)',
    '0px 36px 72px rgba(0,0,0,1)',
    '0px 38px 76px rgba(0,0,0,1)',
    '0px 40px 80px rgba(0,0,0,1)',
    '0px 42px 84px rgba(0,0,0,1)',
    '0px 44px 88px rgba(0,0,0,1)',
    '0px 46px 92px rgba(0,0,0,1)',
    '0px 48px 96px rgba(0,0,0,1)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@import': "url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap')",
        body: {
          backgroundColor: '#0a0a0a',
          scrollbarWidth: 'thin',
          scrollbarColor: '#333 #141414',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#141414',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#333',
            borderRadius: '4px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 24px',
          transition: 'all 0.25s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 212, 255, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          backgroundImage: 'none',
          transition: 'all 0.25s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#00d4ff',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#00d4ff',
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#141414',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#141414',
          backgroundImage: 'none',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        },
        head: {
          fontWeight: 600,
          backgroundColor: '#1a1a1a',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0, 212, 255, 0.04)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#1a1a1a',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '0.75rem',
        },
      },
    },
  },
});

export default theme;