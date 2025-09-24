// pm2启动辅助脚本
// 使用方法: node start-pm2.js

const { exec } = require('child_process');
const path = require('path');

console.log('准备使用pm2启动web_notes应用...');
console.log('请确保已安装pm2: npm install pm2 -g');
console.log('此脚本会使用ecosystem.config.js中的配置启动应用');

// 检查pm2是否安装
exec('pm2 --version', (error, stdout) => {
  if (error) {
    console.error('错误: 未安装pm2，请先运行: npm install pm2 -g');
    console.error('或者使用npm start直接启动应用: npm start');
    process.exit(1);
  }

  console.log(`检测到pm2版本: ${stdout.trim()}`);
  console.log('正在启动应用...');

  // 使用pm2启动应用
exec('pm2 start ecosystem.config.js', (error, stdout, stderr) => {
    if (error) {
      console.error('启动失败:', error.message);
      console.log('尝试使用简单模式启动...');
      
      // 尝试使用简单模式启动
exec('pm2 start npm --name "web_notes" -- start', (simpleError, simpleStdout) => {
        if (simpleError) {
          console.error('简单模式启动也失败了:', simpleError.message);
          console.log('\n建议解决方案:');
          console.log('1. 检查Redis连接是否正常');
          console.log('2. 确保已安装所有依赖: pnpm install');
          console.log('3. 尝试直接启动应用: npm start');
          console.log('4. 查看pm2日志: pm2 logs web_notes');
        } else {
          console.log('简单模式启动成功:', simpleStdout);
          console.log('\n应用已启动，请运行 pm2 list 查看状态');
          console.log('运行 pm2 logs web_notes 查看日志');
        }
      });
      return;
    }

    console.log('启动成功:', stdout);
    console.log('\n应用管理命令:');
    console.log('  pm2 list       - 查看所有应用');
    console.log('  pm2 logs       - 查看所有日志');
    console.log('  pm2 logs web_notes - 查看此应用日志');
    console.log('  pm2 stop web_notes - 停止应用');
    console.log('  pm2 restart web_notes - 重启应用');
    console.log('  pm2 delete web_notes - 删除应用');
  });
});