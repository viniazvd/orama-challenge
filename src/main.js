import Vue from 'vue'
import App from './containers/App.vue'

// foundation setup (jquery is required)
import 'jquery'
import foundation from 'foundation-sites'

// import 'vue-material-design-icons/styles.css'

Vue.use(foundation)

Vue.config.productionTip = false

new Vue({ render: h => h(App) }).$mount('#app')
