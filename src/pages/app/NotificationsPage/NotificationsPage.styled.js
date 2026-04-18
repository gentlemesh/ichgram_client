import styled from '@emotion/styled';
import { Box, Stack, Typography, Button } from '@mui/material';

export const Subheader = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

export const NotificationsList = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2.75),
}));