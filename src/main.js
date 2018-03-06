// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import seller from './components/seller.vue'
import ratings from './components/ratings.vue'
import goods from './components/goods.vue'
import './common/icon/icon.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
    { path: '/', component: goods },
    { path: '/goods', component: goods },
    { path: '/seller', component: seller },
    { path: '/ratings', component: ratings }  
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router,
    // 这里为何要加这一行
    render: h => h(App)
}).$mount('#app')