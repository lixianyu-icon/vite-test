/*
 * @description: vite.config.js
 * @Author: lixy
 * @Date: 2021-03-02
 */

 const path = require('path');  
 const vue = require('@vitejs/plugin-vue');
 const resolve = (dir) => path.resolve(__dirname, dir);  
 module.exports = {
	plugins: [vue()],
	resolve:{
		alias: {
			'@': resolve('./src'),
		},
	},
	// hostname: '0.0.0.0', // 默认是 localhost
    // port: '8000', // 默认是 3000 端口
    open: true, // 浏览器自动打开
    https: false, // 是否开启 https
    // ssr: false, // 服务端渲染
    base: './', // 生产环境下的公共路径
    outDir: 'dist', // 打包构建输出路径，默认 dist ，如果路径存在，构建之前会被删除
	proxy: { // 代理
		// string shorthand
		// "/foo": "http://localhost:4567/foo",
		// with options
		// "/api": {
		// 	target: "http://jsonplaceholder.typicode.com",
		// 	changeOrigin: true,
		// 	rewrite: (path) => path.replace(/^\/api/, ""),
		// },
	},
	css:{ 
		preprocessorOptions: {
			less: {
				modifyVars: { 
					hack: `true; 
					@import "${resolve('./src/style/global/color.less')}";
					@import "${resolve('./src/style/global/font_size.less')}";
					@import "${resolve('./src/style/global/pic_address_prefix.less')}";
					@import "${resolve('./src/style/global/variable.less')}";`, 
				}, 
			},  
		} 
	}
};