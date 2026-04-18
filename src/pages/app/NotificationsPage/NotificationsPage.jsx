// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

import { Subheader, NotificationsList } from './NotificationsPage.styled';
import SidePanel from '../../../components/SidePanel/SidePanel';
import User from '../../../components/SidePanel/User/User';

function NotificationsPage() {
    // const dispatch = useDispatch();
    const notifications = []; // @TODO implement functional and select data from store

    const content = (
        <>
            <Typography variant="h1">Search</Typography>
            <Subheader variant="h2">New</Subheader>
            <NotificationsList>
                {notifications && Array.isArray(notifications) && (
                    notifications.length > 0
                        ? notifications.map(notification => <User user={notification.user} />)
                        : <Typography variant="bodyGrey">No notifications yet</Typography>
                )}
            </NotificationsList>
        </>
    );

    return <SidePanel content={content} />;
}

export default NotificationsPage;