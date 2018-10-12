import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Root = { template: '<div>root</div>' }
const Home = { template: '<div><h1>Home</h1><router-view></router-view></div>' }
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Baz = { template: '<div>baz</div>' }
const Default = { template: '<div>default</div>' }
const Nested = { template: '<router-view/>' }
const NestedFoo = { template: '<div>nested foo</div>' }

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    // 访问 /root 相当于访问 /root-alias
    { path: '/root', component: Root, alias: '/root-alias' },
    { path: '/home', component: Home,
      children: [
        // 绝对别名 带'/'的路径为绝对路径 不带'/'的为相对路径 
        // 'foo' 表示'/home/foo'
        // '/foo' 表示'/foo'
        { path: 'foo', component: Foo, alias: '/foo' },
        // 相对别名(其绝对路径为 /home/bar-alias)
        { path: 'bar', component: Bar, alias: 'bar-alias' },
        // 多个别名
        { path: 'baz', component: Baz, alias: ['/baz', 'baz-alias'] },
        // 访问 /home/default 和 /home 是一样的
        { path: 'default', component: Default, alias: '' },
        // 嵌套别名 访问 /home/nested/foo 相当于访问 /home/nested-alias/foo
        { path: 'nested', component: Nested, alias: 'nested-alias',
          children: [
            { path: 'foo', component: NestedFoo }
          ]
        }
        // 当访问/home/nested/foo时 对于组件的渲染 Home组件渲染到最外层的<router-view> Nested组件渲染到Home组件的<router-view NestedFoo组件渲染到Nested组件的<router-view
      ]
    }
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Route Alias</h1>
      <ul>
        <li><router-link to="/root-alias">
          /root-alias (renders /root)
        </router-link></li>

        <li><router-link to="/foo">
          /foo (renders /home/foo)
        </router-link></li>

        <li><router-link to="/home/bar-alias">
          /home/bar-alias (renders /home/bar)
        </router-link></li>

        <li><router-link to="/baz">
          /baz (renders /home/baz)
        </router-link></li>

        <li><router-link to="/home/baz-alias">
          /home/baz-alias (renders /home/baz)
        </router-link></li>

        <li><router-link to="/home">
          /home (renders /home/default)
        </router-link></li>

        <li><router-link to="/home/nested-alias/foo">
          /home/nested-alias/foo (renders /home/nested/foo)
        </router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')
