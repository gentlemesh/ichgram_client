import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Posts = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(0.5),
    width: '100%',
    maxWidth: theme.spacing(120),
    height: '100%',
}));

export const Post = styled(Box)(({ post }) => ({
    backgroundImage: `url(${post.image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    boxSizing: 'border-box',
    paddingBottom: '100%',
}));