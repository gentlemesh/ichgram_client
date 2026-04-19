import styled from '@emotion/styled';
import { Avatar, Box, Stack, Typography, Button } from '@mui/material';
import IconLinkMarker from '../../../components/icons/IconLinkMarker';

export const Page = styled(Box)(({ theme }) => ({
    padding: `${theme.spacing(6)} ${theme.spacing(21)} ${theme.spacing(14)}`,
    maxWidth: theme.spacing(118),
}));

export const ProfileForm = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(2.75),
    width: '100%',
}));

export const Preview = styled(Stack)(({ theme }) => ({
    borderRadius: theme.layout.radius.big,
    backgroundColor: theme.palette.greyLight.main,
    padding: theme.spacing(2),
    marginTop: theme.spacing(5.5),
    marginBottom: theme.spacing(1.25),
    flexDirection: 'row',
    gap: theme.spacing(2),
}));

export const Picture = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(7),
    height: theme.spacing(7),
}));

export const PreviewAbout = styled(Typography)(({ theme }) => ({
    fontSize: '1.166667rem',
    color: theme.typography.bodyGrey.color,
    marginTop: theme.spacing(1),
    maxWidth: theme.spacing(33),
    height: theme.spacing(5),
    overflow: 'hidden',
}));

export const NewPhotoButton = styled(Button)({
    alignSelf: 'center',
    marginLeft: 'auto',
});
export const HiddenFileInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const InputGroup = styled(Box)({
    position: 'relative',
});

const getBaseInputStyles = theme => ({
    color: theme.typography.body1.color,
    border: `1px solid ${theme.palette.greyMedium.main}`,
    borderRadius: theme.layout.radius.normal,
    fontFamily: theme.typography.body1.fontFamily,
    fontSize: '1.166667rem',
    fontWeight: theme.typography.body1.fontWeight,
    lineHeight: '130%',
    width: '100%',
    padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
    marginTop: theme.spacing(1),
    '&:focus': {
        outline: 'none',
    },
    '&:disabled': {
        opacity: 0.5,
    },
});
export const Input = styled('input')(({ theme }) => getBaseInputStyles(theme));
export const InputAbout = styled('textarea')(({ theme }) => ({
    ...getBaseInputStyles(theme),
    paddingRight: theme.spacing(10),
    resize: 'none',
}));
export const InputWebsite = styled('input')(({ theme }) => ({
    ...getBaseInputStyles(theme),
    paddingLeft: theme.spacing(4.3),
    color: theme.palette.link.main,
    fontWeight: 'bold',
}));
export const WebsiteLinkMarker = styled(IconLinkMarker)(({ theme }) => ({
    color: theme.palette.link.main,
    position: 'absolute',
    width: '1rem',
    height: '1rem',
    left: theme.spacing(2),
    bottom: theme.spacing(2),
}));

export const InputAboutCounter = styled(Typography)(({ theme }) => ({
    color: theme.typography.bodyGrey.color,
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(1.5),
}));

export const InputError = styled(Typography)(({ theme }) => ({
    position: 'relative',
    top: '0.5rem',
    lineHeight: '0.9rem',
    color: theme.palette.error.main,
    textAlign: 'left',
}));

export const ResultError = styled(Typography)(({ theme }) => ({
    position: 'relative',
    color: theme.palette.error.main,
    textAlign: 'center',
}));

export const SaveButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(5),
    maxWidth: theme.spacing(33),
}));