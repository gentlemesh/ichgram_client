import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Typography } from '@mui/material';

import { loginUser } from '../../../redux/slices/authSlice';
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
import bgAuth from '../../../assets/bg-auth.png';
import logo from '../../../assets/logo.png';
import AuthDivider from '../../../components/Common/AuthDivider/AuthDivider';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSuccess, isFail, serverFieldErrors, errorMessage] = useOutletContext();

    const { register, handleSubmit, setError, formState: { isSubmitting, isDirty, errors } } = useForm({
        defaultValues: { username_email: '', password: '' },
        resetOptions: {
            keepDirtyValues: true,
        },
    });

    const sendData = data => dispatch(loginUser(data));

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
                <img src={bgAuth} alt="App Visual" />
                <AuthPageContent>
                    <AuthFormBlock>
                        <img src={logo} alt="Logo" width={190} />
                        <AuthForm component="form" onSubmit={handleSubmit(sendData)}>
                            <AuthInput
                                placeholder="Username or email"
                                disabled={isSuccess}
                                {...register('username_email', { ...validationRules.required, ...validationRules.min })}
                            />
                            {errors.username_email && <AuthInputError color="error">{errors.username_email.message}</AuthInputError>}

                            <AuthInput
                                type="password"
                                placeholder="Password"
                                disabled={isSuccess}
                                {...register('password', { ...validationRules.required, ...validationRules.min })}
                            />
                            {errors.password && <AuthInputError color="error">{errors.password.message}</AuthInputError>}

                            {isFail && !isDirty && errorMessage && <AuthResultError color="error">{errorMessage}</AuthResultError>}

                            <AuthButton
                                type="submit"
                                variant="contained"
                                disabled={isSubmitting || isSuccess}
                            >
                                Log In
                            </AuthButton>
                        </AuthForm>

                        <AuthDivider />

                        <Typography sx={{ fontSize: '1rem', marginTop: 6, position: 'relative', top: '1.5em' }}>
                            <Link to="/auth/restore">
                                Forgot password?
                            </Link>
                        </Typography>
                    </AuthFormBlock>

                    <AuthAltActionBlock>
                        Don't have an account?
                        <Link to="/auth/register">
                            <AuthAltActionBtn>Sign Up</AuthAltActionBtn>
                        </Link>
                    </AuthAltActionBlock>
                </AuthPageContent>
            </AuthPageContentWrapper>
        </AuthPage>
    );
}

export default Login;