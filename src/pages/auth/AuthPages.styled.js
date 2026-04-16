import styled from '@emotion/styled';
import { Box, Stack, Typography, Button } from '@mui/material';

export const AuthPage = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.main,
    padding: theme.spacing(12),
}));

export const AuthPageContentWrapper = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing(4),
}));

export const AuthPageContent = styled(Stack)(({ theme }) => ({
    width: '350px',
    gap: theme.spacing(1.25),
    fontSize: '1.166666rem',
}));

export const AuthFormBlock = styled(Stack)(({ theme }) => ({
    border: `${theme.palette.greyMedium.main} 1px solid`,
    padding: theme.spacing(5),
    alignItems: 'center',
    textAlign: 'center',
}));

export const AuthForm = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(0.75),
    width: '100%',
}));

export const AuthInput = styled('input')(({ theme }) => ({
    color: theme.typography.body1.color,
    backgroundColor: theme.palette.greyExtraLight.main,
    border: `1px solid ${theme.palette.greyMedium.main}`,
    borderRadius: theme.layout.radius.tiny,
    fontFamily: theme.typography.body1.fontFamily,
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.body1.fontWeight,
    lineHeight: '130%',
    padding: `${theme.spacing(1.45)} ${theme.spacing(1)}`,
    '&::placeholder': {
        // color: theme.typography.bodyGrey.color,
    },
    '&:focus': {
        outline: 'none',
    },
    '&:disabled': {
        opacity: 0.5,
    },
}));

export const AuthInputError = styled(Typography)(({ theme }) => ({
    position: 'relative',
    top: '-0.1rem',
    lineHeight: '0.9rem',
    color: theme.palette.error.main,
    textAlign: 'left',
}));

export const AuthResultError = styled(Typography)(({ theme }) => ({
    position: 'relative',
    color: theme.palette.error.main,
    textAlign: 'center',
}));

export const AuthButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(1.25),
}));

export const AuthAltActionBlock = styled(Box)(({ theme }) => ({
    border: `${theme.palette.greyMedium.main} 1px solid`,
    padding: theme.spacing(3),
    textAlign: 'center',
}));

export const AuthAltActionBtn = styled(Button)(() => ({
    padding: 0,
    lineHeight: '1rem',
    alignItems: 'baseline',
    position: 'relative',
    top: '-1px',
}));