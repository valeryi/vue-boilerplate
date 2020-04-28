export default {
    namespaced: true,
    state: {
        authUser: null,
    },
    getters: {
        getAuthUser: (state) => {
            return state.authUser || JSON.parse(localStorage.getItem('auth-user'));
        }
    },
    actions: {
    },
    mutations: {
        setAuthUser(state, user) {
            localStorage.setItem('auth-user', JSON.stringify(user));
            state.authUser = { ...user };
        },
    }
}