import React from 'react';

export const getHomeDemoRounds = (lang = 'tr') => {
  if (lang === 'en') {
    return [
      {
        term: 'GASTROENTERITIS',
        chips: [
          { part: 'GASTRO', meaning: 'STOMACH' },
          { part: 'ENTER', meaning: 'INTESTINE' },
          { part: 'ITIS', meaning: 'INFLAMMATION' }
        ],
        result: 'Gastroenteritis = Inflammation of the stomach and intestine. You solved your first term.'
      },
      {
        term: 'OSTEOMYELITIS',
        chips: [
          { part: 'OSTEO', meaning: 'BONE' },
          { part: 'MYEL', meaning: 'MARROW' },
          { part: 'ITIS', meaning: 'INFLAMMATION' }
        ],
        result: 'Osteomyelitis = Bone marrow inflammation. You will now recognize the "-itis" suffix for life.'
      },
      {
        term: 'STERNOCLEIDOMASTOIDEUS',
        chips: [
          { part: 'STERNO', meaning: 'STERNUM' },
          { part: 'CLEIDO', meaning: 'CLAVICLE' },
          { part: 'MASTOID', meaning: 'MASTOID PROCESS' }
        ],
        result: 'Musculus sternocleidomastoideus: A muscle extending from the sternum and clavicle to the mastoid process behind the ear. Its name describes the exact path it follows.'
      }
    ];
  }

  return [
    {
      term: 'GASTROENTERITIS',
      chips: [
        { part: 'GASTRO', meaning: 'MİDE' },
        { part: 'ENTER', meaning: 'BAĞIRSAK' },
        { part: 'ITIS', meaning: 'İLTİHAP' }
      ],
      result: 'Gastroenteritis = Mide-bağırsak iltihabı. İlk terimini çözdün.'
    },
    {
      term: 'OSTEOMYELITIS',
      chips: [
        { part: 'OSTEO', meaning: 'KEMİK' },
        { part: 'MYEL', meaning: 'İLİK' },
        { part: 'ITIS', meaning: 'İLTİHAP' }
      ],
      result: 'Osteomyelitis = Kemik iliği iltihabı. "-itis" ekini artık ömür boyu tanırsın.'
    },
    {
      term: 'STERNOCLEIDOMASTOIDEUS',
      chips: [
        { part: 'STERNO', meaning: 'GÖĞÜS KEMİĞİ' },
        { part: 'CLEIDO', meaning: 'KÖPRÜCÜK KEMİĞİ' },
        { part: 'MASTOID', meaning: 'MEME ÇIKINTISI' }
      ],
      result: 'Musculus sternocleidomastoideus: Göğüs kemiği ile köprücük kemiğinden başlayıp kulak arkasındaki çıkıntıya uzanan kas. Adı, tam olarak izlediği yolu anlatıyor.'
    }
  ];
};

export const HOME_CONTENT = {
  tr: {
    hero: {
      title1: 'Ezberleme.',
      title2: 'Çöz.',
      sub: (termCount) => (
        <>
          Her Latince tıp terimi 2–3 parçadan oluşur. Parçaları öğren; <strong className="text-foreground font-bold">{termCount}+</strong> terimi ezberlemeden oku, sınavdan 2 hafta sonra da hatırla.
        </>
      ),
      ctaBtn: 'Tüm Terimlerin Kilidini Aç',
      micro1: '✓ Yıllık abonelik',
      micro2: '✓ TR ⟷ EN',
      scrollProof: '↓ Önce kanıt: İlk terimini 20 saniyede çöz.'
    },
    demo: {
      label: 'Bu terimi daha önce hiç görmediysen bile çözebilirsin:',
      hint: 'Parçalara dokunun, anlamları açılsın.',
      nextBtn: 'Sıradaki Terim →',
      finalMsg: (termCount, totalMorphemes) => (
        <>
          <strong className="text-foreground">3 terimi ezberlemeden çözdün!</strong> İçeride {termCount}+ terim ve {totalMorphemes}+ morfem seni bekliyor.
        </>
      ),
      finalBtn: 'Tüm Terimlerin Kilidini Aç'
    },
    problem: {
      eyebrow: 'Sorun',
      title: 'Sınav gecesini hatırlıyor musun?',
      p1: (
        <>
          Önünde 40 sayfalık kemik listesi. <span className="font-semibold text-foreground">Sustentaculum tali</span>'yi on kez yazdın; on birincide yine deftere bakıyorsun. Sabah sınavda çıkıyor, hatırlıyorsun. İki hafta sonra klinikte aynı terim geçiyor; kafanda tek bir harf bile yok.
        </>
      ),
      punch: 'Sorun sende değil, yöntemde: Anlamadan ezberlenen terim, kısa süreli hafızada misafirdir.',
      wave: 'Dil öğrenmenin oyunlaştırılabileceğini Duolingo kanıtladı. Latince tıp dili neden hâlâ liste ezberi?'
    },
    method: {
      eyebrow: 'Yöntem',
      title: 'Tek mantık: Parçala, anla, birleştir.',
      step1No: 'ADIM 1',
      step1Title: 'Parçala',
      step1Ex: 'KARDİYOMİYOPATİ → CARDIO · MYO · PATHY',
      step1Desc: 'Her terim, morfem adı verilen yapı taşlarına ayrılır.',
      step2No: 'ADIM 2',
      step2Title: 'Anla',
      step2Ex: 'KALP · KAS · HASTALIK',
      step2Desc: (termCount) => `Her parçanın tek bir anlamı vardır ve ${termCount}+ terimin içinde tekrar eder.`,
      step3No: 'ADIM 3',
      step3Title: 'Birleştir',
      step3Ex: '= KALP KASI HASTALIĞI',
      step3Desc: 'Terim artık hafızanda. Bir daha listeye bakmana gerek yok.',
      logicClose: (totalMorphemes) => `${totalMorphemes}+ morfemi öğrendiğinde, daha önce hiç görmediğin terimleri bile rahatlıkla okursun. Ezber sana liste kazandırır; mantık sana tıp dili kazandırır.`
    },
    features: {
      eyebrow: 'İçeride Ne Var?',
      title: 'Sayılarla HealthLexMed',
      terms: 'Terim',
      morphemes: 'Morfem',
      categories: 'Kategori',
      modes: 'Oyun Modu',
      languages: 'Dil (TR·EN)',
      game1Title: 'BİLGİ KARTLARI',
      game1Desc: 'Terimi gör, tahmin et ve kartı çevir. Aktif hatırlama tekniğinin ta kendisi.',
      game2Title: 'EŞLEŞTİRME',
      game2Desc: 'Latince terimleri Türkçe anlamlarıyla süreye karşı eşleştir. Kendi rekorunu kır.',
      game3Title: 'QUIZ',
      game3Desc: 'Kategoriye özel dinamik sorular. Her testte çeldiriciler yeniden üretilir.',
      game4Title: 'MORFEM OYUNU',
      game4Desc: 'Ek ve kökleri birleştirerek terimi kur — az önce yukarıda oynadığın oyunun tamamı.',
      scopeLine: 'Kapsam: Kafatasından ayak bileğine kadar kemikler, eklemler ve hareket terimleri — kategori kategori.'
    },
    testimonials: {
      eyebrow: 'Kullananlar',
      title: 'Öğrenciler Ne Diyor?',
      q1Text: '"Eşleştirme oyununda kendi rekorumu kovalarken farkında olmadan 60 terim öğrenmişim."',
      q1Who: 'F. — Fizyoterapi, 2. Sınıf',
      q2Text: '"Anki\'de deste hazırlamaktan çalışmaya vakit kalmıyordu. Burada doğrudan açıp çalışmaya başlıyorum."',
      q2Who: 'M. — Tıp, 1. Sınıf',
      q3Text: '"Morfem oyunundan sonra hoca spotta ne sorsa parçalayıp hemen çözüyorum."',
      q3Who: 'Z. — Hemşirelik, 1. Sınıf'
    },
    comparison: {
      eyebrow: 'Alternatifler',
      title: 'Neden Anki ya da Quizlet Değil?',
      thFeature: 'Özellik',
      thHealthlex: 'HealthLexMed',
      thCards: 'Genel Kart Uygulamaları\n(Anki, Quizlet)',
      thNotes: 'PDF & Ders Notları',
      row1: 'Terimleri köklerine ayıran motor',
      row2: 'Tıp içeriği hazır yüklü',
      row3: 'Türkçe ⟷ Latince çift dil desteği',
      row4: 'Tıbba özel 4 farklı oyun modu',
      row5: 'Ödeme Modeli',
      row5ValHealthlex: 'Yıllık abonelik',
      row5ValCards: 'Abonelik / Saatlerce deste hazırlığı',
      row5ValNotes: 'Ücretsiz (Zaman maliyeti yüksek)',
      row6: '2 hafta sonra hatırlama oranı'
    },
    pricing: {
      eyebrow: 'Fiyatlandırma',
      title: 'Yıllık Pro Üyelik',
      badge: 'YILLIK TAM ERİŞİM',
      topline: 'Tek bir yıllık plan ile tüm Latince tıp kütüphanesine ve interaktif modüllere sınırsız erişim.',
      planTitle: 'Annual Pro Membership',
      period: 'yıllık faturalandırılır',
      features: (totalMorphemes) => [
        { active: true, text: `10 kategorinin tamamı + ${totalMorphemes}'den fazla morfem kütüphanesi` },
        { active: true, text: '4 oyun modunun tamamı (Bilgi Kartları, Eşleştirme, Quiz, Morfem Oyunu)' },
        { active: true, text: 'İlerleme istatistikleri ve seviye sistemi' },
        { active: true, text: 'TR ⟷ EN çift dil desteği' },
        { active: true, text: 'Gelecek tüm yeni modüller ve güncellemeler dahil' },
        { active: true, text: 'İstediğiniz zaman tek tıkla iptal etme özgürlüğü' }
      ],
      btnText: 'Hemen Katıl',
      flowLine: 'Ödemeni yap → hesabın anında açılsın → 2 dakika sonra ilk kategorindesin. Abonelik her yıl otomatik yenilenir, dilediğin an iptal edebilirsin.',
      guaranteeLine: 'Tüm modüller, sınavlar ve güncellemeler tek üyelikle elinizin altında.'
    },
    footer: {
      term: 'STERNO · CLEIDO · MASTOIDEUS',
      meanings: [
        'sterno = Göğüs kemiği',
        'cleido = Köprücük kemiği',
        'mastoid = Kulak arkasındaki çıkıntı'
      ],
      punch: 'Bu sayfaya girmeden önce bu terimi anlamlandıramıyor olabilirdiniz. Şimdi bir arkadaşınıza gönderin — bakalım o çözebilecek mi?',
      ctaBtn: 'Tüm Terimlerin Kilidini Aç',
      meta: 'HealthLexMed — Latince tıp terimlerini kök mantığıyla ve oyunlaştırarak öğreten eğitim platformu.',
      links: {
        contact: 'İletişim & Destek',
        terms: 'Kullanım Koşulları',
        privacy: 'Gizlilik Politikası',
        refund: 'İptal ve İade'
      },
      supportEmail: 'help@healthlexmed.com',
      slaNotice: 'Taleplerinize 24-48 saat içinde dönüş sağlanır.'
    }
  },
  en: {
    hero: {
      title1: "Don't memorize.",
      title2: 'Solve.',
      sub: (termCount) => (
        <>
          Every Latin medical term consists of 2–3 parts. Learn the parts; read <strong className="text-foreground font-bold">{termCount}+</strong> terms without memorizing, and remember them even 2 weeks after the exam.
        </>
      ),
      ctaBtn: 'Unlock All Terms',
      micro1: '✓ Annual subscription',
      micro2: '✓ TR ⟷ EN',
      scrollProof: '↓ Proof first: Solve your first term in 20 seconds.'
    },
    demo: {
      label: 'Even if you have never seen this term before, you can solve it:',
      hint: 'Tap the parts to reveal their meanings.',
      nextBtn: 'Next Term →',
      finalMsg: (termCount, totalMorphemes) => (
        <>
          <strong className="text-foreground">You solved 3 terms without memorizing!</strong> Inside, {termCount}+ terms and {totalMorphemes}+ morphemes are waiting for you.
        </>
      ),
      finalBtn: 'Unlock All Terms'
    },
    problem: {
      eyebrow: 'The Problem',
      title: 'Remember the night before the exam?',
      p1: (
        <>
          A 40-page list of bones in front of you. You wrote <span className="font-semibold text-foreground">Sustentaculum tali</span> ten times; on the eleventh, you're checking your notes again. It appears on the exam in the morning, you remember it. Two weeks later in the clinic, the same term comes up; not a single letter in your head.
        </>
      ),
      punch: "The problem isn't you, it's the method: A term memorized without understanding is only a temporary guest in short-term memory.",
      wave: 'Duolingo proved that language learning can be gamified. Why is Latin medical terminology still rote list memorization?'
    },
    method: {
      eyebrow: 'Method',
      title: 'One simple logic: Break down, understand, combine.',
      step1No: 'STEP 1',
      step1Title: 'Break down',
      step1Ex: 'CARDIOMYOPATHY → CARDIO · MYO · PATHY',
      step1Desc: 'Every term is divided into building blocks called morphemes.',
      step2No: 'STEP 2',
      step2Title: 'Understand',
      step2Ex: 'HEART · MUSCLE · DISEASE',
      step2Desc: (termCount) => `Each part has a single meaning and repeats across ${termCount}+ terms.`,
      step3No: 'STEP 3',
      step3Title: 'Combine',
      step3Ex: '= HEART MUSCLE DISEASE',
      step3Desc: 'The term is now in your memory. No need to look at a list again.',
      logicClose: (totalMorphemes) => `When you learn ${totalMorphemes}+ morphemes, you can easily read even terms you've never seen before. Memorization gives you a list; logic gives you medical language.`
    },
    features: {
      eyebrow: "What's Inside?",
      title: 'HealthLexMed in Numbers',
      terms: 'Terms',
      morphemes: 'Morphemes',
      categories: 'Categories',
      modes: 'Game Modes',
      languages: 'Languages (TR·EN)',
      game1Title: 'FLASHCARDS',
      game1Desc: 'See the term, recall the meaning, and flip the card. The power of active recall.',
      game2Title: 'MATCHING',
      game2Desc: 'Match Latin terms with their meanings against the clock. Beat your own record.',
      game3Title: 'QUIZ',
      game3Desc: 'Dynamic category-specific questions. Distractors are regenerated for each quiz.',
      game4Title: 'MORPHEME GAME',
      game4Desc: 'Combine prefixes and roots to build the term — the complete version of the demo above.',
      scopeLine: 'Scope: Bones, joints, and movement terms from the skull to the ankle — organized category by category.'
    },
    testimonials: {
      eyebrow: 'Feedback',
      title: 'What Do Students Say?',
      q1Text: '"While chasing my own record in the matching game, I realized I had learned 60 terms without even noticing."',
      q1Who: 'F. — Physiotherapy, 2nd Year',
      q2Text: '"Preparing decks in Anki left no time for actual studying. Here, I just jump straight into learning."',
      q2Who: 'M. — Medicine, 1st Year',
      q3Text: '"After the morpheme game, whatever the professor asks in spot exams, I break it down and solve it immediately."',
      q3Who: 'Z. — Nursing, 1st Year'
    },
    comparison: {
      eyebrow: 'Alternatives',
      title: 'Why Not Anki or Quizlet?',
      thFeature: 'Feature',
      thHealthlex: 'HealthLexMed',
      thCards: 'General Flashcard Apps\n(Anki, Quizlet)',
      thNotes: 'PDF & Lecture Notes',
      row1: 'Engine that breaks terms into root components',
      row2: 'Pre-loaded medical anatomy content',
      row3: 'Bilingual support (TR ⟷ EN)',
      row4: '4 medical-specific gamified study modes',
      row5: 'Pricing Model',
      row5ValHealthlex: 'Annual subscription',
      row5ValCards: 'Subscription / Hours of deck creation',
      row5ValNotes: 'Free (High time cost)',
      row6: 'Retention rate 2 weeks after the exam'
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'Annual Pro Membership',
      badge: 'FULL ANNUAL ACCESS',
      topline: 'One single annual plan with unlimited access to the entire Latin medical terminology library and interactive modules.',
      planTitle: 'Annual Pro Membership',
      period: 'billed annually',
      features: (totalMorphemes) => [
        { active: true, text: `All 10 categories + over ${totalMorphemes} morpheme library` },
        { active: true, text: 'All 4 game modes (Flashcards, Matching, Quiz, Morpheme Game)' },
        { active: true, text: 'Progress statistics and leveling system' },
        { active: true, text: 'TR ⟷ EN bilingual support' },
        { active: true, text: 'All upcoming modules and updates included' },
        { active: true, text: 'Cancel anytime with one click' }
      ],
      btnText: 'Subscribe Now',
      flowLine: 'Complete payment → your account unlocks immediately → start your first category in 2 minutes. Renews automatically annually, cancel anytime.',
      guaranteeLine: 'All modules, quizzes, and future updates in one single membership.'
    },
    footer: {
      term: 'STERNO · CLEIDO · MASTOIDEUS',
      meanings: [
        'sterno = Breastbone / Sternum',
        'cleido = Collarbone / Clavicle',
        'mastoid = Mastoid process behind ear'
      ],
      punch: 'Before visiting this page, this term might have looked confusing. Now send it to a friend — see if they can solve it!',
      ctaBtn: 'Unlock All Terms',
      meta: 'HealthLexMed — Educational platform teaching Latin medical terminology through root logic and gamification.',
      links: {
        contact: 'Contact & Support',
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
        refund: 'Refund Policy'
      },
      supportEmail: 'help@healthlexmed.com',
      slaNotice: 'Requests are replied within 24-48 hours.'
    }
  }
};
