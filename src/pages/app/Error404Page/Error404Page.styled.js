import styled from '@emotion/styled';
import { Box, Stack, Typography } from '@mui/material';

export const Page = styled(Box)(({ theme }) => ({
    padding: `${theme.spacing(11.75)} ${theme.spacing(14.875)}`,
}));

export const PageContentWrapper = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing(5.5),
}));

export const PageContent = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(1.25),
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
    fontSize: '3rem',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(1.25),
}));

export const PageText = styled(Typography)(({ theme }) => ({
    color: theme.palette.grey.main,
    fontSize: '1.333333rem',
    fontWeight: 'bold',
}));