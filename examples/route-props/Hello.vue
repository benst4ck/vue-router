<template>
  <div>
    <h2 class="hello">Hello {{name}} {{ $attrs }}</h2>
  </div>
</template>

<script>

export default {
  props: {
    name: {
      type: String,
      default: 'Vue!'
    }
  }
}
// 这里通过props指定的name指明期待父组件传递的name为String类型 如果父组件没有传递name属性那么默认值为"Vue!"
// 在template中 name来自于父组件传递的值 $attrs包含了父作用域(<router-view>)中除了class和style以外绑定的属性
</script>
