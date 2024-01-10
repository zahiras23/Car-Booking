import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOTP } from '../../slices/ForgotPassword.slice';
import Spinner from './Spinner';
import { toast } from 'react-toastify';


const theme = createTheme();

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();
    const passwordState = useSelector(state => state.passwordState);
    const navigate = useNavigate();
    const urlPath = window.location.pathname

    useEffect(() => {
        if (passwordState.otpStatus === "success") {
            localStorage.setItem("email", email);
            if (urlPath === '/forgotPassword')
                navigate("/forgotPassword/otpVarifier")
            else if (urlPath === "/admin/forgotPassword")
                navigate("/admin/forgotPassword/otpVarifier")
            else if (urlPath === "/driver/forgotPassword")
                navigate("/driver/forgotPassword/otpVarifier")
        }
    }, [email, navigate, passwordState, urlPath]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const emailExpression = /[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,3}$/
        if (email.trim().length === 0 || !emailExpression.test(email)) {
            toast.error("Please Enter  Valid Email.")
        }
        else {
            dispatch(sendOTP(email))
            setLoading(true)
        }
    };

    return (
        <body style={{ backgroundColor: "rgba(234, 222, 222, 0.9) ", height: "100vh", marginLeft: "-0.5%" }}>
            {loading ? <Spinner /> : <>
                < ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                border: 1,
                                borderColor: 'grey.500',
                                borderRadius: '16px',
                                backgroundColor: "white",
                                marginTop: "40%"
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <VpnKeyTwoToneIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Forgot Password
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    placeholder="Email"
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                    autoFocus
                                    InputProps={{
                                        style: { height: "50px", borderColor: 'white' },
                                    }}

                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, backgroundColor: "#F7752A", marginLeft: "35%" }}
                                >
                                    Next
                                </Button>
                            </Box>
                        </Box>

                    </Container>
                </ThemeProvider>
            </>

            }

        </body>
    );

}