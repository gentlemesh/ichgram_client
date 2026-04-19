import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { BASE_URL } from '../../constants';
import { STATUS_IDLE, STATUS_LOADING, STATUS_SUCCESS, STATUS_FAIL, getData, postData, patchData, deleteData } from '../../helpers/network';

export const getPosts = createAsyncThunk(
    'post/getPosts',
    async (_, { rejectWithValue }) => {
        try {
            return await getData(`${BASE_URL}/post/`);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const getRandomPosts = createAsyncThunk(
    'post/getRandomPosts',
    async (_, { rejectWithValue }) => {
        try {
            return await getData(`${BASE_URL}/post/random`);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const getPostsForCurrentUser = createAsyncThunk(
    'post/getPostsForCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            return await getData(`${BASE_URL}/post/user`);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const getPostsForUser = createAsyncThunk(
    'post/getPostsForUser',
    async (userId, { rejectWithValue }) => {
        try {
            return await getData(`${BASE_URL}/post/user/${userId}`);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const getPost = createAsyncThunk(
    'post/getPost',
    async (id, { rejectWithValue }) => {
        try {
            return await getData(`${BASE_URL}/post/one/${id}`);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const createPost = createAsyncThunk(
    'post/createPost',
    async (_, { rejectWithValue }) => {
        try {
            await postData(`${BASE_URL}/post/`);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const updatePost = createAsyncThunk(
    'post/updatePost',
    async ({ id, ...data }, { rejectWithValue }) => {
        try {
            await patchData(`${BASE_URL}/post/${id}`, data);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const toggleLikePost = createAsyncThunk(
    'post/toggleLikePost',
    async (id, { rejectWithValue }) => {
        try {
            await postData(`${BASE_URL}/post/${id}/like`);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (id, { rejectWithValue }) => {
        try {
            await deleteData(`${BASE_URL}/post/${id}`);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const getComments = createAsyncThunk(
    'post/getComments',
    async (postId, { rejectWithValue }) => {
        try {
            return await getData(`${BASE_URL}/comment/${postId}`);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const addComment = createAsyncThunk(
    'post/addComment',
    async ({ postId, ...data }, { rejectWithValue, dispatch }) => {
        try {
            await postData(`${BASE_URL}/comment/${postId}`, data);
            dispatch(getComments(postId));
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const editComment = createAsyncThunk(
    'post/editComment',
    async ({ id, postId, ...data }, { rejectWithValue, dispatch }) => {
        try {
            await patchData(`${BASE_URL}/comment/${id}`, data);
            dispatch(getComments(postId));
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const toggleLikeComment = createAsyncThunk(
    'post/toggleLikeComment',
    async (id, { rejectWithValue }) => {
        try {
            await postData(`${BASE_URL}/comment/${id}/like`);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: null,
        randomPosts: null,
        profilePosts: null,
        post: null,
        comments: null,
        status: STATUS_IDLE,
        errors: [],
    },
    reducers: {
        toggleLikePostInStore: (state, action) => {
            const post = state.posts.find(p => p.id === action.payload);
            post.isLiked = !post.isLiked;
            if (post.isLiked) {
                post.likesCount++;
            } else {
                post.likesCount--;
            }
        },
        toggleLikeCurrentPostInStore: state => {
            state.post.isLiked = !state.post.isLiked;
            if (state.post.isLiked) {
                state.post.likesCount++;
            } else {
                state.post.likesCount--;
            }
        },
        toggleLikeCommentInStore: (state, action) => {
            const comment = state.comments.find(c => c.id === action.payload);
            comment.isLiked = !comment.isLiked;
            if (comment.isLiked) {
                comment.likesCount++;
            } else {
                comment.likesCount--;
            }
        },
        resetRandomPosts: state => {
            state.randomPosts = null;
        },
        resetRequestState: state => {
            state.status = STATUS_IDLE;
            state.errors = [];
        },
    },
    extraReducers: builder => {
        [
            getPosts,
            getRandomPosts,
            getPostsForCurrentUser,
            getPostsForUser,
            getPost,
            createPost,
            updatePost,
            deletePost,
            toggleLikePost,
            getComments,
            addComment,
            editComment,
            toggleLikeComment,
        ].forEach((thunk, i) => {
            builder
                .addCase(thunk.pending, (state) => {
                    state.status = STATUS_LOADING;
                })
                .addCase(thunk.fulfilled, (state, action) => {
                    state.status = STATUS_SUCCESS;
                    state.errors = [];

                    if (thunk === getPosts) {
                        state.posts = action.payload.data.posts;
                    }
                    if (thunk === getRandomPosts) {
                        state.randomPosts = action.payload.data.posts;
                    }
                    if (thunk === getPostsForCurrentUser || thunk === getPostsForUser) {
                        state.profilePosts = action.payload.data.posts;
                    }
                    if (thunk === getPost) {
                        state.post = action.payload.data.post;
                    }
                    if (thunk === getComments) {
                        state.comments = action.payload.data.comments;
                    }
                })
                .addCase(thunk.rejected, (state, action) => {
                    console.error(`thunk #${i} - fail action.payload: `, action.payload);
                    state.status = STATUS_FAIL;
                    state.errors = action.payload && action.payload.length > 0
                        ? action.payload
                        : [{ msg: action.error.message }];
                })
                ;
        });
    },
});

export const selectPosts = state => state.post.posts;
export const selectRandomPosts = state => state.post.randomPosts;
export const selectProfilePosts = state => state.post.profilePosts;
export const selectPost = state => state.post.post;
export const selectComments = state => state.post.comments;
export const selectPostIsLoading = state => state.post.status === STATUS_LOADING;
export const selectPostIsSuccess = state => state.post.status === STATUS_SUCCESS;
export const selectPostIsFail = state => state.post.status === STATUS_FAIL;
export const selectPostErrors = state => state.post.errors;

export const { toggleLikePostInStore, toggleLikeCurrentPostInStore, toggleLikeCommentInStore, resetRandomPosts, resetRequestState } = postSlice.actions;

export default postSlice.reducer;