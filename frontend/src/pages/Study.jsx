import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, BookOpen, Menu, X, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { saveProgress, getTermProgress, isLoggedIn } from '@/utils/storage';
import { toast } from 'sonner';
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { getAllTerms } from '@/data/medicalTerms';
import { formatMedicalTerm } from '@/utils/format';
import { useLanguage } from '@/context/LanguageContext';
import { getTermMorphemes } from '@/utils/morphemeAdapter';
import { getTermSlug } from '@/utils/termHelper';

// Sabit kategori listesi
const CATEGORIES = [
  { id: 'skull_bones', key: 'skullBones', name: 'Kafatası Kemikleri', system: 'movement', subcategory: 'skull_bones' },
  { id: 'face_bones', key: 'faceBones', name: 'Yüz Kemikleri', system: 'movement', subcategory: 'face_bones' },
  { id: 'trunk_bones', key: 'trunkBones', name: 'Gövde Kemikleri', system: 'movement', subcategory: 'trunk_bones' },
  { id: 'upper_extremity_bones', key: 'upperExtremityBones', name: 'Üst Extremite Kemikleri', system: 'movement', subcategory: 'upper_extremity_bones' },
  { id: 'upper_extremity_joints', key: 'upperExtremityJoints', name: 'Üst Ekstremite Eklemleri', system: 'movement', subcategory: 'upper_extremity_joints' },
  { id: 'lower_extremity_bones', key: 'lowerExtremityBones', name: 'Alt Extremite Kemikleri', system: 'movement', subcategory: 'lower_extremity_bones' },
  { id: 'lower_extremity_joints', key: 'lowerExtremityJoints', name: 'Alt Ekstremite Eklemleri', system: 'movement', subcategory: 'lower_extremity_joints' },
  { id: 'spine_joints', key: 'spineJoints', name: 'Omurga Eklemleri', system: 'movement', subcategory: 'spine_joints' },
  { id: 'head_and_neck_joints', key: 'headAndNeckJoints', name: 'Kafa ve Boyun Eklemleri', system: 'movement', subcategory: 'head_and_neck_joints' },
  { id: 'movement_terms', key: 'movementTerms', name: 'Hareket Terimleri', category: 'movement_terms' },
  { id: 'anatomic_direction', key: 'anatomicDirection', name: 'Anatomik Yön Terimleri', system: 'movement', subcategory: 'anatomic_direction' },
];

const UPPER_EXTREMITY_GROUPS = [
  { name: 'Scapula', ids: [19, 59, 60, 91, 92, 93, 94, 95, 96, 97, 98] },
  { name: 'Clavicula', ids: [20, 83, 84, 85, 86, 87, 88, 89, 90] },
  { name: 'Humerus', ids: [21, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82] },
  { name: 'Radius', ids: [22, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40] },
  { name: 'Ulna', ids: [23, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53] },
  { name: 'Ossa Manus', ids: [24, 25, 26, 54, 55, 56, 57, 58] }
];

export const Study = () => {
  const navigate = useNavigate();
  const { currentLanguage, t } = useLanguage();
  const isTr = currentLanguage === 'tr';

  const [selectedCategoryId, setSelectedCategoryId] = useState(CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [allTerms, setAllTerms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setLoading(true);
        let timeoutId;
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error('Firestore timeout')), 3000);
        });

        const querySnapshot = await Promise.race([
          getDocs(collection(db, 'terms')),
          timeoutPromise
        ]);
        if (timeoutId) clearTimeout(timeoutId);

        let rawTerms = [];
        querySnapshot.forEach((doc) => {
          rawTerms.push(doc.data());
        });

        if (rawTerms.length === 0) {
          rawTerms = getAllTerms();
        }

        const normalized = rawTerms.map((termItem) => ({
          id: termItem.id,
          term: termItem.term,
          turkish: termItem.english || termItem.turkish || '',
          turkishShort: termItem.turkishShort || '',
          definition: termItem.turkishDefinition || termItem.definition || '',
          turkishDefinition: termItem.turkishDefinition || termItem.definition || '',
          english: termItem.english || termItem.turkish || '',
          englishDefinition: termItem.englishDefinition || termItem.english || '',
          roots: termItem.roots || '',
          morphemes: termItem.morphemes || '',
          category: termItem.category || '',
          system: termItem.system || '',
          subcategory: termItem.subcategory || '',
        })).sort((a, b) => Number(a.id) - Number(b.id));

        setAllTerms(normalized);
      } catch (error) {
        console.warn('Live terms fetch error/timeout, using local fallback:', error);
        setAllTerms(getAllTerms());
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  const selectedCategory = CATEGORIES.find(c => c.id === selectedCategoryId) || CATEGORIES[0];

  const filteredTerms = allTerms.filter(t => {
    if (selectedCategory.category) {
      return t.category === selectedCategory.category;
    }
    if (selectedCategory.subcategory) {
      return t.subcategory === selectedCategory.subcategory;
    }
    return true;
  });

  const terms = searchQuery
    ? filteredTerms.filter(
        (t) =>
          t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (t.turkish && t.turkish.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (t.english && t.english.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (t.definition && t.definition.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (t.turkishDefinition && t.turkishDefinition.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (t.englishDefinition && t.englishDefinition.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : filteredTerms;

  const handleMarkAsLearned = (termId) => {
    const progress = getTermProgress(termId);
    const newStatus = !progress.learned;
    saveProgress(termId, newStatus);
    if (!isLoggedIn()) {
      toast.info(newStatus ? 'Terim öğrenildi! (Misafir Modu: İlerlemeniz bu cihazda saklanır)' : 'Öğrenildi işareti kaldırıldı');
    } else {
      toast.success(newStatus ? 'Terim öğrenildi olarak işaretlendi!' : 'Öğrenildi işareti kaldırıldı');
    }
    setRefreshTrigger(prev => prev + 1);
  };

  const handleMorphemeClick = (part) => {
    const cleanQuery = part.text.replace(/[-/]/g, '').trim();
    if (cleanQuery) {
      navigate(`/morphemes?search=${encodeURIComponent(cleanQuery)}`);
    }
  };

  const renderTermCard = (term) => {
    const progress = getTermProgress(term.id);
    const morphemes = getTermMorphemes(term);

    return (
      <div
        key={`${term.id}-${refreshTrigger}`}
        className="group relative bg-card text-card-foreground rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-border flex flex-col justify-between min-h-[260px]"
      >
        {/* Category Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wide bg-muted text-muted-foreground border border-border/50">
            {t(selectedCategory.key, selectedCategory.name)}
          </span>
        </div>

        {/* Card body */}
        <div className="p-5 flex flex-col h-full justify-between">
          <div>
            {/* Title */}
            <div className="mb-2 pr-28 pt-1">
              <Link to={`/study/${getTermSlug(term.term)}`} className="block">
                <h3 className="text-lg font-bold leading-tight text-foreground font-serif tracking-tight hover:text-primary transition-colors cursor-pointer">
                  {formatMedicalTerm(term.term)}
                </h3>
              </Link>
            </div>

            {/* EN Label */}
            {(term.english || term.turkish) && (
              <div className="flex items-baseline gap-2 mb-3">
                <span className="shrink-0 px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[9px] font-bold tracking-wider border border-border/50">
                  EN
                </span>
                <span className="text-xs font-medium text-muted-foreground leading-snug">
                  {term.english || term.turkish}
                </span>
              </div>
            )}

            {/* Divider */}
            <div className="w-full h-px bg-border/60 mb-3" />

            {/* Definition */}
            <p className="text-sm text-foreground/90 leading-relaxed mb-4 line-clamp-3">
              {isTr
                ? (term.turkishDefinition || term.definition)
                : (term.englishDefinition || term.turkishDefinition || term.definition)}
            </p>

            {/* İnteraktif Morfem Analizi Rozetleri */}
            {morphemes && morphemes.length > 0 && (
              <div className="mb-4 pt-2.5 border-t border-border/50">
                <div className="mb-2">
                  <span className="text-[11px] font-bold text-foreground/90 tracking-wide uppercase">
                    {isTr ? 'Morfem Yapısı' : 'Word Breakdown'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {morphemes.map((part, idx) => {
                    const meaningText = part.meaning?.[currentLanguage] || part.meaning?.tr || '';

                    return (
                      <React.Fragment key={part.id || idx}>
                        {idx > 0 && (
                          <span className="text-[10px] text-muted-foreground/70 font-bold select-none">+</span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleMorphemeClick(part)}
                          title={`${part.text} — ${meaningText} (${isTr ? 'Sözlükte keşfetmek için tıkla' : 'Click to explore'})`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border/70 bg-muted/60 hover:bg-muted text-foreground hover:border-primary/40 text-xs font-mono font-medium transition-all duration-150 hover:scale-[1.02] active:scale-95 shadow-xs cursor-pointer"
                        >
                          <span className="font-semibold text-foreground">{part.text}</span>
                          {meaningText && (
                            <span className="text-[10.5px] font-sans font-normal text-muted-foreground max-w-[120px] truncate">
                              ({meaningText})
                            </span>
                          )}
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Öğrenildi / Öğren Butonu & Detay Linki */}
          <div className="flex items-center gap-2 pt-2 border-t border-border/40 mt-auto">
            <Link
              to={`/study/${getTermSlug(term.term)}`}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-primary hover:bg-muted border border-border/60 transition-colors inline-flex items-center gap-1 shrink-0"
              title={isTr ? 'Terim detayını ve morfem çözümlemesini gör' : 'View term details'}
            >
              <span>{isTr ? 'Detay' : 'Details'}</span>
              <span>→</span>
            </Link>
            <button
              onClick={() => handleMarkAsLearned(term.id)}
              data-term-id={term.id}
              data-learned={progress.learned ? 'true' : 'false'}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                progress.learned
                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 focus:ring-emerald-400'
                  : 'bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 focus:ring-primary'
              }`}
            >
              {progress.learned ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>{t('learned')}</span>
                </>
              ) : (
                <span>{t('markLearned')}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Left Sidebar - Desktop only */}
      <div className={`hidden md:block ${sidebarOpen ? 'w-64' : 'w-0'} bg-background border-r border-border flex-shrink-0 overflow-y-auto transition-all duration-300 ${!sidebarOpen && 'border-r-0'}`}>
        <div className={`${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{t('categories')}</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-muted transition-colors"
                aria-label="Menüyü kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-2 space-y-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategoryId(cat.id); setSearchQuery(''); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategoryId === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
              >
                {t(cat.key, cat.name)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar - Drawer Overlay */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[280px] p-0 flex flex-col h-full">
          <SheetHeader className="p-4 border-b border-border flex-shrink-0">
            <SheetTitle className="text-left font-semibold">{t('categories')}</SheetTitle>
          </SheetHeader>
          <div className="p-2 space-y-1 overflow-y-auto flex-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategoryId(cat.id);
                  setSearchQuery('');
                  setSidebarOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategoryId === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
              >
                {t(cat.key, cat.name)}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <div className="bg-background border-b border-border p-4 flex items-center justify-between gap-4 sticky top-0 z-10 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors border border-border text-xs font-semibold text-foreground"
              aria-label="Kategorileri Göster/Gizle"
            >
              <Menu className="w-4 h-4" />
              <span className="hidden sm:inline">{t('categories', 'Kategoriler')}</span>
            </button>
            <div>
              <h1 className="text-xl font-bold">{t(selectedCategory.key, selectedCategory.name)}</h1>
              <p className="text-xs text-muted-foreground">{terms.length} {t('termsCount')}</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-48 sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 text-sm rounded-xl"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : terms.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded-2xl p-8">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <h3 className="text-base font-semibold">{t('noTermsFound')}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t('tryAnotherSearch')}</p>
            </div>
          ) : selectedCategoryId === 'upper_extremity_bones' && !searchQuery ? (
            /* Üst Extremite Kemikleri - Gruplu Görünüm */
            <div className="space-y-10">
              {UPPER_EXTREMITY_GROUPS.map((group) => {
                const groupTerms = terms.filter(t => group.ids.includes(t.id));
                if (groupTerms.length === 0) return null;

                return (
                  <div key={group.name} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-bold tracking-tight">{group.name}</h2>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {groupTerms.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {groupTerms.map(renderTermCard)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Standart Liste Görünümü */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {terms.map(renderTermCard)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
