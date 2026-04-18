import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRandomPosts, resetRandomPosts, selectRandomPosts } from '../../../redux/slices/postSlice';
import PostsGrid from '../../../components/PostsGrid/PostsGrid';
import { Page } from './ExplorePage.styled';

function ExplorePage() {
    const dispatch = useDispatch();
    const posts = useSelector(selectRandomPosts);

    useEffect(() => {
        dispatch(getRandomPosts());

        return () => dispatch(resetRandomPosts());
    }, [dispatch]);

    return (
        <Page><PostsGrid posts={posts} /></Page>
    );
}

export default ExplorePage;