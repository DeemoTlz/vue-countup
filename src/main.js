import Vue from 'vue'
import App from './App.vue'
import CountUp from '@/components/CountUp'

Vue.component('count-up', CountUp)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
