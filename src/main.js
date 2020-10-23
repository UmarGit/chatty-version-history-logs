import Vue from 'vue'
import App from './App2.vue'
import vuetify from './plugins/vuetify';
import VuePapaParse from 'vue-papa-parse'
Vue.use(VuePapaParse)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
