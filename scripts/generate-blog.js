import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const POSTS_DIR = path.join(__dirname, '../src/data/post');
const IMAGES_DIR = path.join(__dirname, '../src/assets/images');

if (!OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY is missing.');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const themes = [
  'Excel & Intelligence Artificielle',
  'Power BI & Tableaux de Bord',
  'Python pour l\'analyse de données',
  'Automatisation avec VBA',
  'DAX et Power Pivot',
  'Productivité et Gain de temps',
];

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function generateArticle() {
  const theme = themes[Math.floor(Math.random() * themes.length)];
  console.log(`Génération d'un article bilingue sur le thème : ${theme}`);

  // 1. Generate French Version
  const promptFR = `Tu es un expert en Data et Productivité (Excel, Power BI, Python). 
  Écris un article de blog complet et optimisé SEO en Français pour le site ExcelWorkflow.
  Thème imposé : ${theme}.
  
  L'article doit être au format Markdown et inclure un frontmatter YAML exact :
  ---
  publishDate: TIMESTAMP_HERE
  title: "Titre accrocheur"
  excerpt: "Résumé court (2 lignes)"
  image: ~/assets/images/IMAGE_NAME_HERE.png
  category: "Catégorie appropriée"
  tags:
    - Tag1
    - Tag2
  author: ExcelWorkflow
  metadata:
    title: "Titre SEO"
    description: "Description SEO"
    openGraph:
      images:
        - url: ~/assets/images/IMAGE_NAME_HERE.png
          width: 1200
          height: 630
  ---
  
  Contenu de l'article :
  - Introduction percutante
  - Au moins 3 sections détaillées avec des sous-titres (##)
  - Des exemples de formules ou de code si pertinent
  - Un tableau de comparaison ou de ROI
  - Une conclusion avec appel à l'action
  
  L'article doit être professionnel, technique mais accessible, avec un ton expert.
  Retourne UNIQUEMENT le contenu Markdown complet.`;

  const completionFR = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: promptFR }],
    temperature: 0.7,
  });

  let contentFR = completionFR.choices[0].message.content.replace(/^```[a-z]*\n/i, '').replace(/\n```$/, '').trim();

  // Extract title for filename
  const titleMatch = contentFR.match(/title: "(.*)"/);
  const titleFR = titleMatch ? titleMatch[1] : `article-${Date.now()}`;
  const slug = slugify(titleFR);
  const imageName = `ai-${slug}`;
  const timestamp = new Date().toISOString();

  // 2. Generate English Version (Translation + localization)
  const promptEN = `Translate and adapt this blog post for an English-speaking audience. 
  Keep the same YAML frontmatter structure but translate all values (except author and image paths).
  The image path must stay: ~/assets/images/${imageName}.png
  
  Article to translate:
  ${contentFR}`;

  const completionEN = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: promptEN }],
    temperature: 0.3,
  });

  let contentEN = completionEN.choices[0].message.content.replace(/^```[a-z]*\n/i, '').replace(/\n```$/, '').trim();

  // Replace placeholders or incorrect GPT values using regex
  contentFR = contentFR.replace(/publishDate:.*$/m, `publishDate: ${timestamp}`);
  contentFR = contentFR.replace(/image:\s*~\/assets\/images\/.*$/m, `image: ~/assets/images/${imageName}.png`);
  contentFR = contentFR.replace(/url:\s*~\/assets\/images\/.*$/m, `url: ~/assets/images/${imageName}.png`);
  
  // Ensure robust replacement in EN as well
  contentEN = contentEN.replace(/publishDate:.*$/m, `publishDate: ${timestamp}`);
  contentEN = contentEN.replace(/image:\s*~\/assets\/images\/.*$/m, `image: ~/assets/images/${imageName}.png`);
  contentEN = contentEN.replace(/url:\s*~\/assets\/images\/.*$/m, `url: ~/assets/images/${imageName}.png`);

  // Save French Article
  const filePathFR = path.join(POSTS_DIR, `${slug}.md`);
  fs.writeFileSync(filePathFR, contentFR);
  console.log(`Article FR sauvegardé : ${filePathFR}`);

  // Save English Article
  const filePathEN = path.join(POSTS_DIR, 'en', `${slug}.md`);
  fs.writeFileSync(filePathEN, contentEN);
  console.log(`Article EN sauvegardé : ${filePathEN}`);

  // 3. Generate Image
  const titleENMatch = contentEN.match(/title: "(.*)"/);
  const titleEN = titleENMatch ? titleENMatch[1] : titleFR;

  const imagePromptPrompt = `Based on this blog post title: "${titleEN}", generate a detailed DALL-E 3 prompt for a professional, modern, sleek blog cover illustration. Style: "3D isometric" or "Minimalist tech illustration", evoking data and office tools. No text in the image. High resolution.`;
  
  const imagePromptResolution = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: imagePromptPrompt }],
  });

  const imagePrompt = imagePromptResolution.choices[0].message.content;
  console.log(`Prompt image généré : ${imagePrompt}`);

  const imageResponse = await openai.images.generate({
    model: 'dall-e-3',
    prompt: imagePrompt,
    size: '1024x1024',
    quality: 'standard',
    n: 1,
  });

  const imageUrl = imageResponse.data[0].url;
  const imagePath = path.join(IMAGES_DIR, `${imageName}.png`);

  const imgData = await fetch(imageUrl);
  const buffer = await imgData.arrayBuffer();
  fs.writeFileSync(imagePath, Buffer.from(buffer));
  
  console.log(`Image sauvegardée : ${imagePath}`);
}

generateArticle().catch(console.error);
