import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
const sitemap0Path = path.join(distDir, 'sitemap-0.xml');
const newPath = path.join(distDir, 'sitemap.xml');

if (fs.existsSync(sitemap0Path)) {
  // On copie directement le contenu de sitemap-0.xml (qui contient les vraies URLs des pages)
  // vers sitemap.xml pour éviter d'avoir un index intermédiaire que Google n'aime pas toujours.
  fs.copyFileSync(sitemap0Path, newPath);
  console.log('Success: sitemap-0.xml content copied to sitemap.xml');
} else {
  // Si pour une raison quelconque sitemap-0.xml n'existe pas, on tente de copier l'index
  const indexPath = path.join(distDir, 'sitemap-index.xml');
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, newPath);
    console.log('Warning: Falling back to sitemap-index.xml copy');
  } else {
    console.error('Error: No sitemap files found in dist/');
  }
}
