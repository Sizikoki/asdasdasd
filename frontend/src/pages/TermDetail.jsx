import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ArrowLeft,
  Gamepad2,
  Layers,
  ChevronRight,
  Sparkles,
  Tag,
  Share2,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import {
  findTermBySlug,
  getTermSlug,
  getRelatedTerms,
  parseRootsToMorphemes
} from '@/utils/termHelper';

export const TermDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { currentLanguage, t } = useLanguage();
  const isTr = currentLanguage === 'tr';

  const term = useMemo(() => findTermBySlug(slug), [slug]);
  const relatedTerms = useMemo(() => getRelatedTerms(term, 6), [term]);
  const parsedRoots = useMemo(() => parseRootsToMorphemes(term?.roots), [term]);

  // Dynamic SEO Title and Meta Description
  useEffect(() => {
    if (term) {
      const enName = term.turkish || term.english || '';
      const titleStr = isTr
        ? `${term.term} (${enName}) Nedir? | Anatomi ve Kök Analizi - HealthLexMed`
        : `${term.term} (${enName}) Medical Definition & Anatomy Breakdown - HealthLexMed`;
      document.title = titleStr;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          isTr
            ? `${term.term} (${enName}) nedir? Morfem ve etimoloji kökeni: ${term.roots || ''}. Tıbbi ve anatomik açıklaması, komşulukları ve fonksiyonları.`
            : `What is ${term.term} (${enName})? Morpheme breakdown: ${term.roots || ''}. Medical definition, anatomical relationships, and flashcard learning.`
        );
      }
    }
  }, [term, isTr]);

  if (!term) {
    return (
      <div className="min-h-screen py-16 px-4 max-w-3xl mx-auto text-center">
        <div className="p-8 bg-card border border-border rounded-2xl shadow-sm">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">
            {isTr ? 'Tıbbi Terim Bulunamadı' : 'Medical Term Not Found'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {isTr
              ? 'Aradığınız terim veritabanımızda bulunamadı veya yazımı hatalı olabilir.'
              : 'The requested medical term could not be found or may be misspelled.'}
          </p>
          <Button onClick={() => navigate('/study')} className="gradient-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isTr ? 'Sözlüğe / Çalışma Moduna Dön' : 'Back to Study Lexicon'}
          </Button>
        </div>
      </div>
    );
  }

  const enTranslation = term.turkish || term.english || '';
  const primaryDefinition = isTr
    ? (term.turkishDefinition || term.definition || '')
    : (term.englishDefinition || term.turkishDefinition || term.definition || '');
  const secondaryDefinition = isTr
    ? (term.englishDefinition || '')
    : (term.turkishDefinition || term.definition || '');

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      {/* Schema.org AnatomicalStructure for Google Medical Knowledge Graph */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AnatomicalStructure",
          "name": term.term,
          "alternateName": enTranslation,
          "description": primaryDefinition,
          "url": `https://healthlexmed.com/study/${getTermSlug(term.term)}`
        })
      }} />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">
            {isTr ? 'Ana Sayfa' : 'Home'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link to="/study" className="hover:text-primary transition-colors">
            {isTr ? 'Tıp Terimleri Sözlüğü' : 'Medical Lexicon'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-foreground font-semibold font-serif break-all">{term.term}</span>
        </nav>

        {/* Back Link */}
        <Link
          to="/study"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {isTr ? 'Sözlüğe Dön' : 'Back to Lexicon'}
        </Link>

        {/* Main Term Hero Card */}
        <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 gradient-primary" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="secondary" className="font-semibold text-xs px-2.5 py-0.5">
                  {isTr ? 'Anatomik Terim' : 'Anatomical Term'}
                </Badge>
                {term.system && (
                  <Badge variant="outline" className="text-xs px-2.5 py-0.5 border-border">
                    {term.system === 'movement' ? (isTr ? 'Hareket Sistemi' : 'Musculoskeletal') : term.system}
                  </Badge>
                )}
                {term.subcategory && (
                  <Badge variant="outline" className="text-xs px-2.5 py-0.5 border-border text-muted-foreground">
                    {term.subcategory.replace(/_/g, ' ')}
                  </Badge>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground font-serif tracking-tight break-words">
                {term.term}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <Button
                size="sm"
                onClick={() => navigate('/flashcards')}
                className="gradient-primary shadow-sm hover:shadow flex-1 sm:flex-initial justify-center"
              >
                <Layers className="w-4 h-4 mr-1.5" />
                {isTr ? 'Kartlarda Çalış' : 'Study Cards'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate('/match')}
                className="border-primary/30 hover:bg-primary/10 flex-1 sm:flex-initial justify-center"
              >
                <Gamepad2 className="w-4 h-4 mr-1.5 text-primary" />
                {isTr ? 'Eşleştir' : 'Match Game'}
              </Button>
            </div>
          </div>

          {/* Diller Arası Karşılıklar (TR / EN / LA) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border/60">
            {/* Uluslararası Tıp Adı */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border/60">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-1.5">
                <span>🇬🇧</span> {isTr ? 'Uluslararası / İngilizce Adı' : 'International / English Name'}
              </div>
              <p className="text-lg font-bold text-foreground leading-snug">
                {enTranslation || term.term}
              </p>
            </div>

            {/* Orijinal Latince Adı */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border/60">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-1.5">
                <span>🏛️</span> {isTr ? 'Terminologia Anatomica (Latince)' : 'Latin Anatomical Name'}
              </div>
              <p className="text-lg font-bold text-foreground leading-snug font-serif italic">
                {term.term}
              </p>
            </div>
          </div>

          {/* Morfem ve Köken Analizi (Kelimelerin Yapı Taşları) */}
          {term.roots && (
            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2.5">
                {isTr ? 'Morfem ve Köken Analizi' : 'Morpheme & Etymological Breakdown'}
              </div>

              {parsedRoots.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2">
                  {parsedRoots.map((item, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <span className="text-muted-foreground font-mono font-bold text-sm">+</span>}
                      {item.morphemeSlug ? (
                        <Link
                          to={`/morphemes/${item.morphemeSlug}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background hover:bg-primary/10 border border-border hover:border-primary/40 text-xs font-mono font-bold text-foreground hover:text-primary transition-all shadow-xs group"
                          title={isTr ? `${item.root} morfem detayını gör` : `View ${item.root} morpheme`}
                        >
                          <span>{item.root}</span>
                          {item.meaning && (
                            <span className="text-muted-foreground font-sans font-normal text-[11px]">
                              ({item.meaning})
                            </span>
                          )}
                          <span className="text-primary text-[10px] opacity-70 group-hover:opacity-100">→</span>
                        </Link>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/80 border border-border/80 text-xs font-mono font-medium text-foreground">
                          <span>{item.root}</span>
                          {item.meaning && (
                            <span className="text-muted-foreground font-sans text-[11px]">
                              ({item.meaning})
                            </span>
                          )}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div className="text-xs font-mono text-muted-foreground bg-background/80 p-2.5 rounded-lg border border-border">
                  {term.roots}
                </div>
              )}
            </div>
          )}

          {/* Klinik ve Anatomik Açıklama */}
          {primaryDefinition && (
            <div className="mt-6 p-5 rounded-xl bg-card border border-border/80 space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  <span>{isTr ? '🇹🇷' : '🇬🇧'}</span>
                  <span>{isTr ? 'Anatomik Tanım & Fonksiyonel Açıklama' : 'Anatomical Definition & Function'}</span>
                </div>
                <p className="text-sm sm:text-base text-foreground leading-relaxed font-sans">
                  {primaryDefinition}
                </p>
              </div>

              {secondaryDefinition && secondaryDefinition !== primaryDefinition && (
                <div className="pt-3.5 border-t border-border/50">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                    <span>{isTr ? '🇬🇧' : '🇹🇷'}</span>
                    <span>{isTr ? 'İngilizce Tanım (English Definition)' : 'Turkish Definition & Context'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                    {secondaryDefinition}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Aynı Sistem ve Bölgedeki İlgili Terimler */}
        {relatedTerms.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {isTr
                    ? `İlişkili Diğer Anatomik Yapılar (${relatedTerms.length})`
                    : `Related Anatomical Structures (${relatedTerms.length})`}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isTr
                    ? 'Aynı anatomik bölge ve sistemde yer alan diğer tıp terimleri.'
                    : 'Other medical terms located in the same anatomical system.'}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/study')}
                className="text-xs"
              >
                <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                {isTr ? 'Tüm Sözlük' : 'All Terms'}
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {relatedTerms.map((rel, idx) => {
                const relSlug = getTermSlug(rel.term);
                return (
                  <Link
                    key={idx}
                    to={`/study/${relSlug}`}
                    className="block group"
                  >
                    <Card className="h-full border-border/80 group-hover:border-primary/50 group-hover:shadow-sm transition-all">
                      <CardContent className="p-4 space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-base text-foreground font-serif group-hover:text-primary transition-colors">
                            {rel.term}
                          </span>
                          {rel.system && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0">
                              {rel.system}
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs font-semibold text-primary font-sans">
                          {rel.turkish || rel.english}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {isTr
                            ? (rel.turkishDefinition || rel.definition)
                            : (rel.englishDefinition || rel.turkishDefinition || rel.definition)}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Conversion & Call to Action (CTA) Banner */}
        <div className="p-5 sm:p-8 rounded-2xl gradient-hero border border-primary/20 shadow-md text-center space-y-4">
          <Badge className="gradient-primary text-xs px-3 py-1 font-semibold uppercase tracking-wider">
            {isTr ? '3 Günlük Ücretsiz Deneme' : '3-Day Free Access'}
          </Badge>
          <h3 className="text-2xl font-bold text-foreground max-w-lg mx-auto">
            {isTr
              ? `${term.term} ve Tüm Anatomi Terimlerini Ezberlemeden Öğrenin`
              : `Master ${term.term} and Medical Anatomy with Interactive Games`}
          </h3>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {isTr
              ? 'HealthLexMed ile 200+ anatomik yapıyı ve 570+ morfemi 4 interaktif oyun modunda pekiştirin. Bilgi Kartları, Eşleştirme, Quiz ve Morfem Çözümleme ile bilginizi kalıcı hale getirin.'
              : 'Study 200+ anatomical terms and 570+ morphemes through Flashcards, Matching, Quiz, and Morpheme Breakdown.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              size="lg"
              onClick={() => navigate('/flashcards')}
              className="gradient-primary font-bold shadow-md w-full sm:w-auto"
            >
              <Layers className="w-5 h-5 mr-2" />
              {isTr ? 'Hafıza Kartlarında Çalış' : 'Start Flashcards'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/register')}
              className="border-primary/30 hover:bg-primary/10 w-full sm:w-auto font-semibold"
            >
              {isTr ? 'Ücretsiz Kayıt Ol' : 'Sign Up Free'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
