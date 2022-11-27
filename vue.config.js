const path = require('path')

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@router': path.resolve(__dirname, 'src/router'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@utils': path.resolve(__dirname, 'src/utils')
      }
    }
  }
})
