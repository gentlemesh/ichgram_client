import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { selectAuthUser } from '../../../redux/slices/authSlice';
import { getProfileByUserId, selectProfile } from '../../../redux/slices/userSlice';
import { getPostsForUser, selectProfilePosts } from '../../../redux/slices/postSlice';
import { ProfileContainer, PostsContainer } from './ProfilePage.styled';
import ProfileInfo from '../../../components/ProfileInfo/ProfileInfo';
import PostsGrid from '../../../components/PostsGrid/PostsGrid';

function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const authUser = useSelector(selectAuthUser);
    const [shouldReload, setShouldReload] = useState(false);
    const profile = useSelector(selectProfile);
    const posts = useSelector(selectProfilePosts);

    useEffect(() => {
        if (id && authUser && authUser.id) {
            if (id === authUser.id) {
                navigate('/profile/current');
            } else {
                dispatch(getProfileByUserId(id));
                dispatch(getPostsForUser(id));
            }
        }

        return () => setShouldReload(false);
    }, [id, authUser, shouldReload, navigate, dispatch]);

    return (
        <ProfileContainer>
            {profile && <ProfileInfo user={profile} setShouldReload={setShouldReload} />}
            <PostsContainer>
                {posts && <PostsGrid posts={posts} />}
            </PostsContainer>
        </ProfileContainer>
    );
}

export default ProfilePage;