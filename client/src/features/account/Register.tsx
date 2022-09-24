import React from 'react'
import {
    Avatar,
    Box, Container, CssBaseline,
    Grid, Paper,
    TextField,
    Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link, useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import agent from "../../app/api/agent";
import {toast} from "react-toastify";

function Register() {
    const history = useHistory();
    const {register, handleSubmit, setError, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: "all"
    })

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Password')) {
                    setError('password', {message: error})
                } else if (error.includes('Email')) {
                    setError('email', {message: error})
                } else if (error.includes('Username')) {
                    setError('username', {message: error})
                }
            })
        }
    }

    return (
        <Container component={Paper} maxWidth="sm"
                   sx={{display: "flex", flexDirection: "column", alignItems: "center", p: 4}}>
            <CssBaseline/>
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form"
                 onSubmit={handleSubmit((data) =>
                     agent.Account.register(data)
                         .then(() => {
                             toast.success('Registration success - you can now login');
                             history.push('/login');
                         })
                         .catch(error => handleApiErrors(error)))
                 }
                 noValidate sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    autoFocus
                    {...register('username', {required: "Username is required"})}
                    error={!!errors.username}
                    helperText={errors?.username?.message?.toString()}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email address"
                    {...register('email', {
                        required: "Email is required",
                        pattern: {
                            value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                            message: 'Not a valid email address'
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors?.email?.message?.toString()}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password', {
                        required: "Password is required",
                        pattern: {
                            value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                            message: 'Password does not meet complexity requirement'
                        }
                    })}
                    error={!!errors.password}
                    helperText={errors?.password?.message?.toString()}
                />
                <LoadingButton
                    disabled={!isValid}
                    loading={isSubmitting}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Register
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to={"/login"}>
                            {"Already have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Register
