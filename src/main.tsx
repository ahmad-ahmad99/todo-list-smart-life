import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router';
import { routesSection } from './routes/sections/index.tsx';

const router = createBrowserRouter([
  {
    Component: () => (
      <App>
        <Outlet />
      </App>
    ),
    errorElement: <>Error Boundray</>,
    children: routesSection,
  },
]);

const root = createRoot(document.getElementById('root')!);

root.render(
  <RouterProvider router={router} />
);