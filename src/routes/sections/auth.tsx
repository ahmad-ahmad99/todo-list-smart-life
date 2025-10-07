import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';
import { GuestGuard } from '../../components/auth/guard';
import { AuthSplitLayout } from '../../layouts/auth-split';
import { SplashScreen } from '../../components/shared/loading-screen';


// ----------------------------------------------------------------------

/** **************************************
 * Jwt
 *************************************** */
const Jwt = {
    SignInPage: lazy(() => import('../../pages/auth/jwt/SignIn')),
};

const authJwt = {
    path: 'jwt',
    children: [
        {
            path: 'sign-in',
            element: (
                <GuestGuard>
                    <AuthSplitLayout>
                        <Jwt.SignInPage />
                    </AuthSplitLayout>
                </GuestGuard>
            ),
        },

    ],
};

// ----------------------------------------------------------------------

export const authRoutes: RouteObject[] = [
    {
        path: 'auth',
        element: (
            <Suspense fallback={<SplashScreen />}>
                <Outlet />
            </Suspense>
        ),
        children: [authJwt],
    },
];
