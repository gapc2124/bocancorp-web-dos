import fs from 'fs';
import path from 'path';

const componentsDir = path.join(process.cwd(), 'src', 'components');

const pageClients = ['AboutUsPageClient.tsx', 'ServicesPageClient.tsx', 'ProjectsPageClient.tsx', 'ContactUsPageClient.tsx'];

for (const file of pageClients) {
  const filePath = path.join(componentsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/from\s+['"]\.\/components\/(.*?)['"]/g, "from './$1'");
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

// Fix Footer.tsx
const footerPath = path.join(componentsDir, 'Footer.tsx');
if (fs.existsSync(footerPath)) {
  let content = fs.readFileSync(footerPath, 'utf8');
  content = content.replace(/import\s+logoImg\s+from\s+['"]\/assets\/logo\.png['"];?/g, '');
  content = content.replace(/src=\{logoImg\}/g, 'src="/assets/logo.png"');
  fs.writeFileSync(footerPath, content, 'utf8');
}

// Fix ProjectsGalaxy.tsx (remove Helmet)
const pgPath = path.join(componentsDir, 'ProjectsGalaxy.tsx');
if (fs.existsSync(pgPath)) {
  let content = fs.readFileSync(pgPath, 'utf8');
  content = content.replace(/import\s+\{\s*Helmet\s*\}\s+from\s+['"]react-helmet-async['"];?/g, '');
  content = content.replace(/<Helmet>[\s\S]*?<\/Helmet>/g, '');
  // Also check if useParams is imported from react-router-dom instead of next/navigation
  content = content.replace(/import\s+\{[^}]*useParams[^}]*\}\s+from\s+['"]react-router-dom['"];?/g, "import { useParams } from 'next/navigation';");
  fs.writeFileSync(pgPath, content, 'utf8');
}

console.log('Fixed imports');
