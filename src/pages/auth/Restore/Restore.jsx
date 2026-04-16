import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Typography, Button, Stack, useTheme } from '@mui/material';

import { restoreUser } from '../../../redux/slices/authSlice';
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
} from '../AuthPages.styled';
import logo from '../../../assets/logo.png';
import icoRestore from '../../../assets/ico_restore.svg';
import AuthDivider from '../../../components/Common/AuthDivider/AuthDivider';

function Restore() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const [isSuccess, isFail, serverFieldErrors, errorMessage] = useOutletContext();

    const { register, handleSubmit, setError, formState: { isSubmitting, isDirty, errors } } = useForm({
        defaultValues: { username_email: '', password: '' },
    });

    const sendData = data => dispatch(restoreUser(data));

    useEffect(() => {
        if (isSuccess) {
            navigate('/auth/login');
        }

        if (isFail && !isDirty) {
            serverFieldErrors.forEach(({ path, msg }) => {
                setError(path, { type: 'server', message: msg });
            });
        }
    }, [isSuccess, isFail, isDirty, serverFieldErrors, navigate, dispatch, setError]);

    return (
        <>
            <Stack sx={{
                padding: `${theme.spacing(0.2)} ${theme.spacing(5)}`,
                borderBottom: `1px solid ${theme.palette.greyMedium.main}`,
            }}>
                <img src={logo} alt="Logo" width={97} />
            </Stack>
            <AuthPage>
                <AuthPageContentWrapper>

                    <AuthPageContent>
                        <AuthFormBlock style={{
                            paddingTop: theme.spacing(3),
                            paddingBottom: 0,
                        }}>
                            <img src={icoRestore} alt="User restore icon" />

                            <Typography sx={{
                                fontSize: '1.333333rem',
                                fontWeight: 600,
                                margin: theme.spacing(1.2),
                            }}>
                                Trouble logging in?
                            </Typography>

                            <Typography variant="bodyGrey" sx={{
                                fontSize: '1.166666rem',
                                marginBottom: theme.spacing(1.5),
                            }}>
                                Enter your email, phone, or username and we'll send you a link to get back into your account.
                            </Typography>

                            <AuthForm component="form" onSubmit={handleSubmit(sendData)}>
                                <AuthInput
                                    placeholder="Email or Username"
                                    disabled={isSuccess}
                                    {...register('input', { ...validationRules.required, ...validationRules.min })}
                                />
                                {errors.input && <AuthInputError color="error">{errors.input.message}</AuthInputError>}

                                {isFail && !isDirty && errorMessage && <AuthResultError color="error">{errorMessage}</AuthResultError>}

                                <AuthButton
                                    type="submit"
                                    variant="contained"
                                    disabled={isSubmitting || isSuccess}
                                >
                                    Reset your password
                                </AuthButton>
                            </AuthForm>

                            <AuthDivider sx={{ marginTop: theme.spacing(4) }} />

                            <Link to="/auth/register">
                                <Typography sx={{
                                    fontSize: '1.166666rem',
                                    fontWeight: 600,
                                    position: 'relative',
                                    top: theme.spacing(1.5),
                                }}
                                >
                                    Create new account
                                </Typography>
                            </Link>

                            <Link to="/auth/login" style={{
                                width: '100%',
                                margin: `${theme.spacing(10)} 0 0`,
                                textDecoration: 'none',
                            }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        color: theme.palette.text.main,
                                        backgroundColor: theme.palette.greyExtraLight.main,
                                        border: `1px solid ${theme.palette.greyMedium.main}`,
                                        borderRadius: 0,
                                        display: 'block',
                                        boxSizing: 'border-box',
                                        position: 'relative',
                                        width: `calc(2 * ${theme.spacing(5)} + 100%)`,
                                        left: `calc(-1 * ${theme.spacing(5)})`,
                                        padding: theme.spacing(1.625),
                                    }}
                                >
                                    Back to Login
                                </Button>
                            </Link>
                        </AuthFormBlock>
                    </AuthPageContent>
                </AuthPageContentWrapper>
            </AuthPage >
        </>
    );
}

export default Restore;