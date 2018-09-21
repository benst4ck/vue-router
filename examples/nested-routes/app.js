import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由组件可以再包含<router-view>组件 以渲染嵌套的子路由组件
const Parent = {
  template: `
    <div class="parent">
      <h2>Parent</h2>
      <router-view class="child"></router-view>
    </div>
  `
  // 渲染到这个路由出口的组件会自动添加"child"类
}

const Default = { template: '<div>default</div>' }
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Baz = { template: '<div>baz</div>' }

const Qux = {
  template: `
    <div class="nested-parent">
      <h3>qux</h3>
      <router-link :to="{ name: 'quux' }">/quux</router-link>
      <router-view class="nested-child"></router-view>
    </div>
  `
}
const Quy = {
  template: `
    <div class="nested-parent-other">
      <h3>quy</h3>
      <pre>{{ JSON.stringify(Object.keys($route.params)) }}</pre>
      <pre>{{ JSON.stringify($route.params.quyId) }}</pre>
    </div>
  `
}
const Quux = { template: '<div>quux</div>' }
const Zap = { template: '<div><h3>zap</h3><pre>{{ $route.params.zapId }}</pre></div>' }

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', redirect: '/parent' },  // 当访问 '/' 时 重定向到 '/parent'
    { path: '/parent', component: Parent,
      children: [
        // 对于路径 /parent 首先用Parent组件渲染到外层<router-view>
        // 然后再匹配子路径 接着将子路径对应的组件渲染到Parent组件的<router-view>
        { path: '', component: Default },
        { path: 'foo', component: Foo },
        { path: 'bar', component: Bar },

        // 这里是一个绝对路径 但是由于它定义在嵌套路由中 所以当访问该绝对路径时 会先渲染Parent组件到外层<router-view>中 最后再将Baz组件渲染到Parent组件的<router-view>中
        // 还是嵌套路径的效果 但是是访问 /baz 得到的这个效果 而不是访问 /parent/baz
        { path: '/baz', component: Baz },

        {
          path: 'qux/:quxId',
          component: Qux,
          children: [{ path: 'quux', name: 'quux', component: Quux }]  
          // 这里是一个命名路由 当要在<router-link>中链接到一个命名路由时 只需要给它的to属性传递一个对象 :to="{ name: 'quux' }"
          // 当访问 /nested-routes/parent/qux/123/quux 这样一个路径时 Parent组件在最外层路由出口<router-view>中渲染
          // 然后 Qux组件在Parent组件的路由出口<router-view>中渲染
          // 最后 Quux组件在Qux组件的路由出口<router-view>中渲染
        },

        { 
          // 这里使用了动态路由匹配 使得对于所有ID各不相同的用户都使用Quy组件来渲染
          // 动态路径参数使用冒号标记(:quyId) 它匹配并收集所有各种不同的ID
          // 对于 /nested-routes/parent/quy/123 和 /nested-routes/parent/quy/2345 等这样类似的路径都将映射到相同的路由 从而使用同一个组件来渲染
          // 在Quy组件中通过 $route.params 可以访问到由动态路径参数的名称和匹配到的ID组成的对象
          path: 'quy/:quyId', component: Quy 
        },

        // 这里给动态路径参数zapId后添加了一个问号 这意味着zapId是可选的 可以有也可以省略 问号是一个正则表达式
        { name: 'zap', path: 'zap/:zapId?', component: Zap }
      ]
    }
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Nested Routes</h1>
      <ul>
        <li><router-link to="/parent">/parent</router-link></li>
        <li><router-link to="/parent/foo">/parent/foo</router-link></li>
        <li><router-link to="/parent/bar">/parent/bar</router-link></li>
        <li><router-link to="/baz">/baz</router-link></li>
        <li><router-link to="/parent/qux/123">/parent/qux</router-link></li>
        <li><router-link to="/parent/quy/123">/parent/quy</router-link></li>
        <li><router-link :to="{name: 'zap'}">/parent/zap</router-link></li>
        <li><router-link :to="{name: 'zap', params: {zapId: 1}}">/parent/zap/1</router-link></li>
        <li><router-link :to="{ params: { zapId: 2 }}">{ params: { zapId: 2 }} (relative params)</router-link></li>
      </ul>
      <router-view class="view"></router-view> 
    </div>
  `
  // 渲染到这个路由出口的组件会自动添加"view"类
  // 最后一个路由是一个基于前一次访问路径的路由 
  // 如果我正在访问 /nested-routes/parent/bar 现在点击最后一个路由 那么不会有任何反应 以为动态参数zapId并不存在于 /nested-routes/parent/bar 中
  // 如果我正在访问 /nested-routes/parent/zap 或者 /nested-routes/parent/zap/1 现在点击最后一个路由 那么会传入或者修改动态参数zapId为2 这时就会出现改变
}).$mount('#app')
