import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router/'
import store from './store/'

import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/base.css'

Vue.use(ElementUI);


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
