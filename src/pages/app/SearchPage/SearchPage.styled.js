import styled from '@emotion/styled';
import { Box, Stack, Typography, Button } from '@mui/material';

import ImgSearchClose from '../../../assets/btn-search-close.png';

export const SearchInputWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    margin: `${theme.spacing(6)} ${theme.spacing(-1)} ${theme.spacing(5)}`,
}));

export const SearchInput = styled('input')(({ theme }) => ({
    fontSize: '1.333333rem',
    fontWeight: 300,
    backgroundColor: theme.palette.greyLight.main,
    borderRadius: theme.layout.radius.medium,
    border: 'none',
    width: '100%',
    padding: `${theme.spacing(1.3125)} ${theme.spacing(2)}`,
    '&:focus': {
        border: 'none',
        outline: 'none',
    },
    '&::placeholder': {
        color: theme.palette.grey.main,
    },
}));

export const SearchClearBtn = styled(Button)(({ theme }) => ({
    backgroundImage: `url(${ImgSearchClose})`,
    backgroundColor: 'transparent',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: '50%',
    padding: 0,
    width: theme.spacing(3),
    minWidth: theme.spacing(3),
    height: theme.spacing(3),
    position: 'absolute',
    right: theme.spacing(1.1),
    top: theme.spacing(1.1),
}));

export const SearchResults = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2.75),
}));