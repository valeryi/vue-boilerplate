import store from '@/store';

export const isAuthenticated = (router) => {

    router.beforeEach((to, from, next) => {

        const isAuthenticated = store.getters['auth/isAuthenticated'];

        if (to.matched.some(record => record.meta.requiresAuth)) {

            if (isAuthenticated) {
                next();
            } else {
                next({
                    path: '/sign-in',
                    query: { redirect: to.fullPath }
                });
            }

        } else {
            next();
        }

    })
}