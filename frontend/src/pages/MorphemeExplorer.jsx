import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Filter,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/context/LanguageContext';
import { PREFIXES, ROOTS, SUFFIXES } from '@/data/morphemesData';

// Kategori & Sistem İsim Eşleştirmeleri (TR & EN)
const CATEGORY_NAMES = {
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
  adjective: { tr: 'Sıfatlaştıran & İlişkin', en: 'Adjective & Relational' },
  noun: { tr: 'İsim, Küçültme & Özel', en: 'Noun & Specialty' },
};

// Türkçe ve İngilizce karakterleri arama için normalize etme
function normalizeSearchText(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[-/]/g, '')
    .trim();
}

export const MorphemeExplorer = () => {
  const { currentLanguage } = useLanguage();
  const isTr = currentLanguage === 'tr';
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') || '');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'prefix', 'root', 'suffix'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null && q !== undefined) {
      setSearchQuery(q);
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Tüm morfemleri tek bir listeye dönüştürme ve standartlaştırma
  const allMorphemes = useMemo(() => {
    const list = [];

    PREFIXES.forEach((p, idx) => {
      list.push({
        id: `p_${idx}`,
        type: 'prefix',
        displayTerm: p.prefix,
        meaningTr: p.meaningTr,
        meaningEn: p.meaningEn,
        category: p.category,
        example: p.example,
        breakdown: p.breakdown,
        description: p.description,
      });
    });

    ROOTS.forEach((r, idx) => {
      list.push({
        id: `r_${idx}`,
        type: 'root',
        displayTerm: r.root,
        meaningTr: r.meaningTr,
        meaningEn: r.meaningEn,
        category: r.system,
        example: r.example,
        breakdown: r.breakdown,
        description: '',
      });
    });

    SUFFIXES.forEach((s, idx) => {
      list.push({
        id: `s_${idx}`,
        type: 'suffix',
        displayTerm: s.suffix,
        meaningTr: s.meaningTr,
        meaningEn: s.meaningEn,
        category: s.type,
        example: s.example,
        breakdown: s.breakdown,
        description: '',
      });
    });

    return list;
  }, []);

  // Schema.org JSON-LD (DefinedTermSet) Yapılandırılmış Verisi
  const schemaJsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      '@id': 'https://healthlexmed.com/morphemes#termset',
      name: 'HealthLexMed Tıbbi Terminoloji Kök ve Ekler Sözlüğü (Medical Morphemes Dictionary)',
      description:
        `Tıbbi terminolojinin ${allMorphemes.length} temel yapı taşı: ${PREFIXES.length} Ön Ek, ${ROOTS.length} Kelime Kökü ve ${SUFFIXES.length} Son Ek içeren kapsamlı morfoloji ve kelime çözümleme veritabanı.`,
      url: 'https://healthlexmed.com/morphemes',
      inLanguage: ['tr', 'en', 'la'],
      hasDefinedTerm: allMorphemes.map((item) => ({
        '@type': 'DefinedTerm',
        termCode: item.displayTerm,
        name: item.displayTerm,
        description: `${item.meaningTr} (${item.meaningEn})${item.example ? ` — Örnek: ${item.example}` : ''}`,
        inDefinedTermSet: 'https://healthlexmed.com/morphemes#termset',
      })),
    };
  }, [allMorphemes]);

  // Mevcut tipe göre dinamik kategori seçenekleri
  const availableCategories = useMemo(() => {
    const categoriesSet = new Set();
    allMorphemes.forEach((item) => {
      if (activeTab === 'all' || item.type === activeTab) {
        if (item.category) categoriesSet.add(item.category);
      }
    });
    return Array.from(categoriesSet);
  }, [allMorphemes, activeTab]);

  // Arama & Filtreleme Mantığı
  const filteredMorphemes = useMemo(() => {
    const normalizedQuery = normalizeSearchText(searchQuery);

    return allMorphemes.filter((item) => {
      // 1. Tip filtresi
      if (activeTab !== 'all' && item.type !== activeTab) {
        return false;
      }

      // 2. Kategori filtresi
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // 3. Arama sorgusu
      if (!normalizedQuery) return true;

      const normTerm = normalizeSearchText(item.displayTerm);
      const normTr = normalizeSearchText(item.meaningTr);
      const normEn = normalizeSearchText(item.meaningEn);
      const normEx = normalizeSearchText(item.example);
      const normBr = normalizeSearchText(item.breakdown);
      const normDesc = normalizeSearchText(item.description);

      return (
        normTerm.includes(normalizedQuery) ||
        normTr.includes(normalizedQuery) ||
        normEn.includes(normalizedQuery) ||
        normEx.includes(normalizedQuery) ||
        normBr.includes(normalizedQuery) ||
        normDesc.includes(normalizedQuery)
      );
    });
  }, [allMorphemes, activeTab, selectedCategory, searchQuery]);

  // Sayfalama (Pagination)
  const totalPages = Math.ceil(filteredMorphemes.length / itemsPerPage) || 1;
  const paginatedMorphemes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredMorphemes.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMorphemes, currentPage, itemsPerPage]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setActiveTab('all');
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  // Tür Rozetleri Stilleri (Sabit ve orijinal terminoloji standardı)
  const getTypeBadge = (type) => {
    switch (type) {
      case 'prefix':
        return (
          <Badge className="bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 font-medium">
            {isTr ? 'Ön Ek (Prefix)' : 'Prefix'}
          </Badge>
        );
      case 'root':
        return (
          <Badge className="bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-500/30 hover:bg-violet-500/20 font-medium">
            {isTr ? 'Kök (Root)' : 'Root'}
          </Badge>
        );
      case 'suffix':
        return (
          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 font-medium">
            {isTr ? 'Son Ek (Suffix)' : 'Suffix'}
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      {/* Schema.org JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Başlık ve İstatistik Paneli */}
        <header className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isTr ? 'Morfem Keşif Alanı & Sözlüğü' : 'Morpheme Explorer & Lexicon'}
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground">
            {isTr
              ? `Tıbbi terimlerin yapı taşlarını oluşturan ${allMorphemes.length} kök ve eki keşfedin, Türkçe/İngilizce anlamlarını ve kelime formüllerini anında öğrenin.`
              : `Explore the ${allMorphemes.length} building blocks of medical terminology. Search prefixes, roots, and suffixes with dual-language definitions and formulas.`}
          </p>

          {/* İstatistik Rozetleri */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-2">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                activeTab === 'all'
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border text-foreground hover:bg-muted'
              }`}
            >
              {isTr ? 'Tüm Havuz' : 'All Morphemes'} ({allMorphemes.length})
            </button>
            <button
              onClick={() => handleTabChange('prefix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                activeTab === 'prefix'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400 hover:bg-blue-500/20'
              }`}
            >
              {isTr ? 'Ön Ekler' : 'Prefixes'} ({PREFIXES.length})
            </button>
            <button
              onClick={() => handleTabChange('root')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                activeTab === 'root'
                  ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                  : 'bg-violet-500/10 border-violet-500/20 text-violet-700 dark:text-violet-300 hover:bg-violet-500/20'
              }`}
            >
              {isTr ? 'Kökler' : 'Roots'} ({ROOTS.length})
            </button>
            <button
              onClick={() => handleTabChange('suffix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                activeTab === 'suffix'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20'
              }`}
            >
              {isTr ? 'Son Ekler' : 'Suffixes'} ({SUFFIXES.length})
            </button>
          </div>
        </header>

        {/* Arama ve Filtre Kontrol Çubuğu */}
        <section aria-label={isTr ? 'Filtreleme ve Arama' : 'Search and Filter'} className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Arama Çubuğu */}
            <div className="md:col-span-8 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={
                  isTr
                    ? 'Morfem, anlam veya örnek ara (örn: "cardi/o", "böbrek", "kesip çıkarma", "hepatitis")...'
                    : 'Search morpheme, meaning or example (e.g. "nephr", "kidney", "inflammation")...'
                }
                className="w-full pl-10 pr-10 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Kategori / Sistem Seçici */}
            <div className="md:col-span-4">
              <Select value={selectedCategory} onValueChange={(val) => { setSelectedCategory(val); setCurrentPage(1); }}>
                <SelectTrigger className="w-full py-2.5 bg-background border-border rounded-xl text-sm">
                  <div className="flex items-center gap-2 truncate">
                    <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
                    <SelectValue placeholder={isTr ? 'Kategori Seçin' : 'Select Category'} />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-card border-border max-h-80">
                  <SelectItem value="all">{isTr ? 'Tüm Kategoriler' : 'All Categories'}</SelectItem>
                  {availableCategories.map((catKey) => (
                    <SelectItem key={catKey} value={catKey}>
                      {CATEGORY_NAMES[catKey]?.[currentLanguage] || catKey}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sonuç Sayacı ve Filtreleri Temizleme */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/50 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-primary" />
              <span>
                {isTr ? 'Bulunan Morfem Sayısı:' : 'Morphemes found:'}{' '}
                <strong className="text-foreground">{filteredMorphemes.length}</strong>
              </span>
            </div>

            {(searchQuery || selectedCategory !== 'all' || activeTab !== 'all') && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-primary hover:underline font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {isTr ? 'Filtreleri Sıfırla' : 'Reset Filters'}
              </button>
            )}
          </div>
        </section>

        {/* Morfem Kartları Izgarası (Grid) */}
        {paginatedMorphemes.length > 0 ? (
          <section aria-label={isTr ? 'Morfem Kartları' : 'Morpheme Cards'} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {paginatedMorphemes.map((item) => {
              const slug = (item.displayTerm || '').split(/[\/;]/)[0].replace(/[-_]/g, '').trim().toLowerCase();

              return (
                <article
                  key={item.id}
                  itemScope
                  itemType="https://schema.org/DefinedTerm"
                  className="h-full"
                >
                  {/* Schema.org Microdata Hidden Properties */}
                  <meta itemProp="name" content={item.displayTerm} />
                  <meta itemProp="termCode" content={item.displayTerm} />
                  <meta
                    itemProp="description"
                    content={`${item.meaningTr} (${item.meaningEn})${item.example ? ` — Örnek: ${item.example}` : ''}`}
                  />
                  <meta itemProp="inDefinedTermSet" content="https://healthlexmed.com/morphemes#termset" />

                  <Link
                    to={`/morphemes/${slug}`}
                    className="block h-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
                  >
                    <Card className="h-full bg-card border border-border group-hover:border-primary/50 group-hover:shadow-md group-hover:-translate-y-0.5 rounded-2xl transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer">
                      <CardContent className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-4">
                          {/* Kart Üst Barı: Başlık ve Rozet */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xl font-bold font-mono tracking-tight text-foreground group-hover:text-primary transition-colors">
                                  {item.displayTerm}
                                </span>
                                {getTypeBadge(item.type)}
                              </div>
                              {item.category && CATEGORY_NAMES[item.category] && (
                                <p className="text-[0.75rem] font-medium text-muted-foreground">
                                  {CATEGORY_NAMES[item.category]?.[currentLanguage] || CATEGORY_NAMES[item.category]?.tr}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Anlamlar Bölümü */}
                          <div className="space-y-2 pt-1 border-t border-border/50">
                            <div className="flex items-start gap-2 text-sm">
                              <span className="shrink-0 px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold tracking-wider">
                                TR
                              </span>
                              <span className="text-foreground font-medium leading-snug">
                                {item.meaningTr}
                              </span>
                            </div>

                            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="shrink-0 px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[10px] font-bold tracking-wider border border-border/50">
                                EN
                              </span>
                              <span className="leading-snug">
                                {item.meaningEn}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Örnek & Çözümleme Formülü Kutusu */}
                        {(item.example || item.breakdown || item.description) && (
                          <div className="bg-muted/40 border border-border/60 rounded-xl p-3 space-y-1.5 text-xs mt-3">
                            {item.example && (
                              <div className="flex items-center gap-1.5 font-semibold text-primary">
                                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">{item.example}</span>
                              </div>
                            )}
                            {item.breakdown && (
                              <p className="text-foreground/80 font-mono text-[0.75rem] leading-relaxed break-words bg-background/60 p-2 rounded-lg border border-border/40">
                                {item.breakdown}
                              </p>
                            )}
                            {item.description && (
                              <p className="text-muted-foreground text-[0.75rem] leading-relaxed italic">
                                {item.description}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Detay & Terimler Linki */}
                        <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs mt-3">
                          <span className="font-semibold text-primary group-hover:underline inline-flex items-center gap-1">
                            {isTr ? 'Kök Detayı & Terimler' : 'Root Details & Terms'}
                            <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                          </span>
                          <span className="text-[11px] text-muted-foreground font-mono">#{item.type}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </article>
              );
            })}
          </section>
        ) : (
          /* Sonuç Bulunamadı Durumu */
          <div className="text-center py-16 bg-card border border-border rounded-2xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">
                {isTr ? 'Aramanızla eşleşen morfem bulunamadı' : 'No matching morphemes found'}
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {isTr
                  ? 'Farklı bir kök, ön ek veya Türkçe/İngilizce tıbbi kelime aramayı deneyebilirsiniz.'
                  : 'Try searching with a different affix, root, or keyword.'}
              </p>
            </div>
            <Button onClick={resetFilters} variant="outline" className="rounded-xl">
              <RotateCcw className="w-4 h-4 mr-2" />
              {isTr ? 'Aramayı Temizle' : 'Clear Search'}
            </Button>
          </div>
        )}

        {/* Sayfalama Kontrolleri (Pagination) */}
        {totalPages > 1 && (
          <nav aria-label={isTr ? 'Sayfalama' : 'Pagination'} className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-xl"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {isTr ? 'Önceki' : 'Previous'}
            </Button>

            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold px-3 py-1.5 bg-card border border-border rounded-xl text-foreground">
                {isTr ? `Sayfa ${currentPage} / ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-xl"
            >
              {isTr ? 'Sonraki' : 'Next'}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </nav>
        )}
      </div>
    </main>
  );
};
