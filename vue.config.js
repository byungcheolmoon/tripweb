
module.exports = {
    //baseUrl: '/web/trip/dist/',
    lintOnSave: false,
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        proxy: { // proxyTable 설정
            '/naver': {
                target: 'https://nid.naver.com/oauth2.0/authorize',
                changeOrigin: true,
                pathRewrite: {
                    '' : ''
                }
            }
        }
    }
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