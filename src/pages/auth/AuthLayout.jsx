import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import {
    resetAuthState,
    selectAuthIsLoading,
    selectAuthIsSuccess,
    selectAuthIsFail,
    selectAuthErrors,
} from '../../redux/slices/authSlice';

function AuthLayout() {
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const isLoading = useSelector(selectAuthIsLoading);
    const isSuccess = useSelector(selectAuthIsSuccess);
    const isFail = useSelector(selectAuthIsFail);
    const serverAllErrors = useSelector(selectAuthErrors);
    const serverFieldErrors = serverAllErrors.filter(err => err.type && err.type === 'field');
    const errorMessage = serverAllErrors.find(err => err.type === undefined)?.msg;

    useEffect(() => {
        return () => dispatch(resetAuthState());
    }, [pathname, dispatch]);

    if (isLoading) {
        return 'Loading…';
    }

    return <Outlet context={[isSuccess, isFail, serverFieldErrors, errorMessage]} />;
}

export default AuthLayout;