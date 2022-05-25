import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';
import {store} from './store/index'
import mitt from 'mitt'
import Maska from 'maska'
import VueClipboard from 'vue3-clipboard'

const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app
    .use(router)
    .use(store)
    .use(Maska)
    .use(VueClipboard, {
        autoSetContainer: true,
        appendToBody: true,
    })
    .mount('#app');
