import ProgressBarComponent from './progress-bar/progress-bar.vue';
import apolloHook from './apolloHook.js';
import vueRouterHook from './vueRouterHook.js';

import { Subject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'

export const state = new Subject().pipe(distinctUntilChanged());

const ProgressBarPlugin = {
    install(Vue) {
        Vue.component(ProgressBarComponent.name, ProgressBarComponent);

        Vue.mixin({
            created() {
                if (this.$options.name === ProgressBarComponent.name) {
                    apolloHook(state, this.$apolloProvider);
                    vueRouterHook(state, this.$router)
                }

            }
        })
    },

    request() {
        state.next('request');
    },

    response() {
        state.next('response');
    },

    done() {
        state.next('done');
    }
};

export default ProgressBarPlugin;