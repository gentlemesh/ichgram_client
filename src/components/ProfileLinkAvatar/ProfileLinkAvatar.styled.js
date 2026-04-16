import styled from '@emotion/styled';
import { Avatar } from '@mui/material';

export const ImgAvatar = styled(Avatar)(({ theme }) => ({
    display: 'inline-flex',
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(2),
    top: '3px',
    '&:has(img[src])': {
        top: '6px',
    },
}));