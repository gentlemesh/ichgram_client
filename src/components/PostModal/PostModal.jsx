import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { Box, Modal, Grow } from '@mui/material';

import { ProfileContainer, PostsContainer } from '../../pages/app/ProfilePage/ProfilePage.styled';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import PostsGrid from '../../components/PostsGrid/PostsGrid';

function PostModal({ content, profile, posts }) {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <ProfileContainer>
            {profile && <ProfileInfo user={profile} setShouldReload={() => { }} />}
            <PostsContainer>
                {posts && <PostsGrid posts={posts} />}
            </PostsContainer>
            <Modal open disableScrollLock disablePortal slotProps={{
                root: {
                    sx: {
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
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
                    onClick: e => {
                        e.stopPropagation();
                        if (e.target === e.currentTarget) {
                            navigate(`/profile/${profile.id}`);
                        }
                    },
                },
            }}>
                <Grow in appear timeout={300} easing="ease-in" mountOnEnter unmountOnExit>
                    {content}
                </Grow>
            </Modal>
        </ProfileContainer>
    );
}

export default PostModal;