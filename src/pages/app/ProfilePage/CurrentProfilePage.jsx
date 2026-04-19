import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentProfile, selectProfile } from '../../../redux/slices/userSlice';
import { getPostsForCurrentUser, selectProfilePosts } from '../../../redux/slices/postSlice';
import { ProfileContainer, PostsContainer } from './ProfilePage.styled';
import ProfileInfo from '../../../components/ProfileInfo/ProfileInfo';
import PostsGrid from '../../../components/PostsGrid/PostsGrid';

function ProfilePage() {
    const dispatch = useDispatch();
    const [shouldReload, setShouldReload] = useState(false);
    const profile = useSelector(selectProfile);
    const posts = useSelector(selectProfilePosts);

    useEffect(() => {
        dispatch(getCurrentProfile());
        dispatch(getPostsForCurrentUser());

        return () => setShouldReload(false);
    }, [shouldReload, dispatch]);

    return (
        <ProfileContainer>
            {profile && <ProfileInfo user={profile} setShouldReload={setShouldReload} isCurrent />}
            <PostsContainer>
                {posts && <PostsGrid posts={posts} />}
            </PostsContainer>
        </ProfileContainer>
    );
}

export default ProfilePage;