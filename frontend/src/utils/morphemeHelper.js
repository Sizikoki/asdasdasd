import { PREFIXES, ROOTS, SUFFIXES } from '@/data/morphemesData';
import { getAllTerms } from '@/data/medicalTerms';

export const CATEGORY_NAMES = {
  // Roots Systems
  musculoskeletal: { tr: 'Kas-İskelet Sistemi', en: 'Musculoskeletal System' },
  cardiovascular: { tr: 'Dolaşım ve Hematoloji', en: 'Cardiovascular & Blood' },
  digestive: { tr: 'Sindirim Sistemi', en: 'Digestive System' },
  respiratory: { tr: 'Solunum Sistemi', en: 'Respiratory System' },
  nervous_endocrine: { tr: 'Sinir & Endokrin Sistemi', en: 'Nervous & Endocrine' },
  genitourinary: { tr: 'Ürogenital Sistem', en: 'Genitourinary System' },
  special_senses: { tr: 'Duyu Organları (Göz & Kulak)', en: 'Special Senses (Eye & Ear)' },
  integumentary: { tr: 'Deri ve Örtü Sistemi', en: 'Integumentary System' },
  general: { tr: 'Genel & Hücresel', en: 'General & Cellular' },
  position: { tr: 'Yön ve Konum', en: 'Position & Direction' },

  // Prefix Categories
  numbers_quantities: { tr: 'Sayısal & Nicel', en: 'Numbers & Quantities' },
  position_direction: { tr: 'Yön, Konum & Zaman', en: 'Position, Direction & Time' },
  negation_absence: { tr: 'Yokluk & Karşıtlık', en: 'Negation & Absence' },
  size_degree: { tr: 'Büyüklük & Derece', en: 'Size & Degree' },
  colors: { tr: 'Renkler', en: 'Colors' },
  specialty: { tr: 'Özel & Çeşitli', en: 'Specialty & Misc' },

  // Suffix Types
  surgical: { tr: 'Cerrahi Son Ekler', en: 'Surgical Suffixes' },
  diagnostic: { tr: 'Teşhis & Patolojik', en: 'Diagnostic & Pathological' },
  general_suffix: { tr: 'Genel & Tanımlayıcı Son Ekler', en: 'General & Descriptive Suffixes' },
};

/**
 * Returns a standardized array of all 559 morphemes with slugs and variants.
 */
export function getAllMorphemes() {
  const list = [];

  PREFIXES.forEach((p, idx) => {
    const raw = p.prefix || '';
    const mainVariant = raw.split(/[/;]/)[0].replace(/[-_]/g, '').trim().toLowerCase();
    list.push({
      id: `p_${idx}`,
      type: 'prefix',
      typeNameTr: 'Ön Ek (Prefix)',
      typeNameEn: 'Prefix',
      displayTerm: p.prefix,
      slug: mainVariant,
      variants: p.variants || raw.split(/[/;]/).map(v => v.trim()),
      meaningTr: p.meaningTr,
      meaningEn: p.meaningEn,
      category: p.category,
      example: p.example,
      breakdown: p.breakdown,
      description: p.description,
    });
  });

  ROOTS.forEach((r, idx) => {
    const raw = r.root || '';
    const mainVariant = raw.split(/[/;]/)[0].replace(/[-_]/g, '').trim().toLowerCase();
    list.push({
      id: `r_${idx}`,
      type: 'root',
      typeNameTr: 'Kök / Birleştirme Formu (Root)',
      typeNameEn: 'Combining Form / Root',
      displayTerm: r.root,
      slug: mainVariant,
      variants: r.variants || raw.split(/[/;]/).map(v => v.trim()),
      meaningTr: r.meaningTr,
      meaningEn: r.meaningEn,
      category: r.category,
      example: r.example,
      breakdown: r.breakdown,
      description: r.description,
    });
  });

  SUFFIXES.forEach((s, idx) => {
    const raw = s.suffix || '';
    const mainVariant = raw.split(/[/;]/)[0].replace(/[-_]/g, '').trim().toLowerCase();
    list.push({
      id: `s_${idx}`,
      type: 'suffix',
      typeNameTr: 'Son Ek (Suffix)',
      typeNameEn: 'Suffix',
      displayTerm: s.suffix,
      slug: mainVariant,
      variants: s.variants || raw.split(/[/;]/).map(v => v.trim()),
      meaningTr: s.meaningTr,
      meaningEn: s.meaningEn,
      category: s.category,
      example: s.example,
      breakdown: s.breakdown,
      description: s.description,
    });
  });

  return list;
}

/**
 * Finds a single morpheme by its slug or variant.
 */
export function findMorphemeBySlug(slug) {
  if (!slug) return null;
  const clean = decodeURIComponent(slug).toLowerCase().replace(/[-_]/g, '').trim();
  const all = getAllMorphemes();

  // 1. Direct slug match
  let found = all.find(m => m.slug === clean);
  if (found) return found;

  // 2. Variant match
  found = all.find(m => {
    const cleanVariants = (m.variants || []).map(v => v.replace(/[-_]/g, '').trim().toLowerCase());
    return cleanVariants.includes(clean);
  });

  return found || null;
}

/**
 * Finds all medical terms that contain this morpheme.
 */
export function findRelatedTermsForMorpheme(morpheme) {
  if (!morpheme) return [];
  const allTerms = getAllTerms();
  const variants = (morpheme.variants || [morpheme.slug]).map(v =>
    v.replace(/[-_]/g, '').trim().toLowerCase()
  ).filter(v => v.length >= 3); // Avoid 1-2 char false matches

  if (variants.length === 0) return [];

  return allTerms.filter(t => {
    const termLower = (t.term || '').toLowerCase();
    const rootsLower = (t.roots || '').toLowerCase();
    const defLower = (t.turkishDefinition || t.definition || '').toLowerCase();
    const engDefLower = (t.englishDefinition || '').toLowerCase();
    const engLower = (t.english || '').toLowerCase();

    return variants.some(v =>
      termLower.includes(v) || rootsLower.includes(v) || defLower.includes(v) || engDefLower.includes(v) || engLower.includes(v)
    );
  }).slice(0, 10);
}

/**
 * Finds related morphemes in the same category.
 */
export function getRelatedMorphemes(morpheme, limit = 6) {
  if (!morpheme) return [];
  const all = getAllMorphemes();
  return all
    .filter(m => m.id !== morpheme.id && m.category === morpheme.category)
    .slice(0, limit);
}
