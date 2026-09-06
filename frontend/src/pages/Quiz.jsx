import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import QuizGameFable from '@/components/games/QuizGameFable';
import { useLanguage } from '@/context/LanguageContext';
import { getAllTerms, getTermsByCategory } from '@/data/medicalTerms';
import { isLoggedIn, canGuestPlay } from '@/utils/storage';
import { GuestLimitModal } from '@/components/GuestLimitModal';

export const Quiz = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const { currentLanguage, t } = useLanguage();
  const [showLimitModal, setShowLimitModal] = useState(false);

  useEffect(() => {
    if (!isLoggedIn() && !canGuestPlay()) {
      setShowLimitModal(true);
    }
  }, []);

  const categoryTerms = useMemo(() => {
    return category === 'all'
      ? getAllTerms()
      : getTermsByCategory(category);
  }, [category]);

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <QuizGameFable
        terms={categoryTerms}
        categoryId={category}
        language={currentLanguage}
        onBack={() => navigate(category && category !== 'all' ? `/games?category=${category}` : '/games')}
        t={t}
      />
      <GuestLimitModal
        isOpen={showLimitModal}
        onClose={() => {
          setShowLimitModal(false);
          navigate(category && category !== 'all' ? `/games?category=${category}` : '/games');
        }}
      />
    </div>
  );
};