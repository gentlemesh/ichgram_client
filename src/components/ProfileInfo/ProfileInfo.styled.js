import styled from '@emotion/styled';
import { Avatar, Box, Stack, Typography, Button } from '@mui/material';
import IconLinkMarker from '../../components/icons/IconLinkMarker';

export const InfoContainer = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    gap: theme.spacing(8),
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(3.41),
    width: theme.spacing(18.75),
    height: theme.spacing(18.75),
}));

export const TextContainer = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(2.5),
}));

export const Top = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(2.75),
}));

export const Username = styled(Typography)(() => ({
    fontSize: '1.6rem',
    lineHeight: '2rem',
}));

export const Buttons = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    gap: theme.spacing(1),
}));

export const ProfileButton = styled(Button)(({ theme }) => ({
    paddingLeft: theme.spacing(7),
    paddingRight: theme.spacing(7),
}));

export const Stat = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    gap: theme.spacing(10),
}));

export const StatItem = styled(Typography)(() => ({
    fontSize: '1.333333rem',
}));

export const AboutText = styled(Typography)(({ theme }) => ({
    fontSize: '1.166667rem',
    maxWidth: theme.spacing(50),
}));

export const AboutTextToggle = styled(Typography)(({ theme }) => ({
    fontSize: '1.166667rem',
    color: theme.palette.grey.main,
    cursor: 'pointer',
    display: 'inline',
    marginLeft: '0.5rem',
}));

export const WebsiteLink = styled('span')(() => ({
    fontSize: '1.166667rem',
    fontWeight: 'bold',
}));

export const WebsiteLinkMarker = styled(IconLinkMarker)(({ theme }) => ({
    color: theme.palette.link.main,
    marginRight: theme.spacing(1),
    position: 'relative',
    top: '0.1rem',
}));