const toolsData = [
  // ===== TEXT =====
  {
    id: "word-counter",
    icon: "📝",
    cat: "text",
    title: { fa: "شمارنده کلمات", en: "Word Counter" },
    desc: { fa: "شمارش کلمات، کاراکتر و پاراگراف", en: "Count words, characters & paragraphs" }
  },
  {
    id: "case-converter",
    icon: "🔤",
    cat: "text",
    title: { fa: "تبدیل حروف", en: "Case Converter" },
    desc: { fa: "بزرگ، کوچک، عنوان و بیشتر", en: "Upper, lower, title case & more" }
  },
  {
    id: "text-reverser",
    icon: "🔄",
    cat: "text",
    title: { fa: "معکوس‌کننده متن", en: "Text Reverser" },
    desc: { fa: "معکوس کردن متن یا کلمات", en: "Reverse text or words" }
  },
  {
    id: "lorem-ipsum",
    icon: "📄",
    cat: "text",
    title: { fa: "تولید لورم ایپسوم", en: "Lorem Ipsum Generator" },
    desc: { fa: "تولید متن ساختگی برای طراحی", en: "Generate placeholder text" }
  },
  {
    id: "remove-duplicates",
    icon: "🧹",
    cat: "text",
    title: { fa: "حذف خطوط تکراری", en: "Remove Duplicates" },
    desc: { fa: "حذف خطوط تکراری از متن", en: "Remove duplicate lines from text" }
  },
  {
    id: "sort-lines",
    icon: "↕️",
    cat: "text",
    title: { fa: "مرتب‌سازی خطوط", en: "Sort Lines" },
    desc: { fa: "مرتب‌سازی الفبایی خطوط", en: "Alphabetically sort lines" }
  },
  {
    id: "find-replace",
    icon: "🔍",
    cat: "text",
    title: { fa: "جستجو و جایگزینی", en: "Find & Replace" },
    desc: { fa: "پیدا کردن و جایگزینی متن", en: "Find and replace text" }
  },
  {
    id: "text-to-binary",
    icon: "1️⃣",
    cat: "text",
    title: { fa: "متن به باینری", en: "Text to Binary" },
    desc: { fa: "تبدیل متن به کد باینری", en: "Convert text to binary code" }
  },
  {
    id: "binary-to-text",
    icon: "🔡",
    cat: "text",
    title: { fa: "باینری به متن", en: "Binary to Text" },
    desc: { fa: "تبدیل کد باینری به متن", en: "Convert binary to text" }
  },
  {
    id: "morse-code",
    icon: "📡",
    cat: "text",
    title: { fa: "کد مورس", en: "Morse Code" },
    desc: { fa: "تبدیل متن به کد مورس و برعکس", en: "Text ↔ Morse code converter" }
  },
  {
    id: "reading-time",
    icon: "⏱️",
    cat: "text",
    title: { fa: "زمان مطالعه", en: "Reading Time" },
    desc: { fa: "محاسبه زمان تقریبی مطالعه", en: "Estimate reading time" }
  },
  {
    id: "word-frequency",
    icon: "📊",
    cat: "text",
    title: { fa: "فراوانی کلمات", en: "Word Frequency" },
    desc: { fa: "تعداد تکرار هر کلمه", en: "Count word occurrences" }
  },

  // ===== CALCULATOR =====
  {
    id: "bmi-calculator",
    icon: "⚖️",
    cat: "calc",
    title: { fa: "محاسبه BMI", en: "BMI Calculator" },
    desc: { fa: "شاخص توده بدنی", en: "Body Mass Index calculator" }
  },
  {
    id: "percentage",
    icon: "%",
    cat: "calc",
    title: { fa: "ماشین حساب درصد", en: "Percentage Calculator" },
    desc: { fa: "محاسبه درصدها", en: "Calculate percentages" }
  },
  {
    id: "age-calculator",
    icon: "🎂",
    cat: "calc",
    title: { fa: "محاسبه سن", en: "Age Calculator" },
    desc: { fa: "سن دقیق بر اساس تاریخ تولد", en: "Exact age from birth date" }
  },
  {
    id: "loan-calculator",
    icon: "💰",
    cat: "calc",
    title: { fa: "محاسبه وام", en: "Loan Calculator" },
    desc: { fa: "قسط ماهانه و سود وام", en: "Monthly payment & interest" }
  },
  {
    id: "tip-calculator",
    icon: "🧾",
    cat: "calc",
    title: { fa: "محاسبه انعام", en: "Tip Calculator" },
    desc: { fa: "تقسیم صورتحساب و انعام", en: "Split bill & tip" }
  },
  {
    id: "discount",
    icon: "🏷️",
    cat: "calc",
    title: { fa: "محاسبه تخفیف", en: "Discount Calculator" },
    desc: { fa: "قیمت بعد از تخفیف", en: "Price after discount" }
  },
  {
    id: "random-number",
    icon: "🎲",
    cat: "calc",
    title: { fa: "عدد تصادفی", en: "Random Number" },
    desc: { fa: "تولید عدد تصادفی در بازه", en: "Generate random number in range" }
  },
  {
    id: "aspect-ratio",
    icon: "📐",
    cat: "calc",
    title: { fa: "نسبت تصویر", en: "Aspect Ratio" },
    desc: { fa: "محاسبه نسبت ابعاد", en: "Calculate aspect ratio" }
  },

  // ===== CONVERTER =====
  {
    id: "unit-converter",
    icon: "📏",
    cat: "convert",
    title: { fa: "مبدل واحد", en: "Unit Converter" },
    desc: { fa: "طول، وزن، حجم و دما", en: "Length, weight, volume & temp" }
  },
  {
    id: "base64",
    icon: "🔐",
    cat: "convert",
    title: { fa: "Base64", en: "Base64 Encode/Decode" },
    desc: { fa: "رمزگذاری و رمزگشایی Base64", en: "Encode & decode Base64" }
  },
  {
    id: "url-encode",
    icon: "🔗",
    cat: "convert",
    title: { fa: "URL Encode/Decode", en: "URL Encode/Decode" },
    desc: { fa: "کدگذاری و رمزگشایی URL", en: "Encode & decode URLs" }
  },
  {
    id: "color-converter",
    icon: "🎨",
    cat: "convert",
    title: { fa: "مبدل رنگ", en: "Color Converter" },
    desc: { fa: "HEX ↔ RGB ↔ HSL", en: "HEX ↔ RGB ↔ HSL" }
  },
  {
    id: "timestamp",
    icon: "📅",
    cat: "convert",
    title: { fa: "تبدیل Timestamp", en: "Timestamp Converter" },
    desc: { fa: "تبدیل زمان یونیکس", en: "Unix timestamp converter" }
  },
  {
    id: "number-base",
    icon: "🔢",
    cat: "convert",
    title: { fa: "تبدیل پایه اعداد", en: "Number Base Converter" },
    desc: { fa: "دودویی، هشت‌تایی، ده‌دهی، شانزده‌تایی", en: "Binary, Octal, Decimal, Hex" }
  },

  // ===== GENERATOR =====
  {
    id: "password-generator",
    icon: "🔑",
    cat: "generate",
    title: { fa: "تولید رمز عبور", en: "Password Generator" },
    desc: { fa: "رمز عبور قوی و تصادفی", en: "Strong random passwords" }
  },
  {
    id: "uuid-generator",
    icon: "🆔",
    cat: "generate",
    title: { fa: "تولید UUID", en: "UUID Generator" },
    desc: { fa: "شناسه یکتای جهانی", en: "Generate unique identifiers" }
  },
  {
    id: "qr-generator",
    icon: "📱",
    cat: "generate",
    title: { fa: "تولید QR Code", en: "QR Code Generator" },
    desc: { fa: "ساخت کد QR از متن یا لینک", en: "Create QR from text or URL" }
  },
  {
    id: "lorem-picsum",
    icon: "🖼️",
    cat: "generate",
    title: { fa: "تصویر تصادفی", en: "Random Image" },
    desc: { fa: "لینک تصویر تصادفی", en: "Random placeholder image URL" }
  },
  {
    id: "fake-data",
    icon: "👤",
    cat: "generate",
    title: { fa: "داده جعلی", en: "Fake Data Generator" },
    desc: { fa: "نام، ایمیل و آدرس جعلی", en: "Fake name, email & address" }
  },
  {
    id: "hash-generator",
    icon: "#️⃣",
    cat: "generate",
    title: { fa: "تولید هش", en: "Hash Generator" },
    desc: { fa: "MD5, SHA-1, SHA-256", en: "MD5, SHA-1, SHA-256" }
  },

  // ===== DEVELOPER =====
  {
    id: "json-formatter",
    icon: "{ }",
    cat: "dev",
    title: { fa: "فرمت‌کننده JSON", en: "JSON Formatter" },
    desc: { fa: "زیباسازی و اعتبارسنجی JSON", en: "Beautify & validate JSON" }
  },
  {
    id: "css-minifier",
    icon: "💅",
    cat: "dev",
    title: { fa: "فشرده‌ساز CSS", en: "CSS Minifier" },
    desc: { fa: "کم کردن حجم CSS", en: "Minify CSS code" }
  },
  {
    id: "js-minifier",
    icon: "⚡",
    cat: "dev",
    title: { fa: "فشرده‌ساز JS", en: "JS Minifier" },
    desc: { fa: "کم کردن حجم جاوااسکریپت", en: "Minify JavaScript" }
  },
  {
    id: "html-minifier",
    icon: "🌐",
    cat: "dev",
    title: { fa: "فشرده‌ساز HTML", en: "HTML Minifier" },
    desc: { fa: "کم کردن حجم HTML", en: "Minify HTML code" }
  },
  {
    id: "regex-tester",
    icon: "🧩",
    cat: "dev",
    title: { fa: "تستر Regex", en: "Regex Tester" },
    desc: { fa: "تست عبارات منظم", en: "Test regular expressions" }
  },
  {
    id: "markdown-preview",
    icon: "✍️",
    cat: "dev",
    title: { fa: "پیش‌نمایش Markdown", en: "Markdown Preview" },
    desc: { fa: "تبدیل Markdown به HTML", en: "Markdown to HTML preview" }
  },
  {
    id: "diff-checker",
    icon: "📋",
    cat: "dev",
    title: { fa: "مقایسه متن", en: "Diff Checker" },
    desc: { fa: "تفاوت دو متن را ببینید", en: "Compare two texts" }
  },

  // ===== OTHER =====
  {
    id: "color-picker",
    icon: "🎯",
    cat: "other",
    title: { fa: "انتخاب‌گر رنگ", en: "Color Picker" },
    desc: { fa: "انتخاب و کپی کد رنگ", en: "Pick and copy color codes" }
  },
  {
    id: "stopwatch",
    icon: "⏲️",
    cat: "other",
    title: { fa: "کرونومتر", en: "Stopwatch" },
    desc: { fa: "زمان‌سنج و تایمر", en: "Stopwatch & timer" }
  },
  {
    id: "pomodoro",
    icon: "🍅",
    cat: "other",
    title: { fa: "تایمر پومودورو", en: "Pomodoro Timer" },
    desc: { fa: "تکنیک مدیریت زمان", en: "Focus timer technique" }
  },
  {
    id: "coin-flip",
    icon: "🪙",
    cat: "other",
    title: { fa: "شیر یا خط", en: "Coin Flip" },
    desc: { fa: "انداختن سکه مجازی", en: "Virtual coin flip" }
  },
  {
    id: "dice-roller",
    icon: "🎲",
    cat: "other",
    title: { fa: "تاس مجازی", en: "Dice Roller" },
    desc: { fa: "انداختن تاس با تعداد دلخواه", en: "Roll virtual dice" }
  },
  {
    id: "meta-tags",
    icon: "🏷️",
    cat: "other",
    title: { fa: "تولید متاتگ", en: "Meta Tag Generator" },
    desc: { fa: "ساخت متاتگ‌های SEO", en: "Generate SEO meta tags" }
  }
];
