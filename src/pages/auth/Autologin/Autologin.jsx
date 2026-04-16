import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';

import { autoLoginUser } from '../../../redux/slices/authSlice';

function Autologin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authToken } = useParams();
    const [isSuccess] = useOutletContext();

    dispatch(autoLoginUser(authToken));

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
    }, [isSuccess, navigate]);

    return;
}

export default Autologin;