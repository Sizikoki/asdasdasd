export const LEGAL_CONTENT = {
  tr: {
    nav: {
      terms: 'Kullanıcı Sözleşmesi',
      privacy: 'Gizlilik ve Çerez Politikası',
      refund: 'İptal ve İade Politikası',
      backToHome: 'Ana Sayfaya Dön',
      needHelp: 'Sorunuz mu var?',
      supportNotice: 'Tüm yasal ve operasyonel sorularınız için bize ulaşabilirsiniz.',
      contactSupport: 'İletişim & Destek',
      responseSla: 'Taleplerinize 24-48 saat içinde dönüş sağlanır.'
    },
    terms: {
      id: 'terms',
      title: 'KULLANICI SÖZLEŞMESİ VE KULLANIM KOŞULLARI',
      shortTitle: 'Kullanıcı Sözleşmesi',
      subtitle: '(Terms of Service)',
      effectiveDate: '03.09.2026',
      provider: 'HealthLexMed',
      address: 'Bağcılar / İstanbul, Türkiye',
      email: 'help@healthlexmed.com',
      emailNotice: '(Destek taleplerine en geç 48 saat içinde yanıt verilir)',
      website: 'https://www.healthlexmed.com',
      sections: [
        {
          id: 'parties',
          title: '1. TARAFLAR VE HİZMETİN KAPSAMI',
          content: [
            'İşbu Kullanıcı Sözleşmesi ("Sözleşme"), HealthLexMed ("PLATFORM") ile platforma üye olan veya içeriklerden faydalanan kullanıcı ("ÜYE") arasında yürürlüktedir.',
            'PLATFORM; tıp fakültesi, sağlık bilimleri öğrencileri ve sağlık çalışanlarına yönelik medikal terminoloji, kök-önek-sonek (morfem) çözümlemeleri, kelime kartları ve pekiştirme modülleri sunan web tabanlı bir eğitim yazılımıdır (SaaS).'
          ]
        },
        {
          id: 'medical_disclaimer',
          title: '2. TIBBİ SORUMLULUK REDDİ (MEDICAL DISCLAIMER)',
          isAlert: true,
          alertType: 'warning',
          content: [
            'ÖNEMLİ: PLATFORM bünyesindeki tüm içerik ve materyaller yalnızca eğitsel, akademik ve kişisel gelişim amaçlıdır. Kesinlikle klinik teşhis, tanı, tedavi protokolü veya profesyonel tıbbi konsültasyon niteliği taşımaz.',
            'ÜYE, platformdaki verileri klinik kararlarında tek başına dayanak alamaz. Bilgilerin kullanımından doğabilecek tıbbi ve hukuki tüm sorumluluk münhasıran ÜYE\'ye aittir.'
          ]
        },
        {
          id: 'merchant_of_record',
          title: '3. YETKİLİ SATICI (MERCHANT OF RECORD) VE ÖDEMELER',
          isAlert: true,
          alertType: 'info',
          content: [
            'Sipariş ve ödeme süreçlerimiz, küresel yetkili satıcımız ve kayıtlı tüzel satıcı (Merchant of Record) sıfatıyla hareket eden Paddle.com Market Ltd. (Judd House, 18-29 Mora Street, London, EC1V 8BT, UK) veya bağlı iştirakleri tarafından yürütülmektedir.',
            'Kredi kartı ve finansal ödeme aracı bilgileri PLATFORM sunucularında asla saklanmaz; PCI-DSS Seviye 1 sertifikalı Paddle altyapısında işlenir.',
            'Tüm faturalandırma, vergi tahakkuku (KDV / Sales Tax) ve finansal müşteri desteği Paddle güvencesindedir.'
          ]
        },
        {
          id: 'subscription_trial',
          title: '4. ABONELİK VE 3 GÜNLÜK ÜCRETSİZ DENEME',
          content: [
            'PLATFORM, yıllık abonelik modeli (Temel Plan ve Tam Plan) ile hizmet sunmaktadır. Güncel fiyatlar sitede ve ödeme ekranında ilan edildiği gibidir.',
            'Yeni kullanıcılara tanımlanan 3 günlük ücretsiz deneme süresi boyunca paket özellikleri kısıtlamasız kullanılabilir. Deneme süresi bitmeden önce aboneliğin sonlandırılması halinde kullanıcıdan hiçbir ücret tahsil edilmez.',
            'İptal edilmeyen abonelikler, deneme süresi sonunda ve takip eden her yıl dönümünde otomatik olarak yenilenir.'
          ]
        },
        {
          id: 'ip_rules',
          title: '5. FİKRİ MÜLKİYET VE KULLANIM KURALLARI',
          content: [
            'Platformda yer alan morfem veritabanı, yazılım kodları, arayüz tasarımları ve algoritmalar 5846 sayılı FSEK kapsamında HealthLexMed\'e aittir.',
            'Platformda sunulan uluslararası anatomik terminoloji ve adlandırma standartları, IFAA / FIPAT (International Federation of Associations of Anatomists) tarafından yayımlanan Terminologia Anatomica (TA2) bilimsel standartlarına dayanmaktadır.',
            'Hesap devri yapılamaz; içerikler scraper/bot yazılımlarıyla çekilemez, kopyalanamaz veya ticari amaçla satılamaz.'
          ]
        },
        {
          id: 'jurisdiction',
          title: '6. UYUŞMAZLIKLARIN ÇÖZÜMÜ',
          content: [
            'İşbu sözleşmenin uygulanmasında Türk Hukuku geçerli olup, doğabilecek uyuşmazlıklarda İstanbul (Bağcılar/Bakırköy) Mahkemeleri ve İcra Daireleri yetkilidir.'
          ]
        }
      ]
    },
    privacy: {
      id: 'privacy',
      title: 'GİZLİLİK POLİTİKASI VE KVKK AYDINLATMA METNİ',
      shortTitle: 'Gizlilik ve Çerez Politikası',
      subtitle: '(Privacy Policy & KVKK)',
      effectiveDate: '03.09.2026',
      controller: 'HealthLexMed (Bağcılar / İstanbul, Türkiye)',
      email: 'help@healthlexmed.com',
      website: 'https://www.healthlexmed.com',
      sections: [
        {
          id: 'collected_data',
          title: '1. TOPLANAN KİŞİSEL VERİLER',
          bullets: [
            'Kimlik ve İletişim Bilgileri: Ad, soyad, e-posta adresi (Google Firebase Authentication aracılığıyla).',
            'Kullanım ve Performans Verileri: Çözülen test sonuçları, morfem hafıza kartı skorları, seviye ve çalışma süreleri.',
            'Finansal İşlem Bilgisi: Sipariş numarası, paket türü, abonelik başlangıç/yenilenme tarihleri. (Kredi kartı numarası, CVV gibi kritik ödeme bilgileri tarafımızca işlenmez ve saklanmaz; doğrudan yetkili satıcımız Paddle altyapısında tutulur).',
            'Teknik ve Trafik Logları: IP adresi, cihaz ve tarayıcı türü, oturum süreleri (Google Analytics GA4 ve Vercel altyapısı üzerinden).'
          ]
        },
        {
          id: 'health_data_pledge',
          title: '2. SAĞLIK VERİSİ İŞLENMEME TAAHHÜDÜ',
          isAlert: true,
          alertType: 'success',
          content: [
            'HealthLexMed yalnızca eğitim ve referans yazılımıdır. Sitemizde hiçbir kullanıcıya, hastaya veya sağlık kuruluşuna ait kişisel sağlık verisi, rapor, reçete veya anamnez kaydı kesinlikle toplanmaz, talep edilmez ve işlenmez.'
          ]
        },
        {
          id: 'third_parties',
          title: '3. VERİLERİN PAYLAŞILDIĞI ALTYAPI SAĞLAYICILARI (YURT DIŞI AKTARIMI)',
          content: [
            'Hizmetin teknik güvenliği ve sürdürülebilirliği adına verileriniz sınırlı olarak şu sağlayıcılarla paylaşılır:'
          ],
          table: {
            headers: ['Sağlayıcı', 'Ülke', 'Amaç', 'Veri Kapsamı'],
            rows: [
              ['Paddle.com Market Ltd.', 'İrlanda / İngiltere', 'Satış, faturalandırma, abonelik yönetimi ve vergi (MoR)', 'Ad, Soyad, E-posta, Tutar, Sipariş ID'],
              ['Google Firebase', 'ABD / AB', 'Güvenli kullanıcı kimlik doğrulama (Auth) ve veritabanı', 'Ad, E-posta, Parola karması, İlerleme verileri'],
              ['Google Analytics (GA4)', 'ABD', 'Ziyaretçi davranış analizi ve site optimizasyonu', 'Anonim IP, cihaz bilgisi, tıklama istatistikleri'],
              ['Vercel Inc.', 'ABD / Küresel CDN', 'Web sitesi barındırma, DNS ve sunucu erişim güvenliği', 'İstek logları, IP adresi, erişim zamanı']
            ]
          }
        },
        {
          id: 'user_rights',
          title: '4. KULLANICI HAKLARI (KVKK MD. 11 VE GDPR)',
          content: [
            'Kullanıcılar; verilerinin silinmesini (hesabın tamamen kapatılması), düzeltilmesini veya kullanım durumunu talep edebilirler.',
            'Taleplerinizi kayıtlı e-postanızdan help@healthlexmed.com adresine iletebilirsiniz. Başvurular en geç 30 gün içinde yanıtlanır.'
          ]
        },
        {
          id: 'cookie_policy',
          title: 'BELGE 4: ÇEREZ POLİTİKASI (COOKIE POLICY)',
          isHeader: true,
          subtitle: 'Platform: HealthLexMed (https://www.healthlexmed.com) · Yürürlük Tarihi: 03.09.2026',
          subsections: [
            {
              title: '1. ÇEREZ NEDİR VE NASIL KULLANILIR?',
              content: [
                'Çerezler (Cookies), platformumuzu ziyaret ettiğinizde tarayıcınıza yüklenen küçük metin dosyalarıdır. HealthLexMed; oturum güvenliğinizi sağlamak, dil tercihinizi (TR/EN) hatırlamak ve platform performansını optimize etmek amacıyla çerezlerden yararlanır.'
              ]
            },
            {
              title: '2. ÇEREZ TÜRLERİ VE SAKLAMA SÜRELERİ',
              table: {
                headers: ['Çerez Türü', 'Sağlayıcı', 'Amaç', 'Saklama Süresi'],
                rows: [
                  ['Zorunlu (Teknik) Çerezler', 'HealthLexMed / Vercel / Firebase', 'Kullanıcı oturumunun korunması, güvenli geçişler ve hızlı CDN yüklemesi. Kapatılamaz.', 'Oturum Süresince (Session)'],
                  ['Performans / Analitik Çerezler', 'Google Analytics (GA4)', 'Sayfa ziyaret sayılarını, kalış sürelerini ve buton tıklamalarını anonim olarak sayar.', '14 Ay (Kalıcı)'],
                  ['İşlevsellik Çerezleri', 'HealthLexMed', 'Türkçe/İngilizce dil tercihlerini ve arayüz seçimlerini hatırlar.', '1 Yıla Kadar'],
                  ['Pazarlama / Hedefleme Çerezleri', '-', 'Sitemizde üçüncü taraf hedefli reklam veya remarketing çerezleri kullanılmaz.', '-']
                ]
              }
            },
            {
              title: '3. ÇEREZ TERCİHLERİNİN YÖNETİMİ',
              bullets: [
                'Tarayıcı (Chrome, Safari, Edge, Firefox) ayarlarınızdan çerezlerin tamamını silebilir veya engelleyebilirsiniz.',
                'Google Analytics izlemesini devre dışı bırakmak için resmi Google Analytics Opt-out Browser Add-on eklentisini kurabilirsiniz.',
                'Sitemize ilk girişte analitik çerezler için rıza banner\'ı üzerinden "Kabul Et / Reddet" seçeneği sunulmaktadır.'
              ]
            }
          ]
        }
      ]
    },
    refund: {
      id: 'refund',
      title: 'İADE VE İPTAL POLİTİKASI',
      shortTitle: 'İade ve İptal Politikası',
      subtitle: '(Refund & Cancellation Policy)',
      effectiveDate: '03.09.2026',
      platform: 'HealthLexMed (https://www.healthlexmed.com)',
      supportEmail: 'help@healthlexmed.com (48 saat içinde yanıtlanır)',
      paddleSupport: 'https://paddle.net (Hızlı İptal/İade)',
      sections: [
        {
          id: 'trial_cancellation',
          title: '1. 3 GÜNLÜK ÜCRETSİZ DENEME İPTALİ',
          isAlert: true,
          alertType: 'success',
          content: [
            '3 günlük deneme süresi başlatan kullanıcılar, aboneliklerini 72 saatlik süre dolmadan önce istedikleri an sonlandırabilir.',
            'İptal işlemi; profil ayarlarından veya Paddle tarafından e-posta adresinize gönderilen faturadaki "Manage Subscription / Cancel" linki üzerinden tek tıkla yapılabilir.',
            'Deneme süresi dolmadan yapılan iptallerde karttan hiçbir ücret çekilmez ($0 / 0 TL).'
          ]
        },
        {
          id: 'annual_cancellation',
          title: '2. YILLIK ABONELİK İPTALİ',
          content: [
            'Yıllık aboneliğinizi dilediğiniz an iptal edebilirsiniz.',
            'İptal işlemi, bir sonraki fatura döneminde kartınızdan otomatik çekim yapılmasını durdurur. İptal talebinde bulunulan mevcut yıllık dönemin bitimine kadar platforma tam erişiminiz devam eder.'
          ]
        },
        {
          id: 'withdrawal_refund',
          title: '3. CAYMA HAKKI VE İADE ŞARTLARI',
          content: [
            'Mesafeli Sözleşmeler Yönetmeliği m.15/1-ğ ve AB Tüketici Hakları Direktifi uyarınca; deneme süresi bittikten sonra anında ifa edilen dijital eğitim yazılımlarında yasal 14 günlük cayma hakkı istisna kapsamındadır.',
            'Bununla birlikte yetkili satıcımız Paddle ve HealthLexMed, aşağıdaki koşullarda 14 gün içinde yapılan başvurularda tam ücret iadesi yapmayı taahhüt eder:'
          ],
          bullets: [
            'Teknik bir arıza sebebiyle platforma 48 saatten uzun süre erişilememesi,',
            'Sistem hatasından kaynaklanan mükerrer (çift) faturalandırma yapılması,',
            'Kullanıcının rızası dışındaki yetkisiz kart işlemleri.'
          ],
          extraNotice: 'İade taleplerinizi Sipariş Numarası (Order ID) ile birlikte help@healthlexmed.com adresine veya doğrudan paddle.net portalına iletebilirsiniz. İadeler onaylandığında 5-10 iş günü içinde ödeme yapılan karta aktarılır.'
        }
      ]
    }
  },
  en: {
    nav: {
      terms: 'Terms of Service',
      privacy: 'Privacy & Cookie Policy',
      refund: 'Refund & Cancellation Policy',
      backToHome: 'Back to Home',
      needHelp: 'Have questions?',
      supportNotice: 'Feel free to reach out to us for any legal, billing, or operational inquiries.',
      contactSupport: 'Contact & Support',
      responseSla: 'Requests are replied within 24-48 hours.'
    },
    terms: {
      id: 'terms',
      title: 'TERMS OF SERVICE AND USER AGREEMENT',
      shortTitle: 'Terms of Service',
      subtitle: '(Terms of Service)',
      effectiveDate: 'September 3, 2026',
      provider: 'HealthLexMed',
      address: 'Bagcilar / Istanbul, Turkey',
      email: 'help@healthlexmed.com',
      emailNotice: '(Inquiries responded to within 48 hours at latest)',
      website: 'https://www.healthlexmed.com',
      sections: [
        {
          id: 'parties',
          title: '1. PARTIES AND SCOPE OF SERVICE',
          content: [
            'This Terms of Service agreement ("Agreement") is entered into between HealthLexMed ("PLATFORM") and the user ("USER") who registers or accesses content on the platform.',
            'PLATFORM is a web-based educational SaaS application offering medical terminology, prefix-root-suffix (morpheme) decodings, flashcards, and interactive practice modules designed for medical, healthcare students, and practitioners.'
          ]
        },
        {
          id: 'medical_disclaimer',
          title: '2. MEDICAL DISCLAIMER',
          isAlert: true,
          alertType: 'warning',
          content: [
            'IMPORTANT: All content, data, and materials within the PLATFORM are intended strictly for educational, academic, and self-study purposes. They do not constitute clinical diagnosis, medical advice, treatment protocols, or professional consultation in any way.',
            'The USER may not rely on platform information as the sole basis for clinical decisions. Any medical or legal liability arising from the application of this information rests exclusively with the USER.'
          ]
        },
        {
          id: 'merchant_of_record',
          title: '3. MERCHANT OF RECORD AND PAYMENTS',
          isAlert: true,
          alertType: 'info',
          content: [
            'Order and payment processing services are conducted by our authorized global legal Merchant of Record, Paddle.com Market Ltd. (Judd House, 18-29 Mora Street, London, EC1V 8BT, UK) or its subsidiaries.',
            'Credit card details and financial payment data are never stored on PLATFORM servers; they are processed securely through PCI-DSS Level 1 compliant Paddle infrastructure.',
            'All billing, sales tax/VAT collection, and financial transaction customer support are guaranteed by Paddle.'
          ]
        },
        {
          id: 'subscription_trial',
          title: '4. SUBSCRIPTION AND 3-DAY FREE TRIAL',
          content: [
            'The PLATFORM provides services based on an annual subscription model (Basic Plan and Full Plan). Current pricing is displayed transparently on the website and checkout screens.',
            'During the 3-day free trial provided to new users, all plan features are accessible without restriction. If the subscription is cancelled before the trial ends, no charge will be made ($0.00).',
            'Subscriptions not cancelled before the trial expires will automatically renew at the end of the trial period and annually thereafter.'
          ]
        },
        {
          id: 'ip_rules',
          title: '5. INTELLECTUAL PROPERTY AND USAGE RESTRICTIONS',
          content: [
            'The morpheme database, proprietary code, user interface designs, and algorithms belong to HealthLexMed under applicable intellectual property laws.',
            'International anatomical terminology and anatomical classifications presented on the platform align with the Terminologia Anatomica (TA2) scientific standard published by IFAA / FIPAT (International Federation of Associations of Anatomists).',
            'Accounts may not be shared or transferred; platform content may not be scraped, copied, reverse engineered, or redistributed for commercial gain.'
          ]
        },
        {
          id: 'jurisdiction',
          title: '6. DISPUTE RESOLUTION AND GOVERNING LAW',
          content: [
            'This agreement is governed by the laws of the Republic of Turkey. Any disputes shall be submitted to the exclusive jurisdiction of the Courts and Execution Offices of Istanbul (Bagcilar / Bakirkoy).'
          ]
        }
      ]
    },
    privacy: {
      id: 'privacy',
      title: 'PRIVACY POLICY & KVKK / GDPR DISCLOSURE',
      shortTitle: 'Privacy & Cookie Policy',
      subtitle: '(Privacy Policy & GDPR/KVKK)',
      effectiveDate: 'September 3, 2026',
      controller: 'HealthLexMed (Bagcilar / Istanbul, Turkey)',
      email: 'help@healthlexmed.com',
      website: 'https://www.healthlexmed.com',
      sections: [
        {
          id: 'collected_data',
          title: '1. COLLECTED PERSONAL DATA',
          bullets: [
            'Identity & Contact Information: Full name and email address (collected via Google Firebase Authentication).',
            'Usage & Performance Analytics: Quiz scores, morpheme flashcard completion data, user level, and study duration.',
            'Financial & Transaction Records: Order ID, plan type, subscription start and renewal dates. (Sensitive payment card details like PAN and CVV are never processed or retained by HealthLexMed; they are managed entirely by our Merchant of Record, Paddle).',
            'Technical & Traffic Logs: IP address, device & browser parameters, session lengths (managed via Google Analytics GA4 and Vercel infrastructure).'
          ]
        },
        {
          id: 'health_data_pledge',
          title: '2. NO HEALTH DATA PROCESSING PLEDGE',
          isAlert: true,
          alertType: 'success',
          content: [
            'HealthLexMed is solely an educational and reference platform. We strictly do not collect, request, store, or process any patient records, clinical health data, prescriptions, or medical histories.'
          ]
        },
        {
          id: 'third_parties',
          title: '3. INFRASTRUCTURE PARTNERS (INTERNATIONAL TRANSFERS)',
          content: [
            'To maintain technical security and uninterrupted service, personal data is processed in collaboration with the following providers:'
          ],
          table: {
            headers: ['Provider', 'Country', 'Purpose', 'Data Scope'],
            rows: [
              ['Paddle.com Market Ltd.', 'Ireland / UK', 'Checkout, invoicing, subscription lifecycle, and tax management (MoR)', 'Name, Email, Amount, Order ID'],
              ['Google Firebase', 'US / EU', 'Secure user authentication and encrypted database hosting', 'Name, Email, Password hash, Progress metrics'],
              ['Google Analytics (GA4)', 'US', 'Aggregated behavioral analytics and interface optimization', 'Anonymized IP, device info, click statistics'],
              ['Vercel Inc.', 'US / Global CDN', 'Web application hosting, edge DNS, and server request security', 'HTTP request logs, IP, timestamp']
            ]
          }
        },
        {
          id: 'user_rights',
          title: '4. USER DATA RIGHTS (GDPR & KVKK)',
          content: [
            'Users retain the right to request deletion (complete account removal), rectification, or access to their stored personal records.',
            'Inquiries may be addressed to help@healthlexmed.com from your registered email account. Applications are processed within 30 days.'
          ]
        },
        {
          id: 'cookie_policy',
          title: 'DOCUMENT 4: COOKIE POLICY',
          isHeader: true,
          subtitle: 'Platform: HealthLexMed (https://www.healthlexmed.com) · Effective Date: September 3, 2026',
          subsections: [
            {
              title: '1. WHAT IS A COOKIE AND HOW IS IT USED?',
              content: [
                'Cookies are compact text files placed onto your browser during your platform visit. HealthLexMed utilizes cookies to maintain session authorization, recall your bilingual language preference (TR/EN), and ensure optimized CDN performance.'
              ]
            },
            {
              title: '2. COOKIE CATEGORIES AND RETENTION PERIODS',
              table: {
                headers: ['Category', 'Provider', 'Purpose', 'Duration'],
                rows: [
                  ['Strictly Necessary (Technical)', 'HealthLexMed / Vercel / Firebase', 'Maintains user session security and rapid page routing. Cannot be toggled off.', 'Session duration'],
                  ['Performance & Analytics', 'Google Analytics (GA4)', 'Measures page hits, duration, and feature engagement in an anonymous format.', '14 Months (Persistent)'],
                  ['Functionality Cookies', 'HealthLexMed', 'Stores selected Turkish/English language preferences and UI configurations.', 'Up to 1 Year'],
                  ['Marketing / Tracking', '-', 'No third-party behavioral targeting, profiling, or remarketing cookies are deployed.', '-']
                ]
              }
            },
            {
              title: '3. MANAGING COOKIE PREFERENCES',
              bullets: [
                'You may delete or reject cookies at any time via your browser settings (Chrome, Safari, Edge, Firefox).',
                'To disable Google Analytics tracking, install the official Google Analytics Opt-out Browser Add-on.',
                'Our platform offers an analytical consent banner to allow or reject optional tracking on first entry.'
              ]
            }
          ]
        }
      ]
    },
    refund: {
      id: 'refund',
      title: 'REFUND AND CANCELLATION POLICY',
      shortTitle: 'Refund & Cancellation Policy',
      subtitle: '(Refund & Cancellation Policy)',
      effectiveDate: 'September 3, 2026',
      platform: 'HealthLexMed (https://www.healthlexmed.com)',
      supportEmail: 'help@healthlexmed.com (Replied within 48 hours)',
      paddleSupport: 'https://paddle.net (Fast Cancellation & Refund Portal)',
      sections: [
        {
          id: 'trial_cancellation',
          title: '1. 3-DAY FREE TRIAL CANCELLATION',
          isAlert: true,
          alertType: 'success',
          content: [
            'Users activating a 3-day free trial may cancel their subscription at any time prior to the expiration of the 72-hour trial window.',
            'Cancellation can be executed with a single click via your account Profile page or via the "Manage Subscription / Cancel" link found on your receipt email from Paddle.',
            'If cancelled during the trial period, no charges will be billed to your card ($0.00 / 0 TL).'
          ]
        },
        {
          id: 'annual_cancellation',
          title: '2. ANNUAL SUBSCRIPTION CANCELLATION',
          content: [
            'You may cancel your recurring annual subscription at any point in time.',
            'Cancellation halts automatic recurring renewal for subsequent billing terms. You retain full access to all features until the end of your currently paid annual period.'
          ]
        },
        {
          id: 'withdrawal_refund',
          title: '3. RIGHT OF WITHDRAWAL AND REFUND CONDITIONS',
          content: [
            'In accordance with EU Consumer Rights Directive standards and Distance Contract Regulations, digital SaaS educational software instantly executed with consumer consent is generally exempt from the standard 14-day cooling-off withdrawal right once the free trial ends.',
            'Nonetheless, HealthLexMed and our Merchant of Record Paddle commit to issuing a full refund within 14 days under the following circumstances:'
          ],
          bullets: [
            'Inability to access the service for more than 48 consecutive hours due to technical server outages,',
            'Duplicate or erroneous billing transactions resulting from platform system errors,',
            'Unauthorized transaction claims substantiated outside user authorization.'
          ],
          extraNotice: 'To file a refund request, contact help@healthlexmed.com including your Order ID, or submit it directly at paddle.net. Approved refunds will be credited back to your original payment card within 5-10 business days.'
        }
      ]
    }
  }
};
