import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

import { BASE_URL } from '../../constants';
import { STATUS_IDLE, STATUS_LOADING, STATUS_SUCCESS, STATUS_FAIL, postData } from '../../helpers/network';

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (data, { rejectWithValue }) => {
        try {
            return await postData(`${BASE_URL}/auth/register`, data);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (data, { rejectWithValue }) => {
        try {
            return await postData(`${BASE_URL}/auth/login`, data);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);

export const restoreUser = createAsyncThunk(
    'auth/restoreUser',
    async (data, { rejectWithValue }) => {
        try {
            return await postData(`${BASE_URL}/auth/restore`, data);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);

export const autoLoginUser = createAsyncThunk(
    'auth/autoLoginUser',
    async (authToken, { rejectWithValue }) => {
        try {
            return await postData(`${BASE_URL}/auth/autologin/${authToken}`);
        } catch (err) {
            return rejectWithValue(err.response?.data?.errors ?? [{ msg: err.message }]);
        }
    }
);

export const getUserToken = () => localStorage.getItem('token') ?? null;
const saveUserToken = token => localStorage.setItem('token', token);
const removeUserToken = () => localStorage.removeItem('token');
const getUser = (token = getUserToken()) => token ? jwtDecode(token) : null;

const isTokenExpired = token => {
    if (!token) {
        return true;
    }

    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    return decoded.exp < now;
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        status: STATUS_IDLE,
        errors: [],
    },
    reducers: {
        checkUserLoggedIn: state => {
            state.user = getUser();
            state.token = getUserToken();
        },
        logout: state => {
            state.user = null;
            state.token = null;
            removeUserToken();
        },
        resetAuthState: state => {
            state.status = STATUS_IDLE;
            state.errors = [];
        }
    },
    extraReducers: builder => {
        [registerUser, loginUser, autoLoginUser].forEach(methodName => {
            builder
                .addCase(methodName.pending, (state) => {
                    state.status = STATUS_LOADING;
                })
                .addCase(methodName.fulfilled, (state, action) => {
                    state.user = jwtDecode(action.payload.token);
                    state.token = action.payload.token;
                    state.status = STATUS_SUCCESS;
                    state.errors = [];

                    saveUserToken(action.payload.token);
                })
                .addCase(methodName.rejected, (state, action) => {
                    state.status = STATUS_FAIL;
                    state.errors = action.payload && action.payload.length > 0
                        ? action.payload
                        : [{ msg: action.error.message }];
                })
                ;
        });

        builder
            .addCase(restoreUser.pending, (state) => {
                state.status = STATUS_LOADING;
            })
            .addCase(restoreUser.fulfilled, (state) => {
                state.status = STATUS_SUCCESS;
                state.errors = [];
            })
            .addCase(restoreUser.rejected, (state, action) => {
                state.status = STATUS_FAIL;
                state.errors = action.payload && action.payload.length > 0
                    ? action.payload
                    : [{ msg: action.error.message }];
            })
            ;
    },
});

export const selectAuthUser = state => state.auth.user;
export const selectAuthIsLoading = state => state.auth.status === STATUS_LOADING;
export const selectAuthIsSuccess = state => state.auth.status === STATUS_SUCCESS;
export const selectAuthIsFail = state => state.auth.status === STATUS_FAIL;
export const selectAuthErrors = state => state.auth.errors;

export const { checkUserLoggedIn, logout, resetAuthState } = authSlice.actions;

export const checkTokenExpirationMiddleware = (store) => (next) => (action) => {
    const result = next(action);

    const token = store.getState().auth.token;
    if (token && isTokenExpired(token)) {
        store.dispatch(logout());
        console.warn('Authentication token has expired!');
    }

    return result;
}

export default authSlice.reducer;