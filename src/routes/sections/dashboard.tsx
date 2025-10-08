import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';
import { usePathname } from '../../hooks/routes';
import { LoadingScreen } from '../../components/shared/loading-screen';
import { DashboardLayout } from '../../layouts/dashboard';
import { CONFIG } from '../../global-config';
import { AuthGuard } from '../../components/auth/guard';


const KanbanBoardPage = lazy(() => import('../../pages/dashboard/kanban-board'))


// ---------------------------------------------------------------

function SuspenseOutlet() {
    const pathname = usePathname();
    return (
        <Suspense key={pathname} fallback={<LoadingScreen />}>
            <Outlet />
        </Suspense>
    );
}

const dashboardLayout = () => (
    <DashboardLayout >
        <SuspenseOutlet />
    </DashboardLayout>
);

export const dashboardRoutes: RouteObject[] = [
    {
        path: 'dashboard',
        element: CONFIG.auth.skip ? dashboardLayout() : <AuthGuard>{dashboardLayout()}</AuthGuard>,
        children: [
            { element: <KanbanBoardPage />, index: true },
            { element: <KanbanBoardPage />, path: 'kanban-board' },

        ],
    },
];
