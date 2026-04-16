import { createTheme } from '@mui/material';

const customTypography = {
    fontFamily: 'var(--text-basic-font-family)',
    h1: {
        fontSize: 'var(--text-heading-font-size)',
        fontWeight: 'var(--text-heading-font-weight)',
    },
    h2: {
        fontSize: 'var(--text-heading-h2-font-size)',
        fontWeight: 'var(--text-heading-font-weight)',
    },
    body1: {
        fontSize: 'var(--text-basic-font-size)',
        fontWeight: 'var(--text-basic-font-weight)',
    },
    bodyGrey: {
        fontSize: 'var(--text-basic-font-size)',
        fontWeight: 'var(--text-basic-font-weight)',
        color: 'var(--color-grey)',
    },
    allVariants: {
        color: 'var(--color-text-base)',
    },
}

export const theme = createTheme({
    typography: customTypography,
    palette: {
        primary: {
            main: 'rgb(0, 149, 246)', // CSS variables are not supported here :(
        },
        secondary: {
            main: 'rgb(239, 239, 239)',
        },
        error: {
            main: 'rgb(255, 0, 20)',
        },
        background: {
            main: 'var(--color-background)',
        },
        text: {
            main: 'var(--color-text-base)',
        },
        grey: {
            main: 'var(--color-grey)',
        },
        greyExtraLight: {
            main: 'var(--color-grey-extralight)',
        },
        greyLight: {
            main: 'var(--color-grey-light)',
        },
        greyMedium: {
            main: 'var(--color-grey-medium)',
        },
        // shadowCard: {
        //     main: 'rgba(0, 0, 0, 0.3)',
        // }
    },
    layout: {
        // paddingX: 'var(--layout-padding-x)',
        // maxWidth: 'var(--layout-max-width)',
        // sectionPaddingBottom: 'var(--layout-section-padding-bottom)',
        radius: {
            tiny: 'var(--layout-radius-tiny)',
            small: 'var(--layout-radius-small)',
            medium: 'var(--layout-radius-medium)',
            normal: 'var(--layout-radius-normal)',
            large: 'var(--layout-radius-large)',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '8px 16px',
                    boxSizing: 'border-box',
                    fontSize: '1.166667rem',
                    fontWeight: 600,
                    lineHeight: '1.5rem',
                    textTransform: 'none',
                    boxShadow: 'none',
                    border: 'none',
                    borderRadius: 'var(--layout-radius-medium)',
                    '&:hover, &:focus, &:active': {
                        boxShadow: 'none',
                    },
                    '&:disabled': {
                        opacity: 0.5,
                        cursor: 'not-allowed',
                    },
                },
            },
        },
    },
    cssVariables: true,
});
