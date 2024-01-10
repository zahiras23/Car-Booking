import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MailLockIcon from '@mui/icons-material/MailLock';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newPassword } from '../../slices/ForgotPassword.slice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from './Spinner';

const theme = createTheme();

export default function ChangePassword() {
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const passwordState = useSelector((state) => state.passwordState);

    useEffect(() => {
        const email = localStorage.getItem('email')
        if (email === null) {
            navigate("/")
        }
        const role = localStorage.getItem("role")
        const token = localStorage.getItem("token")
        if (token && role === "customer") {
            navigate("/")
        }
        else if (token && role === "driver") {
            navigate("/driver/home")
        }
        else if (token && role === "admin") {
            navigate("/adminHome")
        }
    }, [navigate])

    useEffect(() => {
        if (passwordState.passwordStatus === 'success') {
            const path = window.location.pathname
            localStorage.removeItem("token");
            localStorage.removeItem("email")
            if (path === '/changeNewPassword')
                navigate("/login")
            else if (path === '/admin/changeNewPassword')
                navigate("/adminHome/login")
            else if (path === '/driver/changeNewPassword')
                navigate("/driver/login")
        }
    }, [navigate, passwordState])

    //submit handler for create new password
    const handleSubmit = (event) => {
        event.preventDefault();
        if (password.trim().length === 0) {
            toast.error("Please,Enter New Password")
        }
        else if (cpassword.trim().length === 0) {
            toast.error("Please Enter Confirm Password.")
        }
        else if (password !== cpassword) {
            toast.error("Password And Confirm  Password  Must Be Same.")
        }
        else {
            dispatch(newPassword(password))
            setLoading(true)
        }
    };

    return (
        <>
            {loading ? <Spinner /> : <>
                <body style={{ backgroundColor: "rgba(234, 222, 222, 0.9) ", height: "100vh", marginLeft: "-0.5%" }}>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: "column",
                                    alignItems: "center",
                                    border: 1,
                                    borderColor: 'grey.500',
                                    borderRadius: '16px',
                                    backgroundColor: 'white'
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <MailLockIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Change Password
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="New Password"
                                        placeholder="New Password"
                                        name="New Password"
                                        type="password"
                                        autoFocus
                                        InputProps={{
                                            style: { width: "60%", height: "40px", borderColor: 'white', marginLeft: "20%" },
                                        }}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Confirm Password"
                                        placeholder="Confirm Password"
                                        name="Confirm Password"
                                        type="password"
                                        autoFocus
                                        InputProps={{
                                            style: { width: "60%", height: "40px", borderColor: 'white', marginLeft: "20%" },
                                        }}
                                        onChange={(event) => setCpassword(event.target.value)}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, marginLeft: "27%", backgroundColor: "#F7752A" }}
                                    >
                                        Change Password
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </body>
            </>}

        </>
    );
}