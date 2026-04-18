import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { Box, Drawer, Slide } from '@mui/material';

import MainPage from '../../pages/app/MainPage/MainPage';
import { Panel } from './SidePanel.styled';

function SidePanel({ content }) {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box>
            <MainPage />
            <Drawer open disableScrollLock disablePortal slotProps={{
                root: {
                    sx: {
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        boxShadow: '4px 0 24px 0 rgba(0, 0, 0, .15)',
                        cursor: 'pointer',
                    },
                },
                backdrop: {
                    sx: {
                        backgroundColor: theme.palette.backdrop.main,
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    },
                },
                paper: {
                    sx: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    },
                    onClick: e => {
                        e.stopPropagation();
                        if (e.target === e.currentTarget) {
                            navigate('/');
                        }
                    },
                }
            }}>
                <Slide direction="right" in={true} appear={true} timeout={300} easing="ease-in" mountOnEnter unmountOnExit>
                    <Panel>{content}</Panel>
                </Slide>
            </Drawer>
        </Box >
    );
}

export default SidePanel;