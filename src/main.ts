import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRx from 'vue-rx'
import { runTimeDuration } from '@/utils/filters/runTimeDuration.filter'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.use(VueRx)

Vue.filter('runtime', runTimeDuration)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
