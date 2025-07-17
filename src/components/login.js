import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { 
  TextField, 
  Button, 
  Container, 
  Paper, 
  Typography, 
  Box,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import './login.css';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    role: 'student'
  });
  
  const { signup, login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      toast.success('Login successful!');
      navigate(from, { replace: true });
    } else {
      toast.error(result.error);
    }
    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await signup(formData.email, formData.password, formData.displayName, formData.role);
    
    if (result.success) {
      toast.success('Registration successful!');
      navigate(from, { replace: true });
    } else {
      toast.error(result.error);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);

    const result = await signInWithGoogle();
    
    if (result.success) {
      toast.success('Login successful!');
      navigate(from, { replace: true });
    } else {
      toast.error(result.error);
    }
    setLoading(false);
  };

  const handlePasswordReset = () => {
    if (!formData.email) {
      toast.error('Please enter your email address first');
      return;
    }
    // This will be implemented in a separate component
    toast.info('Password reset functionality will be implemented');
  };

  return (
    <div className="login-bg">
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, mb: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Richmond Tutorial Hub
            </Typography>
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered>
                <Tab label="Login" />
                <Tab label="Register" />
              </Tabs>
            </Box>

            {/* Login Form */}
            {activeTab === 0 && (
              <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  autoComplete="username"
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  autoComplete="current-password"
                />
                
                <Button
                  fullWidth
                  variant="text"
                  onClick={handlePasswordReset}
                  sx={{ mt: 1, mb: 2 }}
                >
                  Forgot Password?
                </Button>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{ mb: 2 }}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
                
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  Sign in with Google
                </Button>
              </Box>
            )}

            {/* Register Form */}
            {activeTab === 1 && (
              <Box component="form" onSubmit={handleSignup} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  autoComplete="name"
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  autoComplete="username"
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  autoComplete="new-password"
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  autoComplete="new-password"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    label="Role"
                  >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="teacher">Teacher</MenuItem>
                  </Select>
                </FormControl>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? 'Creating Account...' : 'Register'}
                </Button>
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default LoginPage; 