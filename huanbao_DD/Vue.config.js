module.exports = {
    // 基本路径
    baseUrl: './',
    //     chainWebpack: config => {
    //     const imagesRule = config.module.rule('images')
    //     imagesRule.uses.clear()
    //     imagesRule.use('file-loader')
    //         .loader('url-loader')
    //         .options({
    //         limit: 10000,
    //         fallback: {
    //             loader: 'file-loader',
    //             options: {
    //             name: 'img/[name].[hash:8].[ext]'
    //             }
    //         }
    //     })
    // },
    devServer: {
        // disableHostCheck: true // 设置代理
        host: '0.0.0.0',
        port: 80,
        https: false,
        proxy: {
            '/api': {
                target: 'http://u8nwu3.natappfree.cc/jkzf/API',
                ws: true,
                changeOrigin: true
            }
        },
        
    },

}