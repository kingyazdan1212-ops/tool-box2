# 🧰 Tool Box | جعبه ابزار

مجموعه ابزارهای کاربردی آنلاین دو زبانه (فارسی + انگلیسی)  
**ساخته شده توسط yazdan**  
پشتیبانی تلگرام: [@Yazdangpt1](https://t.me/Yazdangpt1)

---

## ویژگی‌ها

- بیش از ۴۵ ابزار کاربردی
- کاملاً دو زبانه (فارسی / انگلیسی)
- تم تاریک و روشن
- جستجو و فیلتر بر اساس دسته‌بندی
- طراحی مدرن و ریسپانسیو
- بدون نیاز به بک‌اند (فقط HTML + CSS + JS)
- آماده برای GitHub Pages و تبدیل به اپ (PWA)

---

## ساختار فایل‌ها

```
toolbox/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── tools-data.js
│   └── script.js
└── README.md
```

---

## چطور روی GitHub آپلود کنم؟

### روش ۱: آپلود مستقیم (ساده‌ترین)

1. برو به [github.com](https://github.com) و وارد حسابت شو.
2. روی **New repository** کلیک کن.
3. اسم ریپو رو بذار مثلاً `toolbox` یا `tool-box`.
4. **Public** انتخاب کن و Create repository بزن.
5. روی **uploading an existing file** کلیک کن.
6. همه فایل‌ها و پوشه‌های داخل پوشه `toolbox` رو بکش و رها کن (index.html، css، js و README).
7. Commit changes بزن.

### روش ۲: با Git (حرفه‌ای‌تر)

```bash
git clone https://github.com/YOUR_USERNAME/toolbox.git
cd toolbox
# فایل‌ها رو کپی کن داخل این پوشه
git add .
git commit -m "Add Tool Box website"
git push origin main
```

---

## فعال کردن GitHub Pages (برای آنلاین شدن سایت)

1. برو به ریپوی خودت روی گیت‌هاب.
2. برو به **Settings** → **Pages**.
3. در قسمت Source، گزینه **Deploy from a branch** رو انتخاب کن.
4. Branch رو روی `main` و پوشه `/ (root)` بذار.
5. Save بزن.
6. بعد از ۱-۲ دقیقه سایت شما در آدرس زیر در دسترس خواهد بود:

```
https://YOUR_USERNAME.github.io/toolbox/
```

---

## تبدیل به اپ موبایل (اختیاری)

چون سایت کاملاً فرانت‌اند است، می‌تونی با ابزارهای زیر به اپ تبدیلش کنی:

### روش آسان: PWA
- سایت الان تقریباً PWA-ready است.
- می‌تونی با ابزارهایی مثل [PWA Builder](https://www.pwabuilder.com) آن را به اپ اندروید/ios تبدیل کنی.

### روش پیشرفته‌تر: Capacitor
1. پروژه را با Capacitor بسته‌بندی کن.
2. خروجی اندروید (APK) و iOS بگیر.

---

## پشتیبانی

اگر مشکلی داشتی یا خواستی ابزار جدیدی اضافه بشه، به تلگرام پیام بده:  
**@Yazdangpt1**

---

ساخته شده با ❤️ توسط **yazdan**
