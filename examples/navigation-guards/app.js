import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = { template: '<div>home</div>' }
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }


function guardRoute (to, from, next) {
  // from表示当前路由
  // to表示需要跳转到的目标路由
  if (window.confirm(`Navigate to ${to.path}?`)) {
    // window.confirm弹出一个对话框 点击 "确定" 返回true 点击"取消"返回false
    // 调用next方法执行跳转目标路由to
    next()
  } else if (window.confirm(`Redirect to /baz?`)) {
    next({ path: '/baz' })  // 也可以写为 next('/baz') 跳转到 /baz
  } else {
    next(false)  // 中断当前导航 不跳转到目标路由
  }
}

const Baz = {
  data () {
    return { saved: false }
  },
  template: `
    <div>
      <p>baz ({{ saved ? 'saved' : 'not saved' }})</p>
      <button @click="saved = true">save</button>
    </div>
  `,
  beforeRouteLeave (to, from, next) {  // 导航离开该组件的对应路由时调用
    if (this.saved || window.confirm('Not saved, are you sure you want to navigate away?')) {
      next()
    } else {
      next(false)
    }
  }
}

const Qux = {
  data () {
    return {
      msg: null
    }
  },
  template: `<div>{{ msg }}</div>`,
  beforeRouteEnter (to, from, next) {
    // beforeRouteEnter钩子中不能通过this访问到组件实例 因为在守卫执行前 组件实例还没有被创建
    // 但是可以通过传一个回调给next方法来访问组件实例 
    // 在导航confirmed的时候执行回调 并且把组件实例作为回调方法的参数
    setTimeout(() => {
      next(vm => {
        vm.msg = 'Qux'
      })
    }, 1000)
  }
}

// Quux组件实现了一个组件内部的beforeRouteUpdate钩子 这个钩子将在当前路由改变 同时Quux组件被复用时调用
// 举例来说 对于一个带有动态参数的路径 /foo/:id 在 /foo/1 和 /foo/2 之间跳转的时候 
// 由于会渲染同样的Foo组件 因此组件实例会被复用 比起销毁再创建 复用则显得更加高效 而beforeRouteUpdate钩子就会在这个情况下被调用
// 不过 这也意味着组件的生命周期钩子不会再被调用 

const Quux = {
  data () {
    return {
      prevId: 0
    }
  },
  template: `<div>id:{{ $route.params.id }} prevId:{{ prevId }}</div>`,
  beforeRouteUpdate (to, from, next) {
    this.prevId = from.params.id
    next()
  }
  // 该文件中的钩子都是导航守卫 也就是说当点击导航(<router-link>)时这些守卫才会被调用
  // 当访问 /quux/3 时 Quux组件被调用来渲染 但它里面定义的beforeRouteUpdate守卫并不会被调用
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  // routes 配置中的每个路由对象为路由记录 路由记录可以是嵌套的
  routes: [
    { path: '/', component: Home },

    // 在路由记录中定义前置守卫 当访问/foo时 全局前置守卫也会被调用
    { path: '/foo', component: Foo, beforeEnter: guardRoute },

    { path: '/bar', component: Bar, meta: { needGuard: true }},

    { path: '/baz', component: Baz },

    // Qux组件内实现beforeRouteEnter钩子
    { path: '/qux', component: Qux },

    // 异步组件
    { path: '/qux-async', component: resolve => {
      setTimeout(() => {
        resolve(Qux)
      }, 0)
    } },

    { path: '/quux/:id', component: Quux }
  ]
})

// 组册全局前置守卫 当要跳转到的目标路由记录中元信息needGuard返回值为true时 调用guardRoute函数
// 当一个导航(<router-link>)触发时 全局前置守卫按照创建顺序调用 守卫异步解析执行 此时导航在所有守卫resolve完之前一直处于等待中
// 确保调用next方法 否则钩子就不会被resolved
// 如果全部钩子执行完了 则导航的状态就是confirmed 这时导航才会发生跳转
router.beforeEach((to, from, next) => {
  // 一个路由匹配到的所有路由记录会暴露为$route对象(还有在导航守卫中的路由对象 to和from)的 $route.matched 数组
  // 因此 需要遍历 $route.matched 来检查路由记录中的 meta 字段
  // Array.some()方法用于检测数组中的元素是否有满足指定条件的 有满足条件的就返回true 否则返回false
  if (to.matched.some(m => m.meta.needGuard)) {  // m表示matched数组中的每一项
    guardRoute(to, from, next)
  } else {
    next()
  }
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Navigation Guards</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/foo">/foo</router-link></li>
        <li><router-link to="/bar">/bar</router-link></li>
        <li><router-link to="/baz">/baz</router-link></li>
        <li><router-link to="/qux">/qux</router-link></li>
        <li><router-link to="/qux-async">/qux-async</router-link></li>
        <li><router-link to="/quux/1">/quux/1</router-link></li>
        <li><router-link to="/quux/2">/quux/2</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')
