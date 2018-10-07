import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from './Hello.vue'

Vue.use(VueRouter)

function dynamicPropsFn (route) {
  console.log(route)  // 打印访问当前路径所匹配的路由
  const now = new Date()
  return {  // 该函数返回一个包含name属性的对象 通过route.params.years获取动态片段years的值
    name: (now.getFullYear() + parseInt(route.params.years)) + '!'  // 数字加字符串 结果为字符串
  }
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Hello },
    // 通过props向子组件传递数据 当然 前提是需要在子组件中事先声明期望接收什么样的数据
    { path: '/hello/:name', component: Hello, props: true }, // 传递route.params到props 它包含了动态片段和全匹配片段 这时候动态片段name拿到的值会传递到Hello组件中
    { path: '/static', component: Hello, props: { name: 'world' }}, // 传递静态值到Hello组件中
    { path: '/dynamic/:years', component: Hello, props: dynamicPropsFn },  // 访问该路径时匹配到的路由会作为参数传递到dynamicPropsFn函数中
    { path: '/attrs', component: Hello, props: { name: 'attrs' }}
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Route props</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/hello/you">/hello/you</router-link></li>
        <li><router-link to="/static">/static</router-link></li>
        <li><router-link to="/dynamic/1">/dynamic/1</router-link></li>
        <li><router-link to="/attrs">/attrs</router-link></li>
      </ul>
      <router-view class="view" foo="123" bar="110"></router-view>
    </div>
  `
}).$mount('#app')
