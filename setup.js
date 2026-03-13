import fs from 'fs';
import * as cheerio from 'cheerio';
import readline from 'readline';
import { pathToFileURL } from 'url';

const CONFIG_PATH = './src/config.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setup() {
  console.log('\n🚀 Windows NT Portfolio Smart Setup');
  console.log('------------------------------------');

  // 1. Intentar cargar configuración existente
  let currentConfig = {};
  if (fs.existsSync(CONFIG_PATH)) {
    try {
      const module = await import(pathToFileURL(CONFIG_PATH).href + '?t=' + Date.now());
      currentConfig = module.CONFIG;
      console.log('💡 Se detectó una configuración previa. Usando valores por defecto.');
    } catch (e) {
      console.log('⚠️ No se pudo leer la configuración anterior. Iniciando modo limpio.');
    }
  }

  // 2. URL de Europass
  const defaultUrl = currentConfig.europassUrl || 'https://europa.eu/europass/eportfolio/api/eprofile/shared-profile/matias+carlos-siri+brenta/bf8d06fa-e634-4a88-ae75-c383956acf5f?view=html';
  const europassUrl = await question(`🔗 URL de Europass [${defaultUrl}]: `) || defaultUrl;
  
  console.log('\n🌐 Conectando con Europass...');
  
  try {
    const response = await fetch(europassUrl);
    if (!response.ok) throw new Error(`Error al acceder a Europass: ${response.statusText}`);
    
    const html = await response.text();
    const $ = cheerio.load(html);
    console.log('✅ Perfil de Europass detectado.');

    // 3. Datos Personales (Smart Defaults)
    console.log('\n👤 Información Personal (Enter para mantener actual):');
    const name = await question(`   Nombre principal [${currentConfig.name || 'Matias Carlos'}]: `) || currentConfig.name || 'Matias Carlos';
    const surname = await question(`   Apellido [${currentConfig.surname || 'Siri Brenta'}]: `) || currentConfig.surname || 'Siri Brenta';
    const nickname = await question(`   Nickname [${currentConfig.nickname || ''}]: `) || currentConfig.nickname || '';
    const email = await question(`📧 Email [${currentConfig.email || ''}]: `) || currentConfig.email || '';
    
    // 4. Perfiles Sociales
    console.log('\n📱 Perfiles Profesionales:');
    const linkedin = await question(`   LinkedIn [${currentConfig.linkedin || ''}]: `) || currentConfig.linkedin || '';
    const credly = await question(`   Credly Profile [${currentConfig.credly || ''}]: `) || currentConfig.credly || '';

    const config = {
      europassUrl,
      name,
      nickname,
      surname,
      title: '',
      email,
      linkedin,
      credly,
      experience: [],
      skills: [],
      certifications: [],
      education: '',
      languages: []
    };

    // Título / Summary (Scrapeado)
    config.title = $('.header-avatar + div p').first().text().trim() || 'Enterprise Cybersecurity Architect';

    // Experiencia Laboral (Scrapeada)
    $('section.work-experience article.experience').each((i, el) => {
      const company = $(el).find('.experience__subtitle').first().text().trim();
      const role = $(el).find('.experience__title').first().text().trim();
      const dates = $(el).find('.experience__metas').first().text().trim().replace(/\s+/g, ' ');
      const bullets = [];
      $(el).find('.experience__desc li').each((j, li) => bullets.push($(li).text().trim()));
      if (bullets.length === 0) {
        const textDesc = $(el).find('.experience__desc').text().trim();
        if (textDesc.length > 10) bullets.push(textDesc);
      }
      if (company && role) config.experience.push({ role, company, years: dates, bullets });
    });

    // Skills (Scrapeado)
    $('section').each((i, sec) => {
        const title = $(sec).find('h2.section__title').text().trim();
        if (title.toLowerCase().includes('skills')) {
            $(sec).find('article.experience li.inline-list__item').each((k, li) => {
                const skill = $(li).text().trim();
                if (skill && !config.skills.includes(skill)) config.skills.push(skill);
            });
        }
    });

    // Educación (Scrapeado)
    const eduSection = $('section').filter((i, el) => $(el).find('h2.section__title').text().trim().toLowerCase().includes('education'));
    const firstEdu = eduSection.find('article.experience').first();
    if (firstEdu.length) {
        config.education = `${firstEdu.find('.experience__title').text().trim()} - ${firstEdu.find('.experience__subtitle').text().trim()}`;
    }

    // 5. Certificaciones (Smart Match)
    console.log('\n🎓 Certificaciones (Links opcionales):');
    const certEntries = [];
    eduSection.find('article.experience').each((i, el) => {
        if (i === 0 && config.education) return;
        const name = $(el).find('.experience__subtitle').text().trim() || $(el).find('.experience__title').text().trim();
        const issuer = $(el).find('.experience__title').text().trim();
        const year = $(el).find('.experience__metas').text().trim().split('–')[0].trim().split('-')[0].trim();
        if (name) certEntries.push({ name, issuer, year });
    });

    for (const cert of certEntries) {
        // Buscar si ya teníamos un link para esta cert
        const prevCert = currentConfig.certifications?.find(c => c.name === cert.name);
        const prevLink = prevCert ? prevCert.link : '';
        const link = await question(`   🔗 Link para "${cert.name}" [${prevLink || 'ninguno'}]: `) || prevLink;
        config.certifications.push({ ...cert, link });
    }

    // Idiomas (Scrapeado)
    $('.language-container h4').each((i, el) => config.languages.push($(el).text().trim()));

    // 6. Generar config.js final
    const content = `export const CONFIG = {
  europassUrl: '${config.europassUrl}',
  name: '${config.name}',
  nickname: '${config.nickname}',
  surname: '${config.surname}',
  title: '${config.title}',
  email: '${config.email}',
  linkedin: '${config.linkedin}',
  credly: '${config.credly}',
  cvPath: '/cv.pdf',
  experience: ${JSON.stringify(config.experience, null, 2)},
  skills: ${JSON.stringify(config.skills, null, 2)},
  certifications: ${JSON.stringify(config.certifications, null, 2)},
  education: '${config.education}',
  languages: ${JSON.stringify(config.languages, null, 2)}
};`;

    fs.writeFileSync(CONFIG_PATH, content);
    console.log('\n✅ ¡Setup completado! Tu portfolio está listo y actualizado.');

  } catch (e) {
    console.error('\n❌ Error durante el setup:', e.message);
  } finally {
    rl.close();
  }
}

setup();
