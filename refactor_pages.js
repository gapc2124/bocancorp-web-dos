import fs from 'fs';
import path from 'path';

const files = [
  'ServicesPageClient.tsx',
  'AboutUsPageClient.tsx',
  'ContactUsPageClient.tsx',
  'ProjectsPageClient.tsx'
];

for (const file of files) {
  const filePath = path.join(process.cwd(), 'src/components', file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Add use client
  if (!content.includes('"use client"') && !content.includes("'use client'")) {
    content = `'use client';\n` + content;
  }

  // Remove Helmet
  content = content.replace(/import\s+\{\s*Helmet\s*\}\s+from\s+['"]react-helmet-async['"];?/g, '');
  content = content.replace(/<Helmet>[\s\S]*?<\/Helmet>/g, '');

  // Refactor routing
  content = content.replace(/import\s+\{[^}]*useLocation.*?\}\s+from\s+['"]react-router-dom['"];?/g, `import { usePathname, useRouter, useParams } from 'next/navigation';`);
  content = content.replace(/import\s+\{[^}]*useNavigate.*?\}\s+from\s+['"]react-router-dom['"];?/g, `import { useRouter, useParams } from 'next/navigation';`);
  content = content.replace(/import\s+\{[^}]*useParams.*?\}\s+from\s+['"]react-router-dom['"];?/g, `import { useParams } from 'next/navigation';`);
  
  content = content.replace(/const\s+\{\s*hash\s*\}\s*=\s*useLocation\(\);/g, `const hash = typeof window !== 'undefined' ? window.location.hash : '';`);
  content = content.replace(/const\s+navigate\s*=\s*useNavigate\(\);/g, `const router = useRouter();\n  const navigate = (path) => router.push(path);`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Refactored ${file}`);
}
