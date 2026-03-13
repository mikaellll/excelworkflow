import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
const sitemap0Path = path.join(distDir, 'sitemap-0.xml');
const indexPath = path.join(distDir, 'sitemap-index.xml');
const targetPath = path.join(distDir, 'sitemap.xml');

// Files that might have been created by mistake in the past or by Astro
const obsoleteFiles = [
  'sitemap.index.xlm',
  'sitemap.index.xml',
  'public/sitemap.xml',
];

if (fs.existsSync(sitemap0Path)) {
  // Move sitemap-0.xml to sitemap.xml
  fs.copyFileSync(sitemap0Path, targetPath);
  fs.unlinkSync(sitemap0Path);
  console.log('✅ Success: sitemap-0.xml moved to sitemap.xml');
} else if (fs.existsSync(indexPath)) {
  // If sitemap-0 doesn't exist but index does, copy index as fallback (less ideal)
  fs.copyFileSync(indexPath, targetPath);
  console.log('⚠️ Warning: sitemap-0.xml not found, using sitemap-index.xml as sitemap.xml');
}

// Remove sitemap-index.xml if it exists to keep only sitemap.xml
if (fs.existsSync(indexPath) && targetPath !== indexPath) {
  fs.unlinkSync(indexPath);
  console.log('🗑️ Deleted sitemap-index.xml');
}

// Cleanup obsolete files if they exist in dist
obsoleteFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`🗑️ Deleted obsolete file: ${file}`);
  }
});

// Update robots.txt to point to sitemap.xml instead of sitemap-index.xml
const robotsPath = path.join(distDir, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  let robotsContent = fs.readFileSync(robotsPath, 'utf8');
  if (robotsContent.includes('sitemap-index.xml')) {
    robotsContent = robotsContent.replace('sitemap-index.xml', 'sitemap.xml');
    fs.writeFileSync(robotsPath, robotsContent);
    console.log('✅ Updated robots.txt to point to sitemap.xml');
  }
}
