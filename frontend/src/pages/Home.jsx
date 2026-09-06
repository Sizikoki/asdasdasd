import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Minus, ArrowRight, BookOpen, Layers, Trophy, Brain, Mail } from 'lucide-react';
import { getAllTerms } from '@/data/medicalTerms';
import { PREFIXES, ROOTS, SUFFIXES } from '@/data/morphemesData';
import { db, auth } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { getAnnualPricePreview, openPaddleCheckout, PADDLE_PRICE_ID, IS_PAYMENT_ACTIVE } from '@/services/paddle';
import { getUser } from '@/utils/storage';
import { useLanguage } from '@/context/LanguageContext';
import { getHomeDemoRounds, HOME_CONTENT } from '@/data/homeContent';
import { toast } from 'sonner';
import './LandingPage.css';

export const Home = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'en' ? 'en' : 'tr';
  const content = HOME_CONTENT[lang] || HOME_CONTENT.tr;
  const demoRounds = getHomeDemoRounds(lang);

  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [revealedIndices, setRevealedIndices] = useState([]);
  const [termCount, setTermCount] = useState(() => getAllTerms().length);
  const [annualPrice, setAnnualPrice] = useState(null);
  const [isPriceLoading, setIsPriceLoading] = useState(true);

  const totalMorphemes = PREFIXES.length + ROOTS.length + SUFFIXES.length; // 571 morfem

  // Fetch Paddle localized price preview for Annual Pro Membership
  useEffect(() => {
    let isMounted = true;
    const fetchPrice = async () => {
      try {
        setIsPriceLoading(true);
        const preview = await getAnnualPricePreview(PADDLE_PRICE_ID);
        if (isMounted && preview?.formattedTotal) {
          // Direct formatted total from Paddle (no frontend math or rounding)
          setAnnualPrice(preview.formattedTotal);
        }
      } catch (err) {
        console.warn('[Paddle] Failed to fetch price preview:', err);
      } finally {
        if (isMounted) setIsPriceLoading(false);
      }
    };
    fetchPrice();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle Paddle checkout opening (Overlay + One-Page + Auth Prefill)
  const handlePaddleCheckout = async () => {
    const currentUser = auth.currentUser || getUser();
    const customerEmail = currentUser?.email || undefined;

    try {
      const loadingMsg = lang === 'en' ? 'Opening Paddle Checkout...' : 'Paddle Checkout açılıyor...';
      toast.loading(loadingMsg, { id: 'paddle-loading' });
      await openPaddleCheckout({
        priceId: PADDLE_PRICE_ID,
        customerEmail,
        customData: {
          plan: 'Annual Pro Membership',
          userId: currentUser?.uid || currentUser?.email || 'guest'
        }
      });
      toast.dismiss('paddle-loading');
    } catch (err) {
      toast.dismiss('paddle-loading');
      console.error('Checkout error:', err);
      const errorMsg = lang === 'en' ? 'Error opening Paddle Checkout.' : 'Paddle Checkout açılırken hata oluştu.';
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    const fetchTermCount = async () => {
      try {
        let timeoutId;
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error('Firestore timeout')), 3000);
        });

        const querySnapshot = await Promise.race([
          getDocs(collection(db, 'terms')),
          timeoutPromise
        ]);
        if (timeoutId) clearTimeout(timeoutId);

        if (querySnapshot && querySnapshot.size > 0) {
          setTermCount(querySnapshot.size);
        }
      } catch (error) {
        console.warn('Using local terms count fallback:', error);
      }
    };

    fetchTermCount();
  }, []);

  const currentRound = demoRounds[currentRoundIndex] || demoRounds[0];
  const isAllRevealed = revealedIndices.length === currentRound.chips.length;
  const isFinalRound = currentRoundIndex === demoRounds.length - 1;

  const handleChipClick = (index) => {
    if (revealedIndices.includes(index)) return;
    setRevealedIndices((prev) => [...prev, index]);
  };

  const handleNextRound = () => {
    if (currentRoundIndex < demoRounds.length - 1) {
      setCurrentRoundIndex((prev) => prev + 1);
      setRevealedIndices([]);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page" id="top">
      <main>
        {/* ================= HERO ================= */}
        <section className="hero">
          <div className="wrap">
            <h1>
              {content.hero.title1}
              <br />
              <span className="text-primary">{content.hero.title2}</span>
            </h1>
            <p className="sub">
              {content.hero.sub(termCount)}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="site-btn-primary flex items-center"
                onClick={() => {
                  if (IS_PAYMENT_ACTIVE) {
                    scrollToSection('fiyat');
                  } else {
                    navigate('/study');
                  }
                }}
              >
                {IS_PAYMENT_ACTIVE
                  ? (content.pricing.btnText || (lang === 'en' ? 'Subscribe Now' : 'Hemen Katıl'))
                  : (lang === 'en' ? 'Explore Dictionary' : 'Sözlüğü Keşfet')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
            <p className="microline">
              <span>{content.hero.micro1}</span>
              <span>·</span>
              <span>{content.hero.micro2}</span>
            </p>
            <p
              className="down"
              onClick={() => scrollToSection('demo')}
            >
              {content.hero.scrollProof}
            </p>
          </div>
        </section>

        {/* ================= DEMO ================= */}
        <section id="demo" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="demo-box" aria-live="polite">
              <p className="demo-progress">
                <span>{currentRoundIndex + 1}</span> / {demoRounds.length}
              </p>
              <p className="demo-term-label">{content.demo.label}</p>
              <p className="font-bold text-2xl sm:text-3xl text-foreground mb-2 tracking-tight">
                {currentRound.term}
              </p>
              <div className="chips">
                {currentRound.chips.map((chip, idx) => {
                  const revealed = revealedIndices.includes(idx);
                  return (
                    <button
                      key={chip.part + idx}
                      type="button"
                      className={`chip ${revealed ? 'revealed' : ''}`}
                      onClick={() => handleChipClick(idx)}
                    >
                      {chip.part}
                      <span className="meaning">{chip.meaning}</span>
                    </button>
                  );
                })}
              </div>
              {!isAllRevealed && (
                <p className="demo-hint">{content.demo.hint}</p>
              )}

              {isAllRevealed && (
                <div className="demo-result">
                  <p>{currentRound.result}</p>
                  {!isFinalRound && (
                    <button
                      className="demo-next"
                      type="button"
                      onClick={handleNextRound}
                    >
                      {content.demo.nextBtn}
                    </button>
                  )}
                </div>
              )}

              {isAllRevealed && isFinalRound && (
                <div className="demo-final">
                  <p>
                    {content.demo.finalMsg(termCount, totalMorphemes)}
                  </p>
                  <button
                    type="button"
                    className="site-btn-primary"
                    onClick={() => {
                      if (IS_PAYMENT_ACTIVE) {
                        scrollToSection('fiyat');
                      } else {
                        navigate('/study');
                      }
                    }}
                  >
                    {IS_PAYMENT_ACTIVE
                      ? content.demo.finalBtn
                      : (lang === 'en' ? 'Explore Dictionary' : 'Sözlüğü Keşfet')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= PROBLEM ================= */}
        <section className="problem">
          <div className="wrap">
            <span className="eyebrow">{content.problem.eyebrow}</span>
            <h2>{content.problem.title}</h2>
            <p>
              {content.problem.p1}
            </p>
            <p className="punch">
              {content.problem.punch}
            </p>
            <p className="wave">
              {content.problem.wave}
            </p>
          </div>
        </section>

        {/* ================= YÖNTEM ================= */}
        <section>
          <div className="wrap">
            <span className="eyebrow">{content.method.eyebrow}</span>
            <h2>{content.method.title}</h2>
            <div className="steps">
              <div className="step">
                <span className="no">{content.method.step1No}</span>
                <h3>{content.method.step1Title}</h3>
                <p className="ex">{content.method.step1Ex}</p>
                <p>{content.method.step1Desc}</p>
              </div>
              <div className="step">
                <span className="no">{content.method.step2No}</span>
                <h3>{content.method.step2Title}</h3>
                <p className="ex">{content.method.step2Ex}</p>
                <p>{content.method.step2Desc(termCount)}</p>
              </div>
              <div className="step">
                <span className="no">{content.method.step3No}</span>
                <h3>{content.method.step3Title}</h3>
                <p className="ex">{content.method.step3Ex}</p>
                <p>{content.method.step3Desc}</p>
              </div>
            </div>
            <p className="logic-close">
              {content.method.logicClose(totalMorphemes)}
            </p>
          </div>
        </section>

        {/* ================= İÇERİK ================= */}
        <section>
          <div className="wrap">
            <span className="eyebrow">{content.features.eyebrow}</span>
            <h2>{content.features.title}</h2>
            <div className="stats">
              <div className="stat">
                <div className="n">{termCount}+</div>
                <div className="l">{content.features.terms}</div>
              </div>
              <div className="stat">
                <div className="n">{totalMorphemes}+</div>
                <div className="l">{content.features.morphemes}</div>
              </div>
              <div className="stat">
                <div className="n">10</div>
                <div className="l">{content.features.categories}</div>
              </div>
              <div className="stat">
                <div className="n">4</div>
                <div className="l">{content.features.modes}</div>
              </div>
              <div className="stat">
                <div className="n">2</div>
                <div className="l">{content.features.languages}</div>
              </div>
            </div>
            <div className="games">
              <div className="game">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h3>{content.features.game1Title}</h3>
                </div>
                <p>{content.features.game1Desc}</p>
              </div>
              <div className="game">
                <div className="flex items-center gap-2 mb-1">
                  <Layers className="w-5 h-5 text-primary" />
                  <h3>{content.features.game2Title}</h3>
                </div>
                <p>{content.features.game2Desc}</p>
              </div>
              <div className="game">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-5 h-5 text-primary" />
                  <h3>{content.features.game3Title}</h3>
                </div>
                <p>{content.features.game3Desc}</p>
              </div>
              <div className="game">
                <div className="flex items-center gap-2 mb-1">
                  <Brain className="w-5 h-5 text-primary" />
                  <h3>{content.features.game4Title}</h3>
                </div>
                <p>{content.features.game4Desc}</p>
              </div>
            </div>
            <p className="scope-line">
              {content.features.scopeLine}
            </p>
          </div>
        </section>

        {/* ================= KURUCU (Şimdilik Gizlendi - İleride Tekrar Açılabilir) ================= */}
        {/* 
        <section>
          <div className="wrap">
            <span className="eyebrow">Kim Yaptı?</span>
            <h2>Bu terimleri ben de ezberledim. Sonra unuttum.</h2>
            <div className="founder-grid">
              <div className="placeholder photo-ph">
                FOTOĞRAF
                <br />
                (4:5 · Yüzün net görünsün)
              </div>
              <div className="founder-text">
                <p>
                  Ben Sıddık. Fizyoterapistim; meslek hayatımda her gün bu terimlerle çalışıyorum — hastalarıma <span className="font-semibold text-foreground">sternocleidomastoideus</span> kasını anlatırken kimse ezber sormuyor.
                </p>
                <p>
                  Öğrenciyken bu terimi sınav için defalarca ezberledim, defalarca unuttum. Aklımda kaldığı gün, bir hocamın terimi tahtada parçalayarak yazdığı gündü: <span className="font-semibold text-primary">sterno · cleido · mastoid</span>. Göğüs kemiği, köprücük kemiği ve kulak arkasındaki çıkıntı. Kasın adı, tam olarak izlediği yolu anlatıyordu. O gün ezberlemeyi bıraktım.
                </p>
                <p>
                  HealthLexMed'i, klinikte ve meslek hayatımda her gün kullandığım bu mantığı sağlık bilimleri öğrencilerine kazandırmak için geliştirdim. İçindeki her terim tek tek elimden geçti.
                </p>
                <p className="founder-sign">— Sıddık, Fizyoterapist · HealthLexMed'in Kurucusu</p>
              </div>
            </div>
            <div className="placeholder video-ph">
              60 SANİYELİK TANITIM VİDEOSU
              <br />
              (Yüzünü göster + ekran kaydıyla ürünü gez — samimi geliştirici anlatımı)
            </div>
          </div>
        </section>
        */}

        {/* ================= YORUMLAR / FEEDBACK (Gerçek kullanıcı yorumları geldiğinde tekrar açılmak üzere şimdilik gizlendi) ================= */}
        {/* 
        <section>
          <div className="wrap">
            <span className="eyebrow">{content.testimonials.eyebrow}</span>
            <h2>{content.testimonials.title}</h2>
            <div className="quotes">
              <div className="quote">
                <p>{content.testimonials.q1Text}</p>
                <p className="who">{content.testimonials.q1Who}</p>
              </div>
              <div className="quote">
                <p>{content.testimonials.q2Text}</p>
                <p className="who">{content.testimonials.q2Who}</p>
              </div>
              <div className="quote">
                <p>{content.testimonials.q3Text}</p>
                <p className="who">{content.testimonials.q3Who}</p>
              </div>
            </div>
          </div>
        </section>
        */}

        {/* ================= KARŞILAŞTIRMA ================= */}
        <section>
          <div className="wrap">
            <span className="eyebrow">{content.comparison.eyebrow}</span>
            <h2>{content.comparison.title}</h2>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>{content.comparison.thFeature}</th>
                    <th>{content.comparison.thHealthlex}</th>
                    <th>
                      {content.comparison.thCards.split('\n')[0]}
                      <br />
                      {content.comparison.thCards.split('\n')[1]}
                    </th>
                    <th>{content.comparison.thNotes}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{content.comparison.row1}</td>
                    <td>
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    </td>
                    <td>
                      <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                    </td>
                    <td>
                      <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td>{content.comparison.row2}</td>
                    <td>
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    </td>
                    <td>
                      <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                    </td>
                    <td>
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td>{content.comparison.row3}</td>
                    <td>
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    </td>
                    <td>
                      <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                    </td>
                    <td>
                      <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td>{content.comparison.row4}</td>
                    <td>
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    </td>
                    <td>
                      <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                    </td>
                    <td>
                      <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td>{content.comparison.row5}</td>
                    <td>
                      <span className="font-semibold text-primary">{content.comparison.row5ValHealthlex}</span>
                    </td>
                    <td>
                      <span className="text-muted-foreground">{content.comparison.row5ValCards}</span>
                    </td>
                    <td>
                      <span className="text-muted-foreground">{content.comparison.row5ValNotes}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>{content.comparison.row6}</td>
                    <td>
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    </td>
                    <td>
                      <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                    </td>
                    <td>
                      <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ================= FİYAT ================= */}
        <section id="fiyat">
          <div className="wrap">
            <span className="eyebrow">{content.pricing.eyebrow}</span>
            <h2>{content.pricing.title}</h2>
            <p className="price-topline">{content.pricing.topline}</p>

            <div className="single-tier-wrap">
              <div className="tier hot single-tier">
                <span className="badge">
                  {IS_PAYMENT_ACTIVE
                    ? content.pricing.badge
                    : (lang === 'en' ? '🚀 Launch Special — Early Access' : '🚀 Lansman Dönemi — Erken Erişim')}
                </span>
                <h3 className="text-primary text-xl font-bold">{content.pricing.planTitle}</h3>
                
                {IS_PAYMENT_ACTIVE ? (
                  <>
                    <div className="price">
                      {annualPrice || (isPriceLoading ? '...' : (lang === 'en' ? '$20' : '499 TL'))}
                    </div>
                    <div className="once">{content.pricing.period}</div>
                  </>
                ) : (
                  <>
                    <div className="my-3">
                      <div className="flex items-baseline gap-2.5 flex-wrap">
                        <span className="font-['Space_Grotesk'] font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                          {lang === 'en' ? 'Free (0$)' : 'Ücretsiz (0 ₺)'}
                        </span>
                        <span className="text-muted-foreground line-through text-base sm:text-lg font-medium">
                          {annualPrice || (lang === 'en' ? '$20 / yr' : '499 TL / yıl')}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                          {lang === 'en' ? '🎁 100% Free Access' : '🎁 Erken Erişim Hediyesi'}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {lang === 'en' ? 'Temporary launch promotion' : 'Lansmana özel geçici süreyle'}
                      </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 sm:p-3.5 my-3 text-xs sm:text-[0.85rem] text-foreground/90 flex items-start gap-2.5 leading-relaxed">
                      <span className="text-base flex-shrink-0">✨</span>
                      <span>
                        {lang === 'en'
                          ? 'Explore core modules for free during launch. Pro membership opening soon!'
                          : 'Lansman boyunca tüm temel modülleri ücretsiz keşfedin. Pro üyelik çok yakında aktif!'}
                      </span>
                    </div>
                  </>
                )}

                <ul>
                  {content.pricing.features(totalMorphemes).map((feat, idx) => (
                    <li key={idx} className={feat.active ? '' : 'opacity-40'}>
                      {feat.active ? (
                        <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                      ) : (
                        <Minus className="w-4 h-4 shrink-0 mt-1" />
                      )}
                      <span>{feat.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="btn-container">
                  <button
                    type="button"
                    onClick={IS_PAYMENT_ACTIVE ? handlePaddleCheckout : () => navigate('/study')}
                    className="site-btn-primary w-full text-center py-3.5 text-base font-bold shadow-lg hover:shadow-primary/25 transition-all flex items-center justify-center gap-2"
                  >
                    <span>
                      {IS_PAYMENT_ACTIVE
                        ? content.pricing.btnText
                        : (lang === 'en' ? 'Join Early Access (Explore Free)' : 'Erken Erişime Katıl (Ücretsiz Keşfet)')}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="after-price">
              <p className="flow-line">
                {IS_PAYMENT_ACTIVE
                  ? content.pricing.flowLine
                  : (lang === 'en'
                    ? '🚀 No credit card required. Start exploring thousands of Latin medical terms instantly.'
                    : '🚀 Kredi kartı gerekmez. Binlerce Latince tıp terimini ve oyunları hemen ücretsiz deneyimleyin.')}
              </p>
              <p className="expensive-line">{content.pricing.guaranteeLine}</p>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="lp-footer">
        <div className="wrap">
          <p className="giant-term">{content.footer.term}</p>
          <div className="giant-meanings">
            {content.footer.meanings.map((meaning, idx) => (
              <span key={idx}>{meaning}</span>
            ))}
          </div>
          <p className="footer-punch">{content.footer.punch}</p>
          <button
            type="button"
            className="site-btn-primary"
            onClick={() => {
              if (IS_PAYMENT_ACTIVE) {
                scrollToSection('fiyat');
              } else {
                navigate('/study');
              }
            }}
          >
            {IS_PAYMENT_ACTIVE
              ? content.footer.ctaBtn
              : (lang === 'en' ? 'Explore Dictionary' : 'Sözlüğü Keşfet')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>

          {/* Footer Nav: İletişim/Destek + Sözleşme Yer Tutucuları */}
          <div className="footer-nav-row">
            <div className="footer-nav-links">
              <Link to="/contact" className="footer-nav-link footer-nav-highlight">
                {content.footer?.links?.contact || (lang === 'tr' ? 'İletişim & Destek' : 'Contact & Support')}
              </Link>
              <Link to="/terms" className="footer-nav-link">
                {content.footer?.links?.terms || (lang === 'tr' ? 'Kullanım Koşulları' : 'Terms of Service')}
              </Link>
              <Link to="/privacy" className="footer-nav-link">
                {content.footer?.links?.privacy || (lang === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy')}
              </Link>
              <Link to="/refund" className="footer-nav-link">
                {content.footer?.links?.refund || (lang === 'tr' ? 'İptal ve İade' : 'Refund Policy')}
              </Link>
            </div>

            <div className="footer-contact-badge">
              <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <a href="mailto:help@healthlexmed.com" className="footer-email-link">
                help@healthlexmed.com
              </a>
              <span className="footer-dot">·</span>
              <span className="footer-sla">
                {content.footer?.slaNotice || (lang === 'tr' ? 'Taleplerinize 24-48 saat içinde dönüş sağlanır' : '24-48h response')}
              </span>
            </div>
          </div>

          <div className="footer-meta">
            <span>{content.footer.meta}</span>
            <span>© 2026 HealthLexMed · healthlexmed.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
};