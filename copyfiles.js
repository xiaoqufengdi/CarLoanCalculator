import fs from 'fs';
// 确保 dist 目录存在
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

// 复制 package.json
fs.copyFileSync('package.json', 'dist/package.json');

// 创建 build.flag 空文件
fs.writeFileSync('dist/build.flag', '');