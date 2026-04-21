import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  Fade,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../api/auth';
import chroma from 'chroma-js';

const Login = () => {
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    document.body.classList.add('admin-panel');
    return () => {
      document.body.classList.remove('admin-panel');
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await login(formData.email, formData.password);
      setAuth(data.user, data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const cyanGlow = chroma('#00d4ff').alpha(0.2).css();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `
          radial-gradient(ellipse at 20% 20%, ${chroma('#00d4ff').alpha(0.15).css()} 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, ${chroma('#8b5cf6').alpha(0.1).css()} 0%, transparent 50%),
          #0a0a0a
        `,
        p: 2,
      }}
    >
      <Fade in timeout={600}>
        <Card
          sx={{
            width: '100%',
            maxWidth: 440,
            background: 'rgba(26, 26, 26, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #00d4ff 0%, #00ff9d 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                }}
              >
                TechCean
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to your admin panel
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ mb: 2.5 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ fontSize: 20 }} />
                        ) : (
                          <Visibility sx={{ fontSize: 20 }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  py: 1.5,
                  background: 'linear-gradient(135deg, #00d4ff 0%, #00b8de 100%)',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #00e5ff 0%, #00d4ff 100%)',
                    boxShadow: `0 0 20px ${cyanGlow}`,
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: 'black' }} />
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontFamily: '"JetBrains Mono", monospace',
                }}
              >
                Demo: admin@techcean.co.in / admin123
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Fade>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;