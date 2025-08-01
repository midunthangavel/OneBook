const { spawn } = require('child_process');

console.log('Starting Expo development server...');

const expoProcess = spawn('npx', ['expo', 'start'], {
  stdio: 'inherit',
  shell: true
});

expoProcess.on('error', (error) => {
  console.error('Error starting Expo:', error);
});

expoProcess.on('close', (code) => {
  console.log(`Expo process exited with code ${code}`);
}); 