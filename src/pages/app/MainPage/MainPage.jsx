import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Box, Typography } from '@mui/material';

import { selectAuthUser } from '../../../redux/slices/authSlice';
import { followUser, unfollowUser } from '../../../redux/slices/userSlice';
import { getPosts, selectPosts, toggleLikePostInStore, toggleLikePost } from '../../../redux/slices/postSlice';
import {
    Posts, Post,
    Author, ImgAvatar, Image,
    FollowButton, ActionButtons, ActionButton,
    Comments, Comment, CommentText,
    LastBlock,
} from './MainPage.styled';
import IconLike from '../../../assets/icons/like.svg';
import IconLikeFilled from '../../../assets/icons/like-filled.svg';
import IconComment from '../../../assets/icons/comment.svg';
import ImgPostsSeen from '../../../assets/ico_posts_seen.png';

dayjs.extend(relativeTime);

function MainPage() {
    const dispatch = useDispatch();
    const [shouldReload, setShouldReload] = useState(false);
    const authUser = useSelector(selectAuthUser);
    const posts = useSelector(selectPosts);

    useEffect(() => {
        dispatch(getPosts());

        return () => setShouldReload(false);
    }, [shouldReload, dispatch]);

    const formatDate = date => dayjs(date).fromNow(true);

    const toggleLike = postId => {
        dispatch(toggleLikePostInStore(postId));
        dispatch(toggleLikePost(postId));
    }

    const toggleFollow = user => {
        if (user.isFollowed) {
            dispatch(unfollowUser(user.id));
        } else {
            dispatch(followUser(user.id));
        }
        setShouldReload(true);
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
                        {authUser && authUser.id !== post.author.id && (
                            <FollowButton onClick={() => toggleFollow(post.author)}>
                                {post.author.isFollowed ? 'unfollow' : 'follow'}
                            </FollowButton>
                        )}
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
                    <Comments>
                        {post.firstComments && post.firstComments.map(comment => (
                            <Comment key={comment.id}>
                                <Typography fontWeight="bold">{comment.author.username}</Typography>
                                <CommentText>{comment.text}</CommentText>
                            </Comment>
                        ))}
                    </Comments>
                    <NavLink to={`/post/${post.id}`}>
                        <Typography variant="bodyGrey">View all comments ({post.commentsCount})</Typography>
                    </NavLink>
                </Post>
            ))}
            <LastBlock>
                <img src={ImgPostsSeen} />
                <Typography fontSize="1.4rem">You've seen all the updates</Typography>
                <Typography variant="bodyGrey">You have viewed all new publications</Typography>
            </LastBlock>
        </Posts>
    );
}

export default MainPage;