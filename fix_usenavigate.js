import fs from 'fs';
import path from 'path';

const componentsDir = path.join(process.cwd(), 'src', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  if (content.includes('useNavigate')) {
    content = content.replace(/useNavigate/g, 'useRouter');
    content = content.replace(/const navigate\s*=\s*useRouter\(\);/g, `const router = useRouter();\n  const navigate = (path) => router.push(path);`);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${file}`);
  }
}
