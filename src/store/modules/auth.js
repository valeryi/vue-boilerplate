import { apolloClient } from '@/vue-apollo';
import SignInGQL from "@/graphql/signIn.gql";

export default {
    namespaced: true,
    state: {
        token: null,
        authStatus: false
    },
    getters: {
        isAuthenticated: (state, getters) => {
            const token = getters.getToken;

            return (token.valid) ? true : false;

        },
        getToken: (state) => {

            let valid = false;
            const token = state.token || localStorage.getItem('auth-token');
            const now = Date.now();

            if (!token) return { valid: false, payload: null, raw: null, exp: null }

            const encodedPayload = token.split('.')[1];
            const { payload, iat, exp } = JSON.parse(atob(encodedPayload));

            if ((now < (exp * 1000))) valid = true;

            return {
                valid,
                payload,
                iat,
                exp,
                raw: token
            }
        }
    },
    actions: {
        async signIn({ commit, getters }, formInput) {
            try {
                const { data } = await apolloClient.mutate({
                    mutation: SignInGQL,
                    variables: { ...formInput }
                })

                const { token } = data.signIn;
                await commit('setToken', token);

                const { payload } = getters.getToken;
                const { userData } = payload;

                await commit('users/setAuthUser', userData, { root: true });
                await commit('signInUser');
            } catch (e) {
                console.error(e)
            }
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('auth-token', token);
        },
        signInUser(state) {
            state.authStatus = true;
        },
        signOutUser(state) {
            state.authStatus = false;
            state.token = null;
            localStorage.removeItem('auth-token');
        }
    }
}