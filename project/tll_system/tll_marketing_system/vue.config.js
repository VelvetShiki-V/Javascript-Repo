const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // 空白有可能是路由模式，默认是hash模式，如果改成了历史模式就会出现空白
  // 如果使用http绝对网址，不需要配置服务器后端相对或绝对路径
  publicPath: './', // 生产模式依赖文件以相对路径形式寻址
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0' // 允许所有网络接口访问
  }
})
