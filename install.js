const { execSync } = require('child_process');

console.log('Installing dependencies...');

try {
  execSync('npm install', {
    cwd: __dirname,
    stdio: 'inherit'
  });
  console.log('\n✅ Dependencies installed successfully!');
  console.log('\nNext, run: npm run dev');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
}
