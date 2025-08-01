
console.log('🧭 Testing Navigation Setup...');

const fs = require('fs');
const path = require('path');

// Check if all required navigation files exist
const requiredFiles = [
  'app/_layout.tsx',
  'app/index.tsx',
  'app/(auth)/_layout.tsx',
  'app/(auth)/login.tsx',
  'app/(auth)/register.tsx',
  'app/(main)/_layout.tsx',
  'app/(main)/dashboard.tsx',
];

let allFilesExist = true;

console.log('\n📁 Checking required navigation files:');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check package.json for required dependencies
console.log('\n📦 Checking navigation dependencies:');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = [
  'expo-router',
  '@expo/vector-icons',
  'react-native-safe-area-context',
  'react-native-screens',
];

requiredDeps.forEach(dep => {
  if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
    console.log(`  ✅ ${dep}`);
  } else {
    console.log(`  ❌ ${dep} - MISSING`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('\n🎉 Navigation setup looks good!');
  console.log('\n🚀 To test navigation:');
  console.log('  1. Start the app with: npm start');
  console.log('  2. Open Expo Go app on your phone');
  console.log('  3. Scan the QR code');
  console.log('  4. Test navigation from Welcome → Login → Register');
} else {
  console.log('\n❌ Navigation setup has issues that need to be fixed.');
}
