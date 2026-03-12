import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

const PDF_PATH = './public/cv.pdf';
const CONFIG_PATH = './src/config.js';

// Palabras clave para detectar secciones en ES/EN
const SECTIONS = {
  EXP: ['EXPERIENCIA LABORAL', 'WORK EXPERIENCE', 'PROFESSIONAL EXPERIENCE'],
  EDU: ['EDUCACIÓN Y FORMACIÓN', 'EDUCATION AND TRAINING', 'EDUCATION'],
  SKILLS: ['CAPACIDADES Y COMPETENCIAS', 'DIGITAL SKILLS', 'SKILLS', 'COMPETENCIAS'],
  CERTS: ['CERTIFICACIONES', 'CERTIFICATIONS', 'ACHIEVEMENTS', 'PROJECTS'],
  LANG: ['IDIOMAS', 'LANGUAGE SKILLS', 'LANGUAGES']
};

async function universalSetup() {
  if (fs.existsSync(CONFIG_PATH)) {
    console.log('ℹ️ src/config.js already exists. Skipping setup to avoid overwriting your changes.');
    console.log('💡 If you want to regenerate it, delete src/config.js first.');
    return;
  }

  if (!fs.existsSync(PDF_PATH)) {
    console.error('❌ Error: public/cv.pdf not found.');
    process.exit(1);
  }

  try {
    const dataBuffer = fs.readFileSync(PDF_PATH);
    const data = await pdf(dataBuffer);
    const text = data.text;
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 1);

    const config = {
      name: '', nickname: '', surname: '', title: '', email: '', linkedin: '',
      experience: [], skills: [], certifications: [], education: '', languages: []
    };

    // 1. EXTRAER CABECERA (Identidad)
    // El nombre suele estar en la primera línea.
    const fullName = lines[0].split(' ');
    config.name = fullName[0] || 'New';
    config.surname = fullName.slice(1).join(' ') || 'User';
    config.nickname = ""; // Opcional, para que el usuario lo llene

    // 2. BUSCAR CONTACTO CON REGEX
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const liMatch = text.match(/https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?/);
    config.email = emailMatch ? emailMatch[0] : '';
    config.linkedin = liMatch ? liMatch[0] : '';

    // 3. PARSER POR SECCIONES
    let currentCat = null;
    let tempItem = null;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const up = line.toUpperCase();

      // Cambiar de categoría
      if (SECTIONS.EXP.some(s => up.includes(s))) { currentCat = 'EXP'; continue; }
      if (SECTIONS.EDU.some(s => up.includes(s))) { currentCat = 'EDU'; continue; }
      if (SECTIONS.SKILLS.some(s => up.includes(s))) { currentCat = 'SKILLS'; continue; }
      if (SECTIONS.CERTS.some(s => up.includes(s))) { currentCat = 'CERTS'; continue; }

      // Ignorar ruidos de Europass
      if (line.includes('Page') || line.includes('europass')) continue;

      if (currentCat === 'EXP') {
        // Detectar nueva experiencia por fecha [ DD/MM/YYYY - ... ]
        if (line.match(/\[?\s*\d{2}\/\d{2}\/\d{4}/)) {
          if (tempItem) config.experience.push(tempItem);
          tempItem = { 
            role: lines[i-1] || 'Role', 
            company: line.split('-')[0].replace(/[\[\]]/g, '').trim(), 
            years: line.replace(/[\[\]]/g, '').trim(), 
            bullets: [] 
          };
        } else if (tempItem) {
          if (line.length > 5) tempItem.bullets.push(line);
        }
      }

      if (currentCat === 'SKILLS' && line.length < 50) {
        config.skills.push(line);
      }

      if (currentCat === 'CERTS' && line.length > 5) {
        config.certifications.push({ name: line, issuer: 'Issuer', year: '', link: config.linkedin });
      }
      
      if (currentCat === 'EDU' && !config.education) {
        config.education = line;
      }
    }
    if (tempItem) config.experience.push(tempItem);

    // 4. GUARDAR
    const content = `export const CONFIG = {
  name: '${config.name}',
  nickname: '${config.nickname}',
  surname: '${config.surname}',
  title: '${config.title || 'Professional'}',
  email: '${config.email}',
  linkedin: '${config.linkedin}',
  cvPath: '/cv.pdf',
  experience: ${JSON.stringify(config.experience, null, 2)},
  skills: ${JSON.stringify(config.skills.slice(0, 15), null, 2)},
  certifications: ${JSON.stringify(config.certifications.slice(0, 10), null, 2)},
  education: '${config.education || 'See attached CV'}'
};`;

    fs.writeFileSync(CONFIG_PATH, content);
    console.log('✅ Universal Setup Complete!');
    console.log('🚀 Created src/config.js based on your CV.');

  } catch (e) {
    console.error('❌ Extraction Error:', e.message);
  }
}

universalSetup();
