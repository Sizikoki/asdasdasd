import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCw, ChevronRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getRandomTerms, categories } from '@/data/medicalTerms';
import { saveProgress, saveFlashcardSession, updateStreak } from '@/utils/storage';
import { toast } from 'sonner';

export const Flashcards = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryId = searchParams.get('category');
  
  const [terms, setTerms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedCount, setLearnedCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);

  useEffect(() => {
    const selectedTerms = getRandomTerms(20, categoryId);
    setTerms(selectedTerms);
    updateStreak();
  }, [categoryId]);

  const currentTerm = terms[currentIndex];
  const progress = ((currentIndex) / terms.length) * 100;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnow = () => {
    if (currentTerm) {
      saveProgress(currentTerm.id, true);
      setLearnedCount(learnedCount + 1);
    }
    goToNext();
  };

  const handleDontKnow = () => {
    setSkippedCount(skippedCount + 1);
    goToNext();
  };

  const goToNext = () => {
    setIsFlipped(false);
    if (currentIndex < terms.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Session complete
      saveFlashcardSession(categoryId || 'all', learnedCount + 1, terms.length);
      toast.success(`Tamamlandı! ${learnedCount + 1}/${terms.length} terim öğrenildi.`);
      navigate('/games');
    }
  };

  const handleRestart = () => {
    const selectedTerms = getRandomTerms(20, categoryId);
    setTerms(selectedTerms);
    setCurrentIndex(0);
    setIsFlipped(false);
    setLearnedCount(0);
    setSkippedCount(0);
  };

  if (terms.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
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
            Oyunlara Dön
          </Button>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Flashcard</h1>
              <p className="text-muted-foreground">Kart {currentIndex + 1} / {terms.length}</p>
            </div>
            <Button variant="outline" size="icon" onClick={handleRestart}>
              <RotateCw className="w-5 h-5" />
            </Button>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-success" />
              <span>Öğrenilen: {learnedCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <X className="w-4 h-4 text-muted-foreground" />
              <span>Atlanan: {skippedCount}</span>
            </div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="perspective-1000 mb-8">
          <Card 
            className={`relative h-80 cursor-pointer transition-all duration-500 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
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
              <div className="text-sm font-medium text-muted-foreground mb-4">Terim</div>
              <div className="text-3xl sm:text-4xl font-bold text-center mb-6">
                {currentTerm.term}
              </div>
              <div className="text-sm text-muted-foreground">Kartı çevirmek için tıkla</div>
            </div>

            {/* Back */}
            <div 
              className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 bg-gradient-to-br from-secondary/5 to-accent/5"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="text-sm font-medium text-muted-foreground mb-2">Türkçe</div>
              <div className="text-2xl sm:text-3xl font-bold text-center text-secondary mb-4">
                {currentTerm.turkish}
              </div>
              
              {currentTerm.roots && (
                <div className="mb-4 text-center">
                  <div className="text-xs font-medium text-muted-foreground mb-1">Kök/Ekler</div>
                  <div className="text-sm bg-accent/10 px-3 py-1 rounded-lg inline-block">
                    {currentTerm.roots}
                  </div>
                </div>
              )}
              
              <div className="text-sm text-center text-muted-foreground max-w-md">
                {currentTerm.definition}
              </div>
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
              Bilmiyorum
            </Button>
            <Button
              size="lg"
              onClick={handleKnow}
              className="h-16 text-lg gradient-primary"
            >
              <Check className="w-5 h-5 mr-2" />
              Biliyorum
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
              Kartı Çevir
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};