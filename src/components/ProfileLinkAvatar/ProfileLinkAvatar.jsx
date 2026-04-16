import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentUser, selectCurrentUser } from '../../redux/slices/userSlice';
import { ImgAvatar } from './ProfileLinkAvatar.styled';

function ProfileLinkAvatar() {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

    return <ImgAvatar src={user?.picture} />;
}

export default ProfileLinkAvatar;