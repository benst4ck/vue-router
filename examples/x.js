// webpack配置文件中的entry
const fs = require('fs');
const path = require('path')

var x = fs.readdirSync(__dirname).reduce((entries, dir) => {
	console.log(entries, dir)
    const fullDir = path.join(__dirname, dir)
    console.log(fullDir)
    const entry = path.join(fullDir, 'app.js')
    console.log(entry)
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['es6-promise/auto', entry]
    }

    return entries
  }, {})  // entries的初始值为 {}
console.log(x)

// fs.readdirSync(__dirname) 同步读取一个目录的内容 返回一个数组 该数组包含了该文件所在目录下的所有文件和文件夹
/*
	[ '.DS_Store',
	  'active-links',
	  'auth-flow',
	  'basic',
	  'data-fetching',
	  'discrete-components',
	  'global.css',
	  'hash-mode',
	  'hash-scroll-behavior',
	  'index.html',
	  'lazy-loading',
	  'named-routes',
	  'named-views',
	  'navigation-guards',
	  'nested-router',
	  'nested-routes',
	  'redirect',
	  'route-alias',
	  'route-matching',
	  'route-props',
	  'scroll-behavior',
	  'server.js',
	  'transitions',
	  'webpack.config.js',
	  'x.js' ]
  */

  // 以数组中 active-links 为例
  // fullDir
  	// /Users/rohit/Desktop/vue-router-dev/examples/active-links
  // entry
	// /Users/rohit/Desktop/vue-router-dev/examples/active-links/app.js

  // fullDir是一个目录 并且entry存在

	/*  
	{ 'active-links':
	   [ 'es6-promise/auto',
	     '/Users/rohit/Desktop/vue-router-dev/examples/active-links/app.js' ] }
	*/


// webpack配置文件中的entry
/*
{ 'active-links':
   [ 'es6-promise/auto',
     '/Users/rohit/Desktop/vue-router-dev/examples/active-links/app.js' ],
  'auth-flow':
   [ 'es6-promise/auto',
     '/Users/rohit/Desktop/vue-router-dev/examples/auth-flow/app.js' ],
  basic:
   [ 'es6-promise/auto',
     '/Users/rohit/Desktop/vue-router-dev/examples/basic/app.js' ],
  'data-fetching':
   [ 'es6-promise/auto',
     '/Users/rohit/Desktop/vue-router-dev/examples/data-fetching/app.js' ],
  'discrete-components':
   [ 'es6-promise/auto',
     '/Users/rohit/Desktop/vue-router-dev/examples/discrete-components/app.js' ],
  'hash-mode':
   [ 'es6-promise/auto',
     '/Users/rohit/Desktop/vue-router-dev/examples/hash-mode/app.js' ],
  'hash-scroll-behavior':
   [ 'es6-promise/auto',
     '/Users/rohit/Desktop/vue-router-dev/examples/hash-scroll-behavior/app.js' ],
  'lazy-loading':
   [ 'es6-promise/auto',
     '/Users/rohit/Desktop/vue-router-dev/examples/lazy-loading/app.js' ],
  'named-routes':
   [ 'es6-promise/auto',
     '/Users/rohit/Desktop/vue-router-dev/examples/named-routes/app.js' ],
  'named-views':
   [ 'es6-promise/auto',
     '/Users/rohit/Desktop/vue-router-dev/examples/named-views/app.js' ],
  'navigation-guards':
   [ 'es6-promise/auto',
     '/Users/rohit/Desktop/vue-router-dev/examples/navigation-guards/app.js' ],
  'nested-router':
   [ 'es6-promise/auto',
     '/Users/rohit/Desktop/vue-router-dev/examples/nested-router/app.js' ],
  'nested-routes':
   [ 'es6-promise/auto',
     '/Users/rohit/Desktop/vue-router-dev/examples/nested-routes/app.js' ],
  redirect:
   [ 'es6-promise/auto',
     '/Users/rohit/Desktop/vue-router-dev/examples/redirect/app.js' ],
  'route-alias':
   [ 'es6-promise/auto',
     '/Users/rohit/Desktop/vue-router-dev/examples/route-alias/app.js' ],
  'route-matching':
   [ 'es6-promise/auto',
     '/Users/rohit/Desktop/vue-router-dev/examples/route-matching/app.js' ],
  'route-props':
   [ 'es6-promise/auto',
     '/Users/rohit/Desktop/vue-router-dev/examples/route-props/app.js' ],
  'scroll-behavior':
   [ 'es6-promise/auto',
     '/Users/rohit/Desktop/vue-router-dev/examples/scroll-behavior/app.js' ],
  transitions:
   [ 'es6-promise/auto',
     '/Users/rohit/Desktop/vue-router-dev/examples/transitions/app.js' ] }
 */