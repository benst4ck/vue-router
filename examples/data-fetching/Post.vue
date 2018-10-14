<template>
  <div class="post">
    <div class="loading" v-if="loading">Loading...</div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <transition name="slide">
      <!--
        当post的id值发生变化时 给post容器一个唯一的key值来触发过渡
        key值的作用在于区分使用了相同模板的不同元素 当key值不同时 两个元素间通过过渡效果来移除和插入
      -->
      <div v-if="post" class="content" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { getPost } from './api'

export default {  // 暴露的这个对象定义的是Post组件 也就是说在路由为 /post/:id 时定义的这个对象才生效
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  // created钩子在实例创建完成后被立即调用
  created () {
    console.log("created!")
    this.fetchData()
  },
  watch: {
    // 当路由对象发生改变时 调用fetchData方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true  // 渲染一个元素 显示加载中
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false
        if (err) {
          this.error = err.toString()  // 当this.$route.params.id在api.js模块的posts对象中不存在时 渲染class="error"的元素 否则渲染获取到的数据到页面
        } else {
          this.post = post
        }
      })
    }
  }
}
</script>

<style>
.loading {
  position: absolute;
  top: 10px;
  right: 10px;
}
.error {
  color: red;
}
.content {
  transition: all .35s ease;
  position: absolute;
}
.slide-enter {
  opacity: 0;
  transform: translate(30px, 0);
}
.slide-leave-to {
  opacity: 0;
  transform: translate(-30px, 0);
}
</style>
