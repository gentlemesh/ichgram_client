import styled from '@emotion/styled';
import { Avatar, Box, Stack, Typography } from '@mui/material';

export const UserItem = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    padding: `${theme.spacing(1)} 0`,
    gap: theme.spacing(2),
    alignItems: 'center',
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
    alignSelf: 'flex-start',
    width: theme.spacing(5),
    height: theme.spacing(5),
}));

export const UserText = styled(Typography)(({ theme }) => ({
    maxWidth: theme.spacing(18),
}));

export const UserTitle = styled('span')(({ theme }) => ({
    color: theme.palette.text.main,
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
    display: 'inline',
}));