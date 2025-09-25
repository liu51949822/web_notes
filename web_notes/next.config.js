/** @type {import('next').NextConfig} */
const nextConfig = {
  //集合一个文件
  output: 'standalone',
  
  // 优化图像加载
  images: {
    unoptimized: true,
  },
  
  // 生产环境优化
  productionBrowserSourceMaps: false,

  // 构建时优化
  optimizeFonts: true,
  
  experimental: {
    outputFileTracingIncludes: {
      '/': [
        './node_modules/styled-jsx/**/*',
        // 如果还有其他 transpile 的包，也加进来
        // './node_modules/some-other-package/**/*'
      ],
  },
  },
};

export default nextConfig;
