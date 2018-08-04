const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {//注意这里是exports不是export
    entry: {
        render: __dirname + "/src/js/render.js",
        style: __dirname + "/src/css/markdowneditor.css"
    },
    output: {//输出目录
        path: path.resolve(__dirname ,'build'),//打包后的js文件存放的地方
        filename: 'bundle.js'//打包后输出的js的文件名
    },
    module: {
        rules:[
            {
                test:/\.css$/,
                use:[
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            },
        ]
    },
    devServer: {
        contentBase: './build',
        historyApiFallback: true,
        inline: true,
        port: 8080
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        })
    ]
};
