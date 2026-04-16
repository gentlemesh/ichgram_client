import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Typography } from '@mui/material';

import { registerUser } from '../../../redux/slices/authSlice';
import validationRules from '../../../helpers/formValidationRules';
import {
    AuthPage,
    AuthPageContentWrapper,
    AuthPageContent,
    AuthFormBlock,
    AuthForm,
    AuthInput,
    AuthInputError,
    AuthResultError,
    AuthButton,
    AuthAltActionBlock,
    AuthAltActionBtn,
} from '../AuthPages.styled';
import logo from '../../../assets/logo.png';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSuccess, isFail, serverFieldErrors, errorMessage] = useOutletContext();

    const { register, handleSubmit, setError, formState: { isSubmitting, isDirty, errors } } = useForm({
        defaultValues: { email: '', full_name: '', username: '', password: '' },
    });

    const sendData = data => dispatch(registerUser(data));

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }

        if (isFail && !isDirty) {
            serverFieldErrors.forEach(({ path, msg }) => {
                setError(path, { type: 'server', message: msg });
            });
        }
    }, [isSuccess, isFail, isDirty, serverFieldErrors, navigate, dispatch, setError]);

    return (
        <AuthPage>
            <AuthPageContentWrapper>
                <AuthPageContent>
                    <AuthFormBlock>
                        <img src={logo} alt="Logo" width={190} />
                        <Typography variant="bodyGrey" sx={{ fontSize: '1.333333rem', fontWeight: 600, marginBottom: 4 }}>
                            Sign up to see photos and videos from your friends.
                        </Typography>
                        <AuthForm component="form" onSubmit={handleSubmit(sendData)} noValidate>
                            <AuthInput
                                type="email"
                                placeholder="Email"
                                disabled={isSuccess}
                                {...register('email', { ...validationRules.required, ...validationRules.email })}
                            />
                            {errors.email && <AuthInputError color="error">{errors.email.message}</AuthInputError>}

                            <AuthInput
                                placeholder="Full Name"
                                disabled={isSuccess}
                                {...register('full_name', { ...validationRules.required, ...validationRules.min })}
                            />
                            {errors.full_name && <AuthInputError color="error">{errors.full_name.message}</AuthInputError>}

                            <AuthInput
                                placeholder="Username"
                                disabled={isSuccess}
                                {...register('username', { ...validationRules.required, ...validationRules.min })}
                            />
                            {errors.username && <AuthInputError color="error">{errors.username.message}</AuthInputError>}

                            <AuthInput
                                type="password"
                                placeholder="Password"
                                disabled={isSuccess}
                                {...register('password', { ...validationRules.required, ...validationRules.min })}
                            />
                            {errors.password && <AuthInputError color="error">{errors.password.message}</AuthInputError>}

                            {isFail && !isDirty && errorMessage && <AuthResultError color="error">{errorMessage}</AuthResultError>}


                            <Typography variant="bodyGrey" sx={{ marginTop: 2.5, marginBottom: 1.5 }}>
                                People who use our service may have uploaded your contact information to Instagram.
                                <a href="#">Learn More</a>
                            </Typography>
                            <Typography variant="bodyGrey" sx={{ marginTop: 0, marginBottom: 1.5 }}>
                                By signing up, you agree to our
                                &nbsp;<a href="#">Terms</a>,
                                &nbsp;<a href="#">Privacy Policy</a>
                                &nbsp;and <a href="#">Cookies Policy</a>.
                            </Typography>

                            <AuthButton
                                type="submit"
                                variant="contained"
                                disabled={isSubmitting || isSuccess}
                            >
                                Sign Up
                            </AuthButton>
                        </AuthForm>

                    </AuthFormBlock>

                    <AuthAltActionBlock>
                        Have an account?
                        <Link to="/auth/login">
                            <AuthAltActionBtn>Log in</AuthAltActionBtn>
                        </Link>
                    </AuthAltActionBlock>
                </AuthPageContent>
            </AuthPageContentWrapper>
        </AuthPage >
    );
}

export default Register;