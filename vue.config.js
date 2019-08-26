module.exports = {
  baseUrl: "/",
  outputDir: "dist", //构建输出目录
  assetsDir: "assets", //静态资源目录
  lintOnSave: true, //是否开启eslint保存检测，有效值：true || false || 'error'
  devServer: {
    proxy: {
      "/api": {
        target: "http://xxxx/api",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/test": {
        target: "http://test.com",
        secure: false,
        changeOrigin: true
      },
      "/res": {
        target: "http://res.com",
        secure: false,
        changeOrigin: true
      },
      "/group1": {
        // 映射为图片服务器.
        target: "http://192.168.1.71:8888", // 后端接口的地址.
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true //是否跨域
      }
    }
  }
};
