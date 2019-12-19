const path = require("path");
const sourceMap = process.env.NODE_ENV === "development";
module.exports = {
  publicPath: "/",
  outputDir: "dist", //构建输出目录
  assetsDir: "assets", //静态资源目录
  lintOnSave: true, //是否开启eslint保存检测，有效值：true || false || 'error'
  chainWebpack: () => {},
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
    }

    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: [".js", ".vue", ".json", ".ts", ".tsx"],
        alias: {
          vue$: "vue/dist/vue.js",
          "@": path.resolve(__dirname, "./src")
        }
      }
    });
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: sourceMap,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  parallel: require("os").cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  devServer: {
    proxy: {
      "/api": {
        target: "http://192.168.1.50:8089/api",
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
    },
    before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};
