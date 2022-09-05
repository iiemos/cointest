import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { Notification, Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as MITO from '@zyf2e/monitor-web'
Vue.use(MITO.MitoVue)


Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.config.productionTip = false

MITO.init({
  dsn: 'http://192.168.200.151:8087',
  credentials: false,
  apikey: 'wikifx',
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
