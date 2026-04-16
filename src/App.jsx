import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { checkUserLoggedIn, selectAuthUser } from './redux/slices/authSlice';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import AuthLayout from './pages/auth/AuthLayout';
import Login from './pages/auth/Login/Login';
import Register from './pages/auth/Register/Register';
import Restore from './pages/auth/Restore/Restore';
import Autologin from './pages/auth/Autologin/Autologin';

import MainPage from './pages/app/MainPage/MainPage';

import Error404Page from './pages/app/Error404Page/Error404Page';
import PlaceholderPage from './pages/app/PlaceholderPage';

function App() {
    const dispatch = useDispatch();
    const [isLoginChecked, setIsLoginChecked] = useState(false);
    const user = useSelector(selectAuthUser);

    useEffect(() => {
        dispatch(checkUserLoggedIn());
        if (!isLoginChecked) {
            setIsLoginChecked(true);
        }

    }, [isLoginChecked, setIsLoginChecked, dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="auth" element={<AuthLayout />}>
                    <Route index element={<Login />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="restore" element={<Restore />} />
                    <Route path="autologin/:authToken" element={<Autologin />} />
                    <Route path="*" element={<Error404Page />} />
                </Route>

                {/* Protected Routes */}
                <Route element={<ProtectedRoute isLoginChecked={isLoginChecked} user={user} />}>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/search' element={<PlaceholderPage />} />
                    <Route path='/explore' element={<PlaceholderPage />} />
                    <Route path='/messages' element={<PlaceholderPage />} />
                    <Route path='/notification' element={<PlaceholderPage />} />
                    <Route path='/create' element={<PlaceholderPage />} />
                    <Route path='/profile/current' element={<PlaceholderPage />} />
                    <Route path='/profile/:id' element={<PlaceholderPage />} />
                    <Route path='/post/:id' element={<PlaceholderPage />} />
                    <Route path='*' element={<Error404Page />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;