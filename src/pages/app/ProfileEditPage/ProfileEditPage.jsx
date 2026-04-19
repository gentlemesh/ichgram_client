import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import {
    getCurrentProfile,
    updateProfile,
    selectProfile,
    selectUserIsSuccess,
    selectUserIsFail,
    selectUserErrors,
    resetProfile,
    resetRequestState,
} from '../../../redux/slices/userSlice';
import validationRules from '../../../helpers/formValidationRules';
import {
    Page,
    ProfileForm,
    Preview,
    Picture,
    PreviewAbout,
    NewPhotoButton,
    HiddenFileInput,
    InputGroup,
    Input,
    InputAbout,
    InputAboutCounter,
    InputWebsite,
    WebsiteLinkMarker,
    InputError,
    ResultError,
    SaveButton,
} from './ProfileEditPage.styled';

const aboutTextMax = 150;

function ProfileEditPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector(selectProfile);
    const isSuccess = useSelector(selectUserIsSuccess);
    const isFail = useSelector(selectUserIsFail);
    const serverAllErrors = useSelector(selectUserErrors);
    const serverFieldErrors = serverAllErrors.filter(err => err.type && err.type === 'field');
    const errorMessage = serverAllErrors.find(err => err.type === undefined)?.msg;

    const [tempAvatar, setTempAvatar] = useState(null);
    const [aboutTextLen, setAboutTextLen] = useState(profile?.about?.length || 0);

    const { register, handleSubmit, setError, formState: { isSubmitting, isSubmitted, isSubmitSuccessful, isDirty, errors } } = useForm({
        values: profile,
    });

    const sendData = data => {
        const formData = new FormData();
        for (const field in data) {
            if (field === 'picture' && data.picture[0]) {
                formData.append('picture', data.picture[0]);
            } else {
                formData.append(field, data[field]);
            }
        }

        dispatch(updateProfile(formData));
    }

    const openFileDialog = ({ target }) => target?.querySelector('input[type="file"]')?.click();
    const updateAvatar = ({ target: { files: { 0: file } } }) => file && setTempAvatar(URL.createObjectURL(file));
    const updateAboutTextCounter = ({ target: { value } }) => setAboutTextLen(value.length);

    useEffect(() => {
        dispatch(getCurrentProfile());

        return () => dispatch(resetProfile());
    }, [dispatch]);

    useEffect(() => {
        if (isSubmitted && isSubmitSuccessful && isSuccess) {
            navigate('/profile/current');
        }

        if (isFail) {
            serverFieldErrors.forEach(({ path, msg }) => {
                setError(path, { type: 'server', message: msg });
            });
        }

        return () => dispatch(resetRequestState());
    }, [isSubmitted, isSubmitSuccessful, isSuccess, isFail, navigate, dispatch, setError]);

    return (
        <Page>
            <Typography variant="h1">Edit profile</Typography>
            <ProfileForm component="form" encType="multipart/form-data" onSubmit={handleSubmit(sendData)} noValidate>
                <Preview>
                    <Picture src={tempAvatar ? tempAvatar : profile?.picture} />
                    <Box>
                        <Typography variant="h2">{profile?.username}</Typography>
                        {profile?.about && <PreviewAbout>
                            {profile?.about}
                        </PreviewAbout>
                        }
                    </Box>
                    <NewPhotoButton variant="contained" onClick={openFileDialog}>
                        New photo
                        <HiddenFileInput
                            type="file"
                            accept="image/jpg,image/jpeg,image/png,image/webp"
                            {...register('picture', { onChange: updateAvatar })}
                        />
                    </NewPhotoButton>
                </Preview>

                <InputGroup>
                    <Typography variant="h2">Username</Typography>
                    <Input
                        disabled={isSubmitting}
                        {...register('username', { ...validationRules.required, ...validationRules.min })}
                    />
                    {errors.username && <InputError color="error">{errors.username.message}</InputError>}
                </InputGroup>

                <InputGroup>
                    <Typography variant="h2">Full name</Typography>
                    <Input
                        disabled={isSubmitting}
                        {...register('full_name', { ...validationRules.required, ...validationRules.min })}
                    />
                    {errors.full_name && <InputError color="error">{errors.full_name.message}</InputError>}
                </InputGroup>

                <InputGroup>
                    <Typography variant="h2">Website</Typography>
                    <InputWebsite
                        disabled={isSubmitting}
                        {...register('website', validationRules.min)}
                    />
                    <WebsiteLinkMarker />
                    {errors.website && <InputError color="error">{errors.website.message}</InputError>}
                </InputGroup>

                <InputGroup>
                    <Typography variant="h2">About</Typography>
                    <InputAbout
                        disabled={isSubmitting}
                        maxLength={aboutTextMax}
                        {...register('about', {
                            ...validationRules.min, ...validationRules.max(aboutTextMax),
                            onChange: updateAboutTextCounter
                        })}
                    />
                    <InputAboutCounter>{aboutTextLen} / {aboutTextMax}</InputAboutCounter>
                    {errors.about && <InputError color="error">{errors.about.message}</InputError>}
                </InputGroup>

                {isFail && !isDirty && errorMessage && <ResultError color="error">{errorMessage}</ResultError>}


                <SaveButton
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                >
                    Save
                </SaveButton>
            </ProfileForm>
        </Page>
    );
}

export default ProfileEditPage;