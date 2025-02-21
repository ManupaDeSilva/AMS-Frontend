import React, { useEffect, useState } from 'react';
import loginImg from '../assets/LoginImg3.png';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import logo from '../assets/logoHere.png';
import { useNavigate } from 'react-router-dom';
import { Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [rememberDevice, setrememberDevice] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');


  // Check if the device is remembered
  useEffect(() => {
    const savedDevice = Cookies.get("rememberDevice");
    if (savedDevice) {
      navigate('/home');
    }
  }, []);

  //user Login
  const handleLogin = async (e) => {
    e.preventDefault();
    // Login Validations
    // if (username === 'admin' && password === '1234') {
    //   navigate('/home');
    // }

    // else {
    //   setSnackbarMessage('Invalid login credentials!');
    //   setSnackbarSeverity('error');
    //   setSnackbarOpen(true);
    // }

    if (!username || !password) {
      setSnackbarMessage("Please enter both username and password!");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:3658/m1/770567-748224-default/api/v1/user/signin', {
        username,
        password,
        rememberDevice,
      });

      if (response.status === 200) {
        if (rememberDevice) {
          Cookies.set("rememberDevice", "true", { expires: 365 });
        } else {
          Cookies.remove('rememberDevice');
        }
        navigate('/home');

      } else {
        setSnackbarMessage('Invalid login credentials!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setSnackbarMessage('Failed to connect to the server. Please try again later.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }

  };

  //user Register
  const handleRegister = async () => {

    //Register Validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!registerName || !registerPassword) {
      setSnackbarMessage('All fields must be filled!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!registerEmail) {
      setSnackbarMessage('Enter Email Address');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!emailRegex.test(registerEmail)) {
      setSnackbarMessage('Invalid Email Address');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }


    if (!agreeTerms) {
      setSnackbarMessage('You must agree to the terms and conditions!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:3658/m1/770567-748224-default/api/v1/user/signup', {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });

      if (response.status === 201) {
        setSnackbarMessage('Registration successful! Please Log In !');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        //reset the fields
        setRegisterName('');
        setRegisterEmail('');
        setRegisterPassword('');

        //navigate('/home');



      } else {
        console.log(response.status);
        setSnackbarMessage('Registration failed!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to connect to the server. Please try again later.';
      setSnackbarMessage({ errorMessage });
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

  };


  //close notofication bar
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <div
      className="flex relative h-screen w-screen bg-cover bg-center items-center justify-center"
      style={{ backgroundImage: `url(${loginImg})` }}
    >
      {/*---------Authentication Notification ------- */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <div
        className="items-center justify-center"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginLeft: '45%',
          position: 'sticky',
        }}
      >
        <img src={logo} style={{ width: '150px', marginBottom: '10px' }} alt="Logo" />
        {/* login/register Form */}
        <div>
          <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Registration</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Log In</CardTitle>
                  <CardDescription>
                    Please enter your account details to login.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      required
                      type="text"
                      placeholder="example@domain.com"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="register">Password</Label>
                    <Input
                      id="register"
                      required
                      placeholder="*******"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <FormControlLabel
                    control={<Checkbox
                      size="small"
                      checked={rememberDevice}
                      onChange={(e) => setrememberDevice(e.target.checked)}
                    />}
                    label="Remember this device"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '12px' }, color: '#424242' }}

                  />
                </CardContent>

                <CardFooter>
                  <div style={{ width: '400px', display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleLogin} variant="contained" sx={{ width: '300px' }}>
                      Log In
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>User Registration</CardTitle>
                  <CardDescription>
                    Please enter your details to create new account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      required
                      type="text"
                      placeholder="John Doe"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      required
                      type="email"
                      placeholder="example@domain.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">New password</Label>
                    <Input
                      id="password"
                      required
                      type="password"
                      placeholder="**********"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                  </div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        required
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                      />
                    }
                    label="Agree with Terms and conditions"
                    sx={{
                      '& .MuiFormControlLabel-label': { fontSize: '12px' },
                      color: '#424242',
                    }}
                  />
                </CardContent>
                <CardFooter>
                  <div style={{ width: '400px', display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleRegister} variant="contained" sx={{ width: '300px' }}>
                      Register
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
