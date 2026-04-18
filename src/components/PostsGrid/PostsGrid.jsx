import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';

import { Posts, Post } from './PostsGrid.styled';

function PostsGrid({ posts }) {
    return (
        <Posts>
            {posts && Array.isArray(posts) && (
                posts.length > 0
                    ? posts.map(post => (
                        <NavLink key={post._id} to={`/post/${post._id}`}>
                            <Post post={post} />
                        </NavLink>
                    ))
                    : <Typography variant="bodyGrey">No posts to show</Typography>
            )}
        </Posts>
    );
}

export default PostsGrid;