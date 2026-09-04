const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
function toBase64(relPath, mime) {
  const fullPath = path.join(baseDir, relPath);
  if (!fs.existsSync(fullPath)) return '';
  const buffer = fs.readFileSync(fullPath);
  return `data:${mime};base64,${buffer.toString('base64')}`;
}

const assets = {
  ammaPhoto: toBase64('assets/amma.jpg', 'image/jpeg'),
  ammaLeftPhoto: toBase64('assets/amma_left.jpg', 'image/jpeg'),
  ammaRightPhoto: toBase64('assets/amma_right.jpg', 'image/jpeg'),
  teacherBooksArt: toBase64('assets/teacher_books_art.jpg', 'image/jpeg'),
  teacherLanternArt: toBase64('assets/teacher_lantern_art.jpg', 'image/jpeg'),
  audioMp3: toBase64('audio/amma.mp3', 'audio/mpeg')
};

const jsContent = `// Auto-generated self-contained assets bundle for GitHub Pages & offline deployment
window.APP_ASSETS = ${JSON.stringify(assets, null, 2)};
`;

fs.writeFileSync(path.join(baseDir, 'assets-data.js'), jsContent, 'utf8');
console.log('Successfully generated assets-data.js! Size:', fs.statSync(path.join(baseDir, 'assets-data.js')).size);
