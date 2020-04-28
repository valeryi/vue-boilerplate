export default function apollo(state, apolloProvider) {
    if (apolloProvider) {

        apolloProvider.watchLoading = function (loading) {
            // This function can also accept param counter: -1 / 1

            (loading) ? state.next('request') : state.next('done');

        };

    }
}