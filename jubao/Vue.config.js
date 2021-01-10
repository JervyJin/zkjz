module.exports = {
   /**
    *  默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
    * 这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径
   */
  baseUrl: './',
    // 设置代理解决跨域
    devServer: {
        hot: true,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        proxy: {
            '/api': {
                target: `http://shop.liulongbin.top/api/private/v1/`,
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        }, 
        
    }
}