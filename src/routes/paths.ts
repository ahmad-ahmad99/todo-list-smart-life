
const ROOTS = {
    AUTH: '/auth',
    DASHBOARD: '/dashboard',
};


export const paths = {
    // AUTH
    auth: {

        jwt: {
            signIn: `${ROOTS.AUTH}/jwt/sign-in`,
        },

    },
    // DASHBOARD
    dashboard: {
        root: ROOTS.DASHBOARD,
        services: `/kanban-board`
    },
};
