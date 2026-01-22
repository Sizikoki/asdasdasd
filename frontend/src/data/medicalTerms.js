// Medical Terminology Data - Extracted from PDFs

// Main Categories for sidebar navigation
export const mainCategories = [
  { id: 'prefixes', name: 'Ön Ekler' },
  { id: 'roots', name: 'Kökler' },
  { id: 'suffixes', name: 'Son Ekler' }
];

// Body Systems as subcategories under each main category
export const bodySystems = [
  { id: 'movement', name: 'Hareket Sistemi' },
  { id: 'respiratory', name: 'Solunum Sistemi' },
  { id: 'skin', name: 'Deri Sistemi' },
  { id: 'circulatory', name: 'Dolaşım Sistemi' },
  { id: 'sensory', name: 'Duyu Organları' },
  { id: 'endocrine', name: 'Endokrin Sistemi' },
  { id: 'pharmacology', name: 'Farmakoloji' },
  { id: 'general', name: 'Genel Terimler' },
  { id: 'blood', name: 'Kan ve Bağışıklık' },
  { id: 'oncology', name: 'Onkoloji' },
  { id: 'radiology', name: 'Radyoloji' },
  { id: 'digestive', name: 'Sindirim Sistemi' },
  { id: 'urinary', name: 'Üriner Sistem' },
  { id: 'reproductive', name: 'Üreme Sistemi' },
  { id: 'nervous', name: 'Sinir Sistemi' }
];

// Legacy categories for backward compatibility
export const categories = [
  { id: 'anatomy', name: 'Anatomik Terimler', icon: 'Bone', color: 'primary' },
  { id: 'surgery', name: 'Ameliyat Terimleri', icon: 'Scissors', color: 'secondary' },
  { id: 'roots', name: 'Kökler ve Ekler', icon: 'BookOpen', color: 'accent' },
  { id: 'pathology', name: 'Semptomlar ve Patoloji', icon: 'Activity', color: 'success' }
];

// Subcategories organized by body system
export const subcategoriesBySystem = {
  movement: [
    { id: 'bone_structures', name: 'Kemik / İskelet Yapıları' },
    { id: 'joint_structures', name: 'Eklem Yapıları ve İlişkili Anatomik Alanlar' },
    { id: 'muscle_structures', name: 'Kas ve Kasla İlişkili Yapılar' },
    { id: 'tissue_components', name: 'Doku / Yapısal Bileşenler' },
    { id: 'regional_anatomy', name: 'Organ / Bölgesel Anatomik Alanlar' },
    { id: 'physiological_functional', name: 'Fizyolojik / Fonksiyonel Kökler' },
    { id: 'pathological_conditions', name: 'Patolojik Durum Kökleri' },
    { id: 'anatomy', name: 'Anatomi' },
    { id: 'support', name: 'Destek Dokuları' },
    { id: 'joints', name: 'Eklemler & Hareket' }
  ],
  respiratory: [
    { id: 'respiratory_organs', name: 'Solunum Organları ve Yapıları' },
    { id: 'nasal_structures', name: 'Üst Solunum Yolu – Nazal Yapılar' },
    { id: 'thoracic_areas', name: 'Göğüs ve İlişkili Anatomik Alanlar' },
    { id: 'glands_structures', name: 'Bezler ve Yapısal Bileşenler' },
    { id: 'respiratory_mechanics', name: 'Solunum Mekaniği ile İlişkili Yapılar' },
    { id: 'physiological_functional', name: 'Fizyolojik / Fonksiyonel Kökler' },
    { id: 'anatomy', name: 'Anatomi' }
  ],
  skin: [
    { id: 'skin_structures_lesions', name: 'Deri, Ekleri ve Lezyon Tipleri' },
    { id: 'skin_functions_physiology', name: 'Deri İşlevleri ve Fizyolojisi' },
    { id: 'skin_diseases_pathology', name: 'Deri Hastalıkları ve Patolojik Süreçler' },
    { id: 'dermatologic_diagnosis_treatment', name: 'Dermatolojik Tanı ve Tedavi Yöntemleri' },
    { id: 'anatomy', name: 'Anatomi' }
  ],
  circulatory: [
    { id: 'heart_chambers', name: 'Kalp ve Kalp Bölümleri' },
    { id: 'vessels_structures', name: 'Damarlar ve Damar Yapıları' },
    { id: 'physiological_functional', name: 'Fizyolojik / Fonksiyonel Kökler' },
    { id: 'pathological_conditions', name: 'Patolojik Durum Kökleri' },
    { id: 'diagnostic_imaging', name: 'Tanı – Görüntüleme Kökleri' },
    { id: 'anatomy', name: 'Anatomi' }
  ],
  sensory: [
    { id: 'eye_globe_structures', name: 'Göz Küresi ve Yardımcı Yapılar' },
    { id: 'vision_eye_movements', name: 'Görme İşlevi ve Göz Hareketleri' },
    { id: 'vision_loss_diseases', name: 'Görme Kaybı ve Göz Hastalıkları' },
    { id: 'examination_surgical', name: 'Göz Muayenesi ve Cerrahi İşlemler' },
    { id: 'ear_structures', name: 'Kulak Yapıları ve İşitme Yolu' },
    { id: 'hearing_balance_sound', name: 'İşitme, Denge ve Ses İletimi' },
    { id: 'hearing_loss_diseases', name: 'İşitme Kaybı ve Kulak Hastalıkları' },
    { id: 'ear_examination_surgical', name: 'Kulak Muayenesi ve Cerrahi İşlemler' },
    { id: 'smell_taste_structures', name: 'Koku ve Tat Alma Yapıları' },
    { id: 'smell_taste_perception', name: 'Koku ve Tat Algısı' },
    { id: 'smell_taste_disorders', name: 'Koku ve Tat Bozuklukları' },
    { id: 'anatomy', name: 'Anatomi' }
  ],
  endocrine: [
    { id: 'endocrine_glands_organs', name: 'Endokrin Bezler ve Organlar' },
    { id: 'hormones_metabolic_controls', name: 'Hormonlar ve Metabolik Kontroller' },
    { id: 'endocrine_clinical_manifestations', name: 'Endokrin Bozuklukların Klinik Görünümleri' },
    { id: 'anatomy', name: 'Anatomi' }
  ],
  pharmacology: [
    { id: 'general', name: 'Genel' }
  ],
  general: [
    { id: 'general', name: 'Genel' }
  ],
  blood: [
    { id: 'anatomy', name: 'Anatomi' }
  ],
  oncology: [
    { id: 'general', name: 'Genel' }
  ],
  radiology: [
    { id: 'general', name: 'Genel' }
  ],
  digestive: [
    { id: 'digestive_organs', name: 'Sindirim ve İlişkili Organlar' },
    { id: 'liver_bile_pancreas', name: 'Karaciğer – Safra – Pankreas' },
    { id: 'abdomen_peritoneum', name: 'Karın – Periton – İlişkili Yapılar' },
    { id: 'other_anatomical', name: 'Diğer Anatomik Yapılar' },
    { id: 'physiological_functional', name: 'Fizyolojik / Fonksiyonel Kökler' },
    { id: 'pathological_clinical', name: 'Patolojik Durum / Klinik Hal Kökleri' },
    { id: 'diagnostic_imaging', name: 'Tanı – Görüntüleme – Ölçüm Kökleri' },
    { id: 'biochemical_content', name: 'Madde / İçerik / Biyokimyasal Kökler' },
    { id: 'blood_stool_secretion', name: 'Kan – Dışkı – Salgı İlişkili Kökler' },
    { id: 'other_clinical', name: 'Diğer Klinik / Yardımcı Kökler' },
    { id: 'anatomy', name: 'Anatomi' }
  ],
  urinary: [
    { id: 'anatomical_structures', name: 'Anatomik Yapı Kökleri' },
    { id: 'physiological_functional', name: 'Fizyolojik / Fonksiyonel Kökler' },
    { id: 'pathological_urine_content', name: 'Patolojik İçerik / İdrarda Bulunan Maddeler' },
    { id: 'pathological_formations', name: 'Patolojik Oluşumlar' },
    { id: 'clinical_symptoms', name: 'Klinik Durum / Semptom Kökleri' },
    { id: 'treatment_procedures', name: 'Tedavi / İşlem / Fonksiyon Kökleri' },
    { id: 'anatomy', name: 'Anatomi' }
  ],
  reproductive: [
    { id: 'female_organs', name: 'Kadın Üreme Organları' },
    { id: 'male_organs', name: 'Erkek Üreme Organları' },
    { id: 'gametes_secretions', name: 'Gametler, Salgılar ve Döngüler' },
    { id: 'clinical_conditions', name: 'Klinik Durumlar ve İşlev Bozuklukları' },
    { id: 'diagnostic_surgical', name: 'Tanı, İşlem ve Cerrahi Girişimler' },
    { id: 'anatomy', name: 'Anatomi' }
  ],
  nervous: [
    { id: 'central_peripheral_structures', name: 'Merkezi ve Çevresel Sinir Yapıları' },
    { id: 'mental_sensory_functions', name: 'Zihinsel Süreçler ve Duyusal İşlevler' },
    { id: 'motor_autonomic_functions', name: 'Motor (Hareket) ve Otonom İşlevler' },
    { id: 'neurological_disease_mechanisms', name: 'Nörolojik Hastalık Mekanizmaları' },
    { id: 'psychiatric_mood_disorders', name: 'Psikiyatrik Durumlar ve Duygulanım Bozuklukları' },
    { id: 'diagnostic_interventional', name: 'Nörolojik Tanı ve Girişimsel Yöntemler' },
    { id: 'anatomy', name: 'Anatomi' }
  ]
};

export const medicalTermsData = {
  anatomy: [
    { id: 1, term: 'Abductor', turkish: 'Uzaklaştırıcı Kas', roots: 'ab- (uzak) + ducere (götürmek)', definition: 'Vücut parçasını orta hattan uzaklaştıran kas', category: 'anatomy', system: 'movement', subcategory: 'anatomy' },
    { id: 2, term: 'Acetabular', turkish: 'Asetabular, Kalça Yuvası', roots: 'acetabulum (küçük kase)', definition: 'Kalça kemiğinde femur başını alan yuva ile ilgili', category: 'anatomy', system: 'movement', subcategory: 'anatomy' },
    { id: 3, term: 'Acromioclavicular', turkish: 'Akromiyoklaviküler', roots: 'acromion (omuz ucu) + clavicula (köprücük kemiği)', definition: 'Kürek kemiği çıkıntısı ile köprücük kemiği arasındaki eklem', category: 'anatomy', system: 'movement', subcategory: 'joints' },
    { id: 4, term: 'Adductor', turkish: 'Yaklaştırıcı Kas', roots: 'ad- (yakın) + ducere (götürmek)', definition: 'Vücut parçasını orta hatta yaklaştıran kas', category: 'anatomy', system: 'movement', subcategory: 'anatomy' },
    { id: 5, term: 'Articular Cartilage', turkish: 'Eklem Kıkırdağı', roots: 'articularis (eklem) + cartilago (kıkırdak)', definition: 'Kemiklerin eklem yüzeylerini kaplayan düz doku', category: 'anatomy', system: 'movement', subcategory: 'support' },
    { id: 6, term: 'Brachial', turkish: 'Brakial, Kol Kemiğine Ait', roots: 'brachium (kol)', definition: 'Omuz ile dirsek arasındaki üst kol bölgesi', category: 'anatomy' },
    { id: 7, term: 'Calcaneal', turkish: 'Kalkaneal, Topuk Kemiğine Ait', roots: 'calcaneus (topuk kemiği)', definition: 'Ayaktaki topuk kemiği ile ilgili', category: 'anatomy' },
    { id: 8, term: 'Carpal', turkish: 'Karpal, El Bileği Kemiğine Ait', roots: 'carpos (bilek)', definition: 'El bileğindeki kemikler ile ilgili', category: 'anatomy' },
    { id: 9, term: 'Cervical', turkish: 'Servikal, Boyun Omurlarına Ait', roots: 'cervix (boyun)', definition: 'Boyun bölgesi omurları ile ilgili', category: 'anatomy' },
    { id: 10, term: 'Chondrocyte', turkish: 'Kondrosit, Kıkırdak Hücresi', roots: 'chondros (kıkırdak) + kytos (hücre)', definition: 'Kıkırdak dokusunda bulunan olgun hücre', category: 'anatomy' },
    { id: 11, term: 'Clavicular', turkish: 'Klavikular, Köprücük Kemiğine Ait', roots: 'clavicula (köprücük kemiği)', definition: 'Köprücük kemiği ile ilgili', category: 'anatomy' },
    { id: 12, term: 'Coccygeal', turkish: 'Kokigeal, Kuyruk Sokumu Kemiğine Ait', roots: 'coccyx (kuyruk sokumu)', definition: 'Omurganın tabanındaki kuyruk sokumu kemiği', category: 'anatomy' },
    { id: 13, term: 'Costal', turkish: 'Kostal, Kaburgaya Ait', roots: 'costa (kaburga)', definition: 'Kaburgalar ile ilgili', category: 'anatomy' },
    { id: 14, term: 'Femoral', turkish: 'Femoral, Uyluk Kemiğine Ait', roots: 'femur (uyluk kemiği)', definition: 'Uyluk kemiği ile ilgili', category: 'anatomy' },
    { id: 15, term: 'Fibular', turkish: 'Fibular, Baldır Kemiğine Ait', roots: 'fibula (baldır kemiği)', definition: 'Alt bacaktaki ince kemik ile ilgili', category: 'anatomy' },
    { id: 16, term: 'Humeral', turkish: 'Humerus, Kol Kemiğine Ait', roots: 'humerus (üst kol kemiği)', definition: 'Üst kol kemiği ile ilgili', category: 'anatomy' },
    { id: 17, term: 'Lumbar', turkish: 'Lomber, Bel Omurlarına Ait', roots: 'lumbus (bel)', definition: 'Alt sırt bölgesi omurları ile ilgili', category: 'anatomy' },
    { id: 18, term: 'Patellar', turkish: 'Patelar, Diz Kapağı Kemiğine Ait', roots: 'patella (diz kapağı)', definition: 'Diz kapağı ile ilgili', category: 'anatomy' },
    { id: 19, term: 'Thoracic', turkish: 'Torasik, Göğüs Kafesine Ait', roots: 'thorax (göğüs)', definition: 'Göğüs bölgesi omurları ile ilgili', category: 'anatomy' },
    { id: 20, term: 'Vertebral', turkish: 'Vertebral, Omurlara Ait', roots: 'vertebra (omur)', definition: 'Omurga kemikleri ile ilgili', category: 'anatomy' }
  ],
  surgery: [
    { id: 21, term: 'Arthrodesis', turkish: 'Eklem Dondurma', roots: 'arthr- (eklem) + -desis (birleştirme)', definition: 'Bir eklemde iki veya daha fazla kemiği kaynaştırma ameliyatı', category: 'surgery' },
    { id: 22, term: 'Arthroplasty', turkish: 'Eklem Plastisi/Onarımı', roots: 'arthr- (eklem) + -plasty (şekillendirme)', definition: 'Eklemin cerrahi olarak onarımı veya değiştirilmesi', category: 'surgery' },
    { id: 23, term: 'Arthrotomy', turkish: 'Eklem Açılması', roots: 'arthr- (eklem) + -tomy (kesme)', definition: 'Ekleme cerrahi kesi yapılması', category: 'surgery' },
    { id: 24, term: 'Bursectomy', turkish: 'Bursektomi/Kavuk Çıkarma', roots: 'burs- (kese) + -ectomy (çıkarma)', definition: 'Bursa kesesinin cerrahi olarak çıkarılması', category: 'surgery' },
    { id: 25, term: 'Carpectomy', turkish: 'Karpal Kemiklerin Çıkarılması', roots: 'carp- (bilek) + -ectomy (çıkarma)', definition: 'Bir veya daha fazla el bilek kemiğinin çıkarılması', category: 'surgery' },
    { id: 26, term: 'Cranioplasty', turkish: 'Kafa Plastisi/Onarımı', roots: 'crani- (kafatası) + -plasty (şekillendirme)', definition: 'Kafatasındaki kusurların cerrahi onarımı', category: 'surgery' },
    { id: 27, term: 'Craniotomy', turkish: 'Kafa Açılması', roots: 'crani- (kafatası) + -tomy (kesme)', definition: 'Beyne ulaşmak için kafatasına cerrahi kesi', category: 'surgery' },
    { id: 28, term: 'Fasciectomy', turkish: 'Fasiya Çıkarma', roots: 'fasci- (bağ) + -ectomy (çıkarma)', definition: 'Fasyaın cerrahi olarak çıkarılması', category: 'surgery' },
    { id: 29, term: 'Fasciorraphy', turkish: 'Fasiya Dikimi', roots: 'fasci- (bağ) + -rrhaphy (dikme)', definition: 'Fasyaın cerrahi olarak dikilmesi', category: 'surgery' },
    { id: 30, term: 'Osteoclasis', turkish: 'Kemiğin Kırılması (Cerrahi)', roots: 'oste- (kemik) + -clasis (kırma)', definition: 'Kemiğin cerrahi olarak yeniden kırılması', category: 'surgery' },
    { id: 31, term: 'Patellapexy', turkish: 'Diz Kapağının Sabitlenmesi', roots: 'patella- (diz kapağı) + -pexy (sabitleme)', definition: 'Diz kapağının cerrahi olarak sabitlenmesi', category: 'surgery' },
    { id: 32, term: 'Synovectomy', turkish: 'Sinoviyal Zar Çıkarma', roots: 'synovi- (eklem zarı) + -ectomy (çıkarma)', definition: 'Eklemi döşeyen sinoviyal zarın çıkarılması', category: 'surgery' },
    { id: 33, term: 'Tenodesis', turkish: 'Tendon Dikimi/Sabitleme', roots: 'ten- (tendon) + -odesis (birleştirme)', definition: 'Tendonun kemiğe cerrahi olarak tutturulması', category: 'surgery' },
    { id: 34, term: 'Tenotomy', turkish: 'Tendon Kesilmesi', roots: 'ten- (tendon) + -tomy (kesme)', definition: 'Tendonun cerrahi olarak kesilmesi veya uzatılması', category: 'surgery' }
  ],
  roots: [
    // Kemik / İskelet Yapıları - Hareket Sistemi
    { id: 1001, term: 'Acetabul/o', turkish: 'Kalça çukuru', roots: 'acetabul/o', definition: 'Kalça kemiğinde femur başını alan çukur', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1002, term: 'Acromi/o', turkish: 'Omuz çıkıntısı', roots: 'acromi/o', definition: 'Kürek kemiğinin omuz ucundaki çıkıntı', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1003, term: 'Calcane/o', turkish: 'Topuk kemiği', roots: 'calcane/o', definition: 'Ayağın topuk kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1004, term: 'Carp/o', turkish: 'El bileği', roots: 'carp/o', definition: 'El bileği kemikleri', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1005, term: 'Cephal/o', turkish: 'Baş, kafa', roots: 'cephal/o', definition: 'Baş veya kafa ile ilgili', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1006, term: 'Clavicul/o', turkish: 'Köprücük kemiği', roots: 'clavicul/o', definition: 'Köprücük kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1007, term: 'Coccyg/o', turkish: 'Kuyruk sokumu', roots: 'coccyg/o', definition: 'Omurganın en alt kısmındaki kuyruk sokumu kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1008, term: 'Cost/o', turkish: 'Kaburga', roots: 'cost/o', definition: 'Kaburga kemikleri', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1009, term: 'Crani/o', turkish: 'Kafatası', roots: 'crani/o', definition: 'Kafatası kemikleri', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1010, term: 'Femor/o', turkish: 'Uyluk kemiği', roots: 'femor/o', definition: 'Uyluk kemiği (femur)', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1011, term: 'Fibul/o', turkish: 'İnce baldır kemiği', roots: 'fibul/o', definition: 'Alt bacaktaki ince kemik (fibula)', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1012, term: 'Front/o', turkish: 'Alın', roots: 'front/o', definition: 'Alın kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1013, term: 'Glen/o', turkish: 'Eklem çukuru', roots: 'glen/o', definition: 'Eklem çukuru (özellikle omuz)', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1014, term: 'Humer/o', turkish: 'Kol kemiği', roots: 'humer/o', definition: 'Üst kol kemiği (humerus)', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1015, term: 'Ischi/o', turkish: 'Oturma kemiği', roots: 'ischi/o', definition: 'Kalça kemiğinin alt kısmı (ischium)', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1016, term: 'Ili/o', turkish: 'Kalça kemiği', roots: 'ili/o', definition: 'Kalça kemiğinin üst kısmı (ilium)', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1017, term: 'Lumb/o', turkish: 'Bel', roots: 'lumb/o', definition: 'Bel bölgesi omurları', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1018, term: 'Malleol/o', turkish: 'Ayak bileği çıkıntısı', roots: 'malleol/o', definition: 'Ayak bileğindeki kemik çıkıntıları', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1019, term: 'Mandibul/o', turkish: 'Alt çene', roots: 'mandibul/o', definition: 'Alt çene kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1020, term: 'Maxill/o', turkish: 'Üst çene', roots: 'maxill/o', definition: 'Üst çene kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1021, term: 'Metacarp/o', turkish: 'El ayası kemikleri', roots: 'metacarp/o', definition: 'El ayasındaki kemikler', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1022, term: 'Metatars/o', turkish: 'Ayak ayası kemikleri', roots: 'metatars/o', definition: 'Ayak ayasındaki kemikler', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1023, term: 'Occipit/o', turkish: 'Ense kemiği', roots: 'occipit/o', definition: 'Kafatasının arka kısmındaki kemik', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1024, term: 'Olecran/o', turkish: 'Dirsek çıkıntısı', roots: 'olecran/o', definition: 'Dirsekteki kemik çıkıntısı', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1025, term: 'Osse/o – Oste/o', turkish: 'Kemik', roots: 'osse/o, oste/o', definition: 'Kemik dokusu', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1026, term: 'Patell/o', turkish: 'Diz kapağı', roots: 'patell/o', definition: 'Diz kapağı kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1027, term: 'Pelv/o', turkish: 'Leğen kemiği', roots: 'pelv/o', definition: 'Leğen kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1028, term: 'Phalang/o', turkish: 'Parmak kemiği', roots: 'phalang/o', definition: 'El ve ayak parmak kemikleri', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1029, term: 'Pub/o', turkish: 'Kasık kemiği', roots: 'pub/o', definition: 'Leğen kemiğinin ön kısmı', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1030, term: 'Radi/o', turkish: 'Çemberli kemik (radius)', roots: 'radi/o', definition: 'Ön kolun başparmak tarafındaki kemik', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1031, term: 'Sacr/o', turkish: 'Kuyruk sokumu üstü', roots: 'sacr/o', definition: 'Omurganın alt kısmındaki üçgen kemik', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1032, term: 'Scapul/o', turkish: 'Kürek kemiği', roots: 'scapul/o', definition: 'Sırt üst kısmındaki kürek kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1033, term: 'Sphen/o', turkish: 'Kama kemiği', roots: 'sphen/o', definition: 'Kafatasında kama şeklindeki kemik', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1034, term: 'Spondyl/o', turkish: 'Omur', roots: 'spondyl/o', definition: 'Omurga kemikleri', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1035, term: 'Stern/o', turkish: 'Göğüs kemiği', roots: 'stern/o', definition: 'Göğsün ortasındaki düz kemik', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1036, term: 'Tempor/o', turkish: 'Şakak', roots: 'tempor/o', definition: 'Kafatasının yan kısmındaki kemik', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1037, term: 'Tibi/o', turkish: 'Kaval kemiği', roots: 'tibi/o', definition: 'Alt bacağın kalın kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1038, term: 'Uln/o', turkish: 'Dirsek kemiği (ulna)', roots: 'uln/o', definition: 'Ön kolun serçe parmak tarafındaki kemik', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1039, term: 'Vertebr/o', turkish: 'Omur', roots: 'vertebr/o', definition: 'Omurga kemikleri', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1040, term: 'Xiph/o', turkish: 'Kılıç çıkıntısı', roots: 'xiph/o', definition: 'Göğüs kemiğinin alt ucundaki çıkıntı', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },
    { id: 1041, term: 'Zygomat/o', turkish: 'Elmacık kemiği', roots: 'zygomat/o', definition: 'Yanaklardaki elmacık kemiği', category: 'roots', system: 'movement', subcategory: 'bone_structures', mainCategory: 'roots' },

    // Eklem Yapıları ve İlişkili Anatomik Alanlar - Hareket Sistemi
    { id: 1042, term: 'Arthr/o', turkish: 'Eklem', roots: 'arthr/o', definition: 'Eklem yapısı', category: 'roots', system: 'movement', subcategory: 'joint_structures', mainCategory: 'roots' },
    { id: 1043, term: 'Articul/o', turkish: 'Eklem', roots: 'articul/o', definition: 'Eklem, eklemleşme', category: 'roots', system: 'movement', subcategory: 'joint_structures', mainCategory: 'roots' },
    { id: 1044, term: 'Burs/o', turkish: 'Bursa (eklem kesesi)', roots: 'burs/o', definition: 'Eklemlerde sürtünmeyi azaltan sıvı dolu kese', category: 'roots', system: 'movement', subcategory: 'joint_structures', mainCategory: 'roots' },
    { id: 1045, term: 'Synovi/o', turkish: 'Sinoviyal (eklem zarı)', roots: 'synovi/o', definition: 'Eklemleri döşeyen ve eklem sıvısı üreten zar', category: 'roots', system: 'movement', subcategory: 'joint_structures', mainCategory: 'roots' },

    // Kas ve Kasla İlişkili Yapılar - Hareket Sistemi
    { id: 1046, term: 'Brachi/o', turkish: 'Kol', roots: 'brachi/o', definition: 'Kol bölgesi', category: 'roots', system: 'movement', subcategory: 'muscle_structures', mainCategory: 'roots' },
    { id: 1047, term: 'Muscul/o', turkish: 'Kas', roots: 'muscul/o', definition: 'Kas dokusu', category: 'roots', system: 'movement', subcategory: 'muscle_structures', mainCategory: 'roots' },
    { id: 1048, term: 'My/o', turkish: 'Kas', roots: 'my/o', definition: 'Kas yapısı', category: 'roots', system: 'movement', subcategory: 'muscle_structures', mainCategory: 'roots' },
    { id: 1049, term: 'Myos/o', turkish: 'Kas', roots: 'myos/o', definition: 'Kas dokusu', category: 'roots', system: 'movement', subcategory: 'muscle_structures', mainCategory: 'roots' },
    { id: 1050, term: 'Tendin/o – Ten/o', turkish: 'Tendon (kas kirişi)', roots: 'tendin/o, ten/o', definition: 'Kasları kemiklere bağlayan bağ dokusu', category: 'roots', system: 'movement', subcategory: 'muscle_structures', mainCategory: 'roots' },
    { id: 1051, term: 'Tenosynovi/o', turkish: 'Tendon kılıfı', roots: 'tenosynovi/o', definition: 'Tendonları saran koruyucu kılıf', category: 'roots', system: 'movement', subcategory: 'muscle_structures', mainCategory: 'roots' },
    { id: 1052, term: 'Fasci/o', turkish: 'Fasya (bağ dokusu)', roots: 'fasci/o', definition: 'Kasları ve organları saran bağ dokusu tabakası', category: 'roots', system: 'movement', subcategory: 'muscle_structures', mainCategory: 'roots' },

    // Doku / Yapısal Bileşenler - Hareket Sistemi
    { id: 1053, term: 'Cartilagin/o', turkish: 'Kıkırdak', roots: 'cartilagin/o', definition: 'Kıkırdak dokusu', category: 'roots', system: 'movement', subcategory: 'tissue_components', mainCategory: 'roots' },
    { id: 1054, term: 'Chondr/o', turkish: 'Kıkırdak', roots: 'chondr/o', definition: 'Kıkırdak yapısı', category: 'roots', system: 'movement', subcategory: 'tissue_components', mainCategory: 'roots' },
    { id: 1055, term: 'Fibr/o', turkish: 'Lif, lifli doku', roots: 'fibr/o', definition: 'Lifli bağ dokusu', category: 'roots', system: 'movement', subcategory: 'tissue_components', mainCategory: 'roots' },
    { id: 1056, term: 'Medull/o', turkish: 'İlik, iç kısım', roots: 'medull/o', definition: 'Kemik iliği veya organların iç kısmı', category: 'roots', system: 'movement', subcategory: 'tissue_components', mainCategory: 'roots' },
    { id: 1057, term: 'Myel/o', turkish: 'Kemik iliği, omurilik', roots: 'myel/o', definition: 'Kemik iliği veya omurilik', category: 'roots', system: 'movement', subcategory: 'tissue_components', mainCategory: 'roots' },

    // Organ / Bölgesel Anatomik Alanlar - Hareket Sistemi
    { id: 1058, term: 'Cervic/o', turkish: 'Boyun', roots: 'cervic/o', definition: 'Boyun bölgesi', category: 'roots', system: 'movement', subcategory: 'regional_anatomy', mainCategory: 'roots' },
    { id: 1059, term: 'Facio', turkish: 'Yüz', roots: 'facio', definition: 'Yüz bölgesi', category: 'roots', system: 'movement', subcategory: 'regional_anatomy', mainCategory: 'roots' },
    { id: 1060, term: 'Phren/o', turkish: 'Diyafram', roots: 'phren/o', definition: 'Göğüs ve karın boşluğunu ayıran kas', category: 'roots', system: 'movement', subcategory: 'regional_anatomy', mainCategory: 'roots' },
    { id: 1061, term: 'Thorac/o', turkish: 'Göğüs', roots: 'thorac/o', definition: 'Göğüs bölgesi', category: 'roots', system: 'movement', subcategory: 'regional_anatomy', mainCategory: 'roots' },
    { id: 1062, term: 'Pariet/o', turkish: 'Duvar, cidar', roots: 'pariet/o', definition: 'Vücut boşluklarının duvarı', category: 'roots', system: 'movement', subcategory: 'regional_anatomy', mainCategory: 'roots' },

    // Fizyolojik / Fonksiyonel Kökler - Hareket Sistemi
    { id: 1063, term: 'Kinesi/o', turkish: 'Hareket', roots: 'kinesi/o', definition: 'Hareket, hareket etme', category: 'roots', system: 'movement', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1064, term: 'Ton/o', turkish: 'Basınç, gerilim', roots: 'ton/o', definition: 'Kas tonusu, gerilim, basınç', category: 'roots', system: 'movement', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1065, term: 'Duct/o', turkish: 'Çekmek, iletmek', roots: 'duct/o', definition: 'Çekmek, götürmek, iletmek', category: 'roots', system: 'movement', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1066, term: 'Electr/o', turkish: 'Elektrik', roots: 'electr/o', definition: 'Elektrik, elektriksel aktivite', category: 'roots', system: 'movement', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1067, term: 'Hydr/o', turkish: 'Su', roots: 'hydr/o', definition: 'Su, sıvı', category: 'roots', system: 'movement', subcategory: 'physiological_functional', mainCategory: 'roots' },

    // Patolojik Durum Kökleri - Hareket Sistemi
    { id: 1068, term: 'Ankyl/o', turkish: 'Eğri, bükük', roots: 'ankyl/o', definition: 'Eklem sertliği, eğrilik', category: 'roots', system: 'movement', subcategory: 'pathological_conditions', mainCategory: 'roots' },
    { id: 1069, term: 'Kyph/o', turkish: 'Kambur', roots: 'kyph/o', definition: 'Omurganın öne doğru eğriliği (kamburluk)', category: 'roots', system: 'movement', subcategory: 'pathological_conditions', mainCategory: 'roots' },
    { id: 1070, term: 'Lord/o', turkish: 'Çukurlaşmış', roots: 'lord/o', definition: 'Omurganın içe doğru eğriliği', category: 'roots', system: 'movement', subcategory: 'pathological_conditions', mainCategory: 'roots' },
    { id: 1071, term: 'Scoli/o', turkish: 'Eğri', roots: 'scoli/o', definition: 'Omurganın yana doğru eğriliği (skolyoz)', category: 'roots', system: 'movement', subcategory: 'pathological_conditions', mainCategory: 'roots' },
    { id: 1072, term: 'Orth/o', turkish: 'Düz, doğru', roots: 'orth/o', definition: 'Düz, doğru, normal pozisyon', category: 'roots', system: 'movement', subcategory: 'pathological_conditions', mainCategory: 'roots' },
    { id: 1073, term: 'Rhabd/o', turkish: 'Çubuk şeklinde', roots: 'rhabd/o', definition: 'Çubuk şeklinde, çizgili kas', category: 'roots', system: 'movement', subcategory: 'pathological_conditions', mainCategory: 'roots' },

    // Solunum Organları ve Yapıları - Solunum Sistemi
    { id: 1074, term: 'Alveol/o', turkish: 'Alveoller', roots: 'alveol/o', definition: 'Akciğerlerdeki hava keseleri', category: 'roots', system: 'respiratory', subcategory: 'respiratory_organs', mainCategory: 'roots' },
    { id: 1075, term: 'Bronchi/o', turkish: 'Bronş', roots: 'bronchi/o', definition: 'Ana hava yolları', category: 'roots', system: 'respiratory', subcategory: 'respiratory_organs', mainCategory: 'roots' },
    { id: 1076, term: 'Bronch/o', turkish: 'Bronş', roots: 'bronch/o', definition: 'Ana hava yolları', category: 'roots', system: 'respiratory', subcategory: 'respiratory_organs', mainCategory: 'roots' },
    { id: 1077, term: 'Bronchiol/o', turkish: 'Bronşioller', roots: 'bronchiol/o', definition: 'Küçük hava yolları', category: 'roots', system: 'respiratory', subcategory: 'respiratory_organs', mainCategory: 'roots' },
    { id: 1078, term: 'Laryng/o', turkish: 'Larenks', roots: 'laryng/o', definition: 'Gırtlak, ses kutusu', category: 'roots', system: 'respiratory', subcategory: 'respiratory_organs', mainCategory: 'roots' },
    { id: 1079, term: 'Pharyng/o', turkish: 'Farenks', roots: 'pharyng/o', definition: 'Yutak', category: 'roots', system: 'respiratory', subcategory: 'respiratory_organs', mainCategory: 'roots' },
    { id: 1080, term: 'Trache/o', turkish: 'Trakea', roots: 'trache/o', definition: 'Soluk borusu', category: 'roots', system: 'respiratory', subcategory: 'respiratory_organs', mainCategory: 'roots' },
    { id: 1081, term: 'Pneumon/o', turkish: 'Akciğer', roots: 'pneumon/o', definition: 'Akciğer organı', category: 'roots', system: 'respiratory', subcategory: 'respiratory_organs', mainCategory: 'roots' },
    { id: 1082, term: 'Pulmon/o', turkish: 'Akciğer', roots: 'pulmon/o', definition: 'Akciğer organı', category: 'roots', system: 'respiratory', subcategory: 'respiratory_organs', mainCategory: 'roots' },
    { id: 1083, term: 'Pleur/a', turkish: 'Plevra', roots: 'pleur/a', definition: 'Akciğerleri saran zar', category: 'roots', system: 'respiratory', subcategory: 'respiratory_organs', mainCategory: 'roots' },
    { id: 1084, term: 'Pleur/o', turkish: 'Plevra', roots: 'pleur/o', definition: 'Akciğerleri saran zar', category: 'roots', system: 'respiratory', subcategory: 'respiratory_organs', mainCategory: 'roots' },
    { id: 1085, term: 'Tonsill/o', turkish: 'Bademcikler', roots: 'tonsill/o', definition: 'Boğazdaki lenf dokusu', category: 'roots', system: 'respiratory', subcategory: 'respiratory_organs', mainCategory: 'roots' },

    // Üst Solunum Yolu – Nazal Yapılar - Solunum Sistemi
    { id: 1086, term: 'Nas/o', turkish: 'Burun', roots: 'nas/o', definition: 'Burun yapısı', category: 'roots', system: 'respiratory', subcategory: 'nasal_structures', mainCategory: 'roots' },
    { id: 1087, term: 'Rhin/o', turkish: 'Burun', roots: 'rhin/o', definition: 'Burun yapısı', category: 'roots', system: 'respiratory', subcategory: 'nasal_structures', mainCategory: 'roots' },
    { id: 1088, term: 'Sinus/o', turkish: 'Sinüsler', roots: 'sinus/o', definition: 'Burun çevresindeki hava boşlukları', category: 'roots', system: 'respiratory', subcategory: 'nasal_structures', mainCategory: 'roots' },

    // Göğüs ve İlişkili Anatomik Alanlar - Solunum Sistemi
    { id: 1089, term: 'Thorac/o', turkish: 'Göğüs', roots: 'thorac/o', definition: 'Göğüs bölgesi, toraks', category: 'roots', system: 'respiratory', subcategory: 'thoracic_areas', mainCategory: 'roots' },
    { id: 1090, term: 'Pector/o', turkish: 'Göğüs', roots: 'pector/o', definition: 'Göğüs bölgesi', category: 'roots', system: 'respiratory', subcategory: 'thoracic_areas', mainCategory: 'roots' },
    { id: 1091, term: 'Steth/o', turkish: 'Göğüs', roots: 'steth/o', definition: 'Göğüs bölgesi', category: 'roots', system: 'respiratory', subcategory: 'thoracic_areas', mainCategory: 'roots' },

    // Bezler ve Yapısal Bileşenler - Solunum Sistemi
    { id: 1092, term: 'Adenoid/o', turkish: 'Bezler', roots: 'adenoid/o', definition: 'Bez yapıları, adenoid dokular', category: 'roots', system: 'respiratory', subcategory: 'glands_structures', mainCategory: 'roots' },
    { id: 1093, term: 'Lob/o', turkish: 'Lob', roots: 'lob/o', definition: 'Akciğer lobu, bölüm', category: 'roots', system: 'respiratory', subcategory: 'glands_structures', mainCategory: 'roots' },
    { id: 1094, term: 'Muc/o', turkish: 'Muküs', roots: 'muc/o', definition: 'Muküs, sıvı salgı', category: 'roots', system: 'respiratory', subcategory: 'glands_structures', mainCategory: 'roots' },

    // Solunum Mekaniği ile İlişkili Yapılar - Solunum Sistemi
    { id: 1095, term: 'Phren/o', turkish: 'Diyafragma', roots: 'phren/o', definition: 'Diyafragma kası, solunum kası', category: 'roots', system: 'respiratory', subcategory: 'respiratory_mechanics', mainCategory: 'roots' },

    // Fizyolojik / Fonksiyonel Kökler - Solunum Sistemi
    { id: 1096, term: 'Spir/o', turkish: 'Solunum', roots: 'spir/o', definition: 'Solunum, nefes alma', category: 'roots', system: 'respiratory', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1097, term: 'Ox/o', turkish: 'Oksijen', roots: 'ox/o', definition: 'Oksijen gazı', category: 'roots', system: 'respiratory', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1098, term: 'Pneumat/o', turkish: 'Hava / Solunum', roots: 'pneumat/o', definition: 'Hava, solunum', category: 'roots', system: 'respiratory', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1099, term: 'Pneum/o', turkish: 'Hava / Solunum', roots: 'pneum/o', definition: 'Hava, solunum', category: 'roots', system: 'respiratory', subcategory: 'physiological_functional', mainCategory: 'roots' },

    // Kalp ve Kalp Bölümleri - Dolaşım Sistemi
    { id: 1100, term: 'Cardi/o', turkish: 'Kalp', roots: 'cardi/o', definition: 'Kalp organı', category: 'roots', system: 'circulatory', subcategory: 'heart_chambers', mainCategory: 'roots' },
    { id: 1101, term: 'Atri/o', turkish: 'Atriyum (kulakçık)', roots: 'atri/o', definition: 'Kalbin üst odacıkları', category: 'roots', system: 'circulatory', subcategory: 'heart_chambers', mainCategory: 'roots' },
    { id: 1102, term: 'Ventricul/o', turkish: 'Ventrikül (karıncık)', roots: 'ventricul/o', definition: 'Kalbin alt odacıkları', category: 'roots', system: 'circulatory', subcategory: 'heart_chambers', mainCategory: 'roots' },
    { id: 1103, term: 'Valvul/o', turkish: 'Kapakçık', roots: 'valvul/o', definition: 'Kalp kapakçıkları', category: 'roots', system: 'circulatory', subcategory: 'heart_chambers', mainCategory: 'roots' },
    { id: 1104, term: 'Coron/o', turkish: 'Taç (koroner yapı)', roots: 'coron/o', definition: 'Koroner damarlar, kalbi besleyen damarlar', category: 'roots', system: 'circulatory', subcategory: 'heart_chambers', mainCategory: 'roots' },

    // Damarlar ve Damar Yapıları - Dolaşım Sistemi
    { id: 1105, term: 'Angi/o', turkish: 'Damar', roots: 'angi/o', definition: 'Kan damarları', category: 'roots', system: 'circulatory', subcategory: 'vessels_structures', mainCategory: 'roots' },
    { id: 1106, term: 'Aort/o', turkish: 'Aorta', roots: 'aort/o', definition: 'Vücudun ana atardamarı', category: 'roots', system: 'circulatory', subcategory: 'vessels_structures', mainCategory: 'roots' },
    { id: 1107, term: 'Arteri/o', turkish: 'Arter (atardamar)', roots: 'arteri/o', definition: 'Kalbin kanlı kanı taşıyan damarlar', category: 'roots', system: 'circulatory', subcategory: 'vessels_structures', mainCategory: 'roots' },
    { id: 1108, term: 'Phleb/o', turkish: 'Ven (toplardamar)', roots: 'phleb/o', definition: 'Kansız kanı kalbe taşıyan damarlar', category: 'roots', system: 'circulatory', subcategory: 'vessels_structures', mainCategory: 'roots' },
    { id: 1109, term: 'Ven/o', turkish: 'Ven (toplardamar)', roots: 'ven/o', definition: 'Kansız kanı kalbe taşıyan damarlar', category: 'roots', system: 'circulatory', subcategory: 'vessels_structures', mainCategory: 'roots' },
    { id: 1110, term: 'Vas/o', turkish: 'Damar / Ven', roots: 'vas/o', definition: 'Damar yapıları', category: 'roots', system: 'circulatory', subcategory: 'vessels_structures', mainCategory: 'roots' },
    { id: 1111, term: 'Vascul/o', turkish: 'Damar yapısı', roots: 'vascul/o', definition: 'Damar sistemi ve yapıları', category: 'roots', system: 'circulatory', subcategory: 'vessels_structures', mainCategory: 'roots' },

    // Fizyolojik / Fonksiyonel Kökler - Dolaşım Sistemi
    { id: 1112, term: 'Rhythm/o', turkish: 'Ritim', roots: 'rhythm/o', definition: 'Kalp ritmi, düzenli atış', category: 'roots', system: 'circulatory', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1113, term: 'Tensi/o', turkish: 'Tansiyon / Basınç', roots: 'tensi/o', definition: 'Kan basıncı, tansiyon', category: 'roots', system: 'circulatory', subcategory: 'physiological_functional', mainCategory: 'roots' },

    // Patolojik Durum Kökleri - Dolaşım Sistemi
    { id: 1114, term: 'Ather/o', turkish: 'Yağlı birikim, plak', roots: 'ather/o', definition: 'Damar duvarında yağ birikimi, ateroskleroz', category: 'roots', system: 'circulatory', subcategory: 'pathological_conditions', mainCategory: 'roots' },
    { id: 1115, term: 'Isch/o', turkish: 'Gizlemek, saklamak (iskemi)', roots: 'isch/o', definition: 'İskemi, kan akışının azalması', category: 'roots', system: 'circulatory', subcategory: 'pathological_conditions', mainCategory: 'roots' },

    // Tanı – Görüntüleme Kökleri - Dolaşım Sistemi
    { id: 1116, term: 'Ech/o', turkish: 'Yankı (ekokardiyografi)', roots: 'ech/o', definition: 'Yankı, ultrason görüntüleme', category: 'roots', system: 'circulatory', subcategory: 'diagnostic_imaging', mainCategory: 'roots' },

    // Sindirim ve İlişkili Organlar - Sindirim Sistemi
    { id: 1117, term: 'Esophag/o', turkish: 'Özofagus', roots: 'esophag/o', definition: 'Yemek borusu', category: 'roots', system: 'digestive', subcategory: 'digestive_organs', mainCategory: 'roots' },
    { id: 1118, term: 'Gastr/o', turkish: 'Mide', roots: 'gastr/o', definition: 'Mide organı', category: 'roots', system: 'digestive', subcategory: 'digestive_organs', mainCategory: 'roots' },
    { id: 1119, term: 'Duoden/o', turkish: 'Duodenum', roots: 'duoden/o', definition: 'İnce bağırsağın ilk bölümü', category: 'roots', system: 'digestive', subcategory: 'digestive_organs', mainCategory: 'roots' },
    { id: 1120, term: 'Enter/o', turkish: 'Bağırsak', roots: 'enter/o', definition: 'İnce bağırsak', category: 'roots', system: 'digestive', subcategory: 'digestive_organs', mainCategory: 'roots' },
    { id: 1121, term: 'Ile/o', turkish: 'İleum', roots: 'ile/o', definition: 'İnce bağırsağın son bölümü', category: 'roots', system: 'digestive', subcategory: 'digestive_organs', mainCategory: 'roots' },
    { id: 1122, term: 'Colon/o', turkish: 'Kolon', roots: 'colon/o', definition: 'Kalın bağırsak', category: 'roots', system: 'digestive', subcategory: 'digestive_organs', mainCategory: 'roots' },
    { id: 1123, term: 'Col/o', turkish: 'Kolon', roots: 'col/o', definition: 'Kalın bağırsak', category: 'roots', system: 'digestive', subcategory: 'digestive_organs', mainCategory: 'roots' },
    { id: 1124, term: 'Rect/o', turkish: 'Rektüm', roots: 'rect/o', definition: 'Düz bağırsak', category: 'roots', system: 'digestive', subcategory: 'digestive_organs', mainCategory: 'roots' },
    { id: 1125, term: 'Sigmoid/o', turkish: 'Sigmoid kolon', roots: 'sigmoid/o', definition: 'S şeklindeki kolon bölümü', category: 'roots', system: 'digestive', subcategory: 'digestive_organs', mainCategory: 'roots' },
    { id: 1126, term: 'Appendic/o', turkish: 'Apendiks', roots: 'appendic/o', definition: 'Kör bağırsağa bağlı ek', category: 'roots', system: 'digestive', subcategory: 'digestive_organs', mainCategory: 'roots' },

    // Karaciğer – Safra – Pankreas - Sindirim Sistemi
    { id: 1127, term: 'Hepat/o', turkish: 'Karaciğer', roots: 'hepat/o', definition: 'Karaciğer organı', category: 'roots', system: 'digestive', subcategory: 'liver_bile_pancreas', mainCategory: 'roots' },
    { id: 1128, term: 'Pancreat/o', turkish: 'Pankreas', roots: 'pancreat/o', definition: 'Pankreas bezi', category: 'roots', system: 'digestive', subcategory: 'liver_bile_pancreas', mainCategory: 'roots' },
    { id: 1129, term: 'Cholecyst/o', turkish: 'Safra kesesi', roots: 'cholecyst/o', definition: 'Safra kesesi organı', category: 'roots', system: 'digestive', subcategory: 'liver_bile_pancreas', mainCategory: 'roots' },
    { id: 1130, term: 'Chol/e', turkish: 'Safra', roots: 'chol/e', definition: 'Safra sıvısı', category: 'roots', system: 'digestive', subcategory: 'liver_bile_pancreas', mainCategory: 'roots' },
    { id: 1131, term: 'Choledoch/o', turkish: 'Koledok kanalı', roots: 'choledoch/o', definition: 'Ana safra kanalı', category: 'roots', system: 'digestive', subcategory: 'liver_bile_pancreas', mainCategory: 'roots' },

    // Karın – Periton – İlişkili Yapılar - Sindirim Sistemi
    { id: 1132, term: 'Lapar/o', turkish: 'Karın', roots: 'lapar/o', definition: 'Karın bölgesi', category: 'roots', system: 'digestive', subcategory: 'abdomen_peritoneum', mainCategory: 'roots' },
    { id: 1133, term: 'Periton/o', turkish: 'Periton', roots: 'periton/o', definition: 'Karın zarı', category: 'roots', system: 'digestive', subcategory: 'abdomen_peritoneum', mainCategory: 'roots' },
    { id: 1134, term: 'Umbilic/o', turkish: 'Göbek', roots: 'umbilic/o', definition: 'Göbek bölgesi', category: 'roots', system: 'digestive', subcategory: 'abdomen_peritoneum', mainCategory: 'roots' },

    // Diğer Anatomik Yapılar - Sindirim Sistemi
    { id: 1135, term: 'Splen/o', turkish: 'Dalak', roots: 'splen/o', definition: 'Dalak organı', category: 'roots', system: 'digestive', subcategory: 'other_anatomical', mainCategory: 'roots' },
    { id: 1136, term: 'Cyst/o', turkish: 'Kese, kist', roots: 'cyst/o', definition: 'Kese yapısı, kist', category: 'roots', system: 'digestive', subcategory: 'other_anatomical', mainCategory: 'roots' },
    { id: 1137, term: 'Polyp/o', turkish: 'Polip', roots: 'polyp/o', definition: 'Mukoza üzerinde çıkıntı', category: 'roots', system: 'digestive', subcategory: 'other_anatomical', mainCategory: 'roots' },
    { id: 1138, term: 'Herni/o', turkish: 'Fıtık', roots: 'herni/o', definition: 'Organın yerinden çıkması', category: 'roots', system: 'digestive', subcategory: 'other_anatomical', mainCategory: 'roots' },
    { id: 1139, term: 'Inguin/o', turkish: 'Kasık', roots: 'inguin/o', definition: 'Kasık bölgesi', category: 'roots', system: 'digestive', subcategory: 'other_anatomical', mainCategory: 'roots' },
    { id: 1140, term: 'Hiat/o', turkish: 'Açıklık', roots: 'hiat/o', definition: 'Doğal açıklık, gedik', category: 'roots', system: 'digestive', subcategory: 'other_anatomical', mainCategory: 'roots' },
    { id: 1141, term: 'An/o', turkish: 'Anüs', roots: 'an/o', definition: 'Makat, sindirim sisteminin sonu', category: 'roots', system: 'digestive', subcategory: 'other_anatomical', mainCategory: 'roots' },

    // Fizyolojik / Fonksiyonel Kökler - Sindirim Sistemi
    { id: 1142, term: 'Motil/o', turkish: 'Hareket', roots: 'motil/o', definition: 'Bağırsak hareketi, motilite', category: 'roots', system: 'digestive', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1143, term: 'Tens/o', turkish: 'Basınç, gerilim', roots: 'tens/o', definition: 'Gerilim, basınç', category: 'roots', system: 'digestive', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1144, term: 'Rrhe/o', turkish: 'Akmak', roots: 'rrhe/o', definition: 'Akmak, akıntı', category: 'roots', system: 'digestive', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1145, term: 'Peps/o', turkish: 'Sindirim', roots: 'peps/o', definition: 'Sindirim süreci', category: 'roots', system: 'digestive', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1146, term: 'Phag/o', turkish: 'Yutmak', roots: 'phag/o', definition: 'Yutma, yeme', category: 'roots', system: 'digestive', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1147, term: 'Sorb/o', turkish: 'Emmek', roots: 'sorb/o', definition: 'Emilim, absorpsiyon', category: 'roots', system: 'digestive', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1148, term: 'Toler/o', turkish: 'Dayanmak', roots: 'toler/o', definition: 'Tolere etme, dayanma', category: 'roots', system: 'digestive', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1149, term: 'pH', turkish: 'Asidite / Alkalinite', roots: 'pH', definition: 'Asit-baz dengesi', category: 'roots', system: 'digestive', subcategory: 'physiological_functional', mainCategory: 'roots' },

    // Patolojik Durum / Klinik Hal Kökleri - Sindirim Sistemi
    { id: 1150, term: 'Ascit/o', turkish: 'Sıvı birikimi', roots: 'ascit/o', definition: 'Karında sıvı birikimi, asit', category: 'roots', system: 'digestive', subcategory: 'pathological_clinical', mainCategory: 'roots' },
    { id: 1151, term: 'Steat/o', turkish: 'Yağ', roots: 'steat/o', definition: 'Yağ, yağlı doku', category: 'roots', system: 'digestive', subcategory: 'pathological_clinical', mainCategory: 'roots' },
    { id: 1152, term: 'Icter/o', turkish: 'Sarılık', roots: 'icter/o', definition: 'Sarılık, ikter', category: 'roots', system: 'digestive', subcategory: 'pathological_clinical', mainCategory: 'roots' },
    { id: 1153, term: 'Cirrh/o', turkish: 'Sarımsı renk (siroz)', roots: 'cirrh/o', definition: 'Siroz, karaciğer sertliği', category: 'roots', system: 'digestive', subcategory: 'pathological_clinical', mainCategory: 'roots' },
    { id: 1154, term: 'Odyn/o', turkish: 'Ağrı', roots: 'odyn/o', definition: 'Ağrı, sızı', category: 'roots', system: 'digestive', subcategory: 'pathological_clinical', mainCategory: 'roots' },
    { id: 1155, term: 'Melan/o', turkish: 'Siyah', roots: 'melan/o', definition: 'Siyah renk, koyu', category: 'roots', system: 'digestive', subcategory: 'pathological_clinical', mainCategory: 'roots' },
    { id: 1156, term: 'Halit/o', turkish: 'Nefes (halitozis)', roots: 'halit/o', definition: 'Ağız kokusu, halitozis', category: 'roots', system: 'digestive', subcategory: 'pathological_clinical', mainCategory: 'roots' },
    { id: 1157, term: 'Singult/o', turkish: 'Hıçkırık', roots: 'singult/o', definition: 'Hıçkırık', category: 'roots', system: 'digestive', subcategory: 'pathological_clinical', mainCategory: 'roots' },
    { id: 1158, term: 'Gargur/o', turkish: 'Kaynama sesi', roots: 'gargur/o', definition: 'Bağırsaklarda gürlültü', category: 'roots', system: 'digestive', subcategory: 'pathological_clinical', mainCategory: 'roots' },

    // Tanı – Görüntüleme – Ölçüm Kökleri - Sindirim Sistemi
    { id: 1159, term: 'Penetr/o', turkish: 'İçeri girme', roots: 'penetr/o', definition: 'Nüfuz etme, içeri girme', category: 'roots', system: 'digestive', subcategory: 'diagnostic_imaging', mainCategory: 'roots' },
    { id: 1160, term: 'For/o', turkish: 'Delmek', roots: 'for/o', definition: 'Delmek, perfore etmek', category: 'roots', system: 'digestive', subcategory: 'diagnostic_imaging', mainCategory: 'roots' },
    { id: 1161, term: 'Tent', turkish: 'Gerilmek', roots: 'tent', definition: 'Gerilme, distansiyon', category: 'roots', system: 'digestive', subcategory: 'diagnostic_imaging', mainCategory: 'roots' },
    { id: 1162, term: 'Verticul/o', turkish: 'Çıkıntı, kese', roots: 'verticul/o', definition: 'Divertikül, çıkıntı', category: 'roots', system: 'digestive', subcategory: 'diagnostic_imaging', mainCategory: 'roots' },
    { id: 1163, term: 'Rrhoid/o', turkish: 'Akıntı / çıkıntı', roots: 'rrhoid/o', definition: 'Hemoroid, basür', category: 'roots', system: 'digestive', subcategory: 'diagnostic_imaging', mainCategory: 'roots' },

    // Madde / İçerik / Biyokimyasal Kökler - Sindirim Sistemi
    { id: 1164, term: 'Aer/o', turkish: 'Hava', roots: 'aer/o', definition: 'Hava, gaz', category: 'roots', system: 'digestive', subcategory: 'biochemical_content', mainCategory: 'roots' },
    { id: 1165, term: 'Lact/o', turkish: 'Süt', roots: 'lact/o', definition: 'Süt, laktoz', category: 'roots', system: 'digestive', subcategory: 'biochemical_content', mainCategory: 'roots' },
    { id: 1166, term: 'Gluten/o', turkish: 'Gluten', roots: 'gluten/o', definition: 'Gluten proteini', category: 'roots', system: 'digestive', subcategory: 'biochemical_content', mainCategory: 'roots' },
    { id: 1167, term: 'Flatu/o', turkish: 'Gaz', roots: 'flatu/o', definition: 'Barsak gazı, flatülans', category: 'roots', system: 'digestive', subcategory: 'biochemical_content', mainCategory: 'roots' },

    // Kan – Dışkı – Salgı İlişkili Kökler - Sindirim Sistemi
    { id: 1168, term: 'Hemat/o', turkish: 'Kan', roots: 'hemat/o', definition: 'Kan', category: 'roots', system: 'digestive', subcategory: 'blood_stool_secretion', mainCategory: 'roots' },
    { id: 1169, term: 'Hem/o', turkish: 'Kan', roots: 'hem/o', definition: 'Kan', category: 'roots', system: 'digestive', subcategory: 'blood_stool_secretion', mainCategory: 'roots' },
    { id: 1170, term: 'Emesis / Emet/o', turkish: 'Kusma', roots: 'emesis, emet/o', definition: 'Kusma', category: 'roots', system: 'digestive', subcategory: 'blood_stool_secretion', mainCategory: 'roots' },
    { id: 1171, term: 'Fec/o', turkish: 'Dışkı', roots: 'fec/o', definition: 'Dışkı, gaita', category: 'roots', system: 'digestive', subcategory: 'blood_stool_secretion', mainCategory: 'roots' },
    { id: 1172, term: 'Faec/o', turkish: 'Dışkı', roots: 'faec/o', definition: 'Dışkı, gaita', category: 'roots', system: 'digestive', subcategory: 'blood_stool_secretion', mainCategory: 'roots' },

    // Diğer Klinik / Yardımcı Kökler - Sindirim Sistemi
    { id: 1173, term: 'Stip', turkish: 'Sıkı, kuru', roots: 'stip', definition: 'Kabizlik, sıkılık', category: 'roots', system: 'digestive', subcategory: 'other_clinical', mainCategory: 'roots' },
    { id: 1174, term: 'Pact/o', turkish: 'Sıkıştırmak', roots: 'pact/o', definition: 'Sıkıştırma, kompaksiyon', category: 'roots', system: 'digestive', subcategory: 'other_clinical', mainCategory: 'roots' },
    { id: 1175, term: 'Irrit/o', turkish: 'Tahriş', roots: 'irrit/o', definition: 'Tahriş, irritasyon', category: 'roots', system: 'digestive', subcategory: 'other_clinical', mainCategory: 'roots' },
    { id: 1176, term: 'Chalasi/o', turkish: 'Gevşeme', roots: 'chalasi/o', definition: 'Gevşeme, akalazya', category: 'roots', system: 'digestive', subcategory: 'other_clinical', mainCategory: 'roots' },
    { id: 1177, term: 'Port/o', turkish: 'Kapı (portal)', roots: 'port/o', definition: 'Portal damar sistemi', category: 'roots', system: 'digestive', subcategory: 'other_clinical', mainCategory: 'roots' },
    { id: 1178, term: 'Vag/o', turkish: 'Vagus siniri', roots: 'vag/o', definition: 'Vagus siniri', category: 'roots', system: 'digestive', subcategory: 'other_clinical', mainCategory: 'roots' },

    // Anatomik Yapı Kökleri - Boşaltım Sistemi
    { id: 1179, term: 'Nephr/o', turkish: 'Böbrek', roots: 'nephr/o', definition: 'Böbrek organı', category: 'roots', system: 'urinary', subcategory: 'anatomical_structures', mainCategory: 'roots' },
    { id: 1180, term: 'Kidney', turkish: 'Böbrek', roots: 'kidney', definition: 'Böbrek organı', category: 'roots', system: 'urinary', subcategory: 'anatomical_structures', mainCategory: 'roots' },
    { id: 1181, term: 'Vesic/o', turkish: 'Mesane', roots: 'vesic/o', definition: 'İdrar kesesi', category: 'roots', system: 'urinary', subcategory: 'anatomical_structures', mainCategory: 'roots' },
    { id: 1182, term: 'Cyst/o', turkish: 'Mesane / Kese', roots: 'cyst/o', definition: 'Mesane, kese yapısı', category: 'roots', system: 'urinary', subcategory: 'anatomical_structures', mainCategory: 'roots' },
    { id: 1183, term: 'Urethr/o', turkish: 'Üretra', roots: 'urethr/o', definition: 'İdrar kanalı', category: 'roots', system: 'urinary', subcategory: 'anatomical_structures', mainCategory: 'roots' },
    { id: 1184, term: 'Periton/o', turkish: 'Periton', roots: 'periton/o', definition: 'Karın zarı', category: 'roots', system: 'urinary', subcategory: 'anatomical_structures', mainCategory: 'roots' },

    // Fizyolojik / Fonksiyonel Kökler - Boşaltım Sistemi
    { id: 1185, term: 'Ur/o', turkish: 'İdrar', roots: 'ur/o', definition: 'İdrar, idrar ile ilgili', category: 'roots', system: 'urinary', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1186, term: 'Mict/o', turkish: 'İdrar yapmak', roots: 'mict/o', definition: 'İşeme, miksiyon', category: 'roots', system: 'urinary', subcategory: 'physiological_functional', mainCategory: 'roots' },
    { id: 1187, term: 'Continent', turkish: 'Tutmak', roots: 'continent', definition: 'İdrarı tutma, kontinans', category: 'roots', system: 'urinary', subcategory: 'physiological_functional', mainCategory: 'roots' },

    // Patolojik İçerik / İdrarda Bulunan Maddeler - Boşaltım Sistemi
    { id: 1188, term: 'Hemat/o', turkish: 'Kan', roots: 'hemat/o', definition: 'İdrarda kan', category: 'roots', system: 'urinary', subcategory: 'pathological_urine_content', mainCategory: 'roots' },
    { id: 1189, term: 'Py/o', turkish: 'İrin', roots: 'py/o', definition: 'İrin, püy', category: 'roots', system: 'urinary', subcategory: 'pathological_urine_content', mainCategory: 'roots' },
    { id: 1190, term: 'Glycos/o', turkish: 'Şeker', roots: 'glycos/o', definition: 'İdrarda şeker, glikoz', category: 'roots', system: 'urinary', subcategory: 'pathological_urine_content', mainCategory: 'roots' },
    { id: 1191, term: 'Protein/o', turkish: 'Protein', roots: 'protein/o', definition: 'İdrarda protein', category: 'roots', system: 'urinary', subcategory: 'pathological_urine_content', mainCategory: 'roots' },
    { id: 1192, term: 'Keton/o', turkish: 'Keton', roots: 'keton/o', definition: 'İdrarda keton', category: 'roots', system: 'urinary', subcategory: 'pathological_urine_content', mainCategory: 'roots' },

    // Patolojik Oluşumlar - Boşaltım Sistemi
    { id: 1193, term: 'Lith/o', turkish: 'Taş', roots: 'lith/o', definition: 'Böbrek taşı, üriner taş', category: 'roots', system: 'urinary', subcategory: 'pathological_formations', mainCategory: 'roots' },
    { id: 1194, term: 'Glob/o', turkish: 'Yuvarlak kitle', roots: 'glob/o', definition: 'Küresel yapı, kitle', category: 'roots', system: 'urinary', subcategory: 'pathological_formations', mainCategory: 'roots' },

    // Klinik Durum / Semptom Kökleri - Boşaltım Sistemi
    { id: 1195, term: 'Alges/o', turkish: 'Ağrı', roots: 'alges/o', definition: 'Ağrı, ağrılı durum', category: 'roots', system: 'urinary', subcategory: 'clinical_symptoms', mainCategory: 'roots' },
    { id: 1196, term: 'Spasm/o', turkish: 'Spazm', roots: 'spasm/o', definition: 'Kas spazmları', category: 'roots', system: 'urinary', subcategory: 'clinical_symptoms', mainCategory: 'roots' },
    { id: 1197, term: 'Inflamm/o', turkish: 'İltihap', roots: 'inflamm/o', definition: 'Enflamasyon, iltihap', category: 'roots', system: 'urinary', subcategory: 'clinical_symptoms', mainCategory: 'roots' },

    // Tedavi / İşlem / Fonksiyon Kökleri - Boşaltım Sistemi
    { id: 1198, term: 'Lys/o', turkish: 'Ayırmak, çözmek', roots: 'lys/o', definition: 'Parçalama, lizis', category: 'roots', system: 'urinary', subcategory: 'treatment_procedures', mainCategory: 'roots' },

    // Kadın Üreme Organları - Üreme Sistemi
    { id: 1199, term: 'Metr/o', turkish: 'Uterus', roots: 'metr/o', definition: 'Rahim organı', category: 'roots', system: 'reproductive', subcategory: 'female_organs', mainCategory: 'roots' },
    { id: 1200, term: 'Hyster/o', turkish: 'Uterus', roots: 'hyster/o', definition: 'Rahim organı', category: 'roots', system: 'reproductive', subcategory: 'female_organs', mainCategory: 'roots' },
    { id: 1201, term: 'Cervic/o', turkish: 'Serviks', roots: 'cervic/o', definition: 'Rahim ağzı', category: 'roots', system: 'reproductive', subcategory: 'female_organs', mainCategory: 'roots' },
    { id: 1202, term: 'Vagin/o', turkish: 'Vajina', roots: 'vagin/o', definition: 'Vajina kanalı', category: 'roots', system: 'reproductive', subcategory: 'female_organs', mainCategory: 'roots' },
    { id: 1203, term: 'Colp/o', turkish: 'Vajina', roots: 'colp/o', definition: 'Vajina kanalı', category: 'roots', system: 'reproductive', subcategory: 'female_organs', mainCategory: 'roots' },
    { id: 1204, term: 'Vulv/o', turkish: 'Vulva', roots: 'vulv/o', definition: 'Dış gen', category: 'roots', system: 'reproductive', subcategory: 'female_organs', mainCategory: 'roots' },
    { id: 1205, term: 'Salping/o', turkish: 'Fallop tüpü', roots: 'salping/o', definition: 'Yumurta kanalı', category: 'roots', system: 'reproductive', subcategory: 'female_organs', mainCategory: 'roots' },
    { id: 1206, term: 'Oophor/o', turkish: 'Over', roots: 'oophor/o', definition: 'Yumurtalık', category: 'roots', system: 'reproductive', subcategory: 'female_organs', mainCategory: 'roots' },
    { id: 1207, term: 'Amni/o', turkish: 'Amniyon sıvısı', roots: 'amni/o', definition: 'Bebeği saran sıvı', category: 'roots', system: 'reproductive', subcategory: 'female_organs', mainCategory: 'roots' },
    { id: 1208, term: 'Isi/o', turkish: 'Perine', roots: 'isi/o', definition: 'Perine bölgesi', category: 'roots', system: 'reproductive', subcategory: 'female_organs', mainCategory: 'roots' },

    // Erkek Üreme Organları - Üreme Sistemi
    { id: 1209, term: 'Orchid/o', turkish: 'Testis', roots: 'orchid/o', definition: 'Erkek üreme bezi', category: 'roots', system: 'reproductive', subcategory: 'male_organs', mainCategory: 'roots' },
    { id: 1210, term: 'Epididym/o', turkish: 'Epididim', roots: 'epididym/o', definition: 'Sperm depolama kanalı', category: 'roots', system: 'reproductive', subcategory: 'male_organs', mainCategory: 'roots' },
    { id: 1211, term: 'Prostat/o', turkish: 'Prostat', roots: 'prostat/o', definition: 'Prostat bezi', category: 'roots', system: 'reproductive', subcategory: 'male_organs', mainCategory: 'roots' },
    { id: 1212, term: 'Vas/o', turkish: 'Vas deferens', roots: 'vas/o', definition: 'Sperm kanalı', category: 'roots', system: 'reproductive', subcategory: 'male_organs', mainCategory: 'roots' },
    { id: 1213, term: 'Urethr/o', turkish: 'Üretra', roots: 'urethr/o', definition: 'İdrar ve sperm kanalı', category: 'roots', system: 'reproductive', subcategory: 'male_organs', mainCategory: 'roots' },

    // Gametler, Salgılar ve Döngüler - Üreme Sistemi
    { id: 1214, term: 'Sperm/o', turkish: 'Sperm', roots: 'sperm/o', definition: 'Erkek üreme hücresi', category: 'roots', system: 'reproductive', subcategory: 'gametes_secretions', mainCategory: 'roots' },
    { id: 1215, term: 'Semin/o', turkish: 'Semen / Tohum', roots: 'semin/o', definition: 'Meni sıvısı', category: 'roots', system: 'reproductive', subcategory: 'gametes_secretions', mainCategory: 'roots' },
    { id: 1216, term: 'Zoo/o', turkish: 'Canlı (sperm)', roots: 'zoo/o', definition: 'Canlı sperm', category: 'roots', system: 'reproductive', subcategory: 'gametes_secretions', mainCategory: 'roots' },
    { id: 1217, term: 'Galact/o', turkish: 'Süt', roots: 'galact/o', definition: 'Anne sütü', category: 'roots', system: 'reproductive', subcategory: 'gametes_secretions', mainCategory: 'roots' },
    { id: 1218, term: 'Men/o', turkish: 'Adet', roots: 'men/o', definition: 'Adet döngüsü', category: 'roots', system: 'reproductive', subcategory: 'gametes_secretions', mainCategory: 'roots' },
    { id: 1219, term: 'Col/o', turkish: 'Kolon (jinekoloji)', roots: 'col/o', definition: 'Rektovajinal ilişki', category: 'roots', system: 'reproductive', subcategory: 'gametes_secretions', mainCategory: 'roots' },

    // Klinik Durumlar ve İşlev Bozuklukları - Üreme Sistemi
    { id: 1220, term: 'Rrhag/o', turkish: 'Ani kanama', roots: 'rrhag/o', definition: 'Aşırı kanama', category: 'roots', system: 'reproductive', subcategory: 'clinical_conditions', mainCategory: 'roots' },
    { id: 1221, term: 'Alges/o', turkish: 'Ağrı', roots: 'alges/o', definition: 'Ağrı, ağrılı durum', category: 'roots', system: 'reproductive', subcategory: 'clinical_conditions', mainCategory: 'roots' },
    { id: 1222, term: 'Leuc/o', turkish: 'Beyaz (lökore)', roots: 'leuc/o', definition: 'Beyaz akıntı', category: 'roots', system: 'reproductive', subcategory: 'clinical_conditions', mainCategory: 'roots' },
    { id: 1223, term: 'Spasm/o', turkish: 'Spazm', roots: 'spasm/o', definition: 'Kas spazmları', category: 'roots', system: 'reproductive', subcategory: 'clinical_conditions', mainCategory: 'roots' },
    { id: 1224, term: 'Inflamm/o', turkish: 'İltihap', roots: 'inflamm/o', definition: 'Enflamasyon, iltihap', category: 'roots', system: 'reproductive', subcategory: 'clinical_conditions', mainCategory: 'roots' },
    { id: 1225, term: 'Varic/o', turkish: 'Genişlemiş damar', roots: 'varic/o', definition: 'Varikosel, genişlemiş ven', category: 'roots', system: 'reproductive', subcategory: 'clinical_conditions', mainCategory: 'roots' },
    { id: 1226, term: 'Potent/o', turkish: 'Güç (erektil)', roots: 'potent/o', definition: 'Erektil fonksiyon', category: 'roots', system: 'reproductive', subcategory: 'clinical_conditions', mainCategory: 'roots' },
    { id: 1227, term: 'Priap/o', turkish: 'Penis (erektil)', roots: 'priap/o', definition: 'Uzamış ereksiyon', category: 'roots', system: 'reproductive', subcategory: 'clinical_conditions', mainCategory: 'roots' },
    { id: 1228, term: 'Spad/o', turkish: 'Yarık, çatlak', roots: 'spad/o', definition: 'Hipo/epispadias', category: 'roots', system: 'reproductive', subcategory: 'clinical_conditions', mainCategory: 'roots' },

    // Tanı, İşlem ve Cerrahi Girişimler - Üreme Sistemi
    { id: 1229, term: 'Smear', turkish: 'Yayma', roots: 'smear', definition: 'Hücre yayma testi', category: 'roots', system: 'reproductive', subcategory: 'diagnostic_surgical', mainCategory: 'roots' },
    { id: 1230, term: 'Curet/o', turkish: 'Kazımak', roots: 'curet/o', definition: 'Küretaj, kazıma', category: 'roots', system: 'reproductive', subcategory: 'diagnostic_surgical', mainCategory: 'roots' },
    { id: 1231, term: 'Sect/o', turkish: 'Kesmek', roots: 'sect/o', definition: 'Cerrahi kesim', category: 'roots', system: 'reproductive', subcategory: 'diagnostic_surgical', mainCategory: 'roots' },
    { id: 1232, term: 'Cept/o', turkish: 'Almak', roots: 'cept/o', definition: 'Alma, konsepsiyon', category: 'roots', system: 'reproductive', subcategory: 'diagnostic_surgical', mainCategory: 'roots' },
    { id: 1233, term: 'Cesar', turkish: 'Sezaryen', roots: 'cesar', definition: 'Sezaryen doğum', category: 'roots', system: 'reproductive', subcategory: 'diagnostic_surgical', mainCategory: 'roots' },

    // Merkezi ve Çevresel Sinir Yapıları - Sinir Sistemi
    { id: 1234, term: 'Dors/o', turkish: 'Sırt', roots: 'dors/o', definition: 'Sırt bölgesi', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1235, term: 'Opisth/o', turkish: 'Arka', roots: 'opisth/o', definition: 'Arka kısım', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1236, term: 'Peripher/o', turkish: 'Çevresel', roots: 'peripher/o', definition: 'Çevre sinir sistemi', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1237, term: 'Cerebr/o', turkish: 'Beyin', roots: 'cerebr/o', definition: 'Beyin organı', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1238, term: 'Encephal/o', turkish: 'Beyin', roots: 'encephal/o', definition: 'Beyin organı', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1239, term: 'Myel/o', turkish: 'Omurilik', roots: 'myel/o', definition: 'Omurilik yapısı', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1240, term: 'Mening/o', turkish: 'Beyin zarı', roots: 'mening/o', definition: 'Beyin ve omurilik zarı', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1241, term: 'Ventricul/o', turkish: 'Ventrikül', roots: 'ventricul/o', definition: 'Beyin karıncığı', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1242, term: 'Dur/o', turkish: 'Dura', roots: 'dur/o', definition: 'Sert beyin zarı', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1243, term: 'Neur/o', turkish: 'Sinir', roots: 'neur/o', definition: 'Sinir yapısı', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1244, term: 'Radicul/o', turkish: 'Sinir kökü', roots: 'radicul/o', definition: 'Sinir kökü yapısı', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1245, term: 'Ganglion/o', turkish: 'Ganglion', roots: 'ganglion/o', definition: 'Sinir hücre kümesi', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1246, term: 'Plex/o', turkish: 'Sinir ağı', roots: 'plex/o', definition: 'Sinir pleksus', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1247, term: 'Cervic/o', turkish: 'Boyun', roots: 'cervic/o', definition: 'Boyun bölgesi', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1248, term: 'Lumb/o', turkish: 'Bel', roots: 'lumb/o', definition: 'Bel bölgesi', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1249, term: 'Disc/o', turkish: 'Disk', roots: 'disc/o', definition: 'Omurlar arası disk', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1250, term: 'Arthr/o', turkish: 'Eklem', roots: 'arthr/o', definition: 'Eklem yapısı', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1251, term: 'Chondr/o', turkish: 'Kıkırdak', roots: 'chondr/o', definition: 'Kıkırdak doku', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1252, term: 'Lamin/o', turkish: 'Lamina', roots: 'lamin/o', definition: 'Omur laminaları', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1253, term: 'Fract/o', turkish: 'Kırık', roots: 'fract/o', definition: 'Kırık, frak', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1254, term: 'Crani/o', turkish: 'Kafatası', roots: 'crani/o', definition: 'Kafatası kemikleri', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },
    { id: 1255, term: 'Cephal/o', turkish: 'Baş', roots: 'cephal/o', definition: 'Baş bölgesi', category: 'roots', system: 'nervous', subcategory: 'central_peripheral_structures', mainCategory: 'roots' },

    // Zihinsel Süreçler ve Duyusal İşlevler - Sinir Sistemi
    { id: 1256, term: 'Man/o', turkish: 'Zihin', roots: 'man/o', definition: 'Zihin, mani', category: 'roots', system: 'nervous', subcategory: 'mental_sensory_functions', mainCategory: 'roots' },
    { id: 1257, term: 'Psych/o', turkish: 'Zihin', roots: 'psych/o', definition: 'Ruh, zihin', category: 'roots', system: 'nervous', subcategory: 'mental_sensory_functions', mainCategory: 'roots' },
    { id: 1258, term: 'Phren/o', turkish: 'Zihin', roots: 'phren/o', definition: 'Zihin, akli durum', category: 'roots', system: 'nervous', subcategory: 'mental_sensory_functions', mainCategory: 'roots' },
    { id: 1259, term: 'Dement/o', turkish: 'Akıl, bilinç', roots: 'dement/o', definition: 'Akıl, demans', category: 'roots', system: 'nervous', subcategory: 'mental_sensory_functions', mainCategory: 'roots' },
    { id: 1260, term: 'Somn/o', turkish: 'Uyku', roots: 'somn/o', definition: 'Uyku durumu', category: 'roots', system: 'nervous', subcategory: 'mental_sensory_functions', mainCategory: 'roots' },
    { id: 1261, term: 'Coma / Com/o', turkish: 'Koma', roots: 'coma, com/o', definition: 'Derin bilinçsizlik', category: 'roots', system: 'nervous', subcategory: 'mental_sensory_functions', mainCategory: 'roots' },
    { id: 1262, term: 'Esthes/o', turkish: 'Duyum', roots: 'esthes/o', definition: 'Duyusal algı', category: 'roots', system: 'nervous', subcategory: 'mental_sensory_functions', mainCategory: 'roots' },
    { id: 1263, term: 'Gnos/o', turkish: 'Tanıma', roots: 'gnos/o', definition: 'Tanıma, gnozi', category: 'roots', system: 'nervous', subcategory: 'mental_sensory_functions', mainCategory: 'roots' },
    { id: 1264, term: 'Mnes/o', turkish: 'Hafıza', roots: 'mnes/o', definition: 'Hafıza, anımsama', category: 'roots', system: 'nervous', subcategory: 'mental_sensory_functions', mainCategory: 'roots' },
    { id: 1265, term: 'Phas/o', turkish: 'Konuşma', roots: 'phas/o', definition: 'Konuşma, fazi', category: 'roots', system: 'nervous', subcategory: 'mental_sensory_functions', mainCategory: 'roots' },
    { id: 1266, term: 'Calcul/o', turkish: 'Hesap', roots: 'calcul/o', definition: 'Hesaplama yeteneği', category: 'roots', system: 'nervous', subcategory: 'mental_sensory_functions', mainCategory: 'roots' },
    { id: 1267, term: 'Orient/o', turkish: 'Yön', roots: 'orient/o', definition: 'Yönelim, oryantasyon', category: 'roots', system: 'nervous', subcategory: 'mental_sensory_functions', mainCategory: 'roots' },
    { id: 1268, term: 'Cop/o', turkish: 'Kesilmek', roots: 'cop/o', definition: 'Kesilme, senkop', category: 'roots', system: 'nervous', subcategory: 'mental_sensory_functions', mainCategory: 'roots' },

    // Motor (Hareket) ve Otonom İşlevler - Sinir Sistemi
    { id: 1269, term: 'My/o', turkish: 'Kas', roots: 'my/o', definition: 'Kas yapısı', category: 'roots', system: 'nervous', subcategory: 'motor_autonomic_functions', mainCategory: 'roots' },
    { id: 1270, term: 'Muscul/o', turkish: 'Kas', roots: 'muscul/o', definition: 'Kas dokusu', category: 'roots', system: 'nervous', subcategory: 'motor_autonomic_functions', mainCategory: 'roots' },
    { id: 1271, term: 'Kines/o', turkish: 'Hareket', roots: 'kines/o', definition: 'Hareket, kinezi', category: 'roots', system: 'nervous', subcategory: 'motor_autonomic_functions', mainCategory: 'roots' },
    { id: 1272, term: 'Troph/o', turkish: 'Beslenme', roots: 'troph/o', definition: 'Beslenme, trofi', category: 'roots', system: 'nervous', subcategory: 'motor_autonomic_functions', mainCategory: 'roots' },
    { id: 1273, term: 'Ton/o', turkish: 'Tonus', roots: 'ton/o', definition: 'Kas tonusu', category: 'roots', system: 'nervous', subcategory: 'motor_autonomic_functions', mainCategory: 'roots' },

    // Nörolojik Hastalık Mekanizmaları - Sinir Sistemi
    { id: 1274, term: 'Paralys/o', turkish: 'Felç', roots: 'paralys/o', definition: 'Felc, paralizi', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1275, term: 'Pleg/o', turkish: 'Felç', roots: 'pleg/o', definition: 'Felc, pleji', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1276, term: 'Pals/o', turkish: 'Felç', roots: 'pals/o', definition: 'Felc, palsi', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1277, term: 'Vers/o', turkish: 'Dönmek', roots: 'vers/o', definition: 'Dönme, versiyon', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1278, term: 'Asthen/o', turkish: 'Güçsüzlük', roots: 'asthen/o', definition: 'Güçsüzlük, asteni', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1279, term: 'Epileps/o', turkish: 'Nöbet', roots: 'epileps/o', definition: 'Epilepsi nöbeti', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1280, term: 'Leps/o', turkish: 'Nöbet', roots: 'leps/o', definition: 'Nöbet, lepsi', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1281, term: 'Convuls/o', turkish: 'Kasılma', roots: 'convuls/o', definition: 'Konvülsiyon, kasılma', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1282, term: 'Tic', turkish: 'İstemsiz hareket', roots: 'tic', definition: 'Tik, istemsiz hareket', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1283, term: 'Alg/o', turkish: 'Ağrı', roots: 'alg/o', definition: 'Ağrı, alji', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1284, term: 'Phob/o', turkish: 'Korku', roots: 'phob/o', definition: 'Korku, fobi', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1285, term: 'Lus/o', turkish: 'Aldatmak (illüzyon)', roots: 'lus/o', definition: 'Yanılgı, illüzyon', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1286, term: 'Degener/o', turkish: 'Bozulma', roots: 'degener/o', definition: 'Dejenerasyon, bozulma', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1287, term: 'Myelin/o', turkish: 'Miyelin', roots: 'myelin/o', definition: 'Miyelin kılıf', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1288, term: 'Malac/o', turkish: 'Yumuşama', roots: 'malac/o', definition: 'Yumuşama, malazi', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1289, term: 'Schis/o', turkish: 'Yarılma', roots: 'schis/o', definition: 'Yarılma, şizi', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1290, term: 'Tab/o', turkish: 'Erime', roots: 'tab/o', definition: 'Erime, tabes', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1291, term: 'Angi/o', turkish: 'Damar', roots: 'angi/o', definition: 'Kan damarları', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1292, term: 'Hemorrhag/o', turkish: 'Kanama', roots: 'hemorrhag/o', definition: 'Kanama, hemoraj', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1293, term: 'Hemat/o', turkish: 'Kan', roots: 'hemat/o', definition: 'Kan, hematom', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1294, term: 'Compress/o', turkish: 'Bası', roots: 'compress/o', definition: 'Bası, kompresyon', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },
    { id: 1295, term: 'Tens/o', turkish: 'Basınç', roots: 'tens/o', definition: 'Basınç, tansiyon', category: 'roots', system: 'nervous', subcategory: 'neurological_disease_mechanisms', mainCategory: 'roots' },

    // Psikiyatrik Durumlar ve Duygulanım Bozuklukları - Sinir Sistemi
    { id: 1296, term: 'Anxiet/o', turkish: 'Kaygı', roots: 'anxiet/o', definition: 'Kaygı, anksiyete', category: 'roots', system: 'nervous', subcategory: 'psychiatric_mood_disorders', mainCategory: 'roots' },
    { id: 1297, term: 'Obsess/o', turkish: 'Saplantı', roots: 'obsess/o', definition: 'Saplantı, obsesyon', category: 'roots', system: 'nervous', subcategory: 'psychiatric_mood_disorders', mainCategory: 'roots' },
    { id: 1298, term: 'Compuls/o', turkish: 'Zorlama', roots: 'compuls/o', definition: 'Zorlantı, kompulsiyon', category: 'roots', system: 'nervous', subcategory: 'psychiatric_mood_disorders', mainCategory: 'roots' },
    { id: 1299, term: 'Hyster/o', turkish: 'Histeri (tarihsel)', roots: 'hyster/o', definition: 'Histeri, eski psikiyatrik terim', category: 'roots', system: 'nervous', subcategory: 'psychiatric_mood_disorders', mainCategory: 'roots' },
    { id: 1300, term: 'Delir/o', turkish: 'Bilinç taşması', roots: 'delir/o', definition: 'Deliryum, bilinç bozukluğu', category: 'roots', system: 'nervous', subcategory: 'psychiatric_mood_disorders', mainCategory: 'roots' },
    { id: 1301, term: 'Hallucin/o', turkish: 'Hayal görmek', roots: 'hallucin/o', definition: 'Halüsinasyon, yanı algı', category: 'roots', system: 'nervous', subcategory: 'psychiatric_mood_disorders', mainCategory: 'roots' },
    { id: 1302, term: 'Schiz/o', turkish: 'Bölünme', roots: 'schiz/o', definition: 'Bölünme, şizofreni', category: 'roots', system: 'nervous', subcategory: 'psychiatric_mood_disorders', mainCategory: 'roots' },

    // Nörolojik Tanı ve Girişimsel Yöntemler - Sinir Sistemi
    { id: 1303, term: 'Tom/o', turkish: 'Kesit', roots: 'tom/o', definition: 'Kesit, tomografi', category: 'roots', system: 'nervous', subcategory: 'diagnostic_interventional', mainCategory: 'roots' },
    { id: 1304, term: 'Graph/o', turkish: 'Yazmak / Kayıt', roots: 'graph/o', definition: 'Kayıt, grafi', category: 'roots', system: 'nervous', subcategory: 'diagnostic_interventional', mainCategory: 'roots' },
    { id: 1305, term: 'Imag/o', turkish: 'Görüntü', roots: 'imag/o', definition: 'Görüntüleme', category: 'roots', system: 'nervous', subcategory: 'diagnostic_interventional', mainCategory: 'roots' },
    { id: 1306, term: 'Electr/o', turkish: 'Elektrik', roots: 'electr/o', definition: 'Elektrik, EEG', category: 'roots', system: 'nervous', subcategory: 'diagnostic_interventional', mainCategory: 'roots' },
    { id: 1307, term: 'Echo', turkish: 'Yankı', roots: 'echo', definition: 'Yankı, ultrason', category: 'roots', system: 'nervous', subcategory: 'diagnostic_interventional', mainCategory: 'roots' },
    { id: 1308, term: 'Magnet/o', turkish: 'Mıknatıs', roots: 'magnet/o', definition: 'Manyetik, MRI', category: 'roots', system: 'nervous', subcategory: 'diagnostic_interventional', mainCategory: 'roots' },
    { id: 1309, term: 'Reson/o', turkish: 'Rezonans', roots: 'reson/o', definition: 'Rezonans, MR', category: 'roots', system: 'nervous', subcategory: 'diagnostic_interventional', mainCategory: 'roots' },
    { id: 1310, term: 'Punct/o', turkish: 'Delmek', roots: 'punct/o', definition: 'Delmek, ponksiyon', category: 'roots', system: 'nervous', subcategory: 'diagnostic_interventional', mainCategory: 'roots' },
    { id: 1311, term: 'Anastomos/o', turkish: 'Cerrahi bağlantı', roots: 'anastomos/o', definition: 'Cerrahi bağlantı, anastomoz', category: 'roots', system: 'nervous', subcategory: 'diagnostic_interventional', mainCategory: 'roots' },
    { id: 1312, term: 'Plast/o', turkish: 'Onarım', roots: 'plast/o', definition: 'Onarım, plastik cerrahi', category: 'roots', system: 'nervous', subcategory: 'diagnostic_interventional', mainCategory: 'roots' },
    { id: 1313, term: 'Syring/o', turkish: 'Kanal, tüp', roots: 'syring/o', definition: 'Kanal, siringomiyeli', category: 'roots', system: 'nervous', subcategory: 'diagnostic_interventional', mainCategory: 'roots' },
    { id: 1314, term: 'Vertig/o', turkish: 'Dönme', roots: 'vertig/o', definition: 'Vertigo, baş dönmesi', category: 'roots', system: 'nervous', subcategory: 'diagnostic_interventional', mainCategory: 'roots' },
    { id: 1315, term: 'Stup/o', turkish: 'Donakalma', roots: 'stup/o', definition: 'Stüpor, donakalma', category: 'roots', system: 'nervous', subcategory: 'diagnostic_interventional', mainCategory: 'roots' },
    { id: 1316, term: 'Rrhaph/o', turkish: 'Dikmek', roots: 'rrhaph/o', definition: 'Cerrahi dikme, rafi', category: 'roots', system: 'nervous', subcategory: 'diagnostic_interventional', mainCategory: 'roots' },

    // Göz Küresi ve Yardımcı Yapılar - Duyu Organları (Göz)
    { id: 1317, term: 'Ophthalm/o', turkish: 'Göz', roots: 'ophthalm/o', definition: 'Göz organı', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },
    { id: 1318, term: 'Orbit/o', turkish: 'Orbita', roots: 'orbit/o', definition: 'Göz çukuru', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },
    { id: 1319, term: 'Uve/o', turkish: 'Uvea', roots: 'uve/o', definition: 'Gözün orta tabakası', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },
    { id: 1320, term: 'Scler/o', turkish: 'Sklera', roots: 'scler/o', definition: 'Gözün beyaz tabakası', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },
    { id: 1321, term: 'Chori/o', turkish: 'Koroid', roots: 'chori/o', definition: 'Koroid tabaka', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },
    { id: 1322, term: 'Choroid/o', turkish: 'Koroid', roots: 'choroid/o', definition: 'Koroid tabaka', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },
    { id: 1323, term: 'Retin/o', turkish: 'Retina', roots: 'retin/o', definition: 'Ağ tabaka', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },
    { id: 1324, term: 'Kerat/o', turkish: 'Kornea', roots: 'kerat/o', definition: 'Sayı tabaka', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },
    { id: 1325, term: 'Phak/o', turkish: 'Lens', roots: 'phak/o', definition: 'Göz merceği', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },
    { id: 1326, term: 'Phac/o', turkish: 'Lens', roots: 'phac/o', definition: 'Göz merceği', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },
    { id: 1327, term: 'Con/o', turkish: 'Koni (fotoreseptör)', roots: 'con/o', definition: 'Koni hücresi', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },
    { id: 1328, term: 'Irid/o', turkish: 'İris', roots: 'irid/o', definition: 'Gözün renkli kısmı', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },
    { id: 1329, term: 'Ir/o', turkish: 'İris', roots: 'ir/o', definition: 'Gözün renkli kısmı', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },
    { id: 1330, term: 'Cycl/o', turkish: 'Siliyer cisim', roots: 'cycl/o', definition: 'Siliyer yapı', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },
    { id: 1331, term: 'Cor/o', turkish: 'Gözbebeği', roots: 'cor/o', definition: 'Püpil', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },
    { id: 1332, term: 'Papill/o', turkish: 'Papilla', roots: 'papill/o', definition: 'Optik papilla', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },
    { id: 1333, term: 'Blephar/o', turkish: 'Göz kapağı', roots: 'blephar/o', definition: 'Göz kapağı', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },
    { id: 1334, term: 'Dacry/o', turkish: 'Gözyaşı', roots: 'dacry/o', definition: 'Gözyaşı sistemi', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },
    { id: 1335, term: 'Lacrim/o', turkish: 'Gözyaşı', roots: 'lacrim/o', definition: 'Gözyaşı sistemi', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },
    { id: 1336, term: 'Conjunctiv/o', turkish: 'Konjonktiva', roots: 'conjunctiv/o', definition: 'Göz bağ dokus', category: 'roots', system: 'sensory', subcategory: 'eye_globe_structures', mainCategory: 'roots' },

    // Görme İşlevi ve Göz Hareketleri - Duyu Organları (Göz)
    { id: 1337, term: 'Op/o', turkish: 'Görme', roots: 'op/o', definition: 'Görme işlevi', category: 'roots', system: 'sensory', subcategory: 'vision_eye_movements', mainCategory: 'roots' },
    { id: 1338, term: 'Ops/o', turkish: 'Görme', roots: 'ops/o', definition: 'Görme işlevi', category: 'roots', system: 'sensory', subcategory: 'vision_eye_movements', mainCategory: 'roots' },
    { id: 1339, term: 'Phot/o', turkish: 'Işık', roots: 'phot/o', definition: 'Işık', category: 'roots', system: 'sensory', subcategory: 'vision_eye_movements', mainCategory: 'roots' },
    { id: 1340, term: 'Stigmat/o', turkish: 'Odak, nokta', roots: 'stigmat/o', definition: 'Odak noktası, astigmatizma', category: 'roots', system: 'sensory', subcategory: 'vision_eye_movements', mainCategory: 'roots' },
    { id: 1341, term: 'Trop/o', turkish: 'Dönme', roots: 'trop/o', definition: 'Dönme, tropi', category: 'roots', system: 'sensory', subcategory: 'vision_eye_movements', mainCategory: 'roots' },
    { id: 1342, term: 'My/o', turkish: 'Kas', roots: 'my/o', definition: 'Göz kası', category: 'roots', system: 'sensory', subcategory: 'vision_eye_movements', mainCategory: 'roots' },
    { id: 1343, term: 'Pleg/o', turkish: 'Felç', roots: 'pleg/o', definition: 'Felç, pleji', category: 'roots', system: 'sensory', subcategory: 'vision_eye_movements', mainCategory: 'roots' },
    { id: 1344, term: 'Spasm/o', turkish: 'Spazm', roots: 'spasm/o', definition: 'Kas spazmları', category: 'roots', system: 'sensory', subcategory: 'vision_eye_movements', mainCategory: 'roots' },
    { id: 1345, term: 'Nystagm/o', turkish: 'Sallanma', roots: 'nystagm/o', definition: 'Göz sallanması, nistagmus', category: 'roots', system: 'sensory', subcategory: 'vision_eye_movements', mainCategory: 'roots' },
    { id: 1346, term: 'Ton/o', turkish: 'Basınç', roots: 'ton/o', definition: 'Göz içi basıncı', category: 'roots', system: 'sensory', subcategory: 'vision_eye_movements', mainCategory: 'roots' },
    { id: 1347, term: 'Mi/o', turkish: 'Küçülme', roots: 'mi/o', definition: 'Püpil daralması, miyozis', category: 'roots', system: 'sensory', subcategory: 'vision_eye_movements', mainCategory: 'roots' },
    { id: 1348, term: 'Miot/o', turkish: 'Küçülme', roots: 'miot/o', definition: 'Püpil daralması, miyozis', category: 'roots', system: 'sensory', subcategory: 'vision_eye_movements', mainCategory: 'roots' },
    { id: 1349, term: 'Mydri/o', turkish: 'Genişleme', roots: 'mydri/o', definition: 'Püpil genişlemesi, midriazis', category: 'roots', system: 'sensory', subcategory: 'vision_eye_movements', mainCategory: 'roots' },

    // Görme Kaybı ve Göz Hastalıkları - Duyu Organları (Göz)
    { id: 1350, term: 'Ambly/o', turkish: 'Zayıflık', roots: 'ambly/o', definition: 'Görme zayıflığı, ambliyopi', category: 'roots', system: 'sensory', subcategory: 'vision_loss_diseases', mainCategory: 'roots' },
    { id: 1351, term: 'Chalaz/o', turkish: 'Gevşeme', roots: 'chalaz/o', definition: 'Gevşeme, şalazyon', category: 'roots', system: 'sensory', subcategory: 'vision_loss_diseases', mainCategory: 'roots' },
    { id: 1352, term: 'Ptos/o', turkish: 'Düşme', roots: 'ptos/o', definition: 'Düşme, pitozis', category: 'roots', system: 'sensory', subcategory: 'vision_loss_diseases', mainCategory: 'roots' },
    { id: 1353, term: 'Dipl/o', turkish: 'Çift', roots: 'dipl/o', definition: 'Çift görme, diplopi', category: 'roots', system: 'sensory', subcategory: 'vision_loss_diseases', mainCategory: 'roots' },
    { id: 1354, term: 'Omal/o', turkish: 'Düzensiz', roots: 'omal/o', definition: 'Düzensizlik, anomali', category: 'roots', system: 'sensory', subcategory: 'vision_loss_diseases', mainCategory: 'roots' },
    { id: 1355, term: 'Asthen/o', turkish: 'Güçsüzlük', roots: 'asthen/o', definition: 'Göz yorgunluğu, asteni', category: 'roots', system: 'sensory', subcategory: 'vision_loss_diseases', mainCategory: 'roots' },
    { id: 1356, term: 'My/o', turkish: 'Kısa (miyopi)', roots: 'my/o', definition: 'Miyopi, yakın görme', category: 'roots', system: 'sensory', subcategory: 'vision_loss_diseases', mainCategory: 'roots' },
    { id: 1357, term: 'Presby/o', turkish: 'Yaşlı', roots: 'presby/o', definition: 'Yaşlılık, presbiyopi', category: 'roots', system: 'sensory', subcategory: 'vision_loss_diseases', mainCategory: 'roots' },
    { id: 1358, term: 'Nyctal/o', turkish: 'Gece', roots: 'nyctal/o', definition: 'Gece körlüğü, niktalopi', category: 'roots', system: 'sensory', subcategory: 'vision_loss_diseases', mainCategory: 'roots' },
    { id: 1359, term: 'Angi/o', turkish: 'Damar', roots: 'angi/o', definition: 'Damar yapıları', category: 'roots', system: 'sensory', subcategory: 'vision_loss_diseases', mainCategory: 'roots' },
    { id: 1360, term: 'Glauc/o', turkish: 'Grimsi-yeşil', roots: 'glauc/o', definition: 'Glokom, yeşil su', category: 'roots', system: 'sensory', subcategory: 'vision_loss_diseases', mainCategory: 'roots' },
    { id: 1361, term: 'Edem/o', turkish: 'Ödem', roots: 'edem/o', definition: 'Ödem, şişlik', category: 'roots', system: 'sensory', subcategory: 'vision_loss_diseases', mainCategory: 'roots' },
    { id: 1362, term: 'Myc/o', turkish: 'Mantar', roots: 'myc/o', definition: 'Mantar enfeksiyonu', category: 'roots', system: 'sensory', subcategory: 'vision_loss_diseases', mainCategory: 'roots' },
    { id: 1363, term: 'Malac/o', turkish: 'Yumuşama', roots: 'malac/o', definition: 'Yumuşama, malazi', category: 'roots', system: 'sensory', subcategory: 'vision_loss_diseases', mainCategory: 'roots' },
    { id: 1364, term: 'Cataract/o', turkish: 'Bulanıklık', roots: 'cataract/o', definition: 'Katarakt, göz perdes', category: 'roots', system: 'sensory', subcategory: 'vision_loss_diseases', mainCategory: 'roots' },
    { id: 1365, term: 'Phob/o', turkish: 'Korku', roots: 'phob/o', definition: 'Korku, fobi', category: 'roots', system: 'sensory', subcategory: 'vision_loss_diseases', mainCategory: 'roots' },

    // Göz Muayenesi ve Cerrahi İşlemler - Duyu Organları (Göz)
    { id: 1366, term: 'Plast/o', turkish: 'Onarım', roots: 'plast/o', definition: 'Onarım, plastik cerrahi', category: 'roots', system: 'sensory', subcategory: 'examination_surgical', mainCategory: 'roots' },
    { id: 1367, term: 'Tach/o', turkish: 'Ayrılmak', roots: 'tach/o', definition: 'Ayrılma, dekolman', category: 'roots', system: 'sensory', subcategory: 'examination_surgical', mainCategory: 'roots' },
    { id: 1368, term: 'Pex/o', turkish: 'Sabitlemek', roots: 'pex/o', definition: 'Sabitleme, peksi', category: 'roots', system: 'sensory', subcategory: 'examination_surgical', mainCategory: 'roots' },
    { id: 1369, term: 'Sten/o', turkish: 'Daralma', roots: 'sten/o', definition: 'Daralma, stenoz', category: 'roots', system: 'sensory', subcategory: 'examination_surgical', mainCategory: 'roots' },
    { id: 1370, term: 'Coagul/o', turkish: 'Pıhtılaşma', roots: 'coagul/o', definition: 'Pıhtılaşma, koagülasyon', category: 'roots', system: 'sensory', subcategory: 'examination_surgical', mainCategory: 'roots' },
    { id: 1371, term: 'Son/o', turkish: 'Ses (USG)', roots: 'son/o', definition: 'Ses, ultrason', category: 'roots', system: 'sensory', subcategory: 'examination_surgical', mainCategory: 'roots' },

    // Kulak Yapıları ve İşitme Yolu - Duyu Organları (Kulak)
    { id: 1372, term: 'Ot/o', turkish: 'Kulak', roots: 'ot/o', definition: 'Kulak organı', category: 'roots', system: 'sensory', subcategory: 'ear_structures', mainCategory: 'roots' },
    { id: 1373, term: 'Cochle/o', turkish: 'Koklea', roots: 'cochle/o', definition: 'Salyangoz, iç kulak', category: 'roots', system: 'sensory', subcategory: 'ear_structures', mainCategory: 'roots' },
    { id: 1374, term: 'Labyrinth/o', turkish: 'Labirent', roots: 'labyrinth/o', definition: 'İç kulak labirenti', category: 'roots', system: 'sensory', subcategory: 'ear_structures', mainCategory: 'roots' },
    { id: 1375, term: 'Tympan/o', turkish: 'Timpan (kulak zarı)', roots: 'tympan/o', definition: 'Kulak zarı', category: 'roots', system: 'sensory', subcategory: 'ear_structures', mainCategory: 'roots' },
    { id: 1376, term: 'Myring/o', turkish: 'Kulak zarı', roots: 'myring/o', definition: 'Kulak zarı', category: 'roots', system: 'sensory', subcategory: 'ear_structures', mainCategory: 'roots' },
    { id: 1377, term: 'Eustach/o', turkish: 'Östaki tüpü', roots: 'eustach/o', definition: 'Östaki tüpü (eponim)', category: 'roots', system: 'sensory', subcategory: 'ear_structures', mainCategory: 'roots' },
    { id: 1378, term: 'Malle/o', turkish: 'Malleus', roots: 'malle/o', definition: 'Çekiç kemiği', category: 'roots', system: 'sensory', subcategory: 'ear_structures', mainCategory: 'roots' },
    { id: 1379, term: 'Incud/o', turkish: 'İnkus', roots: 'incud/o', definition: 'Örs kemiği', category: 'roots', system: 'sensory', subcategory: 'ear_structures', mainCategory: 'roots' },
    { id: 1380, term: 'Staped/o', turkish: 'Stapes', roots: 'staped/o', definition: 'Üzengi kemiği', category: 'roots', system: 'sensory', subcategory: 'ear_structures', mainCategory: 'roots' },
    { id: 1381, term: 'Ossicul/o', turkish: 'Kemikçikler', roots: 'ossicul/o', definition: 'Kulak kemikçikleri', category: 'roots', system: 'sensory', subcategory: 'ear_structures', mainCategory: 'roots' },
    { id: 1382, term: 'Trag/o', turkish: 'Çıkıntı (tragus)', roots: 'trag/o', definition: 'Tragus çıkıntısı', category: 'roots', system: 'sensory', subcategory: 'ear_structures', mainCategory: 'roots' },

    // İşitme, Denge ve Ses İletimi - Duyu Organları (Kulak)
    { id: 1383, term: 'Acus/o', turkish: 'İşitme', roots: 'acus/o', definition: 'İşitme işlevi', category: 'roots', system: 'sensory', subcategory: 'hearing_balance_sound', mainCategory: 'roots' },
    { id: 1384, term: 'Audi/o', turkish: 'İşitme', roots: 'audi/o', definition: 'İşitme işlevi', category: 'roots', system: 'sensory', subcategory: 'hearing_balance_sound', mainCategory: 'roots' },
    { id: 1385, term: 'Audit/o', turkish: 'İşitme', roots: 'audit/o', definition: 'İşitme işlevi', category: 'roots', system: 'sensory', subcategory: 'hearing_balance_sound', mainCategory: 'roots' },
    { id: 1386, term: 'Acoust/o', turkish: 'Ses', roots: 'acoust/o', definition: 'Ses, akustik', category: 'roots', system: 'sensory', subcategory: 'hearing_balance_sound', mainCategory: 'roots' },
    { id: 1387, term: 'Pas/o', turkish: 'Geçmek', roots: 'pas/o', definition: 'Geçme, pasaj', category: 'roots', system: 'sensory', subcategory: 'hearing_balance_sound', mainCategory: 'roots' },
    { id: 1388, term: 'Reflex/o', turkish: 'Geri dönüş', roots: 'reflex/o', definition: 'Refleks, geri dönüş', category: 'roots', system: 'sensory', subcategory: 'hearing_balance_sound', mainCategory: 'roots' },
    { id: 1389, term: 'Vertig/o', turkish: 'Dönme', roots: 'vertig/o', definition: 'Vertigo, baş dönmesi', category: 'roots', system: 'sensory', subcategory: 'hearing_balance_sound', mainCategory: 'roots' },

    // İşitme Kaybı ve Kulak Hastalıkları - Duyu Organları (Kulak)
    { id: 1390, term: 'Ambly/o', turkish: 'Zayıflık', roots: 'ambly/o', definition: 'İşitme zayıflığı', category: 'roots', system: 'sensory', subcategory: 'hearing_loss_diseases', mainCategory: 'roots' },
    { id: 1391, term: 'Tinn/o', turkish: 'Çınlama', roots: 'tinn/o', definition: 'Kulak çınlaması, tinnitus', category: 'roots', system: 'sensory', subcategory: 'hearing_loss_diseases', mainCategory: 'roots' },
    { id: 1392, term: 'Alg/o', turkish: 'Ağrı', roots: 'alg/o', definition: 'Ağrı, alji', category: 'roots', system: 'sensory', subcategory: 'hearing_loss_diseases', mainCategory: 'roots' },
    { id: 1393, term: 'Rrhe/o', turkish: 'Akıntı', roots: 'rrhe/o', definition: 'Akıntı, otore', category: 'roots', system: 'sensory', subcategory: 'hearing_loss_diseases', mainCategory: 'roots' },
    { id: 1394, term: 'Rrhag/o', turkish: 'Kanama', roots: 'rrhag/o', definition: 'Kanama, otoraji', category: 'roots', system: 'sensory', subcategory: 'hearing_loss_diseases', mainCategory: 'roots' },

    // Kulak Muayenesi ve Cerrahi İşlemler - Duyu Organları (Kulak)
    { id: 1395, term: 'Impedans/o', turkish: 'Direnç', roots: 'impedans/o', definition: 'Empedans, direnç', category: 'roots', system: 'sensory', subcategory: 'ear_examination_surgical', mainCategory: 'roots' },
    { id: 1396, term: 'Emiss/o', turkish: 'Yayılma', roots: 'emiss/o', definition: 'Emisyon, yayılma', category: 'roots', system: 'sensory', subcategory: 'ear_examination_surgical', mainCategory: 'roots' },
    { id: 1397, term: 'Plast/o', turkish: 'Onarım', roots: 'plast/o', definition: 'Onarım, plastik cerrahi', category: 'roots', system: 'sensory', subcategory: 'ear_examination_surgical', mainCategory: 'roots' },
    { id: 1398, term: 'Synthes/o', turkish: 'Birleştirme', roots: 'synthes/o', definition: 'Birleştirme, aspirasyon', category: 'roots', system: 'sensory', subcategory: 'ear_examination_surgical', mainCategory: 'roots' },

    // Deri, Ekleri ve Lezyon Tipleri - Deri Sistemi
    { id: 1399, term: 'Derm/o', turkish: 'Deri', roots: 'derm/o', definition: 'Deri tabakası', category: 'roots', system: 'skin', subcategory: 'skin_structures_lesions', mainCategory: 'roots' },
    { id: 1400, term: 'Dermat/o', turkish: 'Deri', roots: 'dermat/o', definition: 'Deri tabakası', category: 'roots', system: 'skin', subcategory: 'skin_structures_lesions', mainCategory: 'roots' },
    { id: 1401, term: 'Onych/o', turkish: 'Tırnak', roots: 'onych/o', definition: 'Tırnak yapısı', category: 'roots', system: 'skin', subcategory: 'skin_structures_lesions', mainCategory: 'roots' },
    { id: 1402, term: 'Capit/o', turkish: 'Baş derisi', roots: 'capit/o', definition: 'Baş derisi', category: 'roots', system: 'skin', subcategory: 'skin_structures_lesions', mainCategory: 'roots' },
    { id: 1403, term: 'Barb/o', turkish: 'Sakal', roots: 'barb/o', definition: 'Sakal bölgesi', category: 'roots', system: 'skin', subcategory: 'skin_structures_lesions', mainCategory: 'roots' },
    { id: 1404, term: 'Corpor/o', turkish: 'Vücut', roots: 'corpor/o', definition: 'Vücut derisi', category: 'roots', system: 'skin', subcategory: 'skin_structures_lesions', mainCategory: 'roots' },
    { id: 1405, term: 'Adip/o', turkish: 'Yağ', roots: 'adip/o', definition: 'Yağ dokusu', category: 'roots', system: 'skin', subcategory: 'skin_structures_lesions', mainCategory: 'roots' },
    { id: 1406, term: 'Cellul/o', turkish: 'Hücre', roots: 'cellul/o', definition: 'Hücre yapısı', category: 'roots', system: 'skin', subcategory: 'skin_structures_lesions', mainCategory: 'roots' },
    { id: 1407, term: 'Ped/o', turkish: 'Ayak', roots: 'ped/o', definition: 'Ayak derisi', category: 'roots', system: 'skin', subcategory: 'skin_structures_lesions', mainCategory: 'roots' },
    { id: 1408, term: 'Macul/o', turkish: 'Makül', roots: 'macul/o', definition: 'Düz leke', category: 'roots', system: 'skin', subcategory: 'skin_structures_lesions', mainCategory: 'roots' },
    { id: 1409, term: 'Papill/o', turkish: 'Papilla', roots: 'papill/o', definition: 'Papilla yapısı', category: 'roots', system: 'skin', subcategory: 'skin_structures_lesions', mainCategory: 'roots' },
    { id: 1410, term: 'Papul/o', turkish: 'Papül', roots: 'papul/o', definition: 'Kabartı lezyon', category: 'roots', system: 'skin', subcategory: 'skin_structures_lesions', mainCategory: 'roots' },
    { id: 1411, term: 'Pustul/o', turkish: 'Püstül', roots: 'pustul/o', definition: 'İrinli lezyon', category: 'roots', system: 'skin', subcategory: 'skin_structures_lesions', mainCategory: 'roots' },
    { id: 1412, term: 'Urtic/o', turkish: 'Ürtiker', roots: 'urtic/o', definition: 'Kurdeşen', category: 'roots', system: 'skin', subcategory: 'skin_structures_lesions', mainCategory: 'roots' },
    { id: 1413, term: 'Nev/o', turkish: 'Nevüs', roots: 'nev/o', definition: 'Ben, nevüs', category: 'roots', system: 'skin', subcategory: 'skin_structures_lesions', mainCategory: 'roots' },

    // Deri İşlevleri ve Fizyolojisi - Deri Sistemi
    { id: 1414, term: 'Pigment/o', turkish: 'Pigment', roots: 'pigment/o', definition: 'Renk pigmenti', category: 'roots', system: 'skin', subcategory: 'skin_functions_physiology', mainCategory: 'roots' },
    { id: 1415, term: 'Phor/o', turkish: 'Taşımak, terleme', roots: 'phor/o', definition: 'Terleme, taşıma', category: 'roots', system: 'skin', subcategory: 'skin_functions_physiology', mainCategory: 'roots' },
    { id: 1416, term: 'Hidr/o', turkish: 'Ter', roots: 'hidr/o', definition: 'Ter salgısı', category: 'roots', system: 'skin', subcategory: 'skin_functions_physiology', mainCategory: 'roots' },
    { id: 1417, term: 'Seborrh/o', turkish: 'Sebum akışı', roots: 'seborrh/o', definition: 'Yağ salgısı akışı', category: 'roots', system: 'skin', subcategory: 'skin_functions_physiology', mainCategory: 'roots' },
    { id: 1418, term: 'Steat/o', turkish: 'Yağ', roots: 'steat/o', definition: 'Yağ salgısı', category: 'roots', system: 'skin', subcategory: 'skin_functions_physiology', mainCategory: 'roots' },
    { id: 1419, term: 'Lip/o', turkish: 'Yağ', roots: 'lip/o', definition: 'Yağ dokusu', category: 'roots', system: 'skin', subcategory: 'skin_functions_physiology', mainCategory: 'roots' },
    { id: 1420, term: 'Leuk/o', turkish: 'Beyaz', roots: 'leuk/o', definition: 'Beyaz renk', category: 'roots', system: 'skin', subcategory: 'skin_functions_physiology', mainCategory: 'roots' },

    // Deri Hastalıkları ve Patolojik Süreçler - Deri Sistemi
    { id: 1421, term: 'Erythem/o', turkish: 'Kızarıklık', roots: 'erythem/o', definition: 'Kızarıklık, eritem', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1422, term: 'Acn/o', turkish: 'Sivilce', roots: 'acn/o', definition: 'Akne, sivilce', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1423, term: 'Albin/o', turkish: 'Beyaz', roots: 'albin/o', definition: 'Albinizm, beyazlık', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1424, term: 'Alopec/o', turkish: 'Saç dökülmesi', roots: 'alopec/o', definition: 'Alopesi, kellik', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1425, term: 'Atop/o', turkish: 'Alışılmadık', roots: 'atop/o', definition: 'Atopi, alerjik durum', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1426, term: 'Chloas/o', turkish: 'Pigment', roots: 'chloas/o', definition: 'Kloazma, pigmentasyon', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1427, term: 'Cicatr/o', turkish: 'Yara izi', roots: 'cicatr/o', definition: 'Skar, yara izi', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1428, term: 'Myc/o', turkish: 'Mantar', roots: 'myc/o', definition: 'Mantar enfeksiyonu', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1429, term: 'Cerat/o', turkish: 'Sert yapı', roots: 'cerat/o', definition: 'Sert, keratinize', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1430, term: 'Xer/o', turkish: 'Kuruluk', roots: 'xer/o', definition: 'Kuru deri, kserozis', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1431, term: 'Ecchym/o', turkish: 'Ekimoz', roots: 'ecchym/o', definition: 'Morluk, ekimoz', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1432, term: 'Petech/o', turkish: 'Peteşi', roots: 'petech/o', definition: 'Nokta kanama', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1433, term: 'Tine/o', turkish: 'Dermatofit enfeksiyonu', roots: 'tine/o', definition: 'Tinea, mantar', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1434, term: 'Py/o', turkish: 'İrin', roots: 'py/o', definition: 'İrin oluşumu', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1435, term: 'Gangren/o', turkish: 'Gangren', roots: 'gangren/o', definition: 'Doku ölümü, gangren', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1436, term: 'Necr/o', turkish: 'Nekroz', roots: 'necr/o', definition: 'Doku ölümü', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1437, term: 'Kerat/o', turkish: 'Keratin', roots: 'kerat/o', definition: 'Keratin yapısı', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1438, term: 'Psor/o', turkish: 'Kaşıntılı döküntü', roots: 'psor/o', definition: 'Psoriazis, sedef', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1439, term: 'Pemphig/o', turkish: 'Bül', roots: 'pemphig/o', definition: 'Pemfigus, büllü hastalık', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1440, term: 'Pedicul/o', turkish: 'Bit (parazit)', roots: 'pedicul/o', definition: 'Bit enfestasyonu', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },
    { id: 1441, term: 'Melan/o', turkish: 'Melanin', roots: 'melan/o', definition: 'Melanin pigmenti', category: 'roots', system: 'skin', subcategory: 'skin_diseases_pathology', mainCategory: 'roots' },

    // Dermatolojik Tanı ve Tedavi Yöntemleri - Deri Sistemi
    { id: 1442, term: 'Electr/o', turkish: 'Elektrik', roots: 'electr/o', definition: 'Elektrik tedavisi', category: 'roots', system: 'skin', subcategory: 'dermatologic_diagnosis_treatment', mainCategory: 'roots' },
    { id: 1443, term: 'Desiccat/o', turkish: 'Kurutma', roots: 'desiccat/o', definition: 'Kurutma işlemi', category: 'roots', system: 'skin', subcategory: 'dermatologic_diagnosis_treatment', mainCategory: 'roots' },
    { id: 1444, term: 'Erupt/o', turkish: 'Dökülme', roots: 'erupt/o', definition: 'Döküntü, erüpsiyon', category: 'roots', system: 'skin', subcategory: 'dermatologic_diagnosis_treatment', mainCategory: 'roots' },
    { id: 1445, term: 'Fulgur/o', turkish: 'Yakma', roots: 'fulgur/o', definition: 'Elektrokoagülasyon', category: 'roots', system: 'skin', subcategory: 'dermatologic_diagnosis_treatment', mainCategory: 'roots' },
    { id: 1446, term: 'Cry/o', turkish: 'Soğuk', roots: 'cry/o', definition: 'Kriyoterapi, soğuk tedavi', category: 'roots', system: 'skin', subcategory: 'dermatologic_diagnosis_treatment', mainCategory: 'roots' },
    { id: 1447, term: 'Abras/o', turkish: 'Kazımak', roots: 'abras/o', definition: 'Abrazyon, kazıma', category: 'roots', system: 'skin', subcategory: 'dermatologic_diagnosis_treatment', mainCategory: 'roots' },
    { id: 1448, term: 'Suct/o', turkish: 'Emme', roots: 'suct/o', definition: 'Emme, aspirasyon', category: 'roots', system: 'skin', subcategory: 'dermatologic_diagnosis_treatment', mainCategory: 'roots' },
    { id: 1449, term: 'Cis/o', turkish: 'Kesmek', roots: 'cis/o', definition: 'Kesme, eksizyon', category: 'roots', system: 'skin', subcategory: 'dermatologic_diagnosis_treatment', mainCategory: 'roots' },
    { id: 1450, term: 'Graft/o', turkish: 'Greft', roots: 'graft/o', definition: 'Deri grefti', category: 'roots', system: 'skin', subcategory: 'dermatologic_diagnosis_treatment', mainCategory: 'roots' },

    // Koku ve Tat Alma Yapıları - Duyu Organları (Koku/Tat)
    { id: 1451, term: 'Olfactor/o', turkish: 'Koku (olfaktör)', roots: 'olfactor/o', definition: 'Koku alma yapısı', category: 'roots', system: 'sensory', subcategory: 'smell_taste_structures', mainCategory: 'roots' },

    // Koku ve Tat Algısı - Duyu Organları (Koku/Tat)
    { id: 1452, term: 'Osm/o', turkish: 'Koku', roots: 'osm/o', definition: 'Koku algısı', category: 'roots', system: 'sensory', subcategory: 'smell_taste_perception', mainCategory: 'roots' },
    { id: 1453, term: 'Eus/o', turkish: 'Tat', roots: 'eus/o', definition: 'Tat algısı', category: 'roots', system: 'sensory', subcategory: 'smell_taste_perception', mainCategory: 'roots' },
    { id: 1454, term: 'Gus/o', turkish: 'Tat', roots: 'gus/o', definition: 'Tat alma', category: 'roots', system: 'sensory', subcategory: 'smell_taste_perception', mainCategory: 'roots' },

    // Koku ve Tat Bozuklukları - Duyu Organları (Koku/Tat)
    { id: 1455, term: 'Phantasm/o', turkish: 'Hayal (fantosmi)', roots: 'phantasm/o', definition: 'Hayali koku algısı, fantosmi', category: 'roots', system: 'sensory', subcategory: 'smell_taste_disorders', mainCategory: 'roots' },

    // Endokrin Bezler ve Organlar - Endokrin Sistemi
    { id: 1456, term: 'Adrenal/o', turkish: 'Adrenal bez', roots: 'adrenal/o', definition: 'Böbrek üstü bezi', category: 'roots', system: 'endocrine', subcategory: 'endocrine_glands_organs', mainCategory: 'roots' },
    { id: 1457, term: 'Thyroid/o', turkish: 'Tiroid', roots: 'thyroid/o', definition: 'Tiroid bezi', category: 'roots', system: 'endocrine', subcategory: 'endocrine_glands_organs', mainCategory: 'roots' },
    { id: 1458, term: 'Pituitar/o', turkish: 'Hipofiz', roots: 'pituitar/o', definition: 'Hipofiz bezi', category: 'roots', system: 'endocrine', subcategory: 'endocrine_glands_organs', mainCategory: 'roots' },
    { id: 1459, term: 'Gonad/o', turkish: 'Gonad', roots: 'gonad/o', definition: 'Üreme bezleri', category: 'roots', system: 'endocrine', subcategory: 'endocrine_glands_organs', mainCategory: 'roots' },
    { id: 1460, term: 'Aden/o', turkish: 'Bez', roots: 'aden/o', definition: 'Bez yapısı', category: 'roots', system: 'endocrine', subcategory: 'endocrine_glands_organs', mainCategory: 'roots' },

    // Hormonlar ve Metabolik Kontroller - Endokrin Sistemi
    { id: 1461, term: 'Insulin/o', turkish: 'İnsülin', roots: 'insulin/o', definition: 'İnsülin hormonu', category: 'roots', system: 'endocrine', subcategory: 'hormones_metabolic_controls', mainCategory: 'roots' },
    { id: 1462, term: 'Calc/o', turkish: 'Kalsiyum', roots: 'calc/o', definition: 'Kalsiyum minerali', category: 'roots', system: 'endocrine', subcategory: 'hormones_metabolic_controls', mainCategory: 'roots' },
    { id: 1463, term: 'Glyc/o', turkish: 'Glikoz', roots: 'glyc/o', definition: 'Glikoz, şeker', category: 'roots', system: 'endocrine', subcategory: 'hormones_metabolic_controls', mainCategory: 'roots' },
    { id: 1464, term: 'Kal/i', turkish: 'Potasyum', roots: 'kal/i', definition: 'Potasyum minerali', category: 'roots', system: 'endocrine', subcategory: 'hormones_metabolic_controls', mainCategory: 'roots' },
    { id: 1465, term: 'Natr/i', turkish: 'Sodyum', roots: 'natr/i', definition: 'Sodyum minerali', category: 'roots', system: 'endocrine', subcategory: 'hormones_metabolic_controls', mainCategory: 'roots' },

    // Endokrin Bozuklukların Klinik Görünümleri - Endokrin Sistemi
    { id: 1466, term: 'Acr/o', turkish: 'Uç, ekstremite', roots: 'acr/o', definition: 'Uç nokta, akromegali', category: 'roots', system: 'endocrine', subcategory: 'endocrine_clinical_manifestations', mainCategory: 'roots' },
    { id: 1467, term: 'Megal/o', turkish: 'Büyük', roots: 'megal/o', definition: 'Büyüme, megali', category: 'roots', system: 'endocrine', subcategory: 'endocrine_clinical_manifestations', mainCategory: 'roots' },
    { id: 1468, term: 'Gynec/o', turkish: 'Kadın', roots: 'gynec/o', definition: 'Kadın, jinekomasti', category: 'roots', system: 'endocrine', subcategory: 'endocrine_clinical_manifestations', mainCategory: 'roots' },
    { id: 1469, term: 'Mast/o', turkish: 'Meme', roots: 'mast/o', definition: 'Meme dokusu', category: 'roots', system: 'endocrine', subcategory: 'endocrine_clinical_manifestations', mainCategory: 'roots' },
    { id: 1470, term: 'Dips/o', turkish: 'Susuzluk', roots: 'dips/o', definition: 'Aşırı susuzluk, polidipsi', category: 'roots', system: 'endocrine', subcategory: 'endocrine_clinical_manifestations', mainCategory: 'roots' },

    // Eski terimler (geriye dönük uyumluluk için)
    { id: 35, term: 'Arthr/o', turkish: 'Eklem', roots: 'arthr/o', definition: 'Eklem anlamına gelen kök. Örnek: Arthritis (eklem iltihabı)', category: 'roots' },
    { id: 36, term: 'Oste/o', turkish: 'Kemik', roots: 'oste/o', definition: 'Kemik anlamına gelen kök. Örnek: Osteoporosis (kemik erimesi)', category: 'roots' },
    { id: 37, term: 'My/o', turkish: 'Kas', roots: 'my/o', definition: 'Kas anlamına gelen kök. Örnek: Myalgia (kas ağrısı)', category: 'roots' },
    { id: 38, term: 'Chondr/o', turkish: 'Kıkırdak', roots: 'chondr/o', definition: 'Kıkırdak anlamına gelen kök. Örnek: Chondroma (kıkırdak tümörü)', category: 'roots' },
    { id: 39, term: '-itis', turkish: 'İltihap', roots: '-itis', definition: 'İltihap anlamına gelen sonek. Örnek: Arthritis (eklem iltihabı)', category: 'roots' },
    { id: 40, term: '-ectomy', turkish: 'Çıkarma', roots: '-ectomy', definition: 'Cerrahi çıkarma anlamına gelen sonek. Örnek: Bursectomy', category: 'roots' },
    { id: 41, term: '-plasty', turkish: 'Onarım/Şekillendirme', roots: '-plasty', definition: 'Cerrahi onarım anlamına gelen sonek. Örnek: Arthroplasty', category: 'roots' },
    { id: 42, term: '-tomy', turkish: 'Kesme', roots: '-tomy', definition: 'Cerrahi kesme anlamına gelen sonek. Örnek: Craniotomy', category: 'roots' },
    { id: 43, term: '-algia', turkish: 'Ağrı', roots: '-algia', definition: 'Ağrı anlamına gelen sonek. Örnek: Myalgia (kas ağrısı)', category: 'roots' },
    { id: 44, term: 'Crani/o', turkish: 'Kafatası', roots: 'crani/o', definition: 'Kafatası anlamına gelen kök. Örnek: Craniotomy', category: 'roots' },
    { id: 45, term: 'Cervic/o', turkish: 'Boyun', roots: 'cervic/o', definition: 'Boyun anlamına gelen kök. Örnek: Cervical', category: 'roots' },
    { id: 46, term: 'Lumb/o', turkish: 'Bel', roots: 'lumb/o', definition: 'Bel bölgesi anlamına gelen kök. Örnek: Lumbar', category: 'roots' },
    { id: 47, term: 'Cost/o', turkish: 'Kaburga', roots: 'cost/o', definition: 'Kaburga anlamına gelen kök. Örnek: Costal', category: 'roots' },
    { id: 48, term: 'Carp/o', turkish: 'Bilek', roots: 'carp/o', definition: 'El bileği kemikleri anlamına gelen kök. Örnek: Carpal', category: 'roots' }
  ],
  pathology: [
    { id: 49, term: 'Arthralgia', turkish: 'Artralji (Eklem ağrısı)', roots: 'arthron (eklem) + -algia (ağrı)', definition: 'Bir veya daha fazla eklemde ağrı', category: 'pathology' },
    { id: 50, term: 'Arthritis', turkish: 'Artrit (Eklem iltihabı)', roots: 'arthron (eklem) + -itis (iltihap)', definition: 'Bir veya daha fazla eklemin iltihaplanması', category: 'pathology' },
    { id: 51, term: 'Osteoporosis', turkish: 'Osteoporoz (Kemik erimesi)', roots: 'osteon (kemik) + poros (delik) + -osis (durum)', definition: 'Kemiklerin zayıf ve kırılgan hale gelmesi', category: 'pathology' },
    { id: 52, term: 'Osteomyelitis', turkish: 'Osteomiyelit (Kemik iltihabı)', roots: 'osteon (kemik) + myelos (ilik) + -itis (iltihap)', definition: 'Kemiğin iltihaplanması, genellikle bakteriyel enfeksiyon', category: 'pathology' },
    { id: 53, term: 'Myalgia', turkish: 'Miyalji (Kas ağrısı)', roots: 'mys (kas) + -algia (ağrı)', definition: 'Kas ağrısı veya sancısı', category: 'pathology' },
    { id: 54, term: 'Myositis', turkish: 'Miyozit (Kas iltihabı)', roots: 'mys (kas) + -itis (iltihap)', definition: 'Kasların iltihaplanması', category: 'pathology' },
    { id: 55, term: 'Bursitis', turkish: 'Bursit (Bursa iltihabı)', roots: 'bursa (kese) + -itis (iltihap)', definition: 'Bursa kesesinin iltihaplanması', category: 'pathology' },
    { id: 56, term: 'Tendinitis', turkish: 'Tendinit (Tendon iltihabı)', roots: 'tendon (tendon) + -itis (iltihap)', definition: 'Tendonun iltihaplanması', category: 'pathology' },
    { id: 57, term: 'Scoliosis', turkish: 'Skolyoz (Omurganın yana eğriliği)', roots: 'skoliosis (eğri)', definition: 'Omurganın yana doğru eğriliği', category: 'pathology' },
    { id: 58, term: 'Kyphosis', turkish: 'Kifoz (Sırt kamburluğu)', roots: 'kyphos (eğri)', definition: 'Omurganın anormal dışa doğru eğriliği', category: 'pathology' },
    { id: 59, term: 'Lordosis', turkish: 'Lordoz (Bel çukurunun artması)', roots: 'lordos (geriye eğilmiş)', definition: 'Omurganın anormal içe doğru eğriliği', category: 'pathology' },
    { id: 60, term: 'Chondromalacia', turkish: 'Kondromalazi (Kıkırdak yumuşaması)', roots: 'chondros (kıkırdak) + malakia (yumuşaklık)', definition: 'Kıkırdağın yumuşaması veya dejenerasyonu', category: 'pathology' },
    { id: 61, term: 'Osteoma', turkish: 'Osteom (Kemik tümörü)', roots: 'osteon (kemik) + -oma (tümör)', definition: 'İyi huylu kemik tümörü', category: 'pathology' },
    { id: 62, term: 'Osteosarcoma', turkish: 'Osteosarkom (Kemik kanseri)', roots: 'osteon (kemik) + sarcoma (et tümörü)', definition: 'Kötü huylu kemik tümörü', category: 'pathology' },
    { id: 63, term: 'Fibromyalgia', turkish: 'Fibromiyalji (Yaygın kas ağrısı)', roots: 'fibra (lif) + mys (kas) + -algia (ağrı)', definition: 'Yaygın kas-iskelet sistemi ağrısı', category: 'pathology' },
    { id: 64, term: 'Atrophy', turkish: 'Atrofi (Kas erimesi)', roots: 'a- (yok) + trophē (beslenme)', definition: 'Kas veya dokunun küçülmesi', category: 'pathology' }
  ]
};

// Get all terms as a flat array
export const getAllTerms = () => {
  return Object.values(medicalTermsData).flat();
};

// Get terms by category
export const getTermsByCategory = (categoryId) => {
  return medicalTermsData[categoryId] || [];
};

// Get terms by body system
export const getTermsBySystem = (systemId, mainCategoryId = null) => {
  const allTerms = getAllTerms();
  return allTerms.filter(term => {
    const systemMatch = term.system === systemId;
    const mainCategoryMatch = mainCategoryId ? term.mainCategory === mainCategoryId : true;
    return systemMatch && mainCategoryMatch;
  });
};

// Get terms by system and subcategory
export const getTermsBySubcategory = (systemId, subcategoryId, mainCategoryId = null) => {
  const allTerms = getAllTerms();
  return allTerms.filter(term => {
    const systemMatch = term.system === systemId;
    const subcategoryMatch = term.subcategory === subcategoryId;
    const mainCategoryMatch = mainCategoryId ? term.mainCategory === mainCategoryId : true;
    return systemMatch && subcategoryMatch && mainCategoryMatch;
  });
};

// Get random terms for games
export const getRandomTerms = (count = 10, categoryId = null) => {
  const terms = categoryId ? getTermsByCategory(categoryId) : getAllTerms();
  const shuffled = [...terms].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Search terms
export const searchTerms = (query) => {
  const allTerms = getAllTerms();
  const lowerQuery = query.toLowerCase();
  return allTerms.filter(term =>
    term.term.toLowerCase().includes(lowerQuery) ||
    term.turkish.toLowerCase().includes(lowerQuery) ||
    term.definition.toLowerCase().includes(lowerQuery)
  );
};