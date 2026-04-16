import { Navigate } from 'react-router-dom';

import Layout from '../../pages/app/Layout';

const ProtectedRoute = ({ isLoginChecked, user }) => {
    if (isLoginChecked && !user) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Layout />;
};

export default ProtectedRoute;