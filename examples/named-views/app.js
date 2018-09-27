import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Baz = { template: '<div>baz</div>' }

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/',
      // 一个路由可以定义多个命名组件 这些命名组件将被渲染到相对应的命名路由出口处
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    },
    {
      path: '/other',
      components: {
        default: Baz,
        a: Bar,
        b: Foo
      }
    }
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Named Views</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/other">/other</router-link></li>
      </ul>
      <router-view class="view one"></router-view>
      <router-view class="view two" name="a"></router-view>
      <router-view class="view three" name="b"></router-view>
    </div>
  `
  // 通过<router-view>的name属性定义命名路由出口 使得组件可以按需求渲染到相应位置
}).$mount('#app')
