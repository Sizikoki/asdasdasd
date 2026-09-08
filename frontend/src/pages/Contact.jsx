import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Clock,
  ShieldCheck,
  Copy,
  Check,
  Send,
  HelpCircle,
  MessageSquare,
  ArrowLeft,
  ChevronDown,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { getUser, isLoggedIn } from '@/utils/storage';

const CONTACT_EMAIL = 'help@healthlexmed.com';

export const Contact = () => {
  const { currentLanguage, t } = useLanguage();
  const isTr = currentLanguage === 'tr';

  const user = isLoggedIn() ? getUser() : null;

  const [name, setName] = useState(user?.name || user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [category, setCategory] = useState('general');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = isTr
      ? 'İletişim & Destek | HealthLexMed'
      : 'Contact & Support | HealthLexMed';
  }, [isTr]);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      toast.success(isTr ? 'help@healthlexmed.com panoya kopyalandı!' : 'help@healthlexmed.com copied to clipboard!');
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !message.trim()) {
      toast.error(
        isTr
          ? 'Lütfen e-posta adresinizi ve mesajınızı doldurunuz.'
          : 'Please fill in your email and message.'
      );
      return;
    }

    const categoryLabels = {
      general: isTr ? 'Genel Soru & Bilgi' : 'General Inquiry',
      billing: isTr ? 'Abonelik & Ödeme' : 'Subscription & Billing',
      tech: isTr ? 'Teknik Hata & Destek' : 'Technical Support / Bug',
      terms: isTr ? 'Terim & Morfem Düzeltme Önerisi' : 'Term / Morpheme Suggestion',
      partnership: isTr ? 'Kurumsal & İş Birliği' : 'Institutional / Partnership',
    };

    const catLabel = categoryLabels[category] || category;
    const emailSubject = `[HealthLexMed Destek] ${catLabel}${subject.trim() ? ` - ${subject.trim()}` : ''}`;
    const emailBody = `${isTr ? 'Ad Soyad' : 'Full Name'}: ${name.trim() || (isTr ? 'Belirtilmedi' : 'Not specified')}\n${isTr ? 'E-posta' : 'Email'}: ${email.trim()}\n${isTr ? 'Konu Kategorisi' : 'Category'}: ${catLabel}\n\n${isTr ? 'Mesaj' : 'Message'}:\n${message.trim()}\n\n---\nPlatform: HealthLexMed Web App\n${isTr ? 'Tarih' : 'Date'}: ${new Date().toLocaleString()}`;

    // Paddle Denetim Standartları: Kullanıcıyı doğrudan mailto ile Gmail / varsayılan istemciye aktarır
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoUrl;

    setSubmitted(true);
    toast.success(
      isTr
        ? 'E-posta istemciniz açılıyor... Talebinize 24-48 saat içinde dönüş sağlanacaktır.'
        : 'Opening your email client... You will receive a response within 24-48 hours.'
    );
  };

  const faqs = isTr
    ? [
        {
          q: 'Taleplerime ne kadar sürede yanıt verilir?',
          a: 'Destek ekibimiz tüm talepleri önceliklendirerek inceler. Resmi hizmet standardımız gereğince tüm taleplerinize en geç 24-48 saat içinde dönüş sağlanır.'
        },
        {
          q: 'Aboneliğimi nasıl iptal edebilir veya yönetebilirim?',
          a: 'Giriş yaptıktan sonra Profil sayfanızdan veya doğrudan help@healthlexmed.com adresine kayıtlı e-postanızdan bir ileti göndererek aboneliğinizi anında ve herhangi bir cayma cezası olmaksızın iptal edebilirsiniz.'
        },
        {
          q: 'Ödeme ve fatura işlemlerim nerede işlenir?',
          a: 'HealthLexMed üzerindeki tüm abonelik ve ödeme işlemleri uluslararası ödeme ortağımız Paddle güvencesiyle yürütülür. Fatura ve ödeme dekontlarınız kayıtlı e-postanıza otomatik olarak iletilir.'
        },
        {
          q: 'Bir tıbbi terimde veya açıklamada hata fark edersem ne yapmalıyım?',
          a: 'Tıbbi terminoloji ekibimiz içerikleri sürekli doğrulamaktadır. Terim adı, kategori ve önerinizi help@healthlexmed.com adresine ilettiğinizde terminoloji komisyonumuz 24-48 saat içinde inceleyerek düzeltmeyi yayına alır.'
        }
      ]
    : [
        {
          q: 'How fast will I receive a response to my inquiry?',
          a: 'Our support team prioritizes and reviews every request. In accordance with our official service standard, requests are replied within 24-48 hours.'
        },
        {
          q: 'How can I manage or cancel my subscription?',
          a: 'You can cancel anytime from your Profile page after logging in, or simply email us at help@healthlexmed.com from your registered email address. There are no cancellation penalties.'
        },
        {
          q: 'Where are payments and invoices processed?',
          a: 'All subscription and billing processes on HealthLexMed are handled securely through our international Merchant of Record partner, Paddle. Invoices and receipts are sent automatically to your registered email.'
        },
        {
          q: 'What should I do if I notice an issue with a medical term or definition?',
          a: 'Our medical terminology editorial team verifies content continuously. Please email the term name and your suggestion to help@healthlexmed.com; our panel will review and apply corrections within 24-48 hours.'
        }
      ];

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between text-foreground">
      {/* Üst Alan / Header */}
      <div className="w-full">
        {/* Banner / Header */}
        <section className="border-b border-border bg-gradient-to-b from-card to-background py-12 md:py-16">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {isTr ? 'Ana Sayfaya Dön' : 'Back to Home'}
              </Link>
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
                <HelpCircle className="w-3.5 h-3.5" />
                {isTr ? 'İletişim & Destek' : 'Contact & Support'}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground font-serif">
                {isTr ? 'Nasıl yardımcı olabiliriz?' : 'How can we help you?'}
              </h1>
              <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
                {isTr
                  ? 'Sorularınız, teknik destek talepleriniz, abonelik işlemleriniz veya tıp terminolojisi önerileriniz için buradayız.'
                  : "We're here to help with your inquiries, technical support, subscription questions, or medical terminology suggestions."}
              </p>
            </div>
          </div>
        </section>

        {/* 3 Ana Kart: E-posta, 24-48h SLA, Güvence */}
        <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Resmi Destek E-postası */}
            <Card className="border-border shadow-sm bg-card/95 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                  <Mail className="w-5 h-5" />
                </div>
                <CardTitle className="text-base font-bold">
                  {isTr ? 'Resmi Destek E-Postası' : 'Official Support Email'}
                </CardTitle>
                <CardDescription className="text-xs">
                  {isTr ? 'Tüm resmi yazışma ve destek talepleri' : 'Official communications and inquiries'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-2.5 rounded-md bg-muted/60 border border-border/80 flex items-center justify-between gap-2">
                  <span className="font-mono text-sm font-semibold text-foreground select-all break-all">
                    {CONTACT_EMAIL}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0"
                    title={isTr ? 'Adresi Kopyala' : 'Copy Email'}
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {isTr ? 'E-posta Gönder' : 'Send Email'}
                  </a>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyEmail}
                    className="text-xs"
                  >
                    {copied ? (isTr ? 'Kopyalandı' : 'Copied') : (isTr ? 'Kopyala' : 'Copy')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 2. 24-48 Saat Yanıt Garantisi (SLA) */}
            <Card className="border-border shadow-sm bg-card/95 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-2">
                  <Clock className="w-5 h-5" />
                </div>
                <CardTitle className="text-base font-bold flex items-center justify-between">
                  <span>{isTr ? 'Hızlı Yanıt Garantisi' : 'Response Guarantee'}</span>
                  <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">
                    24-48h SLA
                  </Badge>
                </CardTitle>
                <CardDescription className="text-xs">
                  {isTr ? 'Resmi hizmet seviyesi taahhüdümüz' : 'Our official service commitment'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-3 rounded-md bg-emerald-500/5 border border-emerald-500/15">
                  <p className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 leading-snug">
                    {isTr
                      ? 'Taleplerinize 24-48 saat içinde dönüş sağlanır.'
                      : 'Requests are replied within 24-48 hours.'}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isTr
                    ? 'Ekibimiz haftanın 7 günü gelen tüm kullanıcı mesajlarını inceler ve çözümü hızla e-posta adresinize iletir.'
                    : 'Our team reviews inquiries 7 days a week and delivers resolution directly to your email.'}
                </p>
              </CardContent>
            </Card>

            {/* 3. Paddle & Müşteri Güvencesi */}
            <Card className="border-border shadow-sm bg-card/95 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center mb-2">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <CardTitle className="text-base font-bold">
                  {isTr ? 'Güvenli & Şeffaf Destek' : 'Secure & Transparent'}
                </CardTitle>
                <CardDescription className="text-xs">
                  {isTr ? 'Paddle Merchant of Record altyapısı' : 'Paddle Merchant of Record infrastructure'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isTr
                    ? 'Ödemeleriniz, faturalandırma ve abonelik yönetiminiz küresel standartlarda güvence altındadır. İptal ve iade talepleri anında işlenir.'
                    : 'Billing, receipts, and subscriptions adhere to international compliance. Cancellation and refund requests are processed promptly.'}
                </p>
                <div className="text-[11px] text-muted-foreground/80 pt-1 flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                  {isTr ? 'Kolay iptal ve şeffaf faturalama' : 'Easy cancellation and clear invoicing'}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Ana İçerik: İletişim Formu (Sol) ve Hızlı SSS (Sağ) */}
        <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sol: İletişim Formu */}
            <div className="lg:col-span-7">
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <CardTitle className="text-xl font-bold">
                      {isTr ? 'Doğrudan Destek Talebi İletin' : 'Send a Support Request'}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-xs leading-relaxed">
                    {isTr
                      ? 'Formu gönderdiğinizde, yazdıklarınız varsayılan e-posta uygulamanıza (Gmail, Outlook vb.) aktarılır ve help@healthlexmed.com alıcısıyla açılır.'
                      : 'When submitted, your message will open in your default email application (Gmail, Outlook, etc.) addressed to help@healthlexmed.com.'}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Ad Soyad */}
                      <div className="space-y-1.5">
                        <Label htmlFor="contact-name" className="text-xs font-semibold">
                          {isTr ? 'Adınız Soyadınız' : 'Full Name'}
                        </Label>
                        <Input
                          id="contact-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={isTr ? 'Örn: Dr. Ahmet Yılmaz' : 'e.g. John Doe'}
                          className="text-sm"
                        />
                      </div>

                      {/* E-posta */}
                      <div className="space-y-1.5">
                        <Label htmlFor="contact-email" className="text-xs font-semibold">
                          {isTr ? 'E-Posta Adresiniz' : 'Email Address'} <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="contact-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ornek@alanadi.com"
                          className="text-sm"
                        />
                      </div>
                    </div>

                    {/* Konu Kategorisi */}
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-category" className="text-xs font-semibold">
                        {isTr ? 'Talep Türü / Kategori' : 'Inquiry Category'}
                      </Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger id="contact-category" className="text-sm">
                          <SelectValue placeholder={isTr ? 'Kategori Seçiniz' : 'Select Category'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            {isTr ? 'Genel Soru / Bilgi Talebi' : 'General Inquiry / Information'}
                          </SelectItem>
                          <SelectItem value="billing">
                            {isTr ? 'Abonelik, Ödeme ve Fatura' : 'Subscription, Payment & Billing'}
                          </SelectItem>
                          <SelectItem value="tech">
                            {isTr ? 'Teknik Destek / Hata Bildirimi' : 'Technical Support / Bug Report'}
                          </SelectItem>
                          <SelectItem value="terms">
                            {isTr ? 'Tıbbi Terim & Morfem Düzeltme Önerisi' : 'Medical Term / Morpheme Suggestion'}
                          </SelectItem>
                          <SelectItem value="partnership">
                            {isTr ? 'Kurumsal & Üniversite İş Birliği' : 'Institutional & Academic Partnership'}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Konu Başlığı */}
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-subject" className="text-xs font-semibold">
                        {isTr ? 'Konu Özeti' : 'Subject'}
                      </Label>
                      <Input
                        id="contact-subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder={isTr ? 'Örn: Abonelik iptali veya terim önerisi hk.' : 'e.g. Billing inquiry or term feedback'}
                        className="text-sm"
                      />
                    </div>

                    {/* Mesaj */}
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-message" className="text-xs font-semibold">
                        {isTr ? 'Mesajınız' : 'Message'} <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="contact-message"
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={
                          isTr
                            ? 'Lütfen talebinizi, karşılaştığınız durumu veya önerinizi detaylıca yazınız...'
                            : 'Please describe your request, issue, or suggestion in detail...'
                        }
                        className="text-sm resize-y"
                      />
                    </div>

                    {/* SLA ve Paddle Bilgilendirme Notu */}
                    <div className="rounded-md bg-muted/40 p-3 border border-border/60 text-xs text-muted-foreground flex items-start gap-2">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground font-medium">
                          {isTr ? 'SLA Bilgilendirmesi: ' : 'SLA Notice: '}
                        </strong>
                        {isTr
                          ? 'Taleplerinize 24-48 saat içinde dönüş sağlanır. help@healthlexmed.com alıcısıyla doğrudan e-posta gönderilir.'
                          : 'Requests are replied within 24-48 hours. Direct email communication to help@healthlexmed.com.'}
                      </div>
                    </div>

                    <Button type="submit" className="w-full sm:w-auto font-semibold gap-2">
                      <Send className="w-4 h-4" />
                      {isTr ? 'Mesajı Gönder (Mail Aç)' : 'Send Message (Open Email)'}
                    </Button>

                    {submitted && (
                      <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300">
                        {isTr
                          ? '✓ E-posta istemciniz tetiklendi. Talebiniz bize ulaştıktan sonra 24-48 saat içinde help@healthlexmed.com üzerinden yanıtlanacaktır.'
                          : '✓ Email client triggered. You will receive a response within 24-48 hours from help@healthlexmed.com.'}
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sağ: Sıkça Sorulan Sorular & Bilgiler */}
            <div className="lg:col-span-5 space-y-5">
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg font-bold">
                      {isTr ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions'}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-xs">
                    {isTr ? 'En sık karşılaşılan konulara hızlı yanıtlar' : 'Quick answers to common questions'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-lg border border-border/80 bg-muted/20 overflow-hidden transition-colors"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full text-left p-3 flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-foreground hover:text-primary transition-colors"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                              isOpen ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-3 pb-3 text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-2 bg-background/50">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Ek Bilgi / Doğrudan İletişim Kutusu */}
              <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 space-y-3">
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  {isTr ? 'Doğrudan Yazmak İster misiniz?' : 'Prefer Direct Email?'}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isTr
                    ? 'Formu kullanmak istemiyorsanız, kişisel veya kurumsal e-posta istemcinizden doğrudan help@healthlexmed.com adresine yazabilirsiniz.'
                    : 'If you prefer not to use the form, write to us directly at help@healthlexmed.com from your preferred email client.'}
                </p>
                <div className="pt-1">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    <span>help@healthlexmed.com</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
