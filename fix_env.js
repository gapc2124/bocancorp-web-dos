import fs from 'fs';
import path from 'path';

const componentsDir = path.join(process.cwd(), 'src', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  if (content.includes('import.meta.env')) {
    content = content.replace(/import\.meta\.env\.BASE_URL/g, "(process.env.NEXT_PUBLIC_BASE_URL || '')");
    content = content.replace(/import\.meta\.env/g, "process.env");
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed env in ${file}`);
  }
}
