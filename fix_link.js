import fs from 'fs';
import path from 'path';

const componentsDir = path.join(process.cwd(), 'src', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  if (content.includes("import { Link, useParams } from 'next/navigation';")) {
    content = content.replace("import { Link, useParams } from 'next/navigation';", "import Link from 'next/link';\nimport { useParams } from 'next/navigation';");
    modified = true;
  }
  
  if (content.includes("import { Link } from 'next/navigation';")) {
    content = content.replace("import { Link } from 'next/navigation';", "import Link from 'next/link';");
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed Link import in ${file}`);
  }
}
