import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Stack, useTheme } from '@mui/material';

import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';

function Layout() {
    const theme = useTheme();
    const { pathname } = useLocation();

    useEffect(() => {
        if (!location.hash) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [pathname]);


    return (
        <Stack backgroundColor={theme.palette.background.main} minHeight="100%">
            <Stack flexDirection="row" alignItems="stretch">
                <Sidebar />
                <Outlet />
            </Stack>
            <Footer />
        </Stack>
    );
}

export default Layout;