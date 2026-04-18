import { Box, Stack, Typography } from '@mui/material';

function PlaceholderPage() {
    return (
        <Stack sx={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Typography variant="h1">Page under construction…</Typography>
        </Stack>
    );
}

export default PlaceholderPage;