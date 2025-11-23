const fs = require('fs');
const path = require('path');

// Function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy mockdata to public
const srcDir = path.join(__dirname, 'app', 'mockdata');
const destDir = path.join(__dirname, 'public', 'mockdata');

if (fs.existsSync(srcDir)) {
  console.log('Copying images...');
  copyDir(srcDir, destDir);
  console.log('Images copied successfully!');
} else {
  console.log('Source directory does not exist');
}
