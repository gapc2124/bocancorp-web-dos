import fs from 'fs';
import path from 'path';

const componentsDir = path.join(process.cwd(), 'src', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Add "use client" if not present
  if (!content.includes('"use client"') && !content.includes("'use client'")) {
    content = `'use client';\n` + content;
    modified = true;
  }

  // Replace react-router-dom imports
  if (content.includes('react-router-dom')) {
    // useParams
    if (content.includes('useParams')) {
      content = content.replace(/import\s+\{[^}]*useParams[^}]*\}\s+from\s+['"]react-router-dom['"];?/, (match) => {
        if (match.includes('Link') || match.includes('useNavigate') || match.includes('useLocation')) {
          // If there are other imports, this is tricky. Let's just do a blanket replacement.
          return match.replace('react-router-dom', 'next/navigation');
        }
        return `import { useParams } from 'next/navigation';`;
      });
    }

    // Link
    if (content.includes('Link')) {
      content = content.replace(/import\s+\{[^}]*Link[^}]*\}\s+from\s+['"]react-router-dom['"];?/, `import Link from 'next/link';`);
    }
    
    // HashLink - assuming react-router-hash-link might be used, but let's check react-router-dom
    if (content.includes('HashLink')) {
        content = content.replace(/import\s+\{[^}]*HashLink[^}]*\}\s+from\s+['"]react-router-hash-link['"];?/, `import Link from 'next/link';`);
        content = content.replace(/<HashLink/g, '<Link');
        content = content.replace(/<\/HashLink>/g, '</Link>');
        content = content.replace(/smooth/g, ''); // Next.js link doesn't use smooth prop directly
    }

    // Any remaining react-router-dom that is just useNavigate or something
    content = content.replace(/import\s+.*?from\s+['"]react-router-dom['"];?/g, '// react-router-dom removed');
    modified = true;
  }

  // Next.js Link uses href instead of to
  if (content.includes('<Link ')) {
    content = content.replace(/<Link([^>]*?)to=/g, '<Link$1href=');
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Refactored ${file}`);
  }
}
