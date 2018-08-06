const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: __dirname + "/src/js/render.js",
        // style: __dirname + "/src/css/markdowneditor.css,
    output: {
        path: path.resolve(__dirname ,'build'),
        filename: 'bundle.js'
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
    mode: 'development',
    devServer: {
        contentBase: './build',
        historyApiFallback: true,
        inline: true,
        port: 8080
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        })
    ]
};
