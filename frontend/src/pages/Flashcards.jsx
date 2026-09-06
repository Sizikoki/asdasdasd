import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, RotateCw, ChevronRight, Check, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getRandomTerms, getAllTerms } from '@/data/medicalTerms';
import { saveProgress, saveFlashcardSession, updateStreak, isLoggedIn, canGuestPlay, incrementGuestPlay } from '@/utils/storage';
import { toast } from 'sonner';
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { formatMedicalTerm } from '@/utils/format';
import { GuestLimitModal } from '@/components/GuestLimitModal';
import { getTermMorphemes } from '@/utils/morphemeAdapter';
import { useLanguage } from '@/context/LanguageContext';

export const Flashcards = () => {
  const { currentLanguage, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryId = searchParams.get('category');

  const [terms, setTerms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedCount, setLearnedCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showGuestModal, setShowGuestModal] = useState(false);

  const loadTerms = useCallback(async () => {
    if (!isLoggedIn()) {
      if (!canGuestPlay()) {
        setShowGuestModal(true);
        setLoading(false);
        return;
      }
      incrementGuestPlay();
    }

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

      let filteredTerms = rawTerms;
      if (categoryId && categoryId !== 'all') {
        filteredTerms = rawTerms.filter(t => t.category === categoryId);
        if (filteredTerms.length === 0) {
          filteredTerms = rawTerms.filter(t => t.system === categoryId || t.subcategory === categoryId);
        }
      }

      if (filteredTerms.length === 0) {
        filteredTerms = rawTerms;
      }

      const shuffled = [...filteredTerms].sort(() => Math.random() - 0.5);
      setTerms(shuffled.slice(0, Math.min(20, shuffled.length)));
    } catch (error) {
      console.error('Error fetching terms in Flashcards:', error);
      const selectedTerms = getRandomTerms(20, categoryId);
      setTerms(selectedTerms);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    loadTerms();
    updateStreak();
  }, [loadTerms]);

  const currentTerm = terms[currentIndex];
  const progress = terms.length > 0 ? ((currentIndex) / terms.length) * 100 : 0;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnow = () => {
    if (currentTerm) {
      saveProgress(currentTerm.id, true);
      setLearnedCount(learnedCount + 1);
    }
    goToNext(true);
  };

  const handleDontKnow = () => {
    setSkippedCount(skippedCount + 1);
    goToNext(false);
  };

  const goToNext = (wasLearned) => {
    setIsFlipped(false);
    const finalLearned = wasLearned ? learnedCount + 1 : learnedCount;
    if (currentIndex < terms.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Session complete
      saveFlashcardSession(categoryId || 'all', finalLearned, terms.length);
      const finishMsg = t('sessionCompleteToast', `Tamamlandı! ${finalLearned}/${terms.length} terim öğrenildi.`)
        .replace('{learned}', finalLearned)
        .replace('{total}', terms.length);
      toast.success(finishMsg);
      navigate('/games');
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setLearnedCount(0);
    setSkippedCount(0);
    loadTerms();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md p-8 text-center shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">{t('loadingCards')}</h3>
          <p className="text-muted-foreground">{t('fetchingTerms')}</p>
        </Card>
      </div>
    );
  }

  if (terms.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md p-8 text-center shadow-xl">
          <h3 className="text-xl font-semibold mb-2 text-destructive">{t('error', 'Hata')}</h3>
          <p className="text-muted-foreground mb-4">{t('noTermsInCategory')}</p>
          <Button asChild className="gradient-primary">
            <Link to="/games">{t('backToGames')}</Link>
          </Button>
        </Card>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/games')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToGames')}
          </Button>

          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{t('flashcards')}</h1>
              <p className="text-muted-foreground">{t('cardCount')} {currentIndex + 1} / {terms.length}</p>
            </div>
            <Button variant="outline" size="icon" onClick={handleRestart}>
              <RotateCw className="w-5 h-5" />
            </Button>
          </div>

          <Progress value={progress} className="h-2" />

          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-success" />
              <span>{t('learnedLabel')}: {learnedCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <X className="w-4 h-4 text-muted-foreground" />
              <span>{t('skippedLabel')}: {skippedCount}</span>
            </div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="perspective-1000 mb-8">
          <Card
            className={`relative h-80 cursor-pointer transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''
              }`}
            onClick={handleFlip}
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 bg-gradient-to-br from-primary/5 to-secondary/5"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="text-sm font-medium text-muted-foreground mb-4">
                {t('term', 'Terim')}
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-center mb-6">
                {formatMedicalTerm(currentTerm.term)}
              </div>
              <div className="text-sm text-muted-foreground">
                {t('clickToFlip', 'Kartı çevirmek için tıkla')}
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 bg-gradient-to-br from-secondary/5 to-accent/5 overflow-y-auto"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                {currentLanguage === 'en' ? t('englishDefinitionLabel', 'Definition / English Meaning') : t('turkishDefinitionLabel', 'Türkçe Tanım')}
              </div>
              {currentLanguage === 'en' && (currentTerm.english || currentTerm.turkish) && currentTerm.englishDefinition && (
                <div className="text-lg sm:text-xl font-bold text-primary text-center mb-1.5">
                  {currentTerm.english || currentTerm.turkish}
                </div>
              )}
              <div className={`text-center text-foreground max-w-md px-2 leading-relaxed mb-4 ${
                currentLanguage === 'en' && currentTerm.englishDefinition ? 'text-sm sm:text-base font-medium' : 'text-xl sm:text-2xl font-bold'
              }`}>
                {currentLanguage === 'en'
                  ? (currentTerm.englishDefinition || currentTerm.english || currentTerm.turkish || currentTerm.turkishDefinition || currentTerm.definition)
                  : (currentTerm.turkishDefinition || currentTerm.definition)}
              </div>

              {/* Morfem Analizi */}
              {currentTerm && getTermMorphemes(currentTerm).length > 0 && (
                <div className="mt-2 pt-3 border-t border-border/50 max-w-md w-full text-center">
                  <div className="mb-2 text-[11px] font-bold text-foreground/90 tracking-wide uppercase">
                    {t('morphemeStructure', 'Morfem Yapısı')}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {getTermMorphemes(currentTerm).map((part, idx) => {
                      const meaningText = currentLanguage === 'en'
                        ? (part.meaning?.en || part.meaning?.tr || '')
                        : (part.meaning?.tr || part.meaning?.en || '');
                      return (
                        <React.Fragment key={idx}>
                          {idx > 0 && (
                            <span className="text-[10px] text-muted-foreground/70 font-bold select-none">+</span>
                          )}
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg border border-border/70 bg-muted/60 text-xs font-mono font-medium shadow-xs">
                            <span className="font-semibold text-foreground">{part.text}</span>
                            {meaningText && (
                              <span className="text-[10.5px] font-sans font-normal text-muted-foreground">
                                ({meaningText})
                              </span>
                            )}
                          </span>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </Card>
        </div>

        {/* Actions */}
        {isFlipped && (
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handleDontKnow}
              className="h-16 text-lg"
            >
              <X className="w-5 h-5 mr-2" />
              {t('dontKnow')}
            </Button>
            <Button
              size="lg"
              onClick={handleKnow}
              className="h-16 text-lg gradient-primary"
            >
              <Check className="w-5 h-5 mr-2" />
              {t('know')}
            </Button>
          </div>
        )}

        {!isFlipped && (
          <div className="text-center">
            <Button
              size="lg"
              onClick={handleFlip}
              className="h-16 px-8 text-lg gradient-primary"
            >
              {t('flipCard')}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
      <GuestLimitModal
        isOpen={showGuestModal}
        onClose={() => setShowGuestModal(false)}
      />
    </div>
  );
};