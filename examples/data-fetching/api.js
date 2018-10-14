const posts = {
  '1': {
    id: 1,
    title: 'sunt aut facere',
    body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto'
  },
  '2': {
    id: 2,
    title: 'qui est esse',
    body: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla'
  }
}

// 这里对外暴露了一个函数 当外部文件引入(import)这个模块时 引入的实际是这个函数 可以在其他模块中通过getPost函数来访问该模块中的数据posts
export function getPost (id, cb) {
  // 伪造一个请求 访问数据
  setTimeout(() => {
    if (posts[id]) {
      cb(null, posts[id])
    } else {
      cb(new Error('Post not found.'))
    }
  }, 2000)
}
