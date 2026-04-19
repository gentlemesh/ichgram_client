import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const ProfileContainer = styled(Box)(({ theme }) => ({
    padding: `${theme.spacing(4.75)} ${theme.spacing(12)} ${theme.spacing(4.75)} ${theme.spacing(21.25)}`,
}));

export const PostsContainer = styled(Box)(({ theme }) => ({
    paddingTop: theme.spacing(10),
}));