import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ArrowLeft,
  Sparkles,
  Gamepad2,
  Layers,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import {
  findMorphemeBySlug,
  findRelatedTermsForMorpheme,
  getRelatedMorphemes,
  CATEGORY_NAMES
} from '@/utils/morphemeHelper';
import { getTermSlug } from '@/utils/termHelper';

export const MorphemeDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { currentLanguage, t } = useLanguage();
  const isTr = currentLanguage === 'tr';

  const morpheme = useMemo(() => findMorphemeBySlug(slug), [slug]);
  const relatedTerms = useMemo(() => findRelatedTermsForMorpheme(morpheme), [morpheme]);
  const relatedMorphemes = useMemo(() => getRelatedMorphemes(morpheme, 6), [morpheme]);

  const categoryName = morpheme?.category
    ? (CATEGORY_NAMES[morpheme.category]?.[currentLanguage] || morpheme.category)
    : '';

  // SEO & Head Title update dynamically
  useEffect(() => {
    if (morpheme) {
      const termName = morpheme.displayTerm.split(/[/;]/)[0].trim();
      const titleStr = isTr
        ? `${termName} Ne Demek? | Tıbbi Morfem ve Kök Analizi - HealthLexMed`
        : `${termName} Medical Meaning & Root Breakdown - HealthLexMed`;
      document.title = titleStr;

      // Update meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          isTr
            ? `${termName} tıbbi morfemi ne anlama gelir? Türkçe ve İngilizce karşılığı, kök analizi, klinik örnekleri (${morpheme.example || ''}) ve tıp terimleri.`
            : `What does the medical root ${termName} mean? Breakdown, prefixes, suffixes, meanings (${morpheme.meaningEn}), and medical terminology examples.`
        );
      }
    }
  }, [morpheme, isTr]);

  if (!morpheme) {
    return (
      <div className="min-h-screen py-16 px-4 max-w-3xl mx-auto text-center">
        <div className="p-8 bg-card border border-border rounded-2xl shadow-sm">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">
            {isTr ? 'Morfem Bulunamadı' : 'Morpheme Not Found'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {isTr
              ? 'Aradığınız morfem veritabanımızda bulunamadı veya yazımı hatalı olabilir.'
              : 'The requested morpheme could not be found or may be misspelled.'}
          </p>
          <Button onClick={() => navigate('/morphemes')} className="gradient-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isTr ? 'Morfem Kütüphanesine Dön' : 'Back to Morpheme Library'}
          </Button>
        </div>
      </div>
    );
  }

  const cleanMainTerm = morpheme.displayTerm.split(/[/;]/)[0].trim();

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      {/* Schema.org DefinedTerm for Google Rich Snippets */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "DefinedTerm",
          "name": morpheme.displayTerm,
          "termCode": morpheme.slug,
          "description": `${morpheme.meaningTr} / ${morpheme.meaningEn}`,
          "inDefinedTermSet": "https://healthlexmed.com/morphemes"
        })
      }} />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">
            {isTr ? 'Ana Sayfa' : 'Home'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link to="/morphemes" className="hover:text-primary transition-colors">
            {isTr ? 'Morfem Kütüphanesi' : 'Morpheme Library'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-foreground font-semibold font-mono break-all">{cleanMainTerm}</span>
        </nav>

        {/* Back Link */}
        <Link
          to="/morphemes"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {isTr ? 'Tüm Morfemleri Listele' : 'All Morphemes'}
        </Link>

        {/* Main Morpheme Hero Card */}
        <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 gradient-primary" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="secondary" className="font-semibold text-xs px-2.5 py-0.5">
                  {isTr ? morpheme.typeNameTr : morpheme.typeNameEn}
                </Badge>
                {categoryName && (
                  <Badge variant="outline" className="text-xs px-2.5 py-0.5 border-border">
                    {categoryName}
                  </Badge>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground font-mono tracking-tight break-words">
                {morpheme.displayTerm}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => navigate('/morpheme')}
                className="gradient-primary shadow-sm hover:shadow"
              >
                <Gamepad2 className="w-4 h-4 mr-1.5" />
                {isTr ? 'Oyunda Oyna' : 'Play in Game'}
              </Button>
            </div>
          </div>

          {/* Meaning Cards (TR & EN) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border/60">
            {/* Türkçe Anlamı */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border/60">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-1.5">
                <span>🇹🇷</span> {isTr ? 'Türkçe Tıbbi Anlamı' : 'Turkish Meaning'}
              </div>
              <p className="text-lg font-bold text-foreground leading-snug">
                {morpheme.meaningTr}
              </p>
              {morpheme.description && (
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {morpheme.description}
                </p>
              )}
            </div>

            {/* İngilizce Anlamı */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border/60">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-1.5">
                <span>🇬🇧</span> {isTr ? 'Uluslararası / İngilizce Anlamı' : 'English / International Meaning'}
              </div>
              <p className="text-lg font-bold text-foreground leading-snug font-serif italic">
                {morpheme.meaningEn}
              </p>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {isTr
                  ? 'Uluslararası tıp terminolojisinde (Terminologia Anatomica & ICD) bu anlam kullanılır.'
                  : 'Standard definition used in international medical anatomy and clinical terminology.'}
              </p>
            </div>
          </div>

          {/* Example Breakdown Banner */}
          {morpheme.example && (
            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                {isTr ? 'Klinik Örnek & Çözümleme' : 'Clinical Example & Breakdown'}
              </div>
              <div className="text-base font-bold text-foreground font-mono mb-1">
                {morpheme.example}
              </div>
              {morpheme.breakdown && (
                <div className="text-xs text-muted-foreground font-mono bg-background/80 inline-block px-3 py-1.5 rounded-lg border border-border/80 mt-1">
                  {morpheme.breakdown}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Matching Medical Terms in HealthLexMed */}
        {relatedTerms.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {isTr
                    ? `Bu Morfemin Geçtiği Tıp Terimleri (${relatedTerms.length})`
                    : `Medical Terms Containing This Morpheme (${relatedTerms.length})`}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isTr
                    ? 'HealthLexMed kelime havuzunda bu kökü içeren örnek anatomik terimler.'
                    : 'Anatomical terms from the HealthLexMed database containing this root.'}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/flashcards')}
                className="text-xs"
              >
                <Layers className="w-3.5 h-3.5 mr-1.5" />
                {isTr ? 'Kartlarda Çalış' : 'Study Cards'}
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {relatedTerms.map((term, idx) => (
                <Link
                  key={idx}
                  to={`/study/${getTermSlug(term.term)}`}
                  className="block group"
                >
                  <Card className="h-full border-border/80 group-hover:border-primary/50 group-hover:shadow-sm transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="font-bold text-base text-foreground font-serif group-hover:text-primary transition-colors">
                          {term.term}
                        </span>
                        {term.system && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0">
                            {term.system}
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-primary mb-1 font-sans">
                        {term.turkish || term.english}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {currentLanguage === 'en'
                          ? (term.englishDefinition || term.turkishDefinition || term.definition)
                          : (term.turkishDefinition || term.definition)}
                      </p>
                      {term.roots && (
                        <div className="mt-2 pt-2 border-t border-border/50 text-[11px] font-mono text-muted-foreground">
                          {term.roots}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Morphemes in Same Category */}
        {relatedMorphemes.length > 0 && (
          <div className="p-6 bg-card border border-border/80 rounded-2xl">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" />
              {isTr ? `İlgili Diğer Morfemler (${categoryName})` : `Related Morphemes (${categoryName})`}
            </h3>
            <div className="flex flex-wrap gap-2">
              {relatedMorphemes.map((rel, idx) => (
                <Link
                  key={idx}
                  to={`/morphemes/${rel.slug}`}
                  className="px-3 py-1.5 rounded-lg bg-muted/60 hover:bg-primary/10 border border-border/70 hover:border-primary/40 text-xs font-mono font-semibold text-foreground transition-all inline-flex items-center gap-1.5"
                >
                  <span>{rel.displayTerm}</span>
                  <span className="text-[10px] text-muted-foreground font-sans font-normal">
                    ({rel.meaningTr.split(/[,;]/)[0]})
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Conversion & Call to Action (CTA) Banner */}
        <div className="p-8 rounded-2xl gradient-hero border border-primary/20 shadow-md text-center space-y-4">
          <Badge className="gradient-primary text-xs px-3 py-1 font-semibold uppercase tracking-wider">
            {isTr ? '3 Günlük Ücretsiz Deneme' : '3-Day Free Access'}
          </Badge>
          <h3 className="text-2xl font-bold text-foreground max-w-lg mx-auto">
            {isTr
              ? 'Tıp Terimlerini Ezberlemeyi Bırakın, Kök Mantığıyla Öğrenin'
              : 'Stop Memorizing Terms, Learn with Morpheme Logic'}
          </h3>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {isTr
              ? '570+ morfem ve 10 kategori ile anatomiyi 4 interaktif oyun modunda test edin. Flashcard, Eşleştirme, Quiz ve Morfem Çözümleme ile bilginizi kalıcı hale getirin.'
              : 'Master Latin medical terminology through 570+ morphemes and 4 game modes. Flashcards, Matching, Quiz, and Morpheme Breakdown.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              size="lg"
              onClick={() => navigate('/morpheme')}
              className="gradient-primary font-bold shadow-md w-full sm:w-auto"
            >
              <Gamepad2 className="w-5 h-5 mr-2" />
              {isTr ? 'Morfem Oyununu Başlat' : 'Start Morpheme Game'}
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
