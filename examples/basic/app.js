import Vue from 'vue'
import VueRouter from 'vue-router'

// 模块化工程中使用vue-router时 需要通过Vue.use()明确地安装路由功能
// 这时候会安装 router-link 和 router-view 子组件 并注入 $router 和 $route 到所有激活的路由子组件中
Vue.use(VueRouter)

// 定义路由组件 也可以从其他文件import进来
const Home = { template: '<div>home!</div>' }
const Baz = { template: '<div>foo/baz</div>' }
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 创建路由
const router = new VueRouter({
  mode: 'history',
  // 当你在 HTML5 history 模式下使用 base 选项之后 所有的 to 属性都不需要写基路径了
  base: __dirname,  // 基路径 http://localhost:8080/basic
  routes: [
  // 这里匹配url路径 使用对应的组件在路由出口<router-view>中进行渲染
    { path: '/', component: Home },
    { path: '/foo/baz', component: Baz },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
})

// 创建并挂载根实例
// 使用 router-link 组件来导航 它默认被渲染为一个<a>标签(可以通过tag属性指定渲染为其它标签) 通过传入 'to' 属性指定链接
// 匹配路径对应的路由组件将被渲染到<router-view>中
new Vue({
  router,  // 注入路由
  template: `
    <div id="app">
      <h1>Basic</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/foo/baz">/foo/baz</router-link></li>
        <li><router-link to="/foo">/foo</router-link></li>
        <li><router-link to="/bar">/bar</router-link></li>
        <router-link tag="li" to="/bar">
          <a>/bar</a>
        </router-link>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')

// 当目标路由成功激活时 链接元素自动设置表示激活的两个CSS类名(router-link-exact-active和router-link-active)
// 根路径(/)始终会被设置router-link-active类
// 这些类名始终被添加到<router-link>对应渲染的元素上
// 对于路径 /foo/baz
  // 绝对匹配 /foo/baz 添加router-link-exact-active类
  // 相对匹配 /foo/baz /foo 和 / 添加router-link-active类

