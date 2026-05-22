import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src', 'app', '[lang]');

const fixImport = (filePath, componentName) => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(
      new RegExp(`import\\s+\\{\\s*${componentName}Client\\s*\\}\\s+from\\s+['"]@\\/components\\/${componentName}Client['"];?`),
      `import { ${componentName} as ${componentName}Client } from '@/components/${componentName}Client';`
    );
    fs.writeFileSync(filePath, content, 'utf8');
  }
};

fixImport(path.join(pagesDir, 'servicios', 'page.tsx'), 'ServicesPage');
fixImport(path.join(pagesDir, 'nosotros', 'page.tsx'), 'AboutUsPage');
fixImport(path.join(pagesDir, 'proyectos', 'page.tsx'), 'ProjectsPage');
fixImport(path.join(pagesDir, 'contacto', 'page.tsx'), 'ContactUsPage');

console.log('Fixed export names in imports');
