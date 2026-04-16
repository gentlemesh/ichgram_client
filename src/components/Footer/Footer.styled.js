import styled from '@emotion/styled';
import { Box, Stack, Typography } from '@mui/material';

export const FooterBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(7.5),
    textAlign: 'center',
    color: theme.palette.grey.main,
}));

export const BottomMenu = styled(Stack)(({ theme }) => ({
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        gap: theme.spacing(8),
    },
}));

export const MenuItem = styled(Typography)(({ theme }) => ({
    color: theme.palette.grey.main,
    '&:hover': {
        textDecoration: 'underline',
    },
}));

export const Copyright = styled(Typography)(({ theme }) => ({
    color: theme.palette.grey.main,
    marginTop: theme.spacing(5.625),
}));