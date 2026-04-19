import styled from '@emotion/styled';
import { Box, Stack, Button, Typography, Menu, MenuItem } from '@mui/material';

export const AddCommentPanel = styled(Stack)(({ theme }) => ({
    borderTop: `1px solid ${theme.palette.greyMedium.main}`,
    padding: `${theme.spacing(1.5)} ${theme.spacing(1.55)}`,
    flexDirection: 'row',
    gap: theme.spacing(2),
}));

export const AddCommentForm = styled(Stack)({
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
});

export const SmileButton = styled(Button)({
    background: 'transparent',
    padding: 0,
    minWidth: 'initial',
});

export const Smile = styled(MenuItem)({
    flex: '0 0 1rem',
    fontSize: '1.8rem',
    padding: 0,
});

export const Input = styled('input')(({ theme }) => ({
    color: theme.typography.body1.color,
    border: 'none',
    outline: 'none',
    flexGrow: 1,
    '&::placeholder': {
        color: theme.palette.greyMedium.main,
    },
}));

export const InputError = styled(Typography)(({ theme }) => ({
    position: 'relative',
    top: '0.5rem',
    lineHeight: '0.9rem',
    color: theme.palette.error.main,
    textAlign: 'left',
}));

export const ResultError = styled(Typography)(({ theme }) => ({
    position: 'relative',
    color: theme.palette.error.main,
    textAlign: 'center',
}));

export const SendButton = styled(Button)(({ theme }) => ({
    maxWidth: theme.spacing(15),
    flexGrow: 1,
}));