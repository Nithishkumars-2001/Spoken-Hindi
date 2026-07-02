/* ============================================================
   data.js — Central data store for the Spoken Hindi site
   Contains: Hindi alphabet set, and practice sentence banks
   for Small / Medium / Paragraph modules with Tamil source,
   correct Hindi answer, and Tamil+English explanations.
   ============================================================ */

/* ---------- Hindi Alphabet Data (Vowels + Consonants) ---------- */
const hindiAlphabet = [
  { letter: "अ", translit: "a", ta: "அ (ஆ போன்ற குறுகிய ஒலி)", en: "Short 'a' as in 'about'" },
  { letter: "आ", translit: "aa", ta: "ஆ", en: "Long 'aa' as in 'father'" },
  { letter: "इ", translit: "i", ta: "இ (குறுகிய)", en: "Short 'i' as in 'sit'" },
  { letter: "ई", translit: "ee", ta: "ஈ (நீண்ட)", en: "Long 'ee' as in 'see'" },
  { letter: "उ", translit: "u", ta: "உ (குறுகிய)", en: "Short 'u' as in 'put'" },
  { letter: "ऊ", translit: "oo", ta: "ஊ (நீண்ட)", en: "Long 'oo' as in 'food'" },
  { letter: "ए", translit: "e", ta: "ஏ", en: "'e' as in 'bay'" },
  { letter: "ऐ", translit: "ai", ta: "ஐ", en: "'ai' as in 'aisle'" },
  { letter: "ओ", translit: "o", ta: "ஓ", en: "'o' as in 'go'" },
  { letter: "औ", translit: "au", ta: "ஔ", en: "'au' as in 'caught'" },
  { letter: "क", translit: "ka", ta: "க", en: "'ka' as in 'kite'" },
  { letter: "ख", translit: "kha", ta: "க (மூச்சுடன்)", en: "Aspirated 'kha'" },
  { letter: "ग", translit: "ga", ta: "க/ங", en: "'ga' as in 'go'" },
  { letter: "घ", translit: "gha", ta: "க (கனமான)", en: "Aspirated 'gha'" },
  { letter: "च", translit: "cha", ta: "ச", en: "'cha' as in 'chair'" },
  { letter: "छ", translit: "chha", ta: "ச (மூச்சுடன்)", en: "Aspirated 'chha'" },
  { letter: "ज", translit: "ja", ta: "ஜ", en: "'ja' as in 'jam'" },
  { letter: "झ", translit: "jha", ta: "ஜ (கனமான)", en: "Aspirated 'jha'" },
  { letter: "ट", translit: "Ta", ta: "ட", en: "Retroflex 't' as in 'table' (hard)" },
  { letter: "ठ", translit: "Tha", ta: "ட (மூச்சுடன்)", en: "Aspirated retroflex 'Tha'" },
  { letter: "ड", translit: "Da", ta: "ட/ட", en: "Retroflex 'd'" },
  { letter: "ढ", translit: "Dha", ta: "ட (கனமான)", en: "Aspirated retroflex 'Dha'" },
  { letter: "ण", translit: "Na", ta: "ண", en: "Retroflex 'n'" },
  { letter: "त", translit: "ta", ta: "த", en: "Dental 't' as in 'think' (soft)" },
  { letter: "थ", translit: "tha", ta: "த (மூச்சுடன்)", en: "Aspirated dental 'tha'" },
  { letter: "द", translit: "da", ta: "த/ட", en: "Dental 'd'" },
  { letter: "ध", translit: "dha", ta: "த (கனமான)", en: "Aspirated dental 'dha'" },
  { letter: "न", translit: "na", ta: "ந", en: "'na' as in 'nut'" },
  { letter: "प", translit: "pa", ta: "ப", en: "'pa' as in 'pot'" },
  { letter: "फ", translit: "pha/fa", ta: "ப (மூச்சுடன்)/ஃப", en: "Aspirated 'pha' or 'fa'" },
  { letter: "ब", translit: "ba", ta: "ப/ப", en: "'ba' as in 'bat'" },
  { letter: "भ", translit: "bha", ta: "ப (கனமான)", en: "Aspirated 'bha'" },
  { letter: "म", translit: "ma", ta: "ம", en: "'ma' as in 'mat'" },
  { letter: "य", translit: "ya", ta: "ய", en: "'ya' as in 'yes'" },
  { letter: "र", translit: "ra", ta: "ர", en: "'ra' as in 'run'" },
  { letter: "ल", translit: "la", ta: "ல", en: "'la' as in 'lamp'" },
  { letter: "व", translit: "va/wa", ta: "வ", en: "'va/wa' as in 'van'" },
  { letter: "श", translit: "sha", ta: "ஶ/ஷ", en: "'sha' as in 'shop'" },
  { letter: "ष", translit: "Sha", ta: "ஷ", en: "Retroflex 'sha'" },
  { letter: "स", translit: "sa", ta: "ஸ", en: "'sa' as in 'sun'" },
  { letter: "ह", translit: "ha", ta: "ஹ", en: "'ha' as in 'hat'" },
];

/* ---------- Small Sentence Practice Data ----------
   Each item: tamil (source), en (english hint), hindi (correct answer),
   explanation: array of tip strings (Tamil + English mixed guidance) */
const smallSentences = [
  {
    tamil: "நான் பள்ளிக்கு செல்கிறேன்.",
    en: "I am going to school.",
    hindi: "मैं स्कूल जाता हूँ।",
    explanation: [
      "‘मैं’ = நான் (I) — எப்போதும் வாக்கியத்தின் தொடக்கத்தில் வரும் / always starts the sentence.",
      "‘जाता हूँ’ = ஆண்பால் பேச்சாளருக்கான 'செல்கிறேன்' வடிவம் / male-speaker form of 'going'. பெண் பேச்சாளர் 'जाती हूँ' பயன்படுத்த வேண்டும் / females use 'जाती हूँ'.",
      "வாக்கிய அமைப்பு (Sentence Order): Subject + Object + Verb (SOV) — தமிழ் அமைப்பை ஒத்தது."
    ]
  },
  {
    tamil: "இது என் புத்தகம்.",
    en: "This is my book.",
    hindi: "यह मेरी किताब है।",
    explanation: [
      "‘यह’ = இது (this) — அருகில் உள்ளதைக் குறிக்கும் / used for near objects.",
      "‘मेरी’ = என்னுடைய (my) — 'किताब' பெண்பால் சொல் என்பதால் 'मेरी' பயன்படுத்தப்படுகிறது / agrees with feminine noun 'किताब'.",
      "'है' வாக்கியத்தின் இறுதியில் வரும் 'to be' வினைச்சொல் / 'is' verb comes at the end."
    ]
  },
  {
    tamil: "அவன் தண்ணீர் குடிக்கிறான்.",
    en: "He drinks water.",
    hindi: "वह पानी पीता है।",
    explanation: [
      "‘वह’ = அவன்/அவள்/அது (he/she/it) — சூழலைப் பொறுத்து மாறும் / context decides gender in English.",
      "‘पानी’ = தண்ணீர் (water), ‘पीता है’ = குடிக்கிறான் (drinks - male form).",
      "பெண்பால் பேச்சாளர்/பொருள் என்றால் 'पीती है' பயன்படுத்தவும் / use 'पीती है' for feminine subject."
    ]
  },
  {
    tamil: "நாங்கள் இன்று சந்தையில் இருக்கிறோம்.",
    en: "We are at the market today.",
    hindi: "हम आज बाज़ार में हैं।",
    explanation: [
      "‘हम’ = நாங்கள்/நாம் (we) — ஆண்/பெண் இருவருக்கும் ஒரே சொல் / same word for all genders.",
      "‘में’ = உள்ளே (in/at) — இடத்தைக் குறிக்கும் இடைச்சொல் (postposition) வாக்கியத்தின் நடுவில் வரும்.",
      "‘हैं’ = plural 'to be' வடிவம் 'हम' உடன் பயன்படுத்தப்படும் / plural form used with 'हम'."
    ]
  },
  {
    tamil: "அவள் அழகாக பாடுகிறாள்.",
    en: "She sings beautifully.",
    hindi: "वह सुंदर गाती है।",
    explanation: [
      "‘सुंदर’ = அழகாக (beautifully) — வினையை விவரிக்கும் சொல் வினைச்சொல்லுக்கு முன் வரும்.",
      "‘गाती है’ = பாடுகிறாள் (sings - female form). ஆண் பேச்சாளர் என்றால் 'गाता है'.",
      "வாக்கிய அமைப்பு: Subject + Adverb + Verb + Auxiliary."
    ]
  },
  {
    tamil: "இந்த வீடு பெரியது.",
    en: "This house is big.",
    hindi: "यह घर बड़ा है।",
    explanation: [
      "‘घर’ (house) ஆண்பால் சொல் என்பதால் அடைமொழி 'बड़ा' ஆண்பால் வடிவில் இருக்கிறது / adjective agrees with masculine noun.",
      "பெண்பால் பெயர்ச்சொல்லாக இருந்தால் அடைமொழி 'बड़ी' ஆக மாறும் / adjective becomes 'बड़ी' for feminine nouns.",
      "‘है’ ஒருமை வாக்கியத்தின் 'to be' வடிவம்."
    ]
  },
  {
    tamil: "நான் தினமும் காலையில் எழுகிறேன்.",
    en: "I wake up every morning.",
    hindi: "मैं रोज़ सुबह उठता हूँ।",
    explanation: [
      "‘रोज़’ = தினமும் (daily/every day) — வினைச்சொல்லுக்கு முன் நேரம் குறிக்கும் சொற்கள் வரும்.",
      "‘सुबह’ = காலை (morning). ‘उठता हूँ’ = எழுகிறேன் (wake up - male form); பெண் பேச்சாளர்: 'उठती हूँ'.",
      "நேர வரிசை: Time-word + Verb, தமிழ் அமைப்பை ஒத்தது."
    ]
  },
  {
    tamil: "அவர்கள் கடிதம் எழுதுகிறார்கள்.",
    en: "They are writing a letter.",
    hindi: "वे पत्र लिखते हैं।",
    explanation: [
      "‘वे’ = அவர்கள் (they) — பன்மை பொருள்.",
      "‘पत्र’ = கடிதம் (letter), ‘लिखते हैं’ = எழுதுகிறார்கள் (write - plural form).",
      "பன்மை பொருளுக்கு வினைச்சொல் எப்போதும் பன்மை வடிவில் இருக்க வேண்டும் / verb must agree in plural."
    ]
  }
];

/* ---------- Medium Sentence Practice Data ---------- */
const mediumSentences = [
  {
    tamil: "நான் நேற்று என் நண்பருடன் திரைப்படம் பார்க்க சென்றேன்.",
    en: "I went to watch a movie with my friend yesterday.",
    hindi: "मैं कल अपने दोस्त के साथ फ़िल्म देखने गया था।",
    explanation: [
      "‘कल’ = நேற்று/நாளை (yesterday/tomorrow — சூழலைப் பொறுத்து) — இங்கு கடந்த காலம் என்பதால் 'yesterday'.",
      "‘के साथ’ = உடன் (with) — 'दोस्त' (friend) க்குப் பிறகு வரும் postposition.",
      "‘गया था’ = சென்றேன் (went) — past tense-ல் 'था' சேர்த்து கடந்த கால தொடர்ச்சியைக் காட்டுகிறது / 'था' marks completed past action.",
      "பெண் பேச்சாளர் என்றால்: 'गई थी' பயன்படுத்தவும்."
    ]
  },
  {
    tamil: "என் அம்மா ஒவ்வொரு நாளும் சுவையான உணவு சமைக்கிறார்கள்.",
    en: "My mother cooks delicious food every day.",
    hindi: "मेरी माँ हर रोज़ स्वादिष्ट खाना बनाती हैं।",
    explanation: [
      "‘मेरी माँ’ = என் அம்மா — 'माँ' பெண்பால் என்பதால் 'मेरी' பயன்படுத்தப்படுகிறது.",
      "‘हर रोज़’ = ஒவ்வொரு நாளும் (every day) — நேரம் தெரிவிக்கும் தொடர் வினைக்கு முன் வரும்.",
      "‘बनाती हैं’ = சமைக்கிறார்கள் — மரியாதைக்குரிய பன்மை வடிவம் (respect form) தாய்க்கு பயன்படுத்தப்படுகிறது.",
      "‘स्वादिष्ट’ = சுவையான (delicious) — பெயர்ச்சொல்லுக்கு முன் வரும் அடைமொழி."
    ]
  },
  {
    tamil: "மழை பெய்வதால் நாங்கள் வெளியே செல்ல முடியவில்லை.",
    en: "Because it is raining, we cannot go outside.",
    hindi: "बारिश हो रही है इसलिए हम बाहर नहीं जा सकते।",
    explanation: [
      "‘बारिश हो रही है’ = மழை பெய்கிறது (it is raining) — நிகழ்கால தொடர்ச்சி (present continuous) வடிவம்.",
      "‘इसलिए’ = ஆகையால்/அதனால் (therefore/because of that) — காரண-விளைவு தொடர்பை இணைக்கும் சொல்.",
      "‘नहीं जा सकते’ = செல்ல முடியாது (cannot go) — 'सकते' திறனைக் (ability) குறிக்கும், 'नहीं' முன் வந்து மறுப்பு தெரிவிக்கிறது.",
      "வாக்கிய அமைப்பு: காரணம் + இணைப்பு சொல் + விளைவு."
    ]
  },
  {
    tamil: "நான் இந்த வருடம் இந்தி பேச கற்றுக்கொள்ள விரும்புகிறேன்.",
    en: "I want to learn to speak Hindi this year.",
    hindi: "मैं इस साल हिंदी बोलना सीखना चाहता हूँ।",
    explanation: [
      "‘इस साल’ = இந்த வருடம் (this year) — காலம் தெரிவிக்கும் சொற்றொடர் வாக்கியத்தின் தொடக்கத்தில்/நடுவில் வரலாம்.",
      "‘बोलना सीखना’ = பேச கற்றுக்கொள்ள (learn to speak) — இரண்டு வினைச்சொற்கள் இணைந்து ஒரு செயலைக் காட்டுகின்றன.",
      "‘चाहता हूँ’ = விரும்புகிறேன் (want - male form); பெண் பேச்சாளர்: 'चाहती हूँ'.",
      "இரு வினைச்சொற்களும் (infinitive + main verb) இணைந்தே இறுதி துணை வினைக்கு (auxiliary) முன் வரும்."
    ]
  },
  {
    tamil: "அவர் கடினமாக உழைத்ததால் தேர்வில் முதலிடம் பெற்றார்.",
    en: "He worked hard, so he got first place in the exam.",
    hindi: "उसने कड़ी मेहनत की इसलिए उसे परीक्षा में पहला स्थान मिला।",
    explanation: [
      "‘उसने’ = அவன்/அவள் (he/she — ergative 'ने' subject) — கடந்த கால செயல்பாட்டு வினைச்சொற்களுடன் 'ने' சேர்க்கப்படுகிறது.",
      "‘कड़ी मेहनत की’ = கடினமாக உழைத்தார் (worked hard) — 'मेहनत करना' (to work hard) என்ற தொடர் வினை.",
      "‘उसे... मिला’ = அவருக்கு கிடைத்தது (he got) — 'मिलना' வினை பொருள் பெறுபவரிடம் 'को/उसे' உடன் பயன்படும்.",
      "‘पहला स्थान’ = முதலிடம் (first place)."
    ]
  }
];

/* ---------- Paragraph Practice Data ---------- */
const paragraphPractice = [
  {
    tamil: "என் பெயர் ராஜு. நான் சென்னையில் வசிக்கிறேன். எனக்கு இந்தி மொழி கற்றுக்கொள்வது மிகவும் பிடிக்கும். ஒவ்வொரு நாளும் நான் ஒரு மணி நேரம் இந்தி பயிற்சி செய்கிறேன். எதிர்காலத்தில் நான் இந்தியில் சரளமாக பேச விரும்புகிறேன்.",
    en: "My name is Raju. I live in Chennai. I love learning the Hindi language. Every day I practice Hindi for one hour. In the future, I want to speak fluently in Hindi.",
    hindi: "मेरा नाम राजू है। मैं चेन्नई में रहता हूँ। मुझे हिंदी भाषा सीखना बहुत पसंद है। हर रोज़ मैं एक घंटा हिंदी अभ्यास करता हूँ। भविष्य में मैं हिंदी में धाराप्रवाह बोलना चाहता हूँ।",
    explanation: [
      "‘मेरा नाम ... है’ = என் பெயர் ... (my name is) — அறிமுக வாக்கியங்களுக்கான அடிப்படை அமைப்பு.",
      "‘रहता हूँ’ = வசிக்கிறேன் (live - male form); பெண்: 'रहती हूँ'.",
      "‘मुझे ... पसंद है’ = எனக்கு பிடிக்கும் (I like) — தமிழைப் போலவே 'எனக்கு' (मुझे) கொண்டு தொடங்கும் அமைப்பு, ஆங்கிலத்தில் 'I like' என மாறுபடும்.",
      "‘हर रोज़’ = ஒவ்வொரு நாளும், ‘एक घंटा’ = ஒரு மணி நேரம் — கால அளவு பெயர்ச்சொல்லுக்கு முன் வரும்.",
      "‘धाराप्रवाह’ = சரளமாக (fluently) — வினையை விவரிக்கும் சொல் வினைச்சொல்லுக்கு முன்.",
      "பத்தி முழுவதும் ஒவ்வொரு வாக்கியமும் Subject + Object + Verb (SOV) அமைப்பைப் பின்பற்றுகிறது."
    ]
  },
  {
    tamil: "இன்று காலை நான் சீக்கிரம் எழுந்தேன். நான் பூங்காவிற்கு நடைப்பயிற்சிக்கு சென்றேன். அங்கே பறவைகள் பாடிக்கொண்டிருந்தன. காற்று குளிர்ச்சியாகவும் இதமாகவும் இருந்தது. நான் மிகவும் மகிழ்ச்சியாக உணர்ந்தேன்.",
    en: "This morning I woke up early. I went for a walk to the park. Birds were singing there. The air was cool and pleasant. I felt very happy.",
    hindi: "आज सुबह मैं जल्दी उठा। मैं पार्क में टहलने गया। वहाँ पक्षी गा रहे थे। हवा ठंडी और सुहावनी थी। मुझे बहुत खुशी महसूस हुई।",
    explanation: [
      "‘आज सुबह’ = இன்று காலை (this morning) — நேரம் காட்டும் சொற்றொடர் வாக்கியத்தின் ஆரம்பத்தில்.",
      "‘टहलने गया’ = நடைப்பயிற்சிக்கு சென்றேன் — 'टहलना' (to walk) + 'गया' (went); இரு வினைச்சொற்கள் இணைந்த அமைப்பு.",
      "‘गा रहे थे’ = பாடிக்கொண்டிருந்தன (were singing) — கடந்த கால தொடர்ச்சி (past continuous) வடிவம்.",
      "‘मुझे ... महसूस हुई’ = எனக்கு உணர்ந்தேன் (I felt) — உணர்வுகளை தமிழ் போலவே 'எனக்கு' அமைப்பில் சொல்வது.",
      "‘ठंडी और सुहावनी’ = குளிர்ச்சியாகவும் இதமாகவும் — 'हवा' பெண்பால் என்பதால் அடைமொழிகள் பெண்பால் வடிவில் உள்ளன."
    ]
  }
];
