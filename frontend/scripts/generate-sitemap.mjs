import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

async function generateSitemap() {
  console.log('🚀 Generating sitemap.xml for HealthLexMed...');

  // Dynamically import data files
  const { PREFIXES, ROOTS, SUFFIXES } = await import('../src/data/morphemesData.js');
  const { getAllTerms } = await import('../src/data/medicalTerms.js');

  const today = new Date().toISOString().split('T')[0];
  const baseUrl = 'https://healthlexmed.com';

  // 1. Static Core Pages
  const staticPages = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${baseUrl}/study`, priority: '0.9', changefreq: 'daily' },
    { loc: `${baseUrl}/morphemes`, priority: '0.9', changefreq: 'daily' },
    { loc: `${baseUrl}/games`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${baseUrl}/flashcards`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${baseUrl}/match`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${baseUrl}/quiz`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${baseUrl}/morpheme`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${baseUrl}/progress`, priority: '0.7', changefreq: 'weekly' },
    { loc: `${baseUrl}/contact`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${baseUrl}/terms`, priority: '0.5', changefreq: 'monthly' },
    { loc: `${baseUrl}/privacy`, priority: '0.5', changefreq: 'monthly' },
    { loc: `${baseUrl}/refund`, priority: '0.5', changefreq: 'monthly' }
  ];

  const uniqueUrls = new Map();
  staticPages.forEach(p => uniqueUrls.set(p.loc, p));

  // Helper for morpheme slugs
  function getMorphemeSlug(rawTerm) {
    if (!rawTerm) return '';
    const firstVariant = rawTerm.split(/[/;]/)[0].replace(/[-_]/g, '').trim().toLowerCase();
    return firstVariant.replace(/[^a-z0-9]/g, '').trim();
  }

  // Helper for medical term slugs
  function getTermSlug(term) {
    if (!term) return '';
    const text = typeof term === 'string' ? term : term.term || '';
    return text
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  // 2. Dynamic Morpheme Pages (/morphemes/:slug)
  const allMorphemes = [
    ...PREFIXES.map(p => p.prefix),
    ...ROOTS.map(r => r.root),
    ...SUFFIXES.map(s => s.suffix)
  ];

  let morphemeCount = 0;
  allMorphemes.forEach(raw => {
    const slug = getMorphemeSlug(raw);
    if (slug) {
      const loc = `${baseUrl}/morphemes/${slug}`;
      if (!uniqueUrls.has(loc)) {
        uniqueUrls.set(loc, {
          loc,
          priority: '0.8',
          changefreq: 'weekly'
        });
        morphemeCount++;
      }
    }
  });

  // 3. Dynamic Medical Term Pages (/study/:slug)
  const allTerms = getAllTerms();
  let termCount = 0;
  allTerms.forEach(t => {
    const slug = getTermSlug(t.term);
    if (slug) {
      const loc = `${baseUrl}/study/${slug}`;
      if (!uniqueUrls.has(loc)) {
        uniqueUrls.set(loc, {
          loc,
          priority: '0.8',
          changefreq: 'weekly'
        });
        termCount++;
      }
    }
  });

  console.log(`✅ Loaded ${staticPages.length} core pages.`);
  console.log(`✅ Loaded ${morphemeCount} unique morpheme URLs.`);
  console.log(`✅ Loaded ${termCount} unique medical term URLs.`);
  console.log(`📊 Total sitemap URLs: ${uniqueUrls.size}`);

  // Build XML content
  const xmlEntries = Array.from(uniqueUrls.values()).map(item => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>
`;

  // Write to public/sitemap.xml
  const publicPath = path.join(projectRoot, 'public', 'sitemap.xml');
  fs.writeFileSync(publicPath, sitemapXml, 'utf-8');
  console.log(`🎉 Saved sitemap to ${publicPath}`);

  // Also write to build/sitemap.xml if build directory exists
  const buildDir = path.join(projectRoot, 'build');
  if (fs.existsSync(buildDir)) {
    const buildPath = path.join(buildDir, 'sitemap.xml');
    fs.writeFileSync(buildPath, sitemapXml, 'utf-8');
    console.log(`🎉 Updated existing build sitemap at ${buildPath}`);
  }
}

generateSitemap().catch(err => {
  console.error('❌ Error generating sitemap:', err);
  process.exit(1);
});
