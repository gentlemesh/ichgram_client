import { configureStore } from '@reduxjs/toolkit';

import authReducer, { checkTokenExpirationMiddleware } from './slices/authSlice';
import userReducer from './slices/userSlice';
import postReducer from './slices/postSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        post: postReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(checkTokenExpirationMiddleware),
    devTools: true,
});