import Vue from 'vue'
import VueRouter from 'vue-router'
import Post from './Post.vue'

Vue.use(VueRouter)

const Home = { template: '<div>home</div>' }

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/post/:id', component: Post }  // 当从其他路由切换到该路由时 Post组件实例立刻被创建 它的created钩子马上被调用 当从该路由切换到其他路由时 Post组件会被销毁
                                            // 当从 /post/1 切换到 /post/2 时 Post组件并不会被销毁和重建 它任然处在原来的生命周期中
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Data Fetching</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/post/1">/post/1</router-link></li>
        <li><router-link to="/post/2">/post/2</router-link></li>
        <li><router-link to="/post/3">/post/3</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')
