import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Sparkles, BookOpen, Gamepad2, User, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const Welcome = () => {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'en' ? 'en' : 'tr';

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const content = {
    tr: {
      badge: 'ÖDEME BAŞARILI',
      title: 'Tebrikler, HealthLexMed Pro’ya Hoş Geldiniz!',
      subtitle:
        'Yıllık Pro Üyeliğiniz başarıyla aktif edildi. Artık tüm 10 kategori, 571’den fazla morfem ve 4 oyun modunun tamamı sınırsız olarak kullanımınıza hazır.',
      featuresTitle: 'Aboneliğinizle Kilidi Açılan Özellikler',
      features: [
        '10 anatomik kategorinin tamamı (Kemikler, Kaslar, Eklemler vb.)',
        '571+ morfem, kök ve ek kütüphanesine sınırsız erişim',
        '4 oyun modunun tümü (Bilgi Kartları, Eşleştirme, Quiz, Morfem Oyunu)',
        'Kişisel başarı istatistikleri, çalışma serisi ve seviye sistemi',
        'TR ⟷ EN çift dilli arayüz ve terim eşlemeleri',
        'Yeni gelecek tüm modüller ve güncellemeler'
      ],
      ctaStudy: 'Çalışmaya Başla',
      ctaGames: 'Oyun Modlarını Keşfet',
      ctaProfile: 'Profilime Git',
      footerNote: 'Faturanız ve ödeme detayları e-posta adresinize Paddle tarafından iletilmiştir. Dilediğiniz zaman profil sayfanızdan veya destek ekibimizden yardım alabilirsiniz.'
    },
    en: {
      badge: 'PAYMENT SUCCESSFUL',
      title: 'Congratulations, Welcome to HealthLexMed Pro!',
      subtitle:
        'Your Annual Pro Membership is now active. All 10 categories, over 571 morphemes, and all 4 interactive game modes are fully unlocked for you.',
      featuresTitle: 'Features Unlocked With Your Membership',
      features: [
        'All 10 anatomical categories (Bones, Muscles, Joints, etc.)',
        'Unlimited access to 571+ morphemes, roots, and affixes library',
        'All 4 game modes (Flashcards, Matching, Quiz, Morpheme Game)',
        'Personal progress stats, study streaks, and leveling system',
        'TR ⟷ EN bilingual interface and terminology matching',
        'All upcoming modules, exam sets, and feature updates'
      ],
      ctaStudy: 'Start Studying',
      ctaGames: 'Explore Game Modes',
      ctaProfile: 'Go to My Profile',
      footerNote: 'Your receipt and order details have been sent to your email address by Paddle. You can reach out to support or review your settings anytime from your profile.'
    }
  };

  const t = content[lang] || content.tr;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Celebration Icon */}
        <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 text-primary mb-6 shadow-lg shadow-primary/10 animate-in fade-in zoom-in duration-300">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-primary/15 text-primary mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          {t.badge}
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4 font-serif">
          {t.title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
          {t.subtitle}
        </p>

        {/* Unlocked Features Card */}
        <div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-8 text-left mb-8 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground/80 mb-4">
            {t.featuresTitle}
          </h2>
          <ul className="space-y-3">
            {t.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-foreground/90">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <Link
            to="/study"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base bg-primary text-primary-foreground shadow-md hover:opacity-95 hover:shadow-primary/25 transition-all"
          >
            <BookOpen className="w-5 h-5" />
            {t.ctaStudy}
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/games"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base bg-card border border-border text-foreground hover:bg-muted/50 transition-all"
          >
            <Gamepad2 className="w-5 h-5 text-primary" />
            {t.ctaGames}
          </Link>

          <Link
            to="/profile"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-muted-foreground hover:text-foreground transition-all"
          >
            <User className="w-4 h-4" />
            {t.ctaProfile}
          </Link>
        </div>

        {/* Footer info note */}
        <p className="text-xs text-muted-foreground max-w-lg mx-auto">
          {t.footerNote}
        </p>
      </div>
    </div>
  );
};

export default Welcome;
