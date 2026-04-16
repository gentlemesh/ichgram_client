import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { getPosts, selectPosts } from '../../../redux/slices/postSlice';
import { Posts, Post, Author, ImgAvatar, Image, FollowButton } from './MainPage.styled';
import { Typography } from '@mui/material';

dayjs.extend(relativeTime);

function MainPage() {
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const formatDate = date => dayjs(date).fromNow();

    return (
        <Posts>
            {posts && posts.map(post => (
                <Post key={post.id}>
                    <Author>
                        <NavLink to={`/profile/${post.author.id}`}>
                            <ImgAvatar src={post.author.picture} />
                            <Typography fontWeight="bold">{post.author.username}</Typography>
                        </NavLink>
                        <Typography variant="bodyGrey">{formatDate(post.createdAt)}</Typography>
                        <FollowButton>{post.author.isFollowed ? 'unfollow' : 'follow'}</FollowButton>
                    </Author>
                    <NavLink to={`/post/${post.id}`}>
                        <Image sx={{ backgroundImage: `url(${post.image})` }} />
                    </NavLink>
                </Post>
            ))}
        </Posts>
    );
}

export default MainPage;