import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
const oldPath = path.join(distDir, 'sitemap-index.xml');
const newPath = path.join(distDir, 'sitemap.xml');

if (fs.existsSync(oldPath)) {
  fs.copyFileSync(oldPath, newPath);
  console.log('Sitemap copied to sitemap.xml');
} else {
  console.error('sitemap-index.xml not found in dist/ (run npm run build first)');
}
