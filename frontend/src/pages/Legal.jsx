import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FileText,
  ShieldCheck,
  RotateCcw,
  Mail,
  Clock,
  ArrowLeft,
  HelpCircle,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { LEGAL_CONTENT } from '@/data/legalContent';

const CONTACT_EMAIL = 'help@healthlexmed.com';

export const Legal = ({ activeDoc: propActiveDoc }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentLanguage, t } = useLanguage();
  const lang = currentLanguage === 'en' ? 'en' : 'tr';
  const content = LEGAL_CONTENT[lang] || LEGAL_CONTENT.tr;

  // URL rotasından veya prop'tan aktif dokümanı belirleme
  const getActiveKey = () => {
    if (propActiveDoc) return propActiveDoc;
    const path = location.pathname.toLowerCase();
    if (path.includes('privacy')) return 'privacy';
    if (path.includes('refund')) return 'refund';
    return 'terms';
  };

  const activeKey = getActiveKey();
  const doc = content[activeKey] || content.terms;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${doc.shortTitle} | HealthLexMed`;
  }, [activeKey, doc.shortTitle, lang]);

  const navItems = [
    {
      id: 'terms',
      path: '/terms',
      label: content.nav.terms,
      icon: FileText
    },
    {
      id: 'privacy',
      path: '/privacy',
      label: content.nav.privacy,
      icon: ShieldCheck
    },
    {
      id: 'refund',
      path: '/refund',
      label: content.nav.refund,
      icon: RotateCcw
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between text-foreground">
      <div className="w-full">
        {/* Üst Header / Breadcrumb Alanı */}
        <div className="border-b border-border bg-card/60 backdrop-blur-sm">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {content.nav.backToHome}
                </Link>
                <span className="text-muted-foreground/40">/</span>
                <span className="text-xs font-semibold text-primary">
                  {doc.shortTitle}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[11px] font-mono border-border">
                  {lang === 'tr' ? 'Yürürlük: ' : 'Effective: '} {doc.effectiveDate}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Ana İçerik ve Sidebar Düzeni */}
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Mobil / Tablet için Yatay Tab Menüsü */}
          <div className="lg:hidden mb-8">
            <div className="flex rounded-lg border border-border p-1 bg-card shadow-sm gap-1 overflow-x-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeKey === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Masaüstü Sol Menü (Sidebar) */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
              <div className="rounded-xl border border-border bg-card p-2 shadow-sm space-y-1">
                <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
                  {lang === 'tr' ? 'Yasal Belgeler' : 'Legal Documents'}
                </div>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeKey === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all text-left ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                      }`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                      <span className="flex-1">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Destek & İletişim Kutusu */}
              <Card className="border-border/80 bg-gradient-to-br from-card to-muted/30 shadow-sm">
                <CardContent className="p-5 space-y-3.5">
                  <div className="flex items-center gap-2 text-primary">
                    <HelpCircle className="w-4 h-4" />
                    <h4 className="text-sm font-bold text-foreground">
                      {content.nav.needHelp}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {content.nav.supportNotice}
                  </p>

                  <div className="pt-1 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-foreground font-mono font-semibold">
                      <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <a href={`mailto:${CONTACT_EMAIL}`} className="hover:underline">
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                      <Clock className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>{content.nav.responseSla}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/60">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      <span>{content.nav.contactSupport}</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Sağ Alan: Seçili Yasal Belge İçeriği */}
            <main className="lg:col-span-8">
              <article className="rounded-xl border border-border bg-card p-6 sm:p-8 md:p-10 shadow-sm">
                {/* Belge Başlığı & Meta */}
                <header className="border-b border-border/80 pb-6 mb-8">
                  <div className="text-xs font-semibold text-primary tracking-wide uppercase mb-2">
                    HealthLexMed Legal Docs
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-serif">
                    {doc.title}
                  </h1>
                  <p className="text-xs text-muted-foreground mt-1">
                    {doc.subtitle} · {lang === 'tr' ? 'Yürürlük Tarihi:' : 'Effective Date:'} {doc.effectiveDate}
                  </p>

                  <div className="mt-4 pt-4 border-t border-border/40 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-muted-foreground">
                    <div className="space-y-1">
                      <div>
                        <strong className="text-foreground">{lang === 'tr' ? 'Hizmet Sağlayıcı / Veri Sorumlusu:' : 'Provider / Data Controller:'}</strong>{' '}
                        <span>{doc.provider || doc.controller || doc.platform || 'HealthLexMed'}</span>
                      </div>
                      {doc.address && (
                        <div>
                          <strong className="text-foreground">{lang === 'tr' ? 'Adres:' : 'Address:'}</strong>{' '}
                          <span>{doc.address}</span>
                        </div>
                      )}
                      <div>
                        <strong className="text-foreground">{lang === 'tr' ? 'Platform:' : 'Platform:'}</strong>{' '}
                        <a href="https://www.healthlexmed.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          https://www.healthlexmed.com
                        </a>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div>
                        <strong className="text-foreground">{lang === 'tr' ? 'Resmi İletişim:' : 'Official Contact:'}</strong>{' '}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline font-mono">
                          {CONTACT_EMAIL}
                        </a>
                      </div>
                      {doc.emailNotice && (
                        <div className="text-[11px] text-muted-foreground">
                          {doc.emailNotice}
                        </div>
                      )}
                      {doc.paddleSupport && (
                        <div>
                          <strong className="text-foreground">{lang === 'tr' ? 'Paddle Alıcı Desteği:' : 'Paddle Buyer Support:'}</strong>{' '}
                          <a href="https://paddle.net" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-mono">
                            https://paddle.net
                          </a>{' '}
                          <span className="text-[11px] text-muted-foreground">
                            ({lang === 'tr' ? 'Hızlı İptal/İade' : 'Fast Cancellation/Refund'})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </header>

                {/* Bölümler */}
                <div className="space-y-8 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {doc.sections?.map((sec) => (
                    <section key={sec.id} className="space-y-3">
                      {sec.title && (
                        <h2 className="text-base sm:text-lg font-bold text-foreground font-serif tracking-tight pt-2">
                          {sec.title}
                        </h2>
                      )}

                      {/* Uyarı / Vurgu Kutusu */}
                      {sec.isAlert && (
                        <div
                          className={`p-4 rounded-lg border my-3 ${
                            sec.alertType === 'warning'
                              ? 'bg-amber-500/10 border-amber-500/25 text-amber-950 dark:text-amber-200'
                              : sec.alertType === 'info'
                              ? 'bg-blue-500/10 border-blue-500/25 text-blue-950 dark:text-blue-200'
                              : 'bg-emerald-500/10 border-emerald-500/25 text-emerald-950 dark:text-emerald-200'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            {sec.alertType === 'warning' ? (
                              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            ) : sec.alertType === 'info' ? (
                              <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            )}
                            <div className="space-y-1.5 text-xs sm:text-sm">
                              {sec.content?.map((paragraph, pIdx) => (
                                <p key={pIdx} className="leading-relaxed">
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Normal Paragraflar */}
                      {!sec.isAlert && sec.content && (
                        <div className="space-y-2">
                          {sec.content.map((paragraph, pIdx) => (
                            <p key={pIdx}>{paragraph}</p>
                          ))}
                        </div>
                      )}

                      {/* Madde İşaretleri (Bullets) */}
                      {sec.bullets && (
                        <ul className="list-disc list-inside space-y-1.5 pl-2">
                          {sec.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="leading-relaxed">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Veri Tablosu (Örn: Altyapı Sağlayıcıları) */}
                      {sec.table && (
                        <div className="overflow-x-auto my-4 rounded-lg border border-border">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-muted/60 border-b border-border text-foreground font-semibold">
                                {sec.table.headers.map((h, hIdx) => (
                                  <th key={hIdx} className="p-3">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                              {sec.table.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-muted/20 transition-colors">
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="p-3 align-top">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Ek Alt Bölümler (Örn: Çerez Politikası İçeriği) */}
                      {sec.subsections?.map((sub, sIdx) => (
                        <div key={sIdx} className="mt-4 space-y-2">
                          <h3 className="text-sm font-bold text-foreground">
                            {sub.title}
                          </h3>
                          {sub.table && (
                            <div className="overflow-x-auto my-3 rounded-lg border border-border">
                              <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                  <tr className="bg-muted/60 border-b border-border text-foreground font-semibold">
                                    {sub.table.headers.map((h, hIdx) => (
                                      <th key={hIdx} className="p-3">
                                        {h}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border/60">
                                  {sub.table.rows.map((row, rIdx) => (
                                    <tr key={rIdx} className="hover:bg-muted/20 transition-colors">
                                      {row.map((cell, cIdx) => (
                                        <td key={cIdx} className="p-3 align-top">
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                          {sub.bullets && (
                            <ul className="list-disc list-inside space-y-1.5 pl-2">
                              {sub.bullets.map((b, bIdx) => (
                                <li key={bIdx}>{b}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}

                      {/* Özel İade / İletişim Vurgu Notu */}
                      {sec.extraNotice && (
                        <div className="p-3.5 rounded-lg bg-muted/50 border border-border/80 text-xs text-foreground font-medium mt-3">
                          {sec.extraNotice}
                        </div>
                      )}
                    </section>
                  ))}
                </div>

                {/* Makale Altı İletişim Barı */}
                <footer className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                  <div>
                    {lang === 'tr'
                      ? 'Herhangi bir soru veya itirazınız için:'
                      : 'For any questions or inquiries:'}{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary font-bold hover:underline">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
                  >
                    <span>{content.nav.contactSupport}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </footer>
              </article>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;
