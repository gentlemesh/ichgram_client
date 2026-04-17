import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Typography } from '@mui/material';

import { getPosts, selectPosts, toggleLikePostInStore, toggleLikePost } from '../../../redux/slices/postSlice';
import { Posts, Post, Author, ImgAvatar, Image, FollowButton, ActionButtons, ActionButton } from './MainPage.styled';
import IconLike from '../../../assets/icons/like.svg';
import IconLikeFilled from '../../../assets/icons/like-filled.svg';
import IconComment from '../../../assets/icons/comment.svg';

dayjs.extend(relativeTime);

function MainPage() {
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const formatDate = date => dayjs(date).fromNow();

    const toggleLike = postId => {
        dispatch(toggleLikePostInStore(postId));
        dispatch(toggleLikePost(postId));
    }

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
                    <ActionButtons>
                        <ActionButton onClick={() => toggleLike(post.id)}>
                            <img
                                src={post.isLiked ? IconLikeFilled : IconLike}
                                alt={`${post.isLiked ? 'Dislike' : 'Like'} this post`}
                                title={`${post.isLiked ? 'Dislike' : 'Like'} this post`}
                            />
                        </ActionButton>
                        <ActionButton>
                            <NavLink to={`/post/${post.id}`}>
                                <img src={IconComment} alt="Comment this post" title="Comment this post" />
                            </NavLink>
                        </ActionButton>
                    </ActionButtons>
                    <Typography fontWeight="bold">{post.likesCount} likes</Typography>
                </Post>
            ))}
        </Posts>
    );
}

export default MainPage;