import styled from '@emotion/styled';
import { Avatar, Box, Stack, Typography, Button } from '@mui/material';

export const Posts = styled(Stack)(({ theme }) => ({
    padding: `${theme.spacing(7.25)} ${theme.spacing(9.75)}`,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
    gap: `${theme.spacing(3)} ${theme.spacing(5)}`,
}));

export const Post = styled(Stack)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.greyMedium.main}`,
    paddingBottom: theme.spacing(4.75),
    flex: `0 1 404px`,
}));

export const Author = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: theme.spacing(1),
    gap: theme.spacing(1),
    '& > a': {
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
}));

export const ImgAvatar = styled(Avatar)(({ theme }) => ({
    display: 'inline-flex',
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(2),
}));

export const Image = styled(Box)(() => ({
    paddingBottom: '120%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

export const FollowButton = styled(Button)(({ theme }) => ({
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: theme.spacing(2),
}));