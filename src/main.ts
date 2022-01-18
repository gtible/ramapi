import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'


library.add(faSearch);

createApp(App).component("font-awesome-icon", FontAwesomeIcon)
    .use(store)
    .use(router)
    .use(FloatingVue)
    .mount('#app')
