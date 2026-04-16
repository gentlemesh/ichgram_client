import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { BASE_URL } from '../../constants';
import { STATUS_IDLE, STATUS_LOADING, STATUS_SUCCESS, STATUS_FAIL, getData, postData } from '../../helpers/network';

export const getCurrentUser = createAsyncThunk(
    'user/getCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            return await getData(`${BASE_URL}/user/`);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const getUserById = createAsyncThunk(
    'user/getUserById',
    async (id, { rejectWithValue }) => {
        try {
            return await getData(`${BASE_URL}/user/${id}`);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const getUsers = createAsyncThunk(
    'user/getUsers',
    async (_, { rejectWithValue }) => {
        try {
            return await getData(`${BASE_URL}/user/all`);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const searchUsers = createAsyncThunk(
    'user/searchUsers',
    async (query, { rejectWithValue }) => {
        try {
            return await getData(`${BASE_URL}/user/search?q=${query}`);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const getCurrentProfile = createAsyncThunk(
    'user/getCurrentProfile',
    async (_, { rejectWithValue }) => {
        try {
            return await getData(`${BASE_URL}/profile/`);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const getProfileByUserId = createAsyncThunk(
    'user/getProfileByUserId',
    async (id, { rejectWithValue }) => {
        try {
            return await getData(`${BASE_URL}/profile/${id}`);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            await postData(`${BASE_URL}/profile/`, data);
            dispatch(getCurrentProfile());
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const followUser = createAsyncThunk(
    'user/followUser',
    async (id, { rejectWithValue }) => {
        try {
            await postData(`${BASE_URL}/user/follow/${id}`);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);
export const unfollowUser = createAsyncThunk(
    'user/unfollowUser',
    async (id, { rejectWithValue }) => {
        try {
            await postData(`${BASE_URL}/user/unfollow/${id}`);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        user: null,
        users: null,
        profile: null,
        status: STATUS_IDLE,
        errors: [],
    },
    reducers: {},
    extraReducers: builder => {
        [
            getCurrentUser,
            getUserById,
            getUsers,
            searchUsers,
            getCurrentProfile,
            getProfileByUserId,
            updateProfile,
            followUser,
            unfollowUser,
        ].forEach((thunk, i) => {
            builder
                .addCase(thunk.pending, (state) => {
                    state.status = STATUS_LOADING;
                })
                .addCase(thunk.fulfilled, (state, action) => {
                    state.status = STATUS_SUCCESS;
                    state.errors = [];

                    if (thunk === getCurrentUser) {
                        state.currentUser = action.payload.data.user;
                    }
                    if (thunk === getUserById) {
                        state.user = action.payload.data.user;
                    }
                    if (thunk === getUsers || thunk === searchUsers) {
                        state.users = action.payload.data.users;
                    }
                    if (thunk === getCurrentProfile || thunk === getProfileByUserId) {
                        state.profile = action.payload.data.profile;
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

export const selectCurrentUser = state => state.user.currentUser;
export const selectAnotherUser = state => state.user.user;
export const selectUsers = state => state.user.users;
export const selectProfile = state => state.user.profile;
export const selectUserIsLoading = state => state.user.status === STATUS_LOADING;
export const selectUserIsSuccess = state => state.user.status === STATUS_SUCCESS;
export const selectUserIsFail = state => state.user.status === STATUS_FAIL;
export const selectUserErrors = state => state.user.errors;

export default userSlice.reducer;