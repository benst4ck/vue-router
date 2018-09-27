import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 这里的匹配使用的是path-to-regexp(https://github.com/pillarjs/path-to-regexp) 它和express使用的是相同的匹配引擎 所以使用的匹配规则也是相同的
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/' },

    // 通过冒号(:)指示参数
    { path: '/params/:foo/:bar' },

    // 通过在参数后添加问号使得参数变为可选参数
    { path: '/optional-params/:foo?' },

    // 一个参数后可以紧跟着用括号包裹的正则表达式 这个正则表达式修饰的是括号前的参数(:id) 这个路由将只匹配参数为纯数字的路径 \d表示匹配一个数字字符 +表示一个或多个
    { path: '/params-with-regex/:id(\\d+)' },
    
    // 星号可以匹配所有路径
    { path: '/asterisk/*' },

    // 通过括号包裹路径的一部分 并给这部分添加一个问号 就能使得包裹的这部分变为可选的
    { path: '/optional-group/(foo/)?bar' }
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Route Matching</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/params/foo/bar">/params/foo/bar</router-link></li>
        <li><router-link to="/optional-params">/optional-params</router-link></li>
        <li><router-link to="/optional-params/foo">/optional-params/foo</router-link></li>
        <li><router-link to="/params-with-regex/123">/params-with-regex/123</router-link></li>
        <li><router-link to="/params-with-regex/abc">/params-with-regex/abc</router-link></li>
        <li><router-link to="/asterisk/foo">/asterisk/foo</router-link></li>
        <li><router-link to="/asterisk/foo/bar">/asterisk/foo/bar</router-link></li>
        <li><router-link to="/optional-group/bar">/optional-group/bar</router-link></li>
        <li><router-link to="/optional-group/foo/bar">/optional-group/foo/bar</router-link></li>
      </ul>
      <p>Route context</p>
      <pre>{{ JSON.stringify($route, null, 2) }}</pre>
    </div>
  `
  // 这个例子中并没有给匹配到的路径设置对应的组件去渲染 所以在模版中没有定义路由出口 而只是显示当前匹配路由的一些基本信息
}).$mount('#app')
