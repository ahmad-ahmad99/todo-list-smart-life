import type { RouteObject } from 'react-router';

import { Navigate } from 'react-router';


import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';
import { CONFIG } from '../../global-config';

// ----------------------------------------------------------------------

export const routesSection: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to={CONFIG.auth.redirectPath} replace />,
    },

    // Auth
    ...authRoutes,

    // Dashboard
    ...dashboardRoutes,

    // No match
    { path: '*', element: <>404</> },
];
