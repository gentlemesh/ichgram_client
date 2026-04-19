import styled from '@emotion/styled';
import { Avatar, Box, Stack, Button, Typography } from '@mui/material';

export const ModalContent = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.background.main,
    boxShadow: `${theme.spacing(0.5)} 0 ${theme.spacing(3)} 0 rgba(0, 0, 0, .15)`,
    cursor: 'default',
    outline: 'none',
    margin: 'auto',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: theme.spacing(125),
    maxWidth: '100%',
    height: theme.spacing(90),
    maxHeight: '100%',
    flexDirection: 'row',
}));

export const Image = styled(Box)(({ src }) => ({
    backgroundImage: `url(${src})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    flex: '0 1 58%',
    height: '100%',
}));

export const Content = styled(Stack)(({ theme }) => ({
    borderLeft: `1px solid ${theme.palette.greyLight.main}`,
    boxSizing: 'border-box',
    flex: '0 1 42%',
    height: '100%',
    overflowY: 'scroll',
}));

export const Top = styled(Stack)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.greyLight.main}`,
    boxSizing: 'border-box',
    padding: `${theme.spacing(0.95)} ${theme.spacing(1.17)}`,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(2),
}));

export const ImgAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
}));

export const FollowButton = styled(Button)(({ theme }) => ({
    position: 'relative',
    left: theme.spacing(-2),
}));

export const Text = styled(Stack)(({ theme }) => ({
    padding: `${theme.spacing(1.5)} ${theme.spacing(1.17)}`,
    flexDirection: 'row',
    gap: theme.spacing(2),
}));

export const Comment = styled(Stack)(({ theme }) => ({
    padding: `${theme.spacing(1.5)} ${theme.spacing(1.55)}`,
    flexDirection: 'row',
    gap: theme.spacing(2),
}));

export const CommentLikesCount = styled(Typography)(({ theme }) => ({
    color: theme.typography.bodyGrey.color,
    fontWeight: 'bold',
    display: 'inline',
    marginLeft: theme.spacing(4),
}));

export const ActionPanel = styled(Box)(({ theme }) => ({
    borderTop: `1px solid ${theme.palette.greyLight.main}`,
    padding: `${theme.spacing(1.5)} ${theme.spacing(1.55)}`,
    marginTop: 'auto',
}));

export const ActionButtons = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    gap: theme.spacing(1.75),
    paddingBottom: theme.spacing(1.25),
    '& a': {
        display: 'inline-flex',
        alignItems: 'center',
    },
}));

export const ActionButton = styled(Button)({
    background: 'transparent',
    padding: 0,
    minWidth: 'initial',
});