/** @type {import('next').NextConfig} */
const nextConfig = {
  //集合一个文件
  output: 'standalone',
  
  // 优化图像加载
  images: {
    unoptimized: true,
  },
  
  // Turbopack配置
  experimental: {
    turbo: {
      // 启用更快的开发构建
      enabled: true,
      // 避免在开发模式下进行类型检查
      skipTypeChecks: true,
      // 优化客户端捆绑
      optimizeClientBundles: true,
    },
  },
  
  // 生产环境优化
  productionBrowserSourceMaps: false,
  
  // 构建时优化
  optimizeFonts: true,
  
  // 解决之前出现的Turbopack根目录警告
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
