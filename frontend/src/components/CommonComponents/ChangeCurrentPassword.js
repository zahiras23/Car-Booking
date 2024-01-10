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
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeCurrentPassword } from '../../slices/Admin.slice';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from '../../slices/User.slice';
import { resetDriverPassword } from '../../slices/Driver.slice'

const theme = createTheme();

export default function ChangeCurrentPassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const dispatch = useDispatch();
    // const navigate = useNavigate()

    // const userState = useSelector((state) => state.userState)
    // const driverState = useSelector((state) => state.driverState)
    // const adminState = useSelector((state) => state.adminState)

    const handleSubmit = (event) => {
        event.preventDefault()
        if (currentPassword.trim().length === 0) {
            toast.error("Please Enter Current Password")
        }
        else if (newPassword.trim().length === 0) {
            toast.error("Please Enter New Password")
        }
        else if (confirmPassword.trim().length === 0) {
            toast.error("Please,Enter New Password")
        }
        else if (newPassword !== confirmPassword) {
            toast.error("Password And Confirm Password Must Be Same")
        }
        else {
            const data = {
                currentPassword, newPassword
            }
            if (window.location.pathname === '/resetPassword') {
                dispatch(resetPassword(data))
            }
            else if (window.location.pathname === '/adminHome/changePassword') {
                dispatch(changeCurrentPassword(data))
            }
            else if (window.location.pathname === '/driver/resestPassword') {
                dispatch(resetDriverPassword(data))
            }
        }
    };

    return (
        <body style={{ backgroundColor: "rgba(234, 222, 222, 0.9)", height: "100vh", marginLeft: "-0.5%" }}>

            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            border: 1,
                            borderColor: 'grey.500',
                            borderRadius: '16px',
                            backgroundColor: "white",
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
                                id="Current Password"
                                placeholder="Current Password"
                                name="Current Password"
                                type="password"
                                InputProps={{
                                    style: { height: "40px" },
                                }}
                                onChange={(event) => setCurrentPassword(event.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="New Password"
                                placeholder="New Password"
                                name="New Password"
                                type="password"
                                InputProps={{

                                    style: { height: "40px" },
                                }}

                                onChange={(event) => setNewPassword(event.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="Confirm Password"
                                placeholder="Confirm Password"
                                name="Confirm Password"
                                type="password"
                                InputProps={{
                                    style: { height: "40px" },
                                }}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                size='small'
                                sx={{ mt: 3, mb: 2, marginLeft: "30%" }}
                            >
                                Change Password
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </body>
    );
}