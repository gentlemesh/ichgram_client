import styled from '@emotion/styled';
import { Box, Divider, Typography } from '@mui/material';

export const DividerStack = styled(Box)(({ theme }) => ({
    padding: `${theme.spacing(1.5)} 0`,
    width: '100%',
    textAlign: 'center',
    position: 'relative',
}));

export const DividerLine = styled(Divider)(({ theme }) => ({
    color: theme.palette.greyMedium.main,
    borderColor: theme.palette.greyMedium.main,
    height: '1px',
    width: '100%',
}));

export const DividerText = styled(Typography)(({ theme }) => ({
    backgroundColor: theme.palette.background.main,
    padding: `0 ${theme.spacing(2.5)}`,
    display: 'inline-block',
    position: 'relative',
    top: theme.spacing(1.25),
}));