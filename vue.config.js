//
// module.exports = {
//     //baseUrl: '/web/trip/dist/',
//     lintOnSave: false,
//     devServer: {
//         host: '0.0.0.0',
//         port: 8080,
//         proxy: { // proxyTable 설정
//             '/naver': {
//                 target: 'https://nid.naver.com/oauth2.0/authorize',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '' : ''
//                 }
//             }
//         }
//     }
// }

var webpack = require('webpack');
var path = require('path')
module.exports = {
    // baseUrl: '/web/trip/dist/',
    lintOnSave: false,
    devServer: {
        host: '182.162.22.21',
        port: 9090,
        proxy: { // proxyTable 설정
            '/naver': {
                target: 'https://nid.naver.com/oauth2.0/authorize',
                changeOrigin: true,
                pathRewrite: {
                    '' : ''
                }
            }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                'window.Quill': 'quill/dist/quill.js',
                'Quill': 'quill/dist/quill.js',
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }),
        ]
    },
}
/*module.exports = {
    entry: {
        app: 'main.js',
        vendor: './js/kakao.min.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: 'dist/',
        filename: '[name].js'
    }
}*/
//
//
// module.exports = {
//     devServer: {
//         proxy: { // proxyTable 설정
//             '/naver': {
//                 target: 'https://nid.naver.com/oauth2.0/authorize',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/naver': ''
//                 }
//             }
//         }
//     }
// }