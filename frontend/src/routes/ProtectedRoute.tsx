import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '~/Context';
import config from '~/config';

type Props = {
    children: ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
    const location = useLocation();
    const { user } = useAuth();
    if (!user) {
        return <Navigate to={config.routes.login} state={{ from: location }} replace />;
    }
    return children;
};

export default ProtectedRoute;
    