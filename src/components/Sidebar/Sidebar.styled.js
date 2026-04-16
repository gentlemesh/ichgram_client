import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

import IconMenuHome from '../../assets/icons/menu/icon-menu-home.svg';
import IconMenuHomeActive from '../../assets/icons/menu/icon-menu-home-active.svg';
import IconMenuSearch from '../../assets/icons/menu/icon-menu-search.svg';
import IconMenuSearchActive from '../../assets/icons/menu/icon-menu-search-active.svg';
import IconMenuExplore from '../../assets/icons/menu/icon-menu-explore.svg';
import IconMenuExploreActive from '../../assets/icons/menu/icon-menu-explore-active.svg';
import IconMenuMessages from '../../assets/icons/menu/icon-menu-messages.svg';
import IconMenuMessagesActive from '../../assets/icons/menu/icon-menu-messages-active.svg';
import IconMenuNotification from '../../assets/icons/menu/icon-menu-notification.svg';
import IconMenuNotificationActive from '../../assets/icons/menu/icon-menu-notification-active.svg';
import IconMenuCreate from '../../assets/icons/menu/icon-menu-create.svg';

export const SideBox = styled(Box)(({ theme }) => ({
    padding: `${theme.spacing(3.5)} ${theme.spacing(3)}`,
    flex: `0 0 245px`,
    borderRight: `1px solid ${theme.palette.greyMedium.main}`,
}));

export const MenuItem = styled(Typography)(({ theme }) => ({
    fontSize: '1.333333rem',
    position: 'relative',
    '&.active': {
        fontWeight: 'bold',
    },
    '&::before': {
        content: '" "',
        display: 'inline-block',
        position: 'relative',
        width: '24px',
        height: '24px',
        marginRight: theme.spacing(2),
        top: '6px',
    },
    '&.home::before': {
        backgroundImage: `url("${IconMenuHome}")`,
    },
    '&.home.active::before': {
        backgroundImage: `url("${IconMenuHomeActive}")`,
    },
    '&.search::before': {
        backgroundImage: `url("${IconMenuSearch}")`,
    },
    '&.search.active::before': {
        backgroundImage: `url("${IconMenuSearchActive}")`,
    },
    '&.explore::before': {
        backgroundImage: `url("${IconMenuExplore}")`,
    },
    '&.explore.active::before': {
        backgroundImage: `url("${IconMenuExploreActive}")`,
    },
    '&.messages::before': {
        backgroundImage: `url("${IconMenuMessages}")`,
    },
    '&.messages.active::before': {
        backgroundImage: `url("${IconMenuMessagesActive}")`,
    },
    '&.notification::before': {
        backgroundImage: `url("${IconMenuNotification}")`,
    },
    '&.notification.active::before': {
        backgroundImage: `url("${IconMenuNotificationActive}")`,
    },
    '&.create::before': {
        backgroundImage: `url("${IconMenuCreate}")`,
    },
    '&.create.active::before': {
        backgroundImage: `url("${IconMenuCreate}")`,
    },
}));

export const LinkProfile = styled(Box)(({ theme }) => ({
    fontSize: '1.333333rem',
    color: theme.palette.text.main,
    position: 'relative',
    paddingTop: theme.spacing(6),
    '&.active': {
        fontWeight: 'bold',
    },
}));