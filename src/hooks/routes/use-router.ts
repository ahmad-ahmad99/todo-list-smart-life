import type { NavigateOptions } from 'react-router';

import { useNavigate } from 'react-router';
import { useMemo, useCallback } from 'react';


export function useRouter() {
    const navigate = useNavigate();

    const push = useCallback(
        (href: string, options?: NavigateOptions) => {

            navigate(href, options);
        },
        [navigate]
    );

    const replace = useCallback(
        (href: string, options?: NavigateOptions) => {

            navigate(href, { ...options, replace: true });
        },
        [navigate]
    );

    const router = useMemo(
        () => ({
            push,
            replace,
            back: () => navigate(-1),
            forward: () => navigate(1),
            refresh: () => navigate(0),
            ...navigate,
        }),
        [navigate, push, replace]
    );

    return router;
}
