//__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
module.exports = {//注意这里是exports不是export
    entry: __dirname + "/src/main.js",//唯一入口文件
    output: {//输出目录
        path: __dirname + '/build',//打包后的js文件存放的地方
        filename: 'bundle.js'//打包后输出的js的文件名
    },
};
