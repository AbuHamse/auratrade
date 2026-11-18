const fs = require('fs');
const path = require('path');

// Define the relative directory paths inside server/src
const directories = [
  'server/src/config',
  'server/src/controllers',
  'server/src/models',
  'server/src/routes',
  'server/src/services',
  'server/src/sockets'
];

console.log('🚀 Initializing server directory structure and boilerplate files...\n');

directories.forEach((dir) => {
  const fullDirPath = path.join(__dirname, dir);
  
  // 1. Create directory if it doesn't exist
  if (!fs.existsSync(fullDirPath)) {
    fs.mkdirSync(fullDirPath, { recursive: true });
    console.log(`[Created Directory]: ${dir}`);
  } else {
    console.log(`[Already Exists]: ${dir}`);
  }

  // 2. Create a clean index.ts file inside each folder
  const indexPath = path.join(fullDirPath, 'index.ts');
  if (!fs.existsSync(indexPath)) {
    const defaultContent = `// Export modules from ${path.basename(dir)} layer\n`;
    fs.writeFileSync(indexPath, defaultContent);
    console.log(`   └─ [Created File]: ${dir}/index.ts`);
  }
});

console.log('\n✨ Server directory architecture and index files successfully generated!');