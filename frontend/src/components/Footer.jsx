import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const FOOTER_TRANSLATIONS = {
  tr: {
    tagline: 'Tıbbi terimleri parçala, anla, birleştir. Ezber değil, sistem.',
    col1Title: 'KURUMSAL',
    about: 'Hakkında',
    faq: 'Sık Sorulan Sorular',
    contact: 'İletişim',
    col2Title: 'YASAL',
    privacy: 'Gizlilik Politikası',
    terms: 'Kullanım Koşulları',
    refund: 'İptal ve İade',
    cookies: 'Çerez Politikası',
    col3Title: 'DESTEK',
    supportSla: '24 - 48 saat içerisinde yanıtlıyoruz.',
    disclaimer: 'HealthLexMed bir eğitim aracıdır; tıbbi tavsiye, tanı veya tedavi yerine geçmez.',
    copyright: '© 2026 HealthLexMed · Tüm hakları saklıdır.',
    crafted: 'Türkiye’de tasarlandı'
  },
  en: {
    tagline: 'Split, understand, rebuild medical terms. A system, not rote memorization.',
    col1Title: 'COMPANY',
    about: 'About',
    faq: 'Frequently Asked Questions',
    contact: 'Contact',
    col2Title: 'LEGAL',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    refund: 'Refund Policy',
    cookies: 'Cookie Policy',
    col3Title: 'SUPPORT',
    supportSla: 'We reply within 24 - 48 hours.',
    disclaimer: 'HealthLexMed is an educational tool; it does not replace medical advice, diagnosis, or treatment.',
    copyright: '© 2026 HealthLexMed · All rights reserved.',
    crafted: 'Designed in Türkiye'
  }
};

export const Footer = () => {
  const { currentLanguage } = useLanguage();
  const isTr = currentLanguage !== 'en';
  const t = FOOTER_TRANSLATIONS[isTr ? 'tr' : 'en'];

  return (
    <footer className="w-full bg-[#0f1b33] text-white font-sans transition-colors border-t border-white/10 mt-auto">
      {/* ==================================================================== */}
      {/* 1) MOBİL GÖRÜNÜM (md:hidden): FABLE AKORDEON & KOMPAKT YAPI         */}
      {/* ==================================================================== */}
      <div className="md:hidden px-5 py-8 flex flex-col gap-5 w-full max-w-md mx-auto">
        {/* Logo ve Misyon */}
        <div className="flex flex-col gap-2.5">
          <Link to="/" className="flex items-center gap-2.5 group w-fit">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shadow-xs">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12h4l3-8 4 16 3-8h4" />
              </svg>
            </div>
            <span className="font-extrabold text-[17px] tracking-tight text-white">
              Health<span className="font-serif italic font-bold text-[#8fb3ff]">Lex</span>Med
            </span>
          </Link>
          <p className="m-0 text-sm leading-relaxed text-[#b8c4d9]">
            {t.tagline}
          </p>
        </div>

        {/* Akordeon Link Menüleri */}
        <div className="border-t border-white/10">
          {/* Kurumsal Akordeon */}
          <details open className="border-b border-white/10 group">
            <summary className="list-none flex justify-between items-center min-h-[52px] font-extrabold text-xs tracking-[0.14em] text-[#8fb3ff] cursor-pointer select-none">
              <span>{t.col1Title}</span>
              <span className="font-bold text-base text-[#8a97b3] group-open:rotate-45 transition-transform duration-200">
                +
              </span>
            </summary>
            <div className="flex flex-col gap-3.5 pt-1 pb-4">
              <Link
                to="/contact"
                className="text-[#dbe4f5] hover:text-white font-semibold text-[15px] transition-colors"
              >
                {t.about}
              </Link>
              <Link
                to="/contact"
                className="text-[#dbe4f5] hover:text-white font-semibold text-[15px] transition-colors"
              >
                {t.faq}
              </Link>
              <Link
                to="/contact"
                className="text-[#dbe4f5] hover:text-white font-semibold text-[15px] transition-colors"
              >
                {t.contact}
              </Link>
            </div>
          </details>

          {/* Yasal Akordeon */}
          <details className="border-b border-white/10 group">
            <summary className="list-none flex justify-between items-center min-h-[52px] font-extrabold text-xs tracking-[0.14em] text-[#8fb3ff] cursor-pointer select-none">
              <span>{t.col2Title}</span>
              <span className="font-bold text-base text-[#8a97b3] group-open:rotate-45 transition-transform duration-200">
                +
              </span>
            </summary>
            <div className="flex flex-col gap-3.5 pt-1 pb-4">
              <Link
                to="/privacy"
                className="text-[#dbe4f5] hover:text-white font-semibold text-[15px] transition-colors"
              >
                {t.privacy}
              </Link>
              <Link
                to="/terms"
                className="text-[#dbe4f5] hover:text-white font-semibold text-[15px] transition-colors"
              >
                {t.terms}
              </Link>
              <Link
                to="/refund"
                className="text-[#dbe4f5] hover:text-white font-semibold text-[15px] transition-colors"
              >
                {t.refund}
              </Link>
              <Link
                to="/privacy"
                className="text-[#dbe4f5] hover:text-white font-semibold text-[15px] transition-colors"
              >
                {t.cookies}
              </Link>
            </div>
          </details>
        </div>

        {/* Destek Alanı */}
        <div className="flex flex-col gap-1.5">
          <div className="font-extrabold text-[11px] tracking-[0.14em] text-[#8fb3ff] uppercase">
            {t.col3Title}
          </div>
          <a
            href="mailto:help@healthlexmed.com"
            className="text-white hover:text-primary-foreground font-bold text-[15px] transition-colors break-all"
          >
            help@healthlexmed.com
          </a>
          <span className="text-xs sm:text-[13px] leading-relaxed text-[#8a97b3]">
            {t.supportSla}
          </span>
        </div>

        {/* Mobil Tıbbi Uyarı Kutusu */}
        <div className="p-3 sm:p-3.5 bg-[#0a142a] rounded-xl text-xs leading-relaxed text-[#8a97b3] border border-white/5">
          {t.disclaimer}
        </div>

        {/* Mobil Alt Telif */}
        <div className="flex flex-col gap-1 font-semibold text-xs text-[#8a97b3] pt-1">
          <span>{t.copyright}</span>
          <span>{t.crafted}</span>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2) MASAÜSTÜ GÖRÜNÜM (hidden md:block): ULTRA-GENİŞ 4 KOLONLU YAPI    */}
      {/* ==================================================================== */}
      <div className="hidden md:block w-full">
        {/* Üst Grid Alanı - Geniş Ekranlara Yayılmış Ferah Yapı */}
        <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 grid grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1.2fr] gap-10 xl:gap-16 2xl:gap-24">
          
          {/* Kolon 1: Logo ve Misyon */}
          <div className="flex flex-col gap-3.5">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-8 h-8 rounded-[9px] bg-primary flex items-center justify-center shadow-xs">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12h4l3-8 4 16 3-8h4" />
                </svg>
              </div>
              <span className="font-extrabold text-[19px] tracking-tight text-white">
                Health<span className="font-serif italic font-bold text-[#8fb3ff]">Lex</span>Med
              </span>
            </Link>
            <p className="m-0 text-sm sm:text-[15px] leading-relaxed text-[#b8c4d9] max-w-md">
              {t.tagline}
            </p>
            <div className="text-xs text-[#8a97b3] mt-1 font-medium">
              {isTr
                ? 'Latince tıp terimlerini morfem kökleriyle öğreten eğitim platformu.'
                : 'Educational platform teaching Latin medical terms with morpheme roots.'}
            </div>
          </div>

          {/* Kolon 2: Kurumsal */}
          <div className="flex flex-col gap-3">
            <div className="font-extrabold text-[11px] tracking-[0.14em] text-[#8fb3ff] uppercase">
              {t.col1Title}
            </div>
            <Link
              to="/contact"
              className="text-[#dbe4f5] hover:text-white font-semibold text-[15px] transition-colors"
            >
              {t.about}
            </Link>
            <Link
              to="/contact"
              className="text-[#dbe4f5] hover:text-white font-semibold text-[15px] transition-colors"
            >
              {t.faq}
            </Link>
            <Link
              to="/contact"
              className="text-[#dbe4f5] hover:text-white font-semibold text-[15px] transition-colors"
            >
              {t.contact}
            </Link>
          </div>

          {/* Kolon 3: Yasal */}
          <div className="flex flex-col gap-3">
            <div className="font-extrabold text-[11px] tracking-[0.14em] text-[#8fb3ff] uppercase">
              {t.col2Title}
            </div>
            <Link
              to="/privacy"
              className="text-[#dbe4f5] hover:text-white font-semibold text-[15px] transition-colors"
            >
              {t.privacy}
            </Link>
            <Link
              to="/terms"
              className="text-[#dbe4f5] hover:text-white font-semibold text-[15px] transition-colors"
            >
              {t.terms}
            </Link>
            <Link
              to="/refund"
              className="text-[#dbe4f5] hover:text-white font-semibold text-[15px] transition-colors"
            >
              {t.refund}
            </Link>
            <Link
              to="/privacy"
              className="text-[#dbe4f5] hover:text-white font-semibold text-[15px] transition-colors"
            >
              {t.cookies}
            </Link>
          </div>

          {/* Kolon 4: Destek */}
          <div className="flex flex-col gap-3">
            <div className="font-extrabold text-[11px] tracking-[0.14em] text-[#8fb3ff] uppercase">
              {t.col3Title}
            </div>
            <a
              href="mailto:help@healthlexmed.com"
              className="text-white hover:text-primary-foreground font-bold text-[15px] transition-colors break-all"
            >
              help@healthlexmed.com
            </a>
            <span className="text-[13px] leading-relaxed text-[#8a97b3]">
              {t.supportSla}
            </span>
            <div className="flex items-center gap-2 text-xs text-[#8a97b3] mt-2">
              <span>🔒 256-bit SSL</span>
              <span>·</span>
              <span>PCI-DSS</span>
            </div>
          </div>

        </div>

        {/* Orta Tıbbi Uyarı Şeridi */}
        <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="py-4 border-t border-b border-white/10 flex items-center gap-2.5 text-[13px] leading-relaxed text-[#8a97b3]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8fb3ff] flex-shrink-0" />
            <span>{t.disclaimer}</span>
          </div>
        </div>

        {/* Alt Telif ve Tasarım Notu */}
        <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-semibold text-[13px] text-[#8a97b3]">
          <span>{t.copyright}</span>
          <div className="flex items-center gap-4">
            <span>Türkiye’de tasarlandı</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
