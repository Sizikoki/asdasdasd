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
    { id: 'joints', name: 'Eklemler & Hareket' },
    { id: 'skull_bones', name: 'Kafatası Kemikleri' },
    { id: 'face_bones', name: 'Yüz Kemikleri' },
    { id: 'trunk_bones', name: 'Gövde Kemikleri' },
    { id: 'anatomic_direction', name: 'Anatomik Yön Terimleri' },
    { id: 'basic_movement', name: 'Temel Hareket Terimleri' },
    { id: 'regional_movement', name: 'Bölgesel Hareket Terimleri' },
    { id: 'upper_extremity_bones', name: 'Üst Extremite Kemikleri' },
    { id: 'lower_extremity_bones', name: 'Alt Extremite Kemikleri' },
    { id: 'upper_extremity_joints', name: 'Üst Ekstremite Eklemleri' },
    { id: 'lower_extremity_joints', name: 'Alt Ekstremite Eklemleri' },
    { id: 'spine_joints', name: 'Omurga Eklemleri' },
    { id: 'head_and_neck_joints', name: 'Kafa ve Boyun Eklemleri' }
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
    "skull_bones": [
        {
            "id": 65,
            "term": "Os Frontale",
            "turkish": "Frontal Bone",
            "english": "Frontal Bone",
            "roots": "os (kemik) + frons (alın)",
            "definition": "Beyni çevreleyen ve koruyan, kafatasının üst kısmını oluşturan kemiktir.",
            "turkishDefinition": "Beyni çevreleyen ve koruyan, kafatasının üst kısmını oluşturan kemiktir.",
            "englishDefinition": "Forms the forehead and anterior cranial roof, articulating posteriorly with the parietal bones at the coronal suture.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Beyni çevreleyen ve koruyan, kafatasının üst kısmını oluşturan kemiktir"
        },
        {
            "id": 66,
            "term": "Os Parietale",
            "turkish": "Parietal Bone",
            "english": "Parietal Bone",
            "roots": "os (kemik) + paries (duvar)",
            "definition": "Kafatasının üst dış duvarını ve tavanını oluşturan büyük, kavisli bir kemiktir.",
            "turkishDefinition": "Kafatasının üst dış duvarını ve tavanını oluşturan büyük, kavisli bir kemiktir.",
            "englishDefinition": "A paired bone forming the lateral walls and roof of the cranium, joined to its mate at the sagittal suture.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Kafatasının üst dış duvarını ve tavanını oluşturan büyük, kavisli bir kemiktir"
        },
        {
            "id": 67,
            "term": "Os Temporale",
            "turkish": "Temporal Bone",
            "english": "Temporal Bone",
            "roots": "os (kemik) + tempus (şakak)",
            "definition": "Kafatasının alt yan duvarlarına katkıda bulunur.",
            "turkishDefinition": "Kafatasının alt yan duvarlarına katkıda bulunur.",
            "englishDefinition": "Forms part of the lateral skull base and houses the structures of hearing and balance within the ear.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Kafatasının alt yan duvarlarına katkıda bulunur"
        },
        {
            "id": 68,
            "term": "Os Occipitale",
            "turkish": "Occipital Bone",
            "english": "Occipital Bone",
            "roots": "os (kemik) + occiput (ense)",
            "definition": "Kafatasının arka duvarının ve tabanının büyük bir bölümünü oluşturan kemiktir.",
            "turkishDefinition": "Kafatasının arka duvarının ve tabanının büyük bir bölümünü oluşturan kemiktir.",
            "englishDefinition": "Forms the posterior skull and base, containing the foramen magnum through which the spinal cord passes.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Kafatasının arka duvarının ve tabanının büyük bir bölümünü oluşturan kemiktir"
        },
        {
            "id": 69,
            "term": "Os Sphenoideum",
            "turkish": "Sphenoid Bone",
            "english": "Sphenoid Bone",
            "roots": "os (kemik) + sphen (kama)",
            "definition": "Beyni çevreleyen ve koruyan kafatasının üst kısmını oluşturan kemiklerden biridir.",
            "turkishDefinition": "Beyni çevreleyen ve koruyan kafatasının üst kısmını oluşturan kemiklerden biridir.",
            "englishDefinition": "A wedge-shaped bone forming the central skull base, articulating with nearly all other cranial bones.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Beyni çevreleyen ve koruyan kafatasının üst kısmını oluşturan kemiklerden biridir"
        },
        {
            "id": 70,
            "term": "Os Ethmoideum",
            "turkish": "Ethmoid Bone",
            "english": "Ethmoid Bone",
            "roots": "os (kemik) + ethmos (elek)",
            "definition": "Kafatasının üst kısmında yer alır ve beyni çevreleyip korur.",
            "turkishDefinition": "Kafatasının üst kısmında yer alır ve beyni çevreleyip korur.",
            "englishDefinition": "A light, sieve-like bone forming part of the anterior skull base and nasal cavity roof, with perforations for olfactory nerves.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "skull_bones",
            "turkishShort": "Kafatasının üst kısmında yer alır ve beyni çevreleyip korur"
        }
    ],
    "face_bones": [
        {
            "id": 71,
            "term": "Os Nasale",
            "turkish": "Nasal Bone",
            "roots": "os (kemik) + nasus (burun)",
            "definition": "Üst yüzün ortasında, Maxilla ön çıkıntıları arasında yan yana yer alan küçük dikdörtgen şekilli kemikler olup birlikte burun sırtını oluştururlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Üst yüzün ortasında, Maxilla ön çıkıntıları arasında yan yana yer alan küçük dikdörtgen şekilli kemikler olup birlikte burun sırtını oluştururlar"
        },
        {
            "id": 72,
            "term": "Os Lacrimalia",
            "turkish": "Lacrimal Bone",
            "roots": "os (kemik) + lacrima (gözyaşı)",
            "definition": "Medial Orbital duvarların ön kısmını oluşturan çiftli kraniofasiyal kemiklerdir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Medial Orbital duvarların ön kısmını oluşturan çiftli kraniofasiyal kemiklerdir"
        },
        {
            "id": 73,
            "term": "Os Zygomaticum",
            "turkish": "Zygomatic Bone",
            "roots": "os (kemik) + zygoma (yanak)",
            "definition": "Yanağın çıkıntısını oluşturan önemli bir yüz kemiğidir. Şekli kabaca dikdörtgen şeklindedir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Yanağın çıkıntısını oluşturan önemli bir yüz kemiğidir"
        },
        {
            "id": 74,
            "term": "Maxilla",
            "turkish": "Maxilla",
            "roots": "maxilla (üst çene)",
            "definition": "Yüzün orta üçte birini oluşturan, orta hatta birleşen bir çift simetrik kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Yüzün orta üçte birini oluşturan, orta hatta birleşen bir çift simetrik kemiktir"
        },
        {
            "id": 75,
            "term": "Os Palatinum",
            "turkish": "Palatine Bone",
            "roots": "os (kemik) + palatum (damak)",
            "definition": "Orta hatta birleşen çift L şeklinde kemiklerdir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Orta hatta birleşen çift L şeklinde kemiklerdir"
        },
        {
            "id": 76,
            "term": "Processus Maxillaris Conchae Nasalis Inferioris",
            "turkish": "Maxillary Process of Inferior Nasal Concha",
            "roots": "processus (çıkıntı) + maxilla + concha (kabuk)",
            "definition": "Inferior Nasal Concha'nın lateral yüzünden çıkan, Maxilla ile eklemleşen kemik çıkıntısıdır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Inferior Nasal Concha'nın lateral yüzünden çıkan, Maxilla ile eklemleşen kemik çıkıntısıdır"
        },
        {
            "id": 77,
            "term": "Vomer",
            "turkish": "Vomer",
            "roots": "vomer (saban demiri)",
            "definition": "Eşlenmemiş yüz kemiklerinden biridir ve kemik nasal septumun posteroinferior bölümünü oluşturur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Eşlenmemiş yüz kemiklerinden biridir ve kemik nasal septumun posteroinferior bölümünü oluşturur"
        },
        {
            "id": 78,
            "term": "Mandibula",
            "turkish": "Mandible",
            "roots": "mandibula (alt çene)",
            "definition": "Alt çenenin tek orta hat kemiğidir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "face_bones",
            "turkishShort": "Alt çenenin tek orta hat kemiğidir"
        }
    ],
    "trunk_bones": [
        {
            "id": 79,
            "term": "Columna Vertebralis",
            "turkish": "Vertebral Column",
            "roots": "columna (sütun) + vertebra (omur)",
            "definition": "Omur adı verilen ve Intervertebral Disklerle birbirinden ayrılan 33 kemikten oluşur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_bones",
            "turkishShort": "Omur adı verilen ve Intervertebral Disklerle birbirinden ayrılan 33 kemikten oluşur"
        },
        {
            "id": 80,
            "term": "Sternum",
            "turkish": "Sternum",
            "roots": "sternum (göğüs kemiği)",
            "definition": "Clavicula ve Kaburgalarla eklemlenen ön orta hat göğüs duvarı kemik plakasıdır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_bones",
            "turkishShort": "Clavicula ve Kaburgalarla eklemlenen ön orta hat göğüs duvarı kemik plakasıdır"
        },
        {
            "id": 81,
            "term": "Costae",
            "turkish": "Ribs",
            "roots": "costa (kaburga)",
            "definition": "Göğüs organlarını koruyan göğüs kafesinin ana yapısını oluşturur, ancak asıl işlevi solunuma yardımcı olmaktır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_bones",
            "turkishShort": "Göğüs organlarını koruyan göğüs kafesinin ana yapısını oluşturur, ancak asıl işlevi solunuma yardımcı olmaktır"
        },
        {
            "id": 82,
            "term": "Vertebra",
            "turkish": "Vertebra",
            "roots": "vertebra (omur)",
            "definition": "Omur, Omurga'nın temel segmental birimidir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "trunk_bones",
            "turkishShort": "Omur, Omurga'nın temel segmental birimidir"
        }
    ],
    "upper_extremity_bones": [
        {
            "id": 83,
            "term": "Scapula",
            "turkish": "Scapula",
            "roots": "scapula (kürek kemiği)",
            "definition": "Kabaca üçgen şeklinde bir göğüs kemeri kemiğidir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Kabaca üçgen şeklinde bir göğüs kemeri kemiğidir"
        },
        {
            "id": 84,
            "term": "Clavicula",
            "turkish": "Clavicle",
            "roots": "clavicula (köprücük kemiği)",
            "definition": "Göğüs kemerinin aksial iskelete bağlayan tek kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Göğüs kemerinin aksial iskelete bağlayan tek kemiktir"
        },
        {
            "id": 85,
            "term": "Humerus",
            "turkish": "Humerus",
            "roots": "humerus (kol kemiği)",
            "definition": "Üst kol bölgesinde yer alan uzun bir kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Üst kol bölgesinde yer alan uzun bir kemiktir"
        },
        {
            "id": 86,
            "term": "Radius",
            "turkish": "Radius",
            "roots": "radius (tekerlek çubuğu)",
            "definition": "Ön kolda bulunan ve başparmak tarafındaki kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ön kolda bulunan ve başparmak tarafındaki kemiktir"
        },
        {
            "id": 87,
            "term": "Ulna",
            "turkish": "Ulna",
            "roots": "ulna (dirsek kemiği)",
            "definition": "Ön kolda bulunan ve serçe parmak tarafında bulunan kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ön kolda bulunan ve serçe parmak tarafında bulunan kemiktir"
        },
        {
            "id": 88,
            "term": "Ossa Carpi",
            "turkish": "Carpal Bones",
            "roots": "ossa (kemikler) + carpus (el bileği)",
            "definition": "El bileğini oluşturan 8 kısa kemikten meydana gelir ve ön kol ile el arasındaki eklemleşmeyi sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "El bileğini oluşturan 8 kısa kemikten meydana gelir ve ön kol ile el arasındaki eklemleşmeyi sağlar"
        },
        {
            "id": 89,
            "term": "Ossa Metacarpi",
            "turkish": "Metacarpal Bones",
            "roots": "ossa (kemikler) + metacarpus (el ayası)",
            "definition": "El iskeletinde Ossa Carpi ile Phalanges Proximales arasında yer alan 5 uzun kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "El iskeletinde Ossa Carpi ile Phalanges Proximales arasında yer alan 5 uzun kemiktir"
        },
        {
            "id": 90,
            "term": "Phalanx Manus",
            "turkish": "Phalanx of Hand",
            "roots": "phalanx (parmak kemiği) + manus (el)",
            "definition": "Phalanges Digitorum Manus, parmakların kemikleridir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Phalanges Digitorum Manus, parmakların kemikleridir"
        },
        {
            "id": 301,
            "term": "Fovea Articularis Capitis Radii",
            "turkish": "Articular Facet of Head of Radius",
            "roots": "fovea (çukur) + articularis (eklem) + caput (baş) + radius (döner kemik)",
            "definition": "Radius başının eklem çukuru; ön kol kemiğinin üst ucundaki çukurluk.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius başının eklem çukuru"
        },
        {
            "id": 302,
            "term": "Caput Radii",
            "turkish": "Head of Radius",
            "roots": "caput (baş) + radius (döner kemik)",
            "definition": "Radius başı; döner kemiğin üst ucu.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius başı"
        },
        {
            "id": 303,
            "term": "Collum Radii",
            "turkish": "Neck of Radius",
            "roots": "collum (boyun) + radius (döner kemik)",
            "definition": "Radius boynu; radius başının hemen altındaki daralmış kısım.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius boynu"
        },
        {
            "id": 304,
            "term": "Tuberositas Radii",
            "turkish": "Radial Tuberosity / Bicipital Tuberosity",
            "roots": "tuberositas (pürtük) + radius (döner kemik)",
            "definition": "Radius pürtüğü; biceps tendonunun yapıştığı pürtüklü çıkıntı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius pürtüğü"
        },
        {
            "id": 305,
            "term": "Margo Anterior Radii",
            "turkish": "Anterior Border of Radius / Anterior Margin",
            "roots": "margo (kenar) + anterior (ön) + radius (döner kemik)",
            "definition": "Radius'un ön kenarı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius'un ön kenarı"
        },
        {
            "id": 306,
            "term": "Facies Anterior Radii",
            "turkish": "Anterior Surface of Radius",
            "roots": "facies (yüz) + anterior (ön) + radius (döner kemik)",
            "definition": "Radius'un ön yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius'un ön yüzü"
        },
        {
            "id": 307,
            "term": "Margo Interosseus Radii",
            "turkish": "Interosseous Border of Radius / Interosseous Margin",
            "roots": "margo (kenar) + interosseus (kemikler arası) + radius (döner kemik)",
            "definition": "Radius'un kemikler arası kenarı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius'un kemikler arası kenarı"
        },
        {
            "id": 308,
            "term": "Margo Posterior Radii",
            "turkish": "Posterior Border of Radius / Posterior Margin",
            "roots": "margo (kenar) + posterior (arka) + radius (döner kemik)",
            "definition": "Radius'un arka kenarı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius'un arka kenarı"
        },
        {
            "id": 309,
            "term": "Facies Posterior Radii",
            "turkish": "Posterior Surface of Radius",
            "roots": "facies (yüz) + posterior (arka) + radius (döner kemik)",
            "definition": "Radius'un arka yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius'un arka yüzü"
        },
        {
            "id": 310,
            "term": "Facies Lateralis Radii",
            "turkish": "Lateral Surface of Radius",
            "roots": "facies (yüz) + lateralis (yan) + radius (döner kemik)",
            "definition": "Radius'un dış yan yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius'un dış yan yüzü"
        },
        {
            "id": 311,
            "term": "Facies Articularis Carpea",
            "turkish": "Carpal Articular Surface",
            "roots": "facies (yüz) + articularis (eklem) + carpalis (el bileği)",
            "definition": "Radius'un alt ucunda el bileği kemikleriyle eklemleşen yüzeyi.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius'un alt ucunda el bileği kemikleriyle eklemleşen yüzeyi"
        },
        {
            "id": 312,
            "term": "Incisura Ulnaris",
            "turkish": "Ulnar Notch",
            "roots": "incisura (çentik) + ulna (dirsek kemiği)",
            "definition": "Radius'un alt ucundaki dirsek kemiği çentiği; ulnanın eklemleştiği alan.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius'un alt ucundaki dirsek kemiği çentiği"
        },
        {
            "id": 313,
            "term": "Tuberculum Dorsale Radii",
            "turkish": "Dorsal Radial Tubercle / Dorsal Tubercle of Radius",
            "roots": "tuberculum (tümsekçik) + dorsalis (arka) + radius (döner kemik)",
            "definition": "Radius'un arka yüzündeki dorsal tümsekçik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius'un arka yüzündeki dorsal tümsekçik"
        },
        {
            "id": 314,
            "term": "Processus Styloideus Radii",
            "turkish": "Radial Styloid Process",
            "roots": "processus (çikıntı) + styloideus (kalem şeklinde) + radius (döner kemik)",
            "definition": "Radius alt ucunun dış yan tarafındaki kalem benzeri çıkıntı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Radius alt ucunun dış yan tarafındaki kalem benzeri çıkıntı"
        },
        {
            "id": 315,
            "term": "Olecranon",
            "turkish": "Olecranon",
            "roots": "olecranon (dirsek çıkıntısı)",
            "definition": "Ulnanın üst ucunda bulunan dirsek çıkıntısı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnanın üst ucunda bulunan dirsek çıkıntısı"
        },
        {
            "id": 316,
            "term": "Incisura Trochlearis",
            "turkish": "Trochlear Notch",
            "roots": "incisura (çentik) + trochlea (makara)",
            "definition": "Ulnanın üst ucunda humerus trochleası (makara) ile eklemleşen çentik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnanın üst ucunda humerus trochleası (makara) ile eklemleşen çentik"
        },
        {
            "id": 317,
            "term": "Processus Coronoideus Ulnae",
            "turkish": "Coronoid Process of Ulna",
            "roots": "processus (çıkıntı) + coronoid (taç/gaga şeklinde) + ulna (dirsek kemiği)",
            "definition": "Ulnanın üst ucunda, ön taraftaki gaga benzeri çıkıntı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnanın üst ucunda, ön taraftaki gaga benzeri çıkıntı"
        },
        {
            "id": 318,
            "term": "Incisura Radialis",
            "turkish": "Radial Notch",
            "roots": "incisura (çentik) + radius (döner kemik)",
            "definition": "Ulnanın üst ucunda radius başının eklemleştiği çentik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnanın üst ucunda radius başının eklemleştiği çentik"
        },
        {
            "id": 319,
            "term": "Crista Supinatoris",
            "turkish": "Supinator Crest",
            "roots": "crista (ibik/kenar) + supinator (dışa döndüren)",
            "definition": "Ulnadaki supinator kasın yapıştığı keskin kenar/ibik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnadaki supinator kasın yapıştığı keskin kenar/ibik"
        },
        {
            "id": 320,
            "term": "Tuberositas Ulnae",
            "turkish": "Tuberosity of Ulna",
            "roots": "tuberositas (pürtük) + ulna (dirsek kemiği)",
            "definition": "Ulnadaki pürtüklü tümsekçik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnadaki pürtüklü tümsekçik"
        },
        {
            "id": 321,
            "term": "Facies Anterior Ulnae",
            "turkish": "Anterior Surface of Ulna",
            "roots": "facies (yüz) + anterior (ön) + ulna (dirsek kemiği)",
            "definition": "Ulnanın ön yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnanın ön yüzü"
        },
        {
            "id": 322,
            "term": "Margo Interosseus Ulnae",
            "turkish": "Interosseous Border of Ulna / Interosseous Margin of Ulna",
            "roots": "margo (kenar) + interosseus (kemikler arası) + ulna (dirsek kemiği)",
            "definition": "Ulnanın kemikler arası kenarı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnanın kemikler arası kenarı"
        },
        {
            "id": 323,
            "term": "Margo Anterior Ulnae",
            "turkish": "Anterior Border of Ulna / Anterior Margin of Ulna",
            "roots": "margo (kenar) + anterior (ön) + ulna (dirsek kemiği)",
            "definition": "Ulnanın ön kenarı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnanın ön kenarı"
        },
        {
            "id": 324,
            "term": "Margo Posterior Ulnae",
            "turkish": "Posterior Border of Ulna / Posterior Margin of Ulna",
            "roots": "margo (kenar) + posterior (arka) + ulna (dirsek kemiği)",
            "definition": "Ulnanın arka kenarı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnanın arka kenarı"
        },
        {
            "id": 325,
            "term": "Caput Ulnae",
            "turkish": "Head of Ulna",
            "roots": "caput (baş) + ulna (dirsek kemiği)",
            "definition": "Dirsek kemiğinin alt ucundaki kafa kısmı (ulna başı).",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Dirsek kemiğinin alt ucundaki kafa kısmı (ulna başı)"
        },
        {
            "id": 326,
            "term": "Circumferentia Articularis Capitis Ulnae",
            "turkish": "Articular Circumference of Head of Ulna",
            "roots": "circumferentia (çevre) + articularis (eklem) + caput (baş) + ulna (dirsek kemiği)",
            "definition": "Ulna başındaki çevre eklem yüzeyi.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulna başındaki çevre eklem yüzeyi"
        },
        {
            "id": 327,
            "term": "Processus Styloideus Ulnae",
            "turkish": "Ulnar Styloid Process",
            "roots": "processus (çıkıntı) + styloideus (kalem şeklinde) + ulna (dirsek kemiği)",
            "definition": "Ulnanın alt ucundaki kalem benzeri çıkıntı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Ulnanın alt ucundaki kalem benzeri çıkıntı"
        },
        {
            "id": 328,
            "term": "Os Scaphoideum",
            "turkish": "Scaphoid Bone",
            "roots": "os (kemik) + scapha (kayık)",
            "definition": "El bileğinin kayık kemiği (proksimal sıranın en dıştaki kemiği).",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "El bileğinin kayık kemiği (proksimal sıranın en dıştaki kemiği)"
        },
        {
            "id": 329,
            "term": "Os Lunatum",
            "turkish": "Lunate Bone",
            "roots": "os (kemik) + luna (ay)",
            "definition": "El bileğinin ay kemiği.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "El bileğinin ay kemiği"
        },
        {
            "id": 330,
            "term": "Os Triquetrum",
            "turkish": "Triquetrum Bone",
            "roots": "os (kemik) + triquetrus (üç köşeli)",
            "definition": "El bileğinin üç köşe kemiği.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "El bileğinin üç köşe kemiği"
        },
        {
            "id": 331,
            "term": "Os Pisiforme",
            "turkish": "Pisiform Bone",
            "roots": "os (kemik) + pisum (bezelye)",
            "definition": "El bileğinin bezelye kemiği.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "El bileğinin bezelye kemiği"
        },
        {
            "id": 332,
            "term": "Os Hamatum",
            "turkish": "Hamate Bone",
            "roots": "os (kemik) + hamus (çengel)",
            "definition": "El bileğinin çengelli kemiği.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "El bileğinin çengelli kemiği"
        },
        {
            "id": 351,
            "term": "Fossa Infraspinata",
            "turkish": "Infraspinous Fossa",
            "roots": "fossa (çukur) + infraspinata (diken altı)",
            "definition": "Kürek kemiğinin arkasında, dikenin altındaki geniş çukur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Kürek kemiğinin arkasında, dikenin altındaki geniş çukur"
        },
        {
            "id": 352,
            "term": "Facies Posterior Scapulae",
            "turkish": "Posterior Surface of Scapula",
            "roots": "facies (yüz) + posterior (arka) + scapula (kürek kemiği)",
            "definition": "Kürek kemiğinin arka yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Kürek kemiğinin arka yüzü"
        },
        {
            "id": 353,
            "term": "Caput Humeri",
            "turkish": "Head of Humerus",
            "roots": "caput (baş) + humerus (kol kemiği)",
            "definition": "Humerus başı; kol kemiğinin omuz eklemine katılan yarım küre şeklindeki üst ucu.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus başı"
        },
        {
            "id": 354,
            "term": "Collum Anatomicum Humeri",
            "turkish": "Anatomical Neck of Humerus",
            "roots": "collum (boyun) + anatomicum (anatomik) + humerus (kol kemiği)",
            "definition": "Humerus'un anatomik boynu; caput humeri'yi sınırlayan dar hat.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus'un anatomik boynu"
        },
        {
            "id": 355,
            "term": "Collum Chirurgicum Humeri",
            "turkish": "Surgical Neck of Humerus",
            "roots": "collum (boyun) + chirurgicum (cerrahi) + humerus (kol kemiği)",
            "definition": "Humerus'un cerrahi boynu; kırıkların en sık görüldüğü üst uç altındaki daralan kısım.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus'un cerrahi boynu"
        },
        {
            "id": 356,
            "term": "Tuberculum Minus",
            "turkish": "Lesser Tubercle / Lesser Tuberosity",
            "roots": "tuberculum (tümsekçik) + minus (küçük)",
            "definition": "Humerus üst ucunda, ön tarafta bulunan küçük tümsekçik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus üst ucunda, ön tarafta bulunan küçük tümsekçik"
        },
        {
            "id": 357,
            "term": "Tuberculum Majus",
            "turkish": "Greater Tubercle / Greater Tuberosity",
            "roots": "tuberculum (tümsekçik) + majus (büyük)",
            "definition": "Humerus üst ucunda, dış tarafta bulunan büyük tümsekçik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus üst ucunda, dış tarafta bulunan büyük tümsekçik"
        },
        {
            "id": 358,
            "term": "Fossa Radialis",
            "turkish": "Radial Fossa",
            "roots": "fossa (çukur) + radialis (radius ile ilgili)",
            "definition": "Humerus ön alt ucunda, capitulum'un hemen üzerindeki küçük çukurluk.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus ön alt ucunda, capitulum'un hemen üzerindeki küçük çukurluk"
        },
        {
            "id": 359,
            "term": "Capitulum Humeri",
            "turkish": "Capitulum of Humerus",
            "roots": "capitulum (küçük baş) + humerus (kol kemiği)",
            "definition": "Humerus alt ucunda, radius başı ile eklemleşen küçük baş şeklindeki çıkıntı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus alt ucunda, radius başı ile eklemleşen küçük baş şeklindeki çıkıntı"
        },
        {
            "id": 360,
            "term": "Trochlea Humeri",
            "turkish": "Trochlea of Humerus",
            "roots": "trochlea (makara) + humerus (kol kemiği)",
            "definition": "Humerus alt ucunda, ulna ile eklemleşen makara şeklindeki eklem yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus alt ucunda, ulna ile eklemleşen makara şeklindeki eklem yüzü"
        },
        {
            "id": 361,
            "term": "Facies Posterior Humeri",
            "turkish": "Posterior Surface of Humerus",
            "roots": "facies (yüz) + posterior (arka) + humerus (kol kemiği)",
            "definition": "Humerus'un arka yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus'un arka yüzü"
        },
        {
            "id": 362,
            "term": "Fossa Olecrani",
            "turkish": "Olecranon Fossa",
            "roots": "fossa (çukur) + olecranon (dirsek çıkıntısı)",
            "definition": "Humerus arka alt ucunda dirsek eklemi açıldığında olecranon'un girdiği derin çukur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus arka alt ucunda dirsek eklemi açıldığında olecranon'un girdiği derin çukur"
        },
        {
            "id": 363,
            "term": "Sulcus Intertubercularis",
            "turkish": "Intertubercular Sulcus / Bicipital Groove",
            "roots": "sulcus (oluk) + inter- (arasında) + tuberculum (tümsekçik)",
            "definition": "Tuberculum majus ile minus arasında uzanan oluk (biceps oluğu).",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Tuberculum majus ile minus arasında uzanan oluk (biceps oluğu)"
        },
        {
            "id": 364,
            "term": "Crista Tuberculi Majoris",
            "turkish": "Crest of Greater Tubercle",
            "roots": "crista (ibik/kenar) + tuberculum (tümsekçik) + majus (büyük) + labium (dudak) + laterale (dış yan)",
            "definition": "Tuberculum majus'un aşağı doğru uzanan keskin kenarı; bicipital oluğun dış dudağı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Tuberculum majus'un aşağı doğru uzanan keskin kenarı"
        },
        {
            "id": 365,
            "term": "Crista Tuberculi Minoris",
            "turkish": "Crest of Lesser Tubercle",
            "roots": "crista (ibik/kenar) + tuberculum (tümsekçik) + minus (küçük) + labium (dudak) + mediale (iç yan)",
            "definition": "Tuberculum minus'un aşağı doğru uzanan keskin kenarı; bicipital oluğun iç dudağı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Tuberculum minus'un aşağı doğru uzanan keskin kenarı"
        },
        {
            "id": 366,
            "term": "Sulcus Nervi Radialis",
            "turkish": "Radial Groove",
            "roots": "sulcus (oluk) + nervus (sinir) + radialis (radial sinir)",
            "definition": "Humerus gövdesinin arkasında spiral olarak uzanan radial sinir oluğu.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus gövdesinin arkasında spiral olarak uzanan radial sinir oluğu"
        },
        {
            "id": 367,
            "term": "Tuberositas Deltoidea",
            "turkish": "Deltoid Tuberosity",
            "roots": "tuberositas (pürtük) + deltoidea (deltoid kası ile ilgili)",
            "definition": "Humerus gövdesinin dış tarafında, deltoid kasının yapıştığı V şeklindeki pürtüklü alan.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus gövdesinin dış tarafında, deltoid kasının yapıştığı V şeklindeki pürtüklü alan"
        },
        {
            "id": 368,
            "term": "Facies Anterolateralis Humeri",
            "turkish": "Anterolateral Surface of Humerus",
            "roots": "facies (yüz) + anterior (ön) + lateralis (yan) + humerus (kol kemiği)",
            "definition": "Humerus'un ön-dış yan yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus'un ön-dış yan yüzü"
        },
        {
            "id": 369,
            "term": "Facies Anteromedialis Humeri",
            "turkish": "Anteromedial Surface of Humerus",
            "roots": "facies (yüz) + anterior (ön) + medialis (iç yan) + humerus (kol kemiği)",
            "definition": "Humerus'un ön-iç yan yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus'un ön-iç yan yüzü"
        },
        {
            "id": 370,
            "term": "Crista Supracondylaris Medialis",
            "turkish": "Medial Supracondylar Ridge",
            "roots": "crista (kenar/ibik) + supra- (üst) + condylus (lokma) / epicondylus (lokma üstü) + medialis (iç yan)",
            "definition": "Humerus alt ucunda, epicondylus medialis'in yukarısına uzanan iç yan kenar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus alt ucunda, epicondylus medialis'in yukarısına uzanan iç yan kenar"
        },
        {
            "id": 371,
            "term": "Crista Supracondylaris Lateralis",
            "turkish": "Lateral Supracondylar Ridge",
            "roots": "crista (kenar/ibik) + supra- (üst) + condylus (lokma) / epicondylus (lokma üstü) + lateralis (dış yan)",
            "definition": "Humerus alt ucunda, epicondylus lateralis'in yukarısına uzanan dış yan kenar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus alt ucunda, epicondylus lateralis'in yukarısına uzanan dış yan kenar"
        },
        {
            "id": 372,
            "term": "Epicondylus Lateralis Humeri",
            "turkish": "Lateral Epicondyle of Humerus",
            "roots": "epicondylus (lokma üstü) + lateralis (dış yan) + humerus (kol kemiği)",
            "definition": "Humerus alt ucunun dış yan tarafındaki çıkıntı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus alt ucunun dış yan tarafındaki çıkıntı"
        },
        {
            "id": 373,
            "term": "Epicondylus Medialis Humeri",
            "turkish": "Medial Epicondyle of Humerus",
            "roots": "epicondylus (lokma üstü) + medialis (iç yan) + humerus (kol kemiği)",
            "definition": "Humerus alt ucunun iç yan tarafındaki belirgin çıkıntı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus alt ucunun iç yan tarafındaki belirgin çıkıntı"
        },
        {
            "id": 374,
            "term": "Fossa Coronoidea",
            "turkish": "Coronoid Fossa",
            "roots": "fossa (çukur) + coronoidea (gaga/taç şeklinde)",
            "definition": "Humerus ön alt ucunda, dirsek büküldüğünde ulnanın processus coronoideus'unun girdiği çukur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Humerus ön alt ucunda, dirsek büküldüğünde ulnanın processus coronoideus'unun girdiği çukur"
        },
        {
            "id": 375,
            "term": "Extremitas Acromialis",
            "turkish": "Acromial End",
            "roots": "extremitas (uç) + acromialis (akromiyona ait)",
            "definition": "Köprücük kemiğinin kürek kemiği omuz çıkıntısı (akromiyon) ile eklemleşen yassı dış ucu.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Köprücük kemiğinin kürek kemiği omuz çıkıntısı (akromiyon) ile eklemleşen yassı dış ucu"
        },
        {
            "id": 376,
            "term": "Facies Articularis Acromialis",
            "turkish": "Acromial Facet",
            "roots": "facies (yüz) + articularis (eklem) + acromialis (akromiyon)",
            "definition": "Clavicula'nın akromiyal ucunda bulunan eklem yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Clavicula'nın akromiyal ucunda bulunan eklem yüzü"
        },
        {
            "id": 377,
            "term": "Linea Trapezoidea",
            "turkish": "Trapezoid Line",
            "roots": "linea (çizgi) + trapezoidea (yamuk şeklinde)",
            "definition": "Clavicula'nın alt yüzünde trapezoid bağın yapıştığı eğik çizgi.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Clavicula'nın alt yüzünde trapezoid bağın yapıştığı eğik çizgi"
        },
        {
            "id": 378,
            "term": "Tuberculum Conoideum",
            "turkish": "Conoid Tubercle",
            "roots": "tuberculum (tümsekçik) + conoideum (koni şeklinde)",
            "definition": "Clavicula'nın alt yüzünde konoid bağın yapıştığı küçük konik tümsekçik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Clavicula'nın alt yüzünde konoid bağın yapıştığı küçük konik tümsekçik"
        },
        {
            "id": 379,
            "term": "Sulcus Musculi Subclavii",
            "turkish": "Groove for Subclavius Muscle",
            "roots": "sulcus (oluk) + musculus (kas) + subclavius (köprücük kemiği altı)",
            "definition": "Clavicula'nın alt yüzünde subclavius kasının uzandığı oluk.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Clavicula'nın alt yüzünde subclavius kasının uzandığı oluk"
        },
        {
            "id": 380,
            "term": "Impressio Ligamenti Costoclavicularis",
            "turkish": "Impression for Costoclavicular Ligament",
            "roots": "impressio (iz) + ligamentum (bağ) + costoclavicularis (kaburga-köprücük)",
            "definition": "Clavicula'nın alt yüzünde, sternal uca yakın kostoklavikular bağın tutunduğu pürtüklü iz.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Clavicula'nın alt yüzünde, sternal uca yakın kostoklavikular bağın tutunduğu pürtüklü iz"
        },
        {
            "id": 381,
            "term": "Extremitas Sternalis",
            "turkish": "Sternal End",
            "roots": "extremitas (uç) + sternalis (sternum ile ilgili)",
            "definition": "Köprücük kemiğinin sternum (göğüs kemiği) ile eklemleşen kalınlaşmış iç ucu.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Köprücük kemiğinin sternum (göğüs kemiği) ile eklemleşen kalınlaşmış iç ucu"
        },
        {
            "id": 382,
            "term": "Facies Articularis Sternalis",
            "turkish": "Sternal Articular Surface",
            "roots": "facies (yüz) + articularis (eklem) + sternalis (sternum)",
            "definition": "Clavicula'nın sternal ucunda bulunan eklem yüzü.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Clavicula'nın sternal ucunda bulunan eklem yüzü"
        },
        {
            "id": 391,
            "term": "Tuberculum Supraglenoidale",
            "turkish": "Supraglenoid Tubercle",
            "roots": "tuberculum (tümsekçik) + supra (üst) + glenoid (eklem çukuru)",
            "definition": "Kürek kemiğindeki glenoid çukurun üst kenarında bulunan, biceps kasının uzun tendonunun tutunduğu tümsekçik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Kürek kemiğindeki glenoid çukurun üst kenarında bulunan, biceps kasının uzun tendonunun tutunduğu tümsekçik"
        },
        {
            "id": 392,
            "term": "Fossa Glenoidea",
            "turkish": "Glenoid Fossa",
            "roots": "fossa (çukur) + glenoid (eklem çukuru)",
            "definition": "Kürek kemiğinin dış köşesinde yer alan ve humerus başı ile omuz eklemini oluşturan sığ eklem çukuru.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Kürek kemiğinin dış köşesinde yer alan ve humerus başı ile omuz eklemini oluşturan sığ eklem çukuru"
        },
        {
            "id": 393,
            "term": "Collum Scapulae",
            "turkish": "Neck of Scapula",
            "roots": "collum (boyun) + scapula (kürek kemiği)",
            "definition": "Scapula başı (glenoid bölge) ile kürek kemiğinin gövdesi arasındaki daralmış boyun kısmı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Scapula başı (glenoid bölge) ile kürek kemiğinin gövdesi arasındaki daralmış boyun kısmı"
        },
        {
            "id": 394,
            "term": "Tuberculum Infraglenoideum",
            "turkish": "Infraglenoid Tubercle",
            "roots": "tuberculum (tümsekçik) + infra (alt) + glenoid (eklem çukuru)",
            "definition": "Kürek kemiğindeki glenoid çukurun alt kenarında bulunan, triceps kasının uzun başının tutunduğu tümsekçik.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Kürek kemiğindeki glenoid çukurun alt kenarında bulunan, triceps kasının uzun başının tutunduğu tümsekçik"
        },
        {
            "id": 395,
            "term": "Margo Lateralis Scapulae",
            "turkish": "Lateral Border of Scapula",
            "roots": "margo (kenar) + lateralis (yan) + scapula (kürek kemiği)",
            "definition": "Kürek kemiğinin dış yan kenarı; koltuk altına bakan kalın kenar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Kürek kemiğinin dış yan kenarı"
        },
        {
            "id": 396,
            "term": "Fossa Subscapularis",
            "turkish": "Subscapular Fossa",
            "roots": "fossa (çukur) + subscapularis (kürek kemiği altı)",
            "definition": "Kürek kemiğinin kaburgalara bakan ön yüzeyindeki geniş ve sığ çukurluk; subscapularis kası buraya yerleşir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Kürek kemiğinin kaburgalara bakan ön yüzeyindeki geniş ve sığ çukurluk"
        },
        {
            "id": 397,
            "term": "Margo Medialis Scapulae",
            "turkish": "Medial Border of Scapula",
            "roots": "margo (kenar) + medialis (iç yan) + scapula (kürek kemiği)",
            "definition": "Kürek kemiğinin omurgaya bakan iç yan kenarı; daha ince ve uzundur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Kürek kemiğinin omurgaya bakan iç yan kenarı"
        },
        {
            "id": 398,
            "term": "Angulus Inferior Scapulae",
            "turkish": "Inferior Angle of Scapula",
            "roots": "angulus (açı) + inferior (alt) + scapula (kürek kemiği)",
            "definition": "Kürek kemiğinin iç yan ve dış yan kenarlarının birleşmesiyle oluşan en alt köşesi.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_bones",
            "turkishShort": "Kürek kemiğinin iç yan ve dış yan kenarlarının birleşmesiyle oluşan en alt köşesi"
        }
    ],
    "lower_extremity_bones": [
        {
            "id": 91,
            "term": "Os Coxae",
            "turkish": "Hip Bone / Coxal Bone",
            "roots": "os (kemik) + coxa (kalça)",
            "definition": "Os coxae, ilium, ischium ve pubis'in birleşmesiyle oluşan kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_bones",
            "turkishShort": "Os coxae, ilium, ischium ve pubis'in birleşmesiyle oluşan kemiktir"
        },
        {
            "id": 92,
            "term": "Femur",
            "turkish": "Thigh",
            "roots": "femur (uyluk kemiği)",
            "definition": "İnsan vücudundaki en uzun, en hacimli ve en güçlü kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_bones",
            "turkishShort": "İnsan vücudundaki en uzun, en hacimli ve en güçlü kemiktir"
        },
        {
            "id": 93,
            "term": "Patella",
            "turkish": "Patella / Knee Bone",
            "roots": "patella (diz kapağı)",
            "definition": "İnsan vücudundaki en büyük Sesamoid kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_bones",
            "turkishShort": "İnsan vücudundaki en büyük Sesamoid kemiktir"
        },
        {
            "id": 94,
            "term": "Tibia",
            "turkish": "Tibia / Shin Bone",
            "roots": "tibia (kaval kemiği)",
            "definition": "Bacağın en büyük kemiğidir; Art. Genus ve Art. Talocruralis'in oluşumuna katılır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_bones",
            "turkishShort": "Bacağın en büyük kemiğidir"
        },
        {
            "id": 95,
            "term": "Fibula",
            "turkish": "Fibula",
            "roots": "fibula (ince baldır kemiği)",
            "definition": "Bacağın iki kemiğinden daha küçük olanıdır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_bones",
            "turkishShort": "Bacağın iki kemiğinden daha küçük olanıdır"
        },
        {
            "id": 96,
            "term": "Ossa Tarsi",
            "turkish": "Tarsal Bones",
            "roots": "ossa (kemikler) + tarsus (ayak bileği)",
            "definition": "Ayakta Ossa Metatarsalia ve Phalanges Pedis dışında kalan yedi kemiktir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_bones",
            "turkishShort": "Ayakta Ossa Metatarsalia ve Phalanges Pedis dışında kalan yedi kemiktir"
        },
        {
            "id": 97,
            "term": "Ossa Metatarsi",
            "turkish": "Metatarsal Bones",
            "roots": "ossa (kemikler) + metatarsus (ayak ayası)",
            "definition": "Ayakta medialden laterale doğru I'den V'e numaralandırılan 5 uzun kemikten oluşur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_bones",
            "turkishShort": "Ayakta medialden laterale doğru I'den V'e numaralandırılan 5 uzun kemikten oluşur"
        },
        {
            "id": 98,
            "term": "Phalanges Pedis",
            "turkish": "Phalanges of Foot",
            "roots": "phalanx (parmak kemiği) + pes (ayak)",
            "definition": "Ossa Metatarsalia'nın Distal'inde yer alan ve ayak parmaklarını oluşturan uzun kemiklerdir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_bones",
            "turkishShort": "Ossa Metatarsalia'nın Distal'inde yer alan ve ayak parmaklarını oluşturan uzun kemiklerdir"
        }
    ],
    "movement_terms": [
        {
            "id": 1045,
            "term": "Abductio",
            "turkish": "Abduction",
            "roots": "ab- (uzaklaştırmak, -den uzak) + ducere (götürmek, çekmek)",
            "definition": "Vücut orta hattından uzaklaştırma hareketi",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Vücut orta hattından uzaklaştırma hareketi"
        },
        {
            "id": 1046,
            "term": "Adductio",
            "turkish": "Adduction",
            "roots": "ad- (yaklaştırmak, -e doğru) + ducere (götürmek, çekmek)",
            "definition": "Vücut orta hattına yakınlaştırma hareketi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Vücut orta hattına yakınlaştırma hareketi"
        },
        {
            "id": 1047,
            "term": "Rotatio Lateralis",
            "turkish": "Lateral Rotation",
            "roots": "rotare (döndürmek) + latus / lateralis (yan, dış taraf)",
            "definition": "Bir uzvun kendi uzun ekseni etrafında dışa doğru dönme hareketi",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Bir uzvun kendi uzun ekseni"
        },
        {
            "id": 1048,
            "term": "Rotatio Medialis",
            "turkish": "Medial Rotation",
            "roots": "rotare (döndürmek) + medius / medialis (orta, iç taraf)",
            "definition": "Bir uzvun kendi uzun ekseni etrafında içe doğru dönme hareketi",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Bir uzvun kendi uzun ekseni"
        },
        {
            "id": 1049,
            "term": "Circumductio",
            "turkish": "Circumduction",
            "roots": "circum- (etrafında, dairesel) + ducere (götürmek, çekmek)",
            "definition": "Bir uzvun flexion, extension, abduction ve adduction kombinasyonuyla yaptığı dairesel dönme hareketi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Bir uzvun flexion, extension, abduction ve adduction kombinasyonuyla yaptığı dairesel dönme hareketi"
        },
        {
            "id": 1050,
            "term": "Flexio",
            "turkish": "Flexion",
            "roots": "flectere (bükmek, eğmek)",
            "definition": "Eklem açısını küçülterek vücut bölümlerini birbirine yaklaştıran hareket.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Eklem açısını küçülterek vücut bölümlerini birbirine yaklaştıran hareket"
        },
        {
            "id": 1051,
            "term": "Extensio",
            "turkish": "Extension",
            "roots": "ex- (dışarı, dışa doğru) + tendere (germek, uzatmak)",
            "definition": "Eklem açısını büyüterek vücut bölümlerini birbirinden uzaklaştırma hareketi",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Eklem açısını büyüterek vücut bölümlerini"
        },
        {
            "id": 1052,
            "term": "Pronatio",
            "turkish": "Pronation",
            "roots": "pronare (öne doğru eğmek, yüzüstü çevirmek)",
            "definition": "Ön kolun dönmesiyle avuç içinin arkaya / aşağıya bakması ; ayak tabanının dışa dönmesi",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Ön kolun dönmesiyle avuç içinin arkaya / aşağıya bakması"
        },
        {
            "id": 1053,
            "term": "Supinatio",
            "turkish": "Supination",
            "roots": "supinare (arkaüstü/sırtüstü çevirmek)",
            "definition": "Ön kolun dönmesiyle avuç içinin öne / yukarı bakması ; ayak tabanının içe dönmesi",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Ön kolun dönmesiyle avuç içinin öne / yukarı bakması"
        },
        {
            "id": 1054,
            "term": "Oppositio",
            "turkish": "Opposition",
            "roots": "ob- (karşı, karşısına) + ponere (koymak, yerleştirmek)",
            "definition": "Başparmağın, avuç içini çaprazlayarak diğer parmak uçlarına yaklaşma hareketi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Başparmağın, avuç içini çaprazlayarak diğer parmak uçlarına yaklaşma hareketi"
        },
        {
            "id": 1055,
            "term": "Repositio",
            "turkish": "Reposition",
            "roots": "re- (tekrar, geri) + ponere (koymak, yerleştirmek)",
            "definition": "Opozisyon halindeki başparmağın anatomik başlangıç konumuna geri dönmesi",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Opozisyon halindeki başparmağın anatomik başlangıç"
        },
        {
            "id": 1056,
            "term": "Plantiflexio",
            "turkish": "Plantar Flexion",
            "roots": "planta (ayak tabanı) + flectere (bükmek)",
            "definition": "Ayak bileğinde, ayak ucunun tabana doğru aşağı doğru bükülmesi",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Ayak bileğinde, ayak ucunun tabana"
        },
        {
            "id": 1057,
            "term": "Dorsiflexio",
            "turkish": "Dorsiflexion",
            "roots": "dorsum (sırt, ayak sırtı) + flectere (bükmek)",
            "definition": "Ayak bileğinde, ayak ucunun yukarıya doğru çekilmesi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Ayak bileğinde, ayak ucunun yukarıya doğru çekilmesi"
        },
        {
            "id": 1058,
            "term": "Elevatio",
            "turkish": "Elevation",
            "roots": "e- (dışarı, yukarı) + levare (kaldırmak, hafifletmek)",
            "definition": "Omuz veya Mandibula gibi bir yapının yukarı doğru yükselme hareketi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Omuz veya Mandibula gibi bir yapının yukarı doğru yükselme hareketi"
        },
        {
            "id": 1059,
            "term": "Depressio",
            "turkish": "Depression",
            "roots": "de- (aşağı) + premere (bastırmak)",
            "definition": "Yukarı kaldırılmış bir yapının dikey eksende aşağıya doğru indirilmesi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Yukarı kaldırılmış bir yapının dikey eksende aşağıya doğru indirilmesi"
        },
        {
            "id": 1060,
            "term": "Eversio",
            "turkish": "Eversion",
            "roots": "ex- (dışarı, dışa doğru) + vertere (döndürmek)",
            "definition": "Ayak tabanının, vücut orta hattından uzaklaşarak dışa dönmesi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Ayak tabanının, vücut orta hattından uzaklaşarak dışa dönmesi"
        },
        {
            "id": 1061,
            "term": "Inversio",
            "turkish": "Inversion",
            "roots": "in- (içeri, içe doğru) + vertere (döndürmek)",
            "definition": "Ayak tabanının, vücut orta hattına bakacak şekilde içe dönmesi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Ayak tabanının, vücut orta hattına bakacak şekilde içe dönmesi"
        },
        {
            "id": 1062,
            "term": "Protractio",
            "turkish": "Protraction",
            "roots": "pro- (öne doğru, ileri) + trahere (çekmek)",
            "definition": "Omuz kuşağı veya Mandibula'nın yatay düzlemde öne doğru kayma hareketi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Omuz kuşağı veya Mandibula'nın yatay düzlemde öne doğru kayma hareketi"
        },
        {
            "id": 1063,
            "term": "Retractio",
            "turkish": "Retraction",
            "roots": "re- (geri, arkaya) + trahere (çekmek)",
            "definition": "Öne çekilmiş omuz kuşağı veya Mandibula'nın arkaya doğru çekilmesi.",
            "category": "movement_terms",
            "system": "movement",
            "subcategory": "motus",
            "turkishShort": "Öne çekilmiş omuz kuşağı veya Mandibula'nın arkaya doğru çekilmesi"
        }
    ],
    "upper_extremity_joints": [
        {
            "id": 500,
            "term": "Articulatio Humeri",
            "turkish": "Shoulder Joint",
            "roots": "articulatio (eklem) + humeri (humerusa ait)",
            "definition": "Omuz eklemi; Humerus başı ile Scapula'nın Cavitas Glenoidalis'i arasında oluşan top-yuva tipi sinovyal eklem.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Omuz eklemi"
        },
        {
            "id": 501,
            "term": "Articulatio Acromioclavicularis",
            "turkish": "Acromioclavicular Joint",
            "roots": "articulatio (eklem) + acromion (akromion) + clavicula (köprücük kemiği)",
            "definition": "Clavicula'nın Akromiyal ucu ile Scapula'nın Acromion'u arasındaki düzlem tipi sinovyal eklem.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Clavicula'nın Akromiyal ucu ile Scapula'nın Acromion'u arasındaki düzlem tipi sinovyal eklem"
        },
        {
            "id": 502,
            "term": "Articulatio Sternoclavicularis",
            "turkish": "Sternoclavicular Joint",
            "roots": "articulatio (eklem) + sternum (göğüs kemiği) + clavicula (köprücük kemiği)",
            "definition": "Clavicula'nın Sternal ucu ile Sternum'un Manubrium'u arasındaki eyer tipi sinovyal eklem.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Clavicula'nın Sternal ucu ile Sternum'un Manubrium'u arasındaki eyer tipi sinovyal eklem"
        },
        {
            "id": 503,
            "term": "Articulatio Cubiti",
            "turkish": "Elbow Joint",
            "roots": "Articulatio (eklem) + cubitus (dirsek)",
            "definition": "Dirsek eklemi; humerus, radius ve ulna arasında oluşan bileşik menteşe tipi sinovyal eklem. Articulatio humeroulnaris, humeroradialis ve radioulnaris proximalis'i kapsar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Dirsek eklemi"
        },
        {
            "id": 504,
            "term": "Articulatio Humeroulnaris",
            "turkish": "Humeroulnar Joint",
            "roots": "articulatio (eklem) + humerus + ulna",
            "definition": "Humerus'un Trochlea'sı ile Ulna'nın Incisura Trochlearis'i arasındaki menteşe tipi eklem.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Humerus'un Trochlea'sı ile Ulna'nın Incisura Trochlearis'i arasındaki menteşe tipi eklem"
        },
        {
            "id": 505,
            "term": "Articulatio Humeroradialis",
            "turkish": "Humeroradial Joint",
            "roots": "articulatio (eklem) + humerus + radius",
            "definition": "Humerus'un Capitulum'u ile Radius'un Fovea Articularis'i arasındaki top-yuva tipi eklem.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Humerus'un Capitulum'u ile Radius'un Fovea Articularis'i arasındaki top-yuva tipi eklem"
        },
        {
            "id": 506,
            "term": "Articulatio Radioulnaris Proximalis",
            "turkish": "Proximal Radioulnar Joint",
            "roots": "articulatio (eklem) + radius + ulna + proximalis (yakın)",
            "definition": "Radius başının çevresi ile Ulna'nın Incisura Radialis'i arasındaki pivot tipi sinovyal eklem.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Radius başının çevresi ile Ulna'nın Incisura Radialis'i arasındaki pivot tipi sinovyal eklem"
        },
        {
            "id": 507,
            "term": "Articulatio Radioulnaris Distalis",
            "turkish": "Distal Radioulnar Joint",
            "roots": "articulatio (eklem) + radius + ulna + distalis (uzak)",
            "definition": "Ulna başı ile Radius'un Incisura Ulnaris'i arasındaki pivot tipi sinovyal eklem.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Ulna başı ile Radius'un Incisura Ulnaris'i arasındaki pivot tipi sinovyal eklem"
        },
        {
            "id": 508,
            "term": "Articulatio Radiocarpalis",
            "turkish": "Radiocarpal Joint",
            "roots": "articulatio (eklem) + radius + carpus (el bileği)",
            "definition": "El bileği eklemi; Radius'un distal yüzeyi ile Os Scaphoideum, Os Lunatum ve Os Triquetrum arasındaki ellipsoid tipi sinovyal eklem.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "El bileği eklemi"
        },
        {
            "id": 509,
            "term": "Articulatio Mediocarpalis",
            "turkish": "Midcarpal Joint",
            "roots": "articulatio (eklem) + medius (orta) + carpus (el bileği)",
            "definition": "Proksimal karpal sıra ile Distal karpal sıra arasındaki bileşik sinovyal eklem.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Proksimal karpal sıra ile Distal karpal sıra arasındaki bileşik sinovyal eklem"
        },
        {
            "id": 510,
            "term": "Articulationes Carpometacarpales",
            "turkish": "Carpometacarpal Joints",
            "roots": "articulatio (eklem) + carpus (el bileği) + metacarpus (el tarağı)",
            "definition": "Distal Karpal Kemikler ile 5 Metakarp Kemiklerinin tabanları arasındaki eklemler.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Distal Karpal Kemikler ile 5 Metakarp Kemiklerinin tabanları arasındaki eklemler"
        },
        {
            "id": 511,
            "term": "Articulatio Carpometacarpalis Pollicis",
            "turkish": "Carpometacarpal Joint of Thumb",
            "roots": "articulatio (eklem) + carpus + metacarpus + pollex (başparmak)",
            "definition": "Os Trapezium ile 1. Metakarp tabanı arasındaki eyer tipi Sinovyal eklem.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Os Trapezium ile 1"
        },
        {
            "id": 512,
            "term": "Articulationes Metacarpophalangeae",
            "turkish": "Metacarpophalangeal Joints",
            "roots": "articulatio (eklem) + metacarpus (el tarağı) + phalanx (parmak kemiği)",
            "definition": "Metakarp başları ile Proksimal falanksların tabanları arasındaki kondiloid tip sinovyal eklemler.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Metakarp başları ile Proksimal falanksların tabanları arasındaki kondiloid tip sinovyal eklemler"
        },
        {
            "id": 513,
            "term": "Articulationes Interphalangeae Manus",
            "turkish": "Interphalangeal Joints of Hand",
            "roots": "articulatio (eklem) + inter (arasında) + phalanx (parmak kemiği) + manus (el)",
            "definition": "Elin Interfalangeal eklemleri; parmak falankslari arasındaki menteşe tipi sinovyal eklemler.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Elin Interfalangeal eklemleri"
        },
        {
            "id": 514,
            "term": "Cavitas Glenoidalis",
            "turkish": "Glenoid Cavity",
            "roots": "cavitas (çukur, boşluk) + glenoid (yuva şeklinde)",
            "definition": "Scapula'nın lateralinde yer alan sığ eklem yüzeyi. Humerus Başını karşılar ve Labrum Glenoidale ile derinleştirilir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Scapula'nın lateralinde yer alan sığ eklem yüzeyi"
        },
        {
            "id": 515,
            "term": "Labrum Glenoidale",
            "turkish": "Glenoid Labrum",
            "roots": "labrum (dudak, kenar) + glenoidale (glenoide ait)",
            "definition": "Cavitas Glenoidalis çevresini çevreleyen fibrokartilaj halka.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Cavitas Glenoidalis çevresini çevreleyen fibrokartilaj halka"
        },
        {
            "id": 516,
            "term": "Capsula Articularis",
            "turkish": "Articular Capsule",
            "roots": "capsula (kapsül, kılıf) + articularis (ekleme ait)",
            "definition": "Eklem Kapsülü; Sinovyal eklemi çevreleyen fibröz kılıf. Dış tabakası fibröz membran, iç tabakası sinovyal membrandan oluşur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Eklem Kapsülü"
        },
        {
            "id": 517,
            "term": "Membrana Synovialis",
            "turkish": "Synovial Membrane",
            "roots": "membrana (zar, tabaka) + synovialis (sinoviyal, yumurta akı benzeri)",
            "definition": "Eklem kapsülünün iç tabakası. Sinovyal sıvı üretir, eklem kıkırdağını besler ve sürtünmeyi azaltır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Eklem kapsülünün iç tabakası"
        },
        {
            "id": 518,
            "term": "Discus Articularis",
            "turkish": "Articular Disc",
            "roots": "discus (disk, yuvarlak levha) + articularis (ekleme ait)",
            "definition": "Bazı eklemlerde iki eklem yüzeyi arasında yer alan fibrokartilaj yapı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Bazı eklemlerde iki eklem yüzeyi arasında yer alan fibrokartilaj yapı"
        },
        {
            "id": 519,
            "term": "Bursa Synovialis",
            "turkish": "Synovial Bursa",
            "roots": "bursa (kese, torba) + synovialis (sinoviyal)",
            "definition": "Tendon veya kasların kemik üzerinden geçtiği yerlerde sürtünmeyi azaltan sinovyal sıvı içeren küçük kese.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "upper_extremity_joints",
            "turkishShort": "Tendon veya kasların kemik üzerinden geçtiği yerlerde sürtünmeyi azaltan sinovyal sıvı içeren küçük kese"
        }
    ],
    "lower_extremity_joints": [
        {
            "id": 520,
            "term": "Articulatio Coxae",
            "turkish": "Hip Joint",
            "roots": "articulatio (eklem) + coxa (kalça)",
            "definition": "Kalça eklemi; femur başı ile os coxae'nin acetabulum'u arasında oluşan top-yuva tipi sinovyal eklem. Vücuttaki en stabil eklemlerden biridir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Kalça eklemi"
        },
        {
            "id": 521,
            "term": "Acetabulum",
            "turkish": "Acetabulum",
            "roots": "acetabulum (sirke kabı - şekil benzetmesi)",
            "definition": "Asetabulum; os coxae üzerinde os ilium, os ischii ve os pubis'in birleşiminden oluşan derin, yarım küre şeklindeki eklem çukuru. Femur başını karşılar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Asetabulum"
        },
        {
            "id": 522,
            "term": "Labrum Acetabulare",
            "turkish": "Acetabular Labrum",
            "roots": "labrum (dudak, kenar) + acetabulare (asetabuluma ait)",
            "definition": "Asetabular dudak; acetabulum kenarını çevreleyen fibrokartilaj halka. Eklem yüzeyini derinleştirerek kalça ekleminin stabilitesini ve negatif basıncını artırır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Asetabular dudak"
        },
        {
            "id": 523,
            "term": "Ligamentum Capitis Femoris",
            "turkish": "Ligament of Head of Femur",
            "roots": "ligamentum (bağ) + caput (baş) + femur (uyluk kemiği)",
            "definition": "Femur başı bağı; femur başındaki fovea capitis'ten acetabulum tabanına uzanan intraartiküler bağ. İçinden femur başına giden bir arter (a. capitis femoris) geçer.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Femur başı bağı"
        },
        {
            "id": 524,
            "term": "Articulatio Genus",
            "turkish": "Knee Joint",
            "roots": "articulatio (eklem) + genu (diz)",
            "definition": "Diz eklemi; femur, tibia ve patella arasında oluşan vücudun en büyük ve en karmaşık sinovyal eklemi. Menteşe ve rotasyon hareketlerini birleştirir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Diz eklemi"
        },
        {
            "id": 525,
            "term": "Articulatio Femorotibialis",
            "turkish": "Femorotibial Joint",
            "roots": "articulatio (eklem) + femur + tibia (kaval kemiği)",
            "definition": "Femorotibiyal eklem; diz ekleminin femur ile tibia kondilleri arasındaki ana eklem bölümü. Diz fleksiyon ve ekstansiyonunun asıl gerçekleştiği yerdir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Femorotibiyal eklem"
        },
        {
            "id": 526,
            "term": "Articulatio Femoropatellaris",
            "turkish": "Femoropatellar Joint",
            "roots": "articulatio (eklem) + femur + patella (diz kapağı)",
            "definition": "Femoropatellar eklem; patella'nın arka yüzü ile femur'un facies patellaris'i arasındaki eklem bölümü. Diz ekstansiyonu sırasında patella'nın kayma hareketini sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Femoropatellar eklem"
        },
        {
            "id": 527,
            "term": "Meniscus Medialis",
            "turkish": "Medial Meniscus",
            "roots": "meniscus (hilal şeklinde yapı) + medialis (iç, orta hatta yakın)",
            "definition": "Medial menisküs; tibia'nın medial kondili üzerinde yer alan C şeklinde fibrokartilaj yapı. Yük dağılımını sağlar, lateral menisküse göre daha az hareketli ve yaralanmaya daha yatkındır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Medial menisküs"
        },
        {
            "id": 528,
            "term": "Meniscus Lateralis",
            "turkish": "Lateral Meniscus",
            "roots": "meniscus (hilal şeklinde yapı) + lateralis (dış, yan)",
            "definition": "Lateral menisküs; tibia'nın lateral kondili üzerinde yer alan, medial menisküse göre daha yuvarlak ve hareketli fibrokartilaj yapı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Lateral menisküs"
        },
        {
            "id": 529,
            "term": "Ligamentum Cruciatum Anterius",
            "turkish": "Anterior Cruciate Ligament (ACL)",
            "roots": "ligamentum (bağ) + cruciatus (çapraz şeklinde) + anterius (ön)",
            "definition": "Ön çapraz bağ; tibia'nın ön interkondiler alanından femur'un lateral kondiline uzanan intraartiküler bağ. Tibia'nın öne doğru kaymasını sınırlar, diz stabilitesinde kritik rol oynar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Ön çapraz bağ"
        },
        {
            "id": 530,
            "term": "Ligamentum Cruciatum Posterius",
            "turkish": "Posterior Cruciate Ligament (PCL)",
            "roots": "ligamentum (bağ) + cruciatus (çapraz şeklinde) + posterius (arka)",
            "definition": "Arka çapraz bağ; tibia'nın arka interkondiler alanından femur'un medial kondiline uzanan intraartiküler bağ. Tibia'nın arkaya doğru kaymasını sınırlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Arka çapraz bağ"
        },
        {
            "id": 531,
            "term": "Ligamentum Collaterale Tibiale",
            "turkish": "Tibial Collateral Ligament (Medial Collateral Ligament, MCL)",
            "roots": "ligamentum (bağ) + collateralis (yan) + tibiale (tibiaya ait)",
            "definition": "Tibial kollateral bağ (medial kollateral bağ); femur'un medial epikondilinden tibia'ya uzanan, dizin iç tarafını destekleyen ekstraartiküler bağ. Valgus streslerine karşı korur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Tibial kollateral bağ (medial kollateral bağ)"
        },
        {
            "id": 532,
            "term": "Ligamentum Collaterale Fibulare",
            "turkish": "Fibular Collateral Ligament (Lateral Collateral Ligament, LCL)",
            "roots": "ligamentum (bağ) + collateralis (yan) + fibulare (fibulaya ait)",
            "definition": "Fibular kollateral bağ (lateral kollateral bağ); femur'un lateral epikondilinden fibula başına uzanan, dizin dış tarafını destekleyen ekstraartiküler bağ. Varus streslerine karşı korur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Fibular kollateral bağ (lateral kollateral bağ)"
        },
        {
            "id": 533,
            "term": "Ligamentum Patellae",
            "turkish": "Patellar Ligament",
            "roots": "ligamentum (bağ) + patella (diz kapağı)",
            "definition": "Patellar bağ; patella'nın alt ucundan tibia'nın tuberositas tibiae'sine uzanan, quadriceps femoris tendonunun devamı niteliğindeki güçlü bağ.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Patellar bağ"
        },
        {
            "id": 534,
            "term": "Articulatio Tibiofibularis",
            "turkish": "Tibiofibular Joint (Proximal)",
            "roots": "articulatio (eklem) + tibia (kaval kemiği) + fibula (kamış kemiği)",
            "definition": "Tibiofibular eklem; tibia'nın lateral kondili ile fibula başı arasındaki düzlem tipi sinovyal eklem. Ayak bileği hareketleri sırasında fibula'nın küçük rotasyonel hareketlerine izin verir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Tibiofibular eklem"
        },
        {
            "id": 535,
            "term": "Articulatio Talocruralis",
            "turkish": "Talocrural Joint (Ankle Joint)",
            "roots": "articulatio (eklem) + talus (aşık kemiği) + crus (bacak)",
            "definition": "Ayak bileği eklemi; tibia ve fibula'nın distal uçları ile talus arasındaki menteşe tipi sinovyal eklem. Dorsifleksiyon ve plantar fleksiyonu sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Ayak bileği eklemi"
        },
        {
            "id": 536,
            "term": "Articulatio Subtalaris",
            "turkish": "Subtalar Joint",
            "roots": "articulatio (eklem) + sub (altında) + talus (aşık kemiği)",
            "definition": "Subtalar eklem; talus ile calcaneus arasındaki sinovyal eklem. Ayağın inversiyon ve eversiyon hareketlerinin büyük kısmını sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Subtalar eklem"
        },
        {
            "id": 537,
            "term": "Articulatio Talocalcaneonavicularis",
            "turkish": "Talocalcaneonavicular Joint",
            "roots": "articulatio (eklem) + talus + calcaneus (topuk kemiği) + naviculare (naviküler kemiğe ait)",
            "definition": "Talokalkaneonaviküler eklem; talus, calcaneus ve os naviculare arasındaki bileşik sinovyal eklem. Subtalar eklemle birlikte inversiyon-eversiyon hareketine katkı sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Talokalkaneonaviküler eklem"
        },
        {
            "id": 538,
            "term": "Articulatio Calcaneocuboidea",
            "turkish": "Calcaneocuboid Joint",
            "roots": "articulatio (eklem) + calcaneus (topuk kemiği) + cuboideum (küp şeklinde kemik)",
            "definition": "Kalkaneoküboid eklem; calcaneus ile os cuboideum arasındaki sinovyal eklem. Talokalkaneonaviküler eklemle birlikte transvers tarsal eklem hattını (Chopart eklemi) oluşturur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Kalkaneoküboid eklem"
        },
        {
            "id": 539,
            "term": "Articulationes Tarsometatarsales",
            "turkish": "Tarsometatarsal Joints (Lisfranc Joint)",
            "roots": "articulatio (eklem) + tarsus (ayak bileği-tarsal bölge) + metatarsus (ayak tarağı)",
            "definition": "Tarsometatarsal eklemler; distal tarsal kemikler (cuneiforme ve cuboideum) ile 5 metatars kemiğinin tabanları arasındaki eklemler. Klinik olarak 'Lisfranc eklemi' olarak da bilinir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Tarsometatarsal eklemler"
        },
        {
            "id": 540,
            "term": "Articulationes Metatarsophalangeales",
            "turkish": "Metatarsophalangeal Joints (MTP Joints)",
            "roots": "articulatio (eklem) + metatarsus (ayak tarağı) + phalanx (parmak kemiği)",
            "definition": "Metatarsofalangeal eklemler; metatars başları ile proksimal falanksların tabanları arasındaki kondiloid tip sinovyal eklemler. Yürüme sırasında itiş fazında kritik rol oynar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Metatarsofalangeal eklemler"
        },
        {
            "id": 541,
            "term": "Articulationes İnterphalangeales Pedis",
            "turkish": "İnterphalangeal Joints of the Foot",
            "roots": "articulatio (eklem) + inter (arasında) + phalanx (parmak kemiği) + pes (ayak)",
            "definition": "Ayağın interfalangeal eklemleri; ayak parmağı falanksları arasındaki menteşe tipi sinovyal eklemler. Proksimal (PIP) ve distal (DIP) interfalangeal eklemleri kapsar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Ayağın interfalangeal eklemleri"
        },
        {
            "id": 542,
            "term": "Ligamentum İnguinale",
            "turkish": "İnguinal Ligament",
            "roots": "ligamentum (bağ) + inguen (kasık)",
            "definition": "İnguinal bağ (kasık bağı); spina iliaca anterior superior'dan tuberculum pubicum'a uzanan, karın duvarı ile uyluk arasındaki sınırı oluşturan bağ.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "İnguinal bağ (kasık bağı)"
        },
        {
            "id": 543,
            "term": "Membrana İnterossea Cruris",
            "turkish": "İnterosseous Membrane of Leg",
            "roots": "membrana (zar) + interosseus (kemikler arası) + crus (bacak)",
            "definition": "Bacağın interosseöz membranı; tibia ve fibula gövdeleri arasında uzanan, iki kemiği birbirine bağlayan fibröz zar. Kas yapışma yüzeyi olarak da görev yapar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "lower_extremity_joints",
            "turkishShort": "Bacağın interosseöz membranı"
        }
    ],
    "spine_joints": [
        {
            "id": 544,
            "term": "Columna Vertebralis",
            "turkish": "Vertebral Column (Spine)",
            "roots": "columna (sütun) + vertebralis (omura ait)",
            "definition": "Omurga; 33 vertebradan oluşan, gövdenin ana eksenini oluşturan kemik yapı. Cervical, thoracic, lumbal, sakral ve koksigeal bölümlere ayrılır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Omurga"
        },
        {
            "id": 545,
            "term": "Articulatio Zygapophysialis",
            "turkish": "Zygapophyseal Joint (Facet Joint)",
            "roots": "articulatio (eklem) + zygon (bağlantı) + physis (çıkıntı)",
            "definition": "Zigapofizyal eklem (faset eklem); komşu vertebraların processus articularis'leri arasındaki düzlem tipi sinovyal eklem. Omurganın hareket yönünü ve derecesini belirler.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Zigapofizyal eklem (faset eklem)"
        },
        {
            "id": 546,
            "term": "Discus İntervertebralis",
            "turkish": "İntervertebral Disc",
            "roots": "discus (disk) + inter (arasında) + vertebra (omur)",
            "definition": "İntervertebral disk; komşu vertebra korpuslarını birbirine bağlayan fibrokartilaj yapı. Dış kısmı annulus fibrosus, iç kısmı nucleus pulposus'tan oluşur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "İntervertebral disk"
        },
        {
            "id": 547,
            "term": "Nucleus Pulposus",
            "turkish": "Nucleus Pulposus",
            "roots": "nucleus (çekirdek) + pulposus (etli, yumuşak)",
            "definition": "Nükleus pulpozus; intervertebral diskin jel benzeri iç kısmı. Yüksek su içeriğiyle yük dağılımını ve şok emilimini sağlar; yaşla birlikte su kaybederek dejenerasyona uğrar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Nükleus pulpozus"
        },
        {
            "id": 548,
            "term": "Annulus Fibrosus",
            "turkish": "Annulus Fibrosus",
            "roots": "annulus (halka) + fibrosus (lifli)",
            "definition": "Anulus fibrosus; intervertebral diskin dış kısmını oluşturan konsantrik kollajen lif tabakaları. Nucleus pulposus'u çevreler ve diskin bütünlüğünü korur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Anulus fibrosus"
        },
        {
            "id": 549,
            "term": "Ligamentum Longitudinale Anterius",
            "turkish": "Anterior Longitudinal Ligament",
            "roots": "ligamentum (bağ) + longitudinalis (boylamsal) + anterius (ön)",
            "definition": "Ön longitudinal bağ; vertebra korpuslarının ön yüzü boyunca kafa tabanından sakruma kadar uzanan güçlü bağ. Omurganın aşırı ekstansiyonunu sınırlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Ön longitudinal bağ"
        },
        {
            "id": 550,
            "term": "Ligamentum Longitudinale Posterius",
            "turkish": "Posterior Longitudinal Ligament",
            "roots": "ligamentum (bağ) + longitudinalis (boylamsal) + posterius (arka)",
            "definition": "Arka longitudinal bağ; vertebra korpuslarının arka yüzü boyunca, canalis vertebralis içinde uzanan bağ. Omurganın aşırı fleksiyonunu ve disk herniasyonunu sınırlamaya yardımcı olur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Arka longitudinal bağ"
        },
        {
            "id": 551,
            "term": "Ligamentum Flavum",
            "turkish": "Ligamentum Flavum (Yellow Ligament)",
            "roots": "ligamentum (bağ) + flavus (sarı)",
            "definition": "Ligamentum flavum (sarı bağ); komşu vertebraların lamina'ları arasında uzanan, yüksek elastin içeriği nedeniyle sarı renkte görünen bağ. Omurganın fleksiyondan ekstansiyona dönüşünde yardımcı olur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Ligamentum flavum (sarı bağ)"
        },
        {
            "id": 552,
            "term": "Ligamentum İnterspinale",
            "turkish": "İnterspinous Ligament",
            "roots": "ligamentum (bağ) + inter (arasında) + spina (diken, çıkıntı)",
            "definition": "İnterspinöz bağ; komşu vertebraların processus spinosus'ları arasında uzanan ince bağ. Aşırı fleksiyon sırasında gerilerek stabilite sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "İnterspinöz bağ"
        },
        {
            "id": 553,
            "term": "Ligamentum Supraspinale",
            "turkish": "Supraspinous Ligament",
            "roots": "ligamentum (bağ) + supra (üstünde) + spina (diken, çıkıntı)",
            "definition": "Supraspinöz bağ; vertebraların processus spinosus uçları boyunca C7'den sakruma kadar uzanan yüzeysel bağ. Aşırı fleksiyona karşı direnç gösterir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Supraspinöz bağ"
        },
        {
            "id": 554,
            "term": "Articulatio Atlantooccipitalis",
            "turkish": "Atlanto-occipital Joint",
            "roots": "articulatio (eklem) + atlas (1. servikal vertebra) + occiput (art kafa)",
            "definition": "Atlantooksipital eklem; atlas (C1) ile os occipitale'nin condylus occipitalis'leri arasındaki elipsoid tipi sinovyal eklem. Başın fleksiyon-ekstansiyonunu (baş sallama hareketi) sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Atlantooksipital eklem"
        },
        {
            "id": 555,
            "term": "Articulatio Atlantoaxialis",
            "turkish": "Atlanto-axial Joint",
            "roots": "articulatio (eklem) + atlas (1. servikal vertebra) + axis (2. servikal vertebra)",
            "definition": "Atlantoaksiyal eklem; atlas (C1) ile axis (C2) arasındaki eklem kompleksi. Median ve lateral parçalardan oluşur; başın yanlara dönme hareketinin (hayır anlamı) yaklaşık yarısını sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Atlantoaksiyal eklem"
        },
        {
            "id": 556,
            "term": "Dens Axis",
            "turkish": "Dens (Odontoid Process) of Axis",
            "roots": "dens (diş) + axis (2. servikal vertebra)",
            "definition": "Axis'in dens'i (odontoid çıkıntısı); axis vertebrasının üst yüzünden yukarı doğru uzanan, atlas'ın içinden geçerek atlantoaksiyal eklemin pivot ekseni görevi gören çıkıntı.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Axis'in dens'i (odontoid çıkıntısı)"
        },
        {
            "id": 557,
            "term": "Ligamentum Transversum Atlantis",
            "turkish": "Transverse Ligament of Atlas",
            "roots": "ligamentum (bağ) + transversus (enine) + atlas (1. servikal vertebra)",
            "definition": "Atlasın transvers bağı; atlas'ın iç yüzünde yer alan, dens axis'i arkadan destekleyerek yerinde tutan güçlü bağ. Bütünlüğü bozulursa medulla spinalis hasarı riski oluşur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Atlasın transvers bağı"
        },
        {
            "id": 558,
            "term": "Articulatio Sacroiliaca",
            "turkish": "Sacroiliac Joint",
            "roots": "articulatio (eklem) + sacrum (kuyruk sokumu üstü kemik) + ilium (kalça kemiği üst kısmı)",
            "definition": "Sakroiliak eklem; os sacrum ile os ilium arasındaki güçlü, sınırlı hareketli sinovyal eklem. Gövde ağırlığını pelvise aktarır; klinik olarak sık ağrı kaynağıdır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Sakroiliak eklem"
        },
        {
            "id": 559,
            "term": "Symphysis Pubica",
            "turkish": "Pubic Symphysis",
            "roots": "symphysis (birleşme, kaynaşma) + pubica (pubise ait)",
            "definition": "Pubik simfiz; iki os pubis arasında, fibrokartilaj bir disk aracılığıyla oluşan sekonder kıkırdak eklem. Pelvis stabilitesini sağlar, gebelikte hafifçe gevşer.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Pubik simfiz"
        },
        {
            "id": 560,
            "term": "Articulatio Sacrococcygea",
            "turkish": "Sacrococcygeal Joint",
            "roots": "articulatio (eklem) + sacrum (kuyruk sokumu üstü kemik) + coccyx (kuyruk sokumu kemiği)",
            "definition": "Sakrokoksigeal eklem; os sacrum'un alt ucu ile os coccygis arasındaki sekonder kıkırdak eklem. Otururken hafif hareket serbestisi sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Sakrokoksigeal eklem"
        },
        {
            "id": 561,
            "term": "Canalis Vertebralis",
            "turkish": "Vertebral Canal (Spinal Canal)",
            "roots": "canalis (kanal) + vertebralis (omura ait)",
            "definition": "Vertebral kanal (omurilik kanalı); üst üste dizilen vertebraların foramen vertebrale'lerinin oluşturduğu, medulla spinalis'i içine alan uzun kanal.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "Vertebral kanal (omurilik kanalı)"
        },
        {
            "id": 562,
            "term": "Foramen İntervertebrale",
            "turkish": "İntervertebral Foramen",
            "roots": "foramen (delik, açıklık) + inter (arasında) + vertebra (omur)",
            "definition": "İntervertebral foramen; komşu vertebraların pedikülleri arasında oluşan açıklık. Spinal sinirlerin canalis vertebralis'ten çıktığı yerdir; daralması radikülopatiye yol açabilir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "spine_joints",
            "turkishShort": "İntervertebral foramen"
        }
    ],
    "head_and_neck_joints": [
        {
            "id": 563,
            "term": "Articulatio Temporomandibularis",
            "turkish": "Temporomandibular Joint (TMJ)",
            "roots": "articulatio (eklem) + temporalis (şakak kemiğine ait) + mandibula (alt çene)",
            "definition": "Temporomandibular eklem; os temporale'nin fossa mandibularis'i ile mandibula'nın caput mandibulae'si arasındaki bileşik sinovyal eklem. Çene açma-kapama, öne-arkaya kayma ve yanal hareketleri sağlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Temporomandibular eklem"
        },
        {
            "id": 564,
            "term": "Discus Articularis Temporomandibularis",
            "turkish": "Articular Disc of Temporomandibular Joint",
            "roots": "discus (disk) + articularis (ekleme ait) + temporomandibularis (temporomandibulara ait)",
            "definition": "Temporomandibular eklem diski; eklem boşluğunu üst ve alt olmak üzere ikiye ayıran fibrokartilaj disk. Eklem yüzeylerinin uyumunu sağlar ve yükü dağıtır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Temporomandibular eklem diski"
        },
        {
            "id": 565,
            "term": "Fossa Mandibularis",
            "turkish": "Mandibular Fossa",
            "roots": "fossa (çukur) + mandibularis (alt çeneye ait)",
            "definition": "Mandibular çukur; os temporale üzerinde yer alan, mandibula'nın caput mandibulae'sini (kondil başı) karşılayan derin çukur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Mandibular çukur"
        },
        {
            "id": 566,
            "term": "Caput Mandibulae",
            "turkish": "Head of Mandible (Mandibular Condyle)",
            "roots": "caput (baş) + mandibula (alt çene)",
            "definition": "Mandibula başı (kondili); mandibula'nın processus condylaris'inin üst ucunda yer alan, temporomandibular eklemi oluşturan yuvarlak eklem yüzeyi.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Mandibula başı (kondili)"
        },
        {
            "id": 567,
            "term": "Ligamentum Temporomandibulare",
            "turkish": "Temporomandibular Ligament (Lateral Ligament)",
            "roots": "ligamentum (bağ) + temporomandibularis (temporomandibulara ait)",
            "definition": "Temporomandibular bağ (lateral bağ); eklem kapsülünün lateral yüzünü güçlendiren bağ. Mandibula'nın aşırı geriye ve aşağıya hareketini sınırlar.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Temporomandibular bağ (lateral bağ)"
        },
        {
            "id": 568,
            "term": "Sutura Coronalis",
            "turkish": "Coronal Suture",
            "roots": "sutura (dikiş, sütur) + coronalis (taç şeklinde, önden geçen)",
            "definition": "Koronal sütur; os frontale ile iki os parietale arasında, kafatasının önden geçen sabit fibröz eklemi.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Koronal sütur"
        },
        {
            "id": 569,
            "term": "Sutura Sagittalis",
            "turkish": "Sagittal Suture",
            "roots": "sutura (dikiş, sütur) + sagittalis (ok yönünde, ön-arka doğrultuda)",
            "definition": "Sagittal sütur; iki os parietale arasında, kafatasının tepesinde ön-arka doğrultuda uzanan sabit fibröz eklem.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Sagittal sütur"
        },
        {
            "id": 570,
            "term": "Sutura Lambdoidea",
            "turkish": "Lambdoid Suture",
            "roots": "sutura (dikiş, sütur) + lambda (Yunan alfabesinde λ harfi)",
            "definition": "Lambdoid sütur; iki os parietale ile os occipitale arasında, kafatasının arkasında yer alan ve Yunan harfi lambda'ya benzeyen sabit fibröz eklem.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Lambdoid sütur"
        },
        {
            "id": 571,
            "term": "Sutura Squamosa",
            "turkish": "Squamous Suture",
            "roots": "sutura (dikiş, sütur) + squamosus (pullu, ince tabaka şeklinde)",
            "definition": "Squamöz sütur; os temporale'nin pars squamosa'sı ile os parietale arasında, kafatasının yan tarafında yer alan pullu (üst üste binen) tipte fibröz eklem.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Squamöz sütur"
        },
        {
            "id": 572,
            "term": "Fonticulus Anterior",
            "turkish": "Anterior Fontanelle",
            "roots": "fonticulus (küçük pınar, kaynak) + anterior (ön)",
            "definition": "Ön bıngıldak; yenidoğanda sutura coronalis ile sutura sagittalis'in kesiştiği noktada, kemikleşmenin henüz tamamlanmadığı en büyük yumuşak bölge. Genellikle 18-24 ayda kapanır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Ön bıngıldak"
        },
        {
            "id": 573,
            "term": "Fonticulus Posterior",
            "turkish": "Posterior Fontanelle",
            "roots": "fonticulus (küçük pınar, kaynak) + posterior (arka)",
            "definition": "Arka bıngıldak; yenidoğanda sutura sagittalis ile sutura lambdoidea'nın kesiştiği noktadaki daha küçük yumuşak bölge. Genellikle 2-3 ayda kapanır.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Arka bıngıldak"
        },
        {
            "id": 574,
            "term": "Articulationes Costovertebrales",
            "turkish": "Costovertebral Joints",
            "roots": "articulatio (eklem) + costa (kaburga) + vertebra (omur)",
            "definition": "Kostovertebral eklemler; kaburgaların başı ile torasik vertebra korpusları arasındaki sinovyal eklemler. Solunum sırasında kaburgaların hareketine izin verir.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Kostovertebral eklemler"
        },
        {
            "id": 575,
            "term": "Articulationes Sternocostales",
            "turkish": "Sternocostal Joints",
            "roots": "articulatio (eklem) + sternum (göğüs kemiği) + costa (kaburga)",
            "definition": "Sternokostal eklemler; kaburga kıkırdaklarının (cartilago costalis) sternum ile birleştiği eklemler. 1. kosta kıkırdağı sternumla sinkondroz, diğerleri genelde sinovyal eklem oluşturur.",
            "category": "anatomy",
            "system": "movement",
            "subcategory": "head_and_neck_joints",
            "turkishShort": "Sternokostal eklemler"
        }
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
// Supports both legacy category IDs and new filter format
// Filter format: "mainCategory:system" or "mainCategory:system:subcategory"
// Examples: "roots:movement", "roots:respiratory:respiratory_organs", "anatomy" (legacy)
export const getRandomTerms = (count = 10, filter = null) => {
  let terms = [];

  if (!filter || filter === 'all') {
    // Get all terms
    terms = getAllTerms();
  } else if (typeof filter === 'string') {
    // Parse filter string
    const parts = filter.split(':');

    if (parts.length === 1) {
      // Legacy category ID (anatomy, surgery, roots, pathology)
      terms = getTermsByCategory(filter);
    } else if (parts.length === 2) {
      // mainCategory:system format
      const [mainCategory, system] = parts;
      terms = getTermsBySystem(system, mainCategory);
    } else if (parts.length === 3) {
      // mainCategory:system:subcategory format
      const [mainCategory, system, subcategory] = parts;
      terms = getTermsBySubcategory(system, subcategory, mainCategory);
    }
  }

  // If no terms found, fall back to all terms
  if (terms.length === 0) {
    terms = getAllTerms();
  }

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