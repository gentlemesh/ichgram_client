import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';

import { Posts, Post, AbsentText } from './PostsGrid.styled';

function PostsGrid({ posts }) {
    return (
        <>
            {posts && Array.isArray(posts) && posts.length > 0
                ? (
                    <Posts>
                        {posts.map(post => (
                            <NavLink key={post._id} to={`/post/${post._id}`}>
                                <Post post={post} />
                            </NavLink>
                        ))}
                    </Posts>
                )
                : <AbsentText variant="bodyGrey">No posts to show</AbsentText>
            }
        </>
    );
}

export default PostsGrid;