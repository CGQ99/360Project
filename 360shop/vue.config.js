module.exports = {
  devServer: {
    proxy: {
      "/aaa": {
        target: "https://shopping.ceair.com",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/aaa": ""
        }
      },
      "/ap": {
        target: "https://mall.360.cn",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/ap": ""
        }
      },
      "/login": {
        target: "http://192.168.19.25:8088",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/login": ""
        }
      }
    }
  }
};
