const { exec } = require('child_process');

console.log('Testing Expo installation...');

// Test if expo is available
exec('npx expo --version', (error, stdout, stderr) => {
  if (error) {
    console.error('Expo not found:', error);
    return;
  }
  
  console.log('Expo version:', stdout);
  console.log('Starting Expo server...');
  
  // Start expo server
  const expoProcess = exec('npx expo start --tunnel', (error, stdout, stderr) => {
    if (error) {
      console.error('Error starting Expo:', error);
      return;
    }
    console.log('Expo output:', stdout);
  });
  
  expoProcess.stdout.on('data', (data) => {
    console.log('Expo output:', data.toString());
  });
  
  expoProcess.stderr.on('data', (data) => {
    console.error('Expo error:', data.toString());
  });
}); 