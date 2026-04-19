import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Box, Button, Typography } from '@mui/material';

import { selectAuthUser } from '../../../redux/slices/authSlice';
import { getCurrentProfile, getProfileByUserId, followUser, unfollowUser, selectProfile } from '../../../redux/slices/userSlice';
import {
    getPost, selectPost,
    getPostsForCurrentUser, getPostsForUser, selectProfilePosts,
    toggleLikePost, toggleLikeCurrentPostInStore,
    getComments, selectComments,
    toggleLikeComment, toggleLikeCommentInStore,
} from '../../../redux/slices/postSlice';
import PostModal from '../../../components/PostModal/PostModal';
import {
    ModalContent,
    Image,
    Content,
    Top,
    ImgAvatar,
    FollowButton,
    Text,
    Comment,
    CommentLikesCount,
    ActionPanel,
    ActionButtons,
    ActionButton,
} from './PostPage.styled';
import IconLike from '../../../assets/icons/like.svg';
import IconLikeFilled from '../../../assets/icons/like-filled.svg';
import IconComment from '../../../assets/icons/comment.svg';
import AddComment from '../../../components/AddComment/AddComment';

dayjs.extend(relativeTime);

function PostPage() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const authUser = useSelector(selectAuthUser);
    const currentUserId = authUser?.id;

    const post = useSelector(selectPost);
    const comments = useSelector(selectComments);
    console.log({ post, comments });
    const userId = post?.author?.id;

    const profile = useSelector(selectProfile);
    const posts = useSelector(selectProfilePosts);

    const [shouldReload, setShouldReload] = useState(false);

    useEffect(() => {
        dispatch(getPost(id));
        dispatch(getComments(id));

        return () => setShouldReload(false);
    }, [id, shouldReload, dispatch]);

    useEffect(() => {
        if (userId && currentUserId) {
            if (userId === currentUserId) {
                dispatch(getCurrentProfile());
                dispatch(getPostsForCurrentUser());
            } else {
                dispatch(getProfileByUserId(userId));
                dispatch(getPostsForUser(userId));
            }
        }
    }, [userId, currentUserId, dispatch]);

    const formatDate = date => dayjs(date).fromNow(true);

    const toggleLike = postId => {
        dispatch(toggleLikeCurrentPostInStore(postId));
        dispatch(toggleLikePost(postId));
    }

    const toggleCommentLike = commentId => {
        dispatch(toggleLikeCommentInStore(commentId));
        dispatch(toggleLikeComment(commentId));
    }

    const toggleFollow = user => {
        if (user.isFollowed) {
            dispatch(unfollowUser(user.id));
        } else {
            dispatch(followUser(user.id));
        }
        setShouldReload(true);
    }

    const content = (
        <ModalContent>
            {post && (
                <>
                    <Image src={post.image} />
                    <Content>
                        <Top>
                            <NavLink to={`/profile/${post.author.id}`}>
                                <ImgAvatar src={post.author.picture} />
                            </NavLink>
                            <NavLink to={`/profile/${post.author.id}`}>
                                <Typography fontWeight="bold">{post.author.username}</Typography>
                            </NavLink>
                            {currentUserId !== post.author.id && (
                                <>
                                    <Typography>•</Typography>
                                    <FollowButton onClick={() => toggleFollow(post.author)}>
                                        {post.author.isFollowed ? 'unfollow' : 'follow'}
                                    </FollowButton>
                                </>
                            )}
                        </Top>

                        <Text>
                            <NavLink to={`/profile/${post.author.id}`}>
                                <ImgAvatar src={post.author.picture} />
                            </NavLink>
                            <Box>
                                <Typography>
                                    <NavLink to={`/profile/${post.author.id}`}>
                                        <Typography fontWeight="bold" component="span">{post.author.username} </Typography>
                                    </NavLink>
                                    {post.text}
                                </Typography>
                                <Typography variant="bodyGrey" flexGrow="1" width="100%">{formatDate(post.createdAt)}</Typography>
                            </Box>
                        </Text>

                        <>
                            {comments && comments.map(comment => (
                                <Comment key={comment.id}>
                                    <NavLink to={`/profile/${comment.author.id}`}>
                                        <ImgAvatar src={comment.author.picture} />
                                    </NavLink>
                                    <Box>
                                        <Typography>
                                            <NavLink to={`/profile/${comment.author.id}`}>
                                                <Typography fontWeight="bold" component="span">{comment.author.username} </Typography>
                                            </NavLink>
                                            {comment.text}
                                        </Typography>
                                        <Typography variant="bodyGrey" flexGrow="1" width="100%">
                                            {formatDate(comment.createdAt)}
                                            <CommentLikesCount>Likes: {comment.likesCount}</CommentLikesCount>
                                        </Typography>
                                    </Box>
                                    <ActionButton
                                        sx={{
                                            transform: `scale(0.7)`,
                                            marginLeft: 'auto',
                                            flexShrink: 0,
                                        }}
                                        onClick={() => toggleCommentLike(comment.id)}
                                    >
                                        <img
                                            src={comment.isLiked ? IconLikeFilled : IconLike}
                                            alt={`${comment.isLiked ? 'Dislike' : 'Like'} this comment`}
                                            title={`${comment.isLiked ? 'Dislike' : 'Like'} this comment`}
                                        />
                                    </ActionButton>
                                </Comment>
                            ))}
                        </>

                        <ActionPanel>
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
                            <Typography variant="bodyGrey">{formatDate(post.createdAt)}</Typography>
                        </ActionPanel>

                        <AddComment postId={post.id} />
                    </Content>
                </>
            )}
        </ModalContent>
    );

    return <PostModal content={content} profile={profile} posts={posts} />
}

export default PostPage;