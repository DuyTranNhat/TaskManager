import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '~/Context';
import config from '~/config';

type Props = {
    children: ReactNode;
};

const GuestRoute: React.FC<Props> = ({ children }) => {
    const { user } = useAuth();
    if (user) return <Navigate to={config.routes.dashboard} replace />;
    return children;
};

export default GuestRoute;
