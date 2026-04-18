import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Panel = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.main,
    borderTopRightRadius: theme.layout.radius.large,
    borderBottomRightRadius: theme.layout.radius.large,
    width: theme.spacing(50),
    height: '100%',
    position: 'relative',
    padding: theme.spacing(3),
    cursor: 'default',
}));