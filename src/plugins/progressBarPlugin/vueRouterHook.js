export default function vueRouter(state, router) {
    if (router) {
        router.beforeEach((to, from, next) => {
            state.next('request');
            next();
            state.next('response');
        })

        router.afterEach(() => {
            state.next('done');
        })

    }
}