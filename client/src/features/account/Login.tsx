import React from 'react'
import {
    Avatar,
    Box, Container, CssBaseline,
    Grid, Paper,
    TextField,
    Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link, useHistory, useLocation} from "react-router-dom";
import {FieldValues, useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import {useAppDispatch} from "../../app/store/configureStore";
import {signInUser} from "./accountSlice";

function Login() {
    const history = useHistory();
    const location = useLocation<any>();
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: "all"
    })

    async function submitForm(data: FieldValues) {
        try {
            await dispatch(signInUser(data));
            history.push(location.state?.from?.pathname || "/catalog");
        } catch (error) {
            console.log(error)
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
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{mt: 1}}>
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
                    label="Password"
                    type="password"
                    {...register('password', {required: "Password is required"})}
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
                    Sign In
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to={"/register"}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Login