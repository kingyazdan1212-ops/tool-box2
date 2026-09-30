// ========== State ==========
let currentLang = localStorage.getItem("toolbox-lang") || "fa";
let currentTheme = localStorage.getItem("toolbox-theme") || "dark";
let currentCat = "all";

// ========== Init ==========
document.addEventListener("DOMContentLoaded", () => {
  if (typeof toolsData === "undefined") {
    document.getElementById("toolsGrid").innerHTML = "<p style='text-align:center;padding:40px;color:#f87171'>خطا در بارگذاری ابزارها. فایل tools-data.js را چک کنید.</p>";
    return;
  }
  applyLang(currentLang);
  applyTheme(currentTheme);
  renderTools();
  setupEvents();
});

// ========== Language ==========
function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem("toolbox-lang", lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  const label = document.getElementById("langLabel");
  if (label) label.textContent = lang === "fa" ? "EN" : "FA";

  document.querySelectorAll("[data-fa]").forEach(el => {
    const val = el.getAttribute(`data-${lang}`);
    if (val !== null) el.textContent = val;
  });

  const search = document.getElementById("searchInput");
  if (search) search.placeholder = search.getAttribute(`data-${lang}`) || "";

  renderTools(document.getElementById("searchInput")?.value || "");
}

// ========== Theme ==========
function applyTheme(theme) {
  currentTheme = theme;
  localStorage.setItem("toolbox-theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
  const btn = document.getElementById("themeToggle");
  if (btn) {
    const icon = btn.querySelector(".theme-icon") || btn;
    icon.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

// ========== Render Tools ==========
function renderTools(filter = "") {
  const grid = document.getElementById("toolsGrid");
  const empty = document.getElementById("emptyState");
  if (!grid) return;

  const q = (filter || "").toLowerCase().trim();

  const filtered = toolsData.filter(t => {
    const matchCat = currentCat === "all" || t.cat === currentCat;
    const title = (t.title[currentLang] || "").toLowerCase();
    const desc = (t.desc[currentLang] || "").toLowerCase();
    const matchSearch = !q || title.includes(q) || desc.includes(q) || t.id.includes(q);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = "";
    if (empty) empty.style.display = "block";
    return;
  }

  if (empty) empty.style.display = "none";

  grid.innerHTML = filtered.map(t => `
    <div class="tool-card" data-id="${t.id}" onclick="openTool('${t.id}')">
      <div class="tool-icon">${t.icon}</div>
      <div class="tool-title">${t.title[currentLang]}</div>
      <div class="tool-desc">${t.desc[currentLang]}</div>
    </div>
  `).join("");
}

// ========== Events ==========
function setupEvents() {
  document.getElementById("langToggle")?.addEventListener("click", () => {
    applyLang(currentLang === "fa" ? "en" : "fa");
  });

  document.getElementById("themeToggle")?.addEventListener("click", () => {
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });

  document.getElementById("searchInput")?.addEventListener("input", e => {
    renderTools(e.target.value);
  });

  document.querySelectorAll(".cat").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cat").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCat = btn.dataset.cat;
      renderTools(document.getElementById("searchInput")?.value || "");
    });
  });

  document.getElementById("modalClose")?.addEventListener("click", closeModal);
  document.getElementById("modal")?.addEventListener("click", e => {
    if (e.target.id === "modal") closeModal();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });
}

// ========== Modal ==========
function openTool(id) {
  const tool = toolsData.find(t => t.id === id);
  if (!tool) return;

  document.getElementById("modalTitle").textContent = tool.title[currentLang];
  document.getElementById("modalBody").innerHTML = getToolUI(id);
  document.getElementById("modal").classList.add("show");
  document.body.style.overflow = "hidden";
  initTool(id);
}

function closeModal() {
  document.getElementById("modal")?.classList.remove("show");
  document.body.style.overflow = "";
}

// ========== Tool UIs ==========
function getToolUI(id) {
  const L = currentLang;
  const t = (fa, en) => (L === "fa" ? fa : en);

  switch (id) {
    case "word-counter":
      return `
        <div class="tool-ui">
          <label>${t("متن خود را وارد کنید:", "Enter your text:")}</label>
          <textarea id="wc-input" placeholder="${t("اینجا بنویسید...", "Type here...")}"></textarea>
          <div class="stats-row" id="wc-stats">
            <div class="stat-item"><div class="num" id="wc-words">0</div><div class="lbl">${t("کلمه", "Words")}</div></div>
            <div class="stat-item"><div class="num" id="wc-chars">0</div><div class="lbl">${t("کاراکتر", "Chars")}</div></div>
            <div class="stat-item"><div class="num" id="wc-chars-ns">0</div><div class="lbl">${t("بدون فاصله", "No spaces")}</div></div>
            <div class="stat-item"><div class="num" id="wc-lines">0</div><div class="lbl">${t("خط", "Lines")}</div></div>
          </div>
        </div>`;

    case "case-converter":
      return `
        <div class="tool-ui">
          <label>${t("متن:", "Text:")}</label>
          <textarea id="case-input"></textarea>
          <div class="btn-row">
            <button class="btn" onclick="convertCase('upper')">${t("بزرگ", "UPPER")}</button>
            <button class="btn" onclick="convertCase('lower')">${t("کوچک", "lower")}</button>
            <button class="btn" onclick="convertCase('title')">${t("عنوان", "Title")}</button>
            <button class="btn" onclick="convertCase('sentence')">${t("جمله", "Sentence")}</button>
            <button class="btn btn-sec" onclick="convertCase('inverse')">${t("معکوس", "InVeRsE")}</button>
          </div>
          <label style="margin-top:16px">${t("نتیجه:", "Result:")}</label>
          <div class="result-box" id="case-result"></div>
        </div>`;

    case "text-reverser":
      return `
        <div class="tool-ui">
          <label>${t("متن:", "Text:")}</label>
          <textarea id="rev-input"></textarea>
          <div class="btn-row">
            <button class="btn" onclick="reverseText('chars')">${t("معکوس کاراکترها", "Reverse Chars")}</button>
            <button class="btn" onclick="reverseText('words')">${t("معکوس کلمات", "Reverse Words")}</button>
          </div>
          <div class="result-box" id="rev-result"></div>
        </div>`;

    case "lorem-ipsum":
      return `
        <div class="tool-ui">
          <label>${t("تعداد پاراگراف:", "Number of paragraphs:")}</label>
          <input type="number" id="lorem-count" value="3" min="1" max="20" />
          <button class="btn" onclick="generateLorem()">${t("تولید", "Generate")}</button>
          <div class="result-box" id="lorem-result" style="margin-top:14px"></div>
          <button class="btn btn-sec" style="margin-top:10px" onclick="copyText('lorem-result')">${t("کپی", "Copy")}</button>
        </div>`;

    case "password-generator":
      return `
        <div class="tool-ui">
          <label>${t("طول رمز:", "Password length:")}</label>
          <input type="number" id="pass-len" value="16" min="4" max="64" />
          <label><input type="checkbox" id="pass-upper" checked /> ${t("حروف بزرگ", "Uppercase")}</label>
          <label><input type="checkbox" id="pass-lower" checked /> ${t("حروف کوچک", "Lowercase")}</label>
          <label><input type="checkbox" id="pass-num" checked /> ${t("اعداد", "Numbers")}</label>
          <label><input type="checkbox" id="pass-sym" checked /> ${t("نمادها", "Symbols")}</label>
          <button class="btn" style="margin-top:12px" onclick="generatePassword()">${t("تولید رمز", "Generate")}</button>
          <div class="result-box" id="pass-result" style="margin-top:14px;font-size:1.1rem;letter-spacing:1px"></div>
          <button class="btn btn-sec" style="margin-top:10px" onclick="copyText('pass-result')">${t("کپی", "Copy")}</button>
        </div>`;

    case "bmi-calculator":
      return `
        <div class="tool-ui">
          <label>${t("وزن (کیلوگرم):", "Weight (kg):")}</label>
          <input type="number" id="bmi-weight" step="0.1" />
          <label>${t("قد (سانتی‌متر):", "Height (cm):")}</label>
          <input type="number" id="bmi-height" step="0.1" />
          <button class="btn" onclick="calcBMI()">${t("محاسبه", "Calculate")}</button>
          <div class="result-box" id="bmi-result"></div>
        </div>`;

    case "base64":
      return `
        <div class="tool-ui">
          <label>${t("متن یا Base64:", "Text or Base64:")}</label>
          <textarea id="b64-input"></textarea>
          <div class="btn-row">
            <button class="btn" onclick="doBase64('encode')">${t("رمزگذاری", "Encode")}</button>
            <button class="btn" onclick="doBase64('decode')">${t("رمزگشایی", "Decode")}</button>
          </div>
          <div class="result-box" id="b64-result"></div>
        </div>`;

    case "json-formatter":
      return `
        <div class="tool-ui">
          <label>${t("JSON:", "JSON:")}</label>
          <textarea id="json-input" style="min-height:160px"></textarea>
          <div class="btn-row">
            <button class="btn" onclick="formatJSON()">${t("زیباسازی", "Beautify")}</button>
            <button class="btn btn-sec" onclick="minifyJSON()">${t("فشرده", "Minify")}</button>
          </div>
          <div class="result-box" id="json-result"></div>
        </div>`;

    case "color-picker":
      return `
        <div class="tool-ui">
          <label>${t("رنگ را انتخاب کنید:", "Pick a color:")}</label>
          <input type="color" id="color-input" value="#8b5cf6" style="width:100%;height:60px;border:none;border-radius:12px;cursor:pointer" />
          <div class="stats-row" style="margin-top:16px">
            <div class="stat-item"><div class="num" id="color-hex">#8b5cf6</div><div class="lbl">HEX</div></div>
            <div class="stat-item"><div class="num" id="color-rgb" style="font-size:1rem">139, 92, 246</div><div class="lbl">RGB</div></div>
          </div>
          <button class="btn" style="margin-top:12px" onclick="copyText('color-hex')">${t("کپی HEX", "Copy HEX")}</button>
        </div>`;

    case "uuid-generator":
      return `
        <div class="tool-ui">
          <button class="btn" onclick="generateUUID()">${t("تولید UUID", "Generate UUID")}</button>
          <div class="result-box" id="uuid-result" style="margin-top:14px;font-size:1rem"></div>
          <button class="btn btn-sec" style="margin-top:10px" onclick="copyText('uuid-result')">${t("کپی", "Copy")}</button>
        </div>`;

    case "percentage":
      return `
        <div class="tool-ui">
          <label>${t("عدد:", "Value:")}</label>
          <input type="number" id="perc-val" />
          <label>${t("درصد:", "Percentage:")}</label>
          <input type="number" id="perc-pct" />
          <button class="btn" onclick="calcPercent()">${t("محاسبه", "Calculate")}</button>
          <div class="result-box" id="perc-result"></div>
        </div>`;

    case "url-encode":
      return `
        <div class="tool-ui">
          <label>${t("متن یا URL:", "Text or URL:")}</label>
          <textarea id="url-input"></textarea>
          <div class="btn-row">
            <button class="btn" onclick="doUrl('encode')">${t("Encode", "Encode")}</button>
            <button class="btn" onclick="doUrl('decode')">${t("Decode", "Decode")}</button>
          </div>
          <div class="result-box" id="url-result"></div>
        </div>`;

    case "random-number":
      return `
        <div class="tool-ui">
          <label>${t("حداقل:", "Min:")}</label>
          <input type="number" id="rand-min" value="1" />
          <label>${t("حداکثر:", "Max:")}</label>
          <input type="number" id="rand-max" value="100" />
          <button class="btn" onclick="genRandom()">${t("تولید", "Generate")}</button>
          <div class="result-box" id="rand-result" style="font-size:2rem;text-align:center"></div>
        </div>`;

    case "stopwatch":
      return `
        <div class="tool-ui" style="text-align:center">
          <div id="sw-display" style="font-size:3rem;font-weight:700;margin:20px 0;font-family:monospace">00:00:00</div>
          <div class="btn-row" style="justify-content:center">
            <button class="btn" id="sw-start" onclick="swStart()">${t("شروع", "Start")}</button>
            <button class="btn btn-sec" onclick="swPause()">${t("توقف", "Pause")}</button>
            <button class="btn btn-sec" onclick="swReset()">${t("ریست", "Reset")}</button>
          </div>
        </div>`;

    case "coin-flip":
      return `
        <div class="tool-ui" style="text-align:center">
          <div id="coin-result" style="font-size:5rem;margin:30px 0">🪙</div>
          <button class="btn" onclick="flipCoin()">${t("بیانداز!", "Flip!")}</button>
        </div>`;

    case "dice-roller":
      return `
        <div class="tool-ui" style="text-align:center">
          <label>${t("تعداد تاس:", "Number of dice:")}</label>
          <input type="number" id="dice-count" value="1" min="1" max="10" style="width:100px;margin:0 auto 16px;display:block" />
          <div id="dice-result" style="font-size:3rem;margin:20px 0">🎲</div>
          <button class="btn" onclick="rollDice()">${t("بریز!", "Roll!")}</button>
        </div>`;

    case "age-calculator":
      return `
        <div class="tool-ui">
          <label>${t("تاریخ تولد:", "Birth date:")}</label>
          <input type="date" id="age-date" />
          <button class="btn" onclick="calcAge()">${t("محاسبه سن", "Calculate Age")}</button>
          <div class="result-box" id="age-result"></div>
        </div>`;

    case "discount":
      return `
        <div class="tool-ui">
          <label>${t("قیمت اصلی:", "Original price:")}</label>
          <input type="number" id="disc-price" />
          <label>${t("درصد تخفیف:", "Discount %:")}</label>
          <input type="number" id="disc-pct" />
          <button class="btn" onclick="calcDiscount()">${t("محاسبه", "Calculate")}</button>
          <div class="result-box" id="disc-result"></div>
        </div>`;

    case "text-to-binary":
      return `
        <div class="tool-ui">
          <label>${t("متن:", "Text:")}</label>
          <textarea id="bin-input"></textarea>
          <button class="btn" onclick="textToBinary()">${t("تبدیل", "Convert")}</button>
          <div class="result-box" id="bin-result"></div>
        </div>`;

    case "binary-to-text":
      return `
        <div class="tool-ui">
          <label>${t("کد باینری:", "Binary code:")}</label>
          <textarea id="b2t-input"></textarea>
          <button class="btn" onclick="binaryToText()">${t("تبدیل", "Convert")}</button>
          <div class="result-box" id="b2t-result"></div>
        </div>`;

    case "remove-duplicates":
      return `
        <div class="tool-ui">
          <label>${t("متن (هر خط یک مورد):", "Text (one item per line):")}</label>
          <textarea id="dup-input"></textarea>
          <button class="btn" onclick="removeDups()">${t("حذف تکراری‌ها", "Remove Duplicates")}</button>
          <div class="result-box" id="dup-result"></div>
        </div>`;

    case "sort-lines":
      return `
        <div class="tool-ui">
          <label>${t("متن:", "Text:")}</label>
          <textarea id="sort-input"></textarea>
          <div class="btn-row">
            <button class="btn" onclick="sortLines(false)">${t("صعودی", "A → Z")}</button>
            <button class="btn" onclick="sortLines(true)">${t("نزولی", "Z → A")}</button>
          </div>
          <div class="result-box" id="sort-result"></div>
        </div>`;

    case "find-replace":
      return `
        <div class="tool-ui">
          <label>${t("متن:", "Text:")}</label>
          <textarea id="fr-input"></textarea>
          <label>${t("پیدا کردن:", "Find:")}</label>
          <input type="text" id="fr-find" />
          <label>${t("جایگزین با:", "Replace with:")}</label>
          <input type="text" id="fr-replace" />
          <button class="btn" onclick="findReplace()">${t("جایگزینی همه", "Replace All")}</button>
          <div class="result-box" id="fr-result"></div>
        </div>`;

    case "timestamp":
      return `
        <div class="tool-ui">
          <label>${t("Timestamp فعلی:", "Current Timestamp:")}</label>
          <div class="result-box" id="ts-now"></div>
          <button class="btn btn-sec" onclick="updateTimestamp()">${t("به‌روزرسانی", "Refresh")}</button>
          <label style="margin-top:16px">${t("تبدیل Timestamp به تاریخ:", "Convert Timestamp to Date:")}</label>
          <input type="number" id="ts-input" placeholder="1690000000" />
          <button class="btn" onclick="tsToDate()">${t("تبدیل", "Convert")}</button>
          <div class="result-box" id="ts-result"></div>
        </div>`;

    case "color-converter":
      return `
        <div class="tool-ui">
          <label>HEX:</label>
          <input type="text" id="cc-hex" value="#8b5cf6" />
          <button class="btn" onclick="hexToRgb()">${t("تبدیل به RGB", "To RGB")}</button>
          <div class="result-box" id="cc-result"></div>
        </div>`;

    case "reading-time":
      return `
        <div class="tool-ui">
          <label>${t("متن:", "Text:")}</label>
          <textarea id="rt-input"></textarea>
          <button class="btn" onclick="calcReadingTime()">${t("محاسبه", "Calculate")}</button>
          <div class="result-box" id="rt-result"></div>
        </div>`;

    case "hash-generator":
      return `
        <div class="tool-ui">
          <label>${t("متن:", "Text:")}</label>
          <textarea id="hash-input"></textarea>
          <div class="btn-row">
            <button class="btn" onclick="genHash('SHA-256')">SHA-256</button>
            <button class="btn" onclick="genHash('SHA-1')">SHA-1</button>
          </div>
          <div class="result-box" id="hash-result"></div>
        </div>`;

    case "css-minifier":
      return `
        <div class="tool-ui">
          <label>CSS:</label>
          <textarea id="css-input" style="min-height:140px"></textarea>
          <button class="btn" onclick="minifyCSS()">${t("فشرده‌سازی", "Minify")}</button>
          <div class="result-box" id="css-result"></div>
        </div>`;

    case "js-minifier":
      return `
        <div class="tool-ui">
          <label>JavaScript:</label>
          <textarea id="js-input" style="min-height:140px"></textarea>
          <button class="btn" onclick="minifyJS()">${t("فشرده‌سازی", "Minify")}</button>
          <div class="result-box" id="js-result"></div>
        </div>`;

    case "html-minifier":
      return `
        <div class="tool-ui">
          <label>HTML:</label>
          <textarea id="html-input" style="min-height:140px"></textarea>
          <button class="btn" onclick="minifyHTML()">${t("فشرده‌سازی", "Minify")}</button>
          <div class="result-box" id="html-result"></div>
        </div>`;

    case "unit-converter":
      return `
        <div class="tool-ui">
          <label>${t("مقدار:", "Value:")}</label>
          <input type="number" id="unit-val" value="1" />
          <label>${t("از:", "From:")}</label>
          <select id="unit-from">
            <option value="m">متر / Meter</option>
            <option value="km">کیلومتر / Kilometer</option>
            <option value="cm">سانتی‌متر / Centimeter</option>
            <option value="mm">میلی‌متر / Millimeter</option>
            <option value="mi">مایل / Mile</option>
            <option value="ft">فوت / Foot</option>
            <option value="in">اینچ / Inch</option>
          </select>
          <label>${t("به:", "To:")}</label>
          <select id="unit-to">
            <option value="km">کیلومتر / Kilometer</option>
            <option value="m">متر / Meter</option>
            <option value="cm">سانتی‌متر / Centimeter</option>
            <option value="mm">میلی‌متر / Millimeter</option>
            <option value="mi">مایل / Mile</option>
            <option value="ft">فوت / Foot</option>
            <option value="in">اینچ / Inch</option>
          </select>
          <button class="btn" onclick="convertUnit()">${t("تبدیل", "Convert")}</button>
          <div class="result-box" id="unit-result"></div>
        </div>`;

    case "tip-calculator":
      return `
        <div class="tool-ui">
          <label>${t("مبلغ صورتحساب:", "Bill amount:")}</label>
          <input type="number" id="tip-bill" />
          <label>${t("درصد انعام:", "Tip %:")}</label>
          <input type="number" id="tip-pct" value="15" />
          <label>${t("تعداد نفرات:", "Number of people:")}</label>
          <input type="number" id="tip-people" value="1" min="1" />
          <button class="btn" onclick="calcTip()">${t("محاسبه", "Calculate")}</button>
          <div class="result-box" id="tip-result"></div>
        </div>`;

    case "loan-calculator":
      return `
        <div class="tool-ui">
          <label>${t("مبلغ وام:", "Loan amount:")}</label>
          <input type="number" id="loan-amount" />
          <label>${t("نرخ سود سالانه (%):", "Annual interest rate (%):")}</label>
          <input type="number" id="loan-rate" step="0.1" />
          <label>${t("مدت (ماه):", "Term (months):")}</label>
          <input type="number" id="loan-months" />
          <button class="btn" onclick="calcLoan()">${t("محاسبه", "Calculate")}</button>
          <div class="result-box" id="loan-result"></div>
        </div>`;

    case "number-base":
      return `
        <div class="tool-ui">
          <label>${t("عدد:", "Number:")}</label>
          <input type="text" id="nb-input" />
          <label>${t("پایه مبدأ:", "From base:")}</label>
          <select id="nb-from">
            <option value="10">Decimal (10)</option>
            <option value="2">Binary (2)</option>
            <option value="8">Octal (8)</option>
            <option value="16">Hex (16)</option>
          </select>
          <label>${t("پایه مقصد:", "To base:")}</label>
          <select id="nb-to">
            <option value="2">Binary (2)</option>
            <option value="10">Decimal (10)</option>
            <option value="8">Octal (8)</option>
            <option value="16">Hex (16)</option>
          </select>
          <button class="btn" onclick="convertBase()">${t("تبدیل", "Convert")}</button>
          <div class="result-box" id="nb-result"></div>
        </div>`;

    case "fake-data":
      return `
        <div class="tool-ui">
          <button class="btn" onclick="genFake()">${t("تولید داده جعلی", "Generate Fake Data")}</button>
          <div class="result-box" id="fake-result" style="margin-top:14px"></div>
        </div>`;

    case "qr-generator":
      return `
        <div class="tool-ui">
          <label>${t("متن یا لینک:", "Text or URL:")}</label>
          <input type="text" id="qr-input" placeholder="https://..." />
          <button class="btn" onclick="genQR()">${t("ساخت QR", "Generate QR")}</button>
          <div id="qr-result" style="text-align:center;margin-top:20px"></div>
          <p style="font-size:0.85rem;color:var(--muted);margin-top:10px;text-align:center">
            ${t("از سرویس رایگان qrserver استفاده می‌شود", "Uses free qrserver API")}
          </p>
        </div>`;

    case "pomodoro":
      return `
        <div class="tool-ui" style="text-align:center">
          <div id="pomo-display" style="font-size:3.5rem;font-weight:700;margin:20px 0;font-family:monospace">25:00</div>
          <div class="btn-row" style="justify-content:center">
            <button class="btn" onclick="pomoStart()">${t("شروع", "Start")}</button>
            <button class="btn btn-sec" onclick="pomoPause()">${t("توقف", "Pause")}</button>
            <button class="btn btn-sec" onclick="pomoReset()">${t("ریست", "Reset")}</button>
          </div>
        </div>`;

    case "meta-tags":
      return `
        <div class="tool-ui">
          <label>${t("عنوان صفحه:", "Page Title:")}</label>
          <input type="text" id="meta-title" />
          <label>${t("توضیحات:", "Description:")}</label>
          <textarea id="meta-desc" rows="3"></textarea>
          <label>${t("کلمات کلیدی:", "Keywords:")}</label>
          <input type="text" id="meta-keywords" />
          <button class="btn" onclick="genMeta()">${t("تولید", "Generate")}</button>
          <div class="result-box" id="meta-result" style="margin-top:14px"></div>
        </div>`;

    case "aspect-ratio":
      return `
        <div class="tool-ui">
          <label>${t("عرض:", "Width:")}</label>
          <input type="number" id="ar-w" value="1920" />
          <label>${t("ارتفاع:", "Height:")}</label>
          <input type="number" id="ar-h" value="1080" />
          <button class="btn" onclick="calcAspect()">${t("محاسبه", "Calculate")}</button>
          <div class="result-box" id="ar-result"></div>
        </div>`;

    case "word-frequency":
      return `
        <div class="tool-ui">
          <label>${t("متن:", "Text:")}</label>
          <textarea id="wf-input"></textarea>
          <button class="btn" onclick="wordFreq()">${t("تحلیل", "Analyze")}</button>
          <div class="result-box" id="wf-result"></div>
        </div>`;

    case "morse-code":
      return `
        <div class="tool-ui">
          <label>${t("متن یا کد مورس:", "Text or Morse:")}</label>
          <textarea id="morse-input"></textarea>
          <div class="btn-row">
            <button class="btn" onclick="toMorse()">${t("به مورس", "To Morse")}</button>
            <button class="btn" onclick="fromMorse()">${t("از مورس", "From Morse")}</button>
          </div>
          <div class="result-box" id="morse-result"></div>
        </div>`;

    case "diff-checker":
      return `
        <div class="tool-ui">
          <label>${t("متن اول:", "Text 1:")}</label>
          <textarea id="diff1"></textarea>
          <label>${t("متن دوم:", "Text 2:")}</label>
          <textarea id="diff2"></textarea>
          <button class="btn" onclick="checkDiff()">${t("مقایسه", "Compare")}</button>
          <div class="result-box" id="diff-result"></div>
        </div>`;

    case "regex-tester":
      return `
        <div class="tool-ui">
          <label>${t("عبارت منظم (Regex):", "Regular Expression:")}</label>
          <input type="text" id="regex-pattern" placeholder="e.g. \\d+" />
          <label>${t("پرچم‌ها (flags):", "Flags:")}</label>
          <input type="text" id="regex-flags" value="g" placeholder="g, i, m" />
          <label>${t("متن تست:", "Test text:")}</label>
          <textarea id="regex-text"></textarea>
          <button class="btn" onclick="testRegex()">${t("تست", "Test")}</button>
          <div class="result-box" id="regex-result"></div>
        </div>`;

    case "markdown-preview":
      return `
        <div class="tool-ui">
          <label>Markdown:</label>
          <textarea id="md-input" style="min-height:140px" placeholder="# Hello&#10;**bold** *italic*"></textarea>
          <button class="btn" onclick="previewMD()">${t("پیش‌نمایش", "Preview")}</button>
          <div class="result-box" id="md-result" style="margin-top:14px"></div>
        </div>`;

    case "lorem-picsum":
      return `
        <div class="tool-ui">
          <label>${t("عرض:", "Width:")}</label>
          <input type="number" id="pic-w" value="600" />
          <label>${t("ارتفاع:", "Height:")}</label>
          <input type="number" id="pic-h" value="400" />
          <button class="btn" onclick="genPicsum()">${t("تولید لینک", "Generate Link")}</button>
          <div class="result-box" id="pic-result" style="margin-top:14px"></div>
          <div id="pic-preview" style="margin-top:14px;text-align:center"></div>
        </div>`;

    default:
      return `<p style="text-align:center;color:var(--muted);padding:40px">
        ${t("این ابزار به زودی اضافه می‌شود 🚧", "This tool is coming soon 🚧")}
      </p>`;
  }
}

// ========== Tool Init ==========
function initTool(id) {
  if (id === "word-counter") {
    const input = document.getElementById("wc-input");
    if (input) input.addEventListener("input", updateWordCount);
  }
  if (id === "color-picker") {
    const input = document.getElementById("color-input");
    if (input) {
      input.addEventListener("input", e => {
        const hex = e.target.value;
        document.getElementById("color-hex").textContent = hex;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        document.getElementById("color-rgb").textContent = `${r}, ${g}, ${b}`;
      });
    }
  }
  if (id === "timestamp") updateTimestamp();
}

// ========== Tool Functions ==========
function updateWordCount() {
  const text = document.getElementById("wc-input").value;
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;
  const charsNs = text.replace(/\s/g, "").length;
  const lines = text === "" ? 0 : text.split("\n").length;
  document.getElementById("wc-words").textContent = words;
  document.getElementById("wc-chars").textContent = chars;
  document.getElementById("wc-chars-ns").textContent = charsNs;
  document.getElementById("wc-lines").textContent = lines;
}

function convertCase(type) {
  const text = document.getElementById("case-input").value;
  let result = text;
  if (type === "upper") result = text.toUpperCase();
  else if (type === "lower") result = text.toLowerCase();
  else if (type === "title") result = text.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  else if (type === "sentence") result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
  else if (type === "inverse") result = text.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
  document.getElementById("case-result").textContent = result;
}

function reverseText(mode) {
  const text = document.getElementById("rev-input").value;
  let result = mode === "chars" ? text.split("").reverse().join("") : text.split(/\s+/).reverse().join(" ");
  document.getElementById("rev-result").textContent = result;
}

function generateLorem() {
  const count = parseInt(document.getElementById("lorem-count").value) || 3;
  const paras = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra."
  ];
  let result = "";
  for (let i = 0; i < count; i++) result += paras[i % paras.length] + "\n\n";
  document.getElementById("lorem-result").textContent = result.trim();
}

function generatePassword() {
  const len = parseInt(document.getElementById("pass-len").value) || 16;
  let chars = "";
  if (document.getElementById("pass-upper").checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (document.getElementById("pass-lower").checked) chars += "abcdefghijklmnopqrstuvwxyz";
  if (document.getElementById("pass-num").checked) chars += "0123456789";
  if (document.getElementById("pass-sym").checked) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
  if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";
  let pass = "";
  for (let i = 0; i < len; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
  document.getElementById("pass-result").textContent = pass;
}

function calcBMI() {
  const w = parseFloat(document.getElementById("bmi-weight").value);
  const h = parseFloat(document.getElementById("bmi-height").value) / 100;
  if (!w || !h) return;
  const bmi = (w / (h * h)).toFixed(1);
  let status = "";
  if (bmi < 18.5) status = currentLang === "fa" ? "کمبود وزن" : "Underweight";
  else if (bmi < 25) status = currentLang === "fa" ? "نرمال" : "Normal";
  else if (bmi < 30) status = currentLang === "fa" ? "اضافه وزن" : "Overweight";
  else status = currentLang === "fa" ? "چاق" : "Obese";
  document.getElementById("bmi-result").textContent = `BMI: ${bmi} — ${status}`;
}

function doBase64(mode) {
  const input = document.getElementById("b64-input").value;
  try {
    if (mode === "encode") document.getElementById("b64-result").textContent = btoa(unescape(encodeURIComponent(input)));
    else document.getElementById("b64-result").textContent = decodeURIComponent(escape(atob(input)));
  } catch {
    document.getElementById("b64-result").textContent = currentLang === "fa" ? "خطا در تبدیل" : "Conversion error";
  }
}

function formatJSON() {
  try {
    const obj = JSON.parse(document.getElementById("json-input").value);
    document.getElementById("json-result").textContent = JSON.stringify(obj, null, 2);
  } catch (e) {
    document.getElementById("json-result").textContent = "Error: " + e.message;
  }
}

function minifyJSON() {
  try {
    const obj = JSON.parse(document.getElementById("json-input").value);
    document.getElementById("json-result").textContent = JSON.stringify(obj);
  } catch (e) {
    document.getElementById("json-result").textContent = "Error: " + e.message;
  }
}

function generateUUID() {
  if (crypto.randomUUID) {
    document.getElementById("uuid-result").textContent = crypto.randomUUID();
  } else {
    document.getElementById("uuid-result").textContent = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
}

function calcPercent() {
  const val = parseFloat(document.getElementById("perc-val").value);
  const pct = parseFloat(document.getElementById("perc-pct").value);
  if (isNaN(val) || isNaN(pct)) return;
  document.getElementById("perc-result").textContent = `${pct}% of ${val} = ${((val * pct) / 100).toFixed(2)}`;
}

function doUrl(mode) {
  const input = document.getElementById("url-input").value;
  try {
    document.getElementById("url-result").textContent = mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input);
  } catch {
    document.getElementById("url-result").textContent = "Error";
  }
}

function genRandom() {
  const min = parseInt(document.getElementById("rand-min").value);
  const max = parseInt(document.getElementById("rand-max").value);
  document.getElementById("rand-result").textContent = Math.floor(Math.random() * (max - min + 1)) + min;
}

let swInterval = null, swMs = 0;
function swStart() {
  if (swInterval) return;
  swInterval = setInterval(() => {
    swMs += 10;
    const h = String(Math.floor(swMs / 3600000)).padStart(2, "0");
    const m = String(Math.floor((swMs % 3600000) / 60000)).padStart(2, "0");
    const s = String(Math.floor((swMs % 60000) / 1000)).padStart(2, "0");
    const ms = String(Math.floor((swMs % 1000) / 10)).padStart(2, "0");
    document.getElementById("sw-display").textContent = `${h}:${m}:${s}.${ms}`;
  }, 10);
}
function swPause() { clearInterval(swInterval); swInterval = null; }
function swReset() { swPause(); swMs = 0; document.getElementById("sw-display").textContent = "00:00:00.00"; }

function flipCoin() {
  const res = Math.random() < 0.5 ? (currentLang === "fa" ? "شیر" : "Heads") : (currentLang === "fa" ? "خط" : "Tails");
  document.getElementById("coin-result").textContent = res === "شیر" || res === "Heads" ? "👑" : "🔵";
  setTimeout(() => {
    document.getElementById("coin-result").innerHTML = `<div style="font-size:2rem">${res}</div>`;
  }, 300);
}

function rollDice() {
  const count = parseInt(document.getElementById("dice-count").value) || 1;
  let results = [];
  for (let i = 0; i < count; i++) results.push(Math.floor(Math.random() * 6) + 1);
  document.getElementById("dice-result").textContent = results.join("  ");
}

function calcAge() {
  const birth = new Date(document.getElementById("age-date").value);
  if (!birth || isNaN(birth)) return;
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
  if (months < 0) { years--; months += 12; }
  document.getElementById("age-result").textContent = currentLang === "fa"
    ? `${years} سال و ${months} ماه و ${days} روز`
    : `${years} years, ${months} months, ${days} days`;
}

function calcDiscount() {
  const price = parseFloat(document.getElementById("disc-price").value);
  const pct = parseFloat(document.getElementById("disc-pct").value);
  if (isNaN(price) || isNaN(pct)) return;
  const final = (price * (1 - pct / 100)).toFixed(2);
  const saved = (price - final).toFixed(2);
  document.getElementById("disc-result").textContent = currentLang === "fa"
    ? `قیمت نهایی: ${final} | صرفه‌جویی: ${saved}`
    : `Final: ${final} | Saved: ${saved}`;
}

function textToBinary() {
  const text = document.getElementById("bin-input").value;
  document.getElementById("bin-result").textContent = text.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
}

function binaryToText() {
  const bin = document.getElementById("b2t-input").value.trim();
  try {
    document.getElementById("b2t-result").textContent = bin.split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join("");
  } catch {
    document.getElementById("b2t-result").textContent = "Error";
  }
}

function removeDups() {
  const lines = document.getElementById("dup-input").value.split("\n");
  document.getElementById("dup-result").textContent = [...new Set(lines)].join("\n");
}

function sortLines(desc) {
  let lines = document.getElementById("sort-input").value.split("\n").filter(l => l.trim());
  lines.sort((a, b) => a.localeCompare(b, currentLang === "fa" ? "fa" : "en"));
  if (desc) lines.reverse();
  document.getElementById("sort-result").textContent = lines.join("\n");
}

function findReplace() {
  const text = document.getElementById("fr-input").value;
  const find = document.getElementById("fr-find").value;
  const replace = document.getElementById("fr-replace").value;
  document.getElementById("fr-result").textContent = text.split(find).join(replace);
}

function updateTimestamp() {
  document.getElementById("ts-now").textContent = Math.floor(Date.now() / 1000);
}

function tsToDate() {
  const ts = parseInt(document.getElementById("ts-input").value);
  if (!ts) return;
  document.getElementById("ts-result").textContent = new Date(ts * 1000).toLocaleString(currentLang === "fa" ? "fa-IR" : "en-US");
}

function hexToRgb() {
  let hex = document.getElementById("cc-hex").value.replace("#", "");
  if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  const r = parseInt(hex.slice(0,2), 16);
  const g = parseInt(hex.slice(2,4), 16);
  const b = parseInt(hex.slice(4,6), 16);
  document.getElementById("cc-result").textContent = `RGB(${r}, ${g}, ${b})`;
}

function calcReadingTime() {
  const text = document.getElementById("rt-input").value;
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  document.getElementById("rt-result").textContent = currentLang === "fa"
    ? `حدود ${minutes} دقیقه مطالعه (${words} کلمه)`
    : `About ${minutes} min read (${words} words)`;
}

async function genHash(algo) {
  const text = document.getElementById("hash-input").value;
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  document.getElementById("hash-result").textContent = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

function minifyCSS() {
  let css = document.getElementById("css-input").value;
  css = css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{:;,}])\s*/g, "$1").trim();
  document.getElementById("css-result").textContent = css;
}

function minifyJS() {
  let js = document.getElementById("js-input").value;
  js = js.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").trim();
  document.getElementById("js-result").textContent = js;
}

function minifyHTML() {
  let html = document.getElementById("html-input").value;
  html = html.replace(/<!--[\s\S]*?-->/g, "").replace(/\s+/g, " ").replace(/>\s+</g, "><").trim();
  document.getElementById("html-result").textContent = html;
}

function convertUnit() {
  const factors = { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, mi: 1609.344 };
  const val = parseFloat(document.getElementById("unit-val").value);
  const from = document.getElementById("unit-from").value;
  const to = document.getElementById("unit-to").value;
  document.getElementById("unit-result").textContent = `${val} ${from} = ${(val * factors[from] / factors[to]).toFixed(6)} ${to}`;
}

function calcTip() {
  const bill = parseFloat(document.getElementById("tip-bill").value);
  const pct = parseFloat(document.getElementById("tip-pct").value);
  const people = parseInt(document.getElementById("tip-people").value) || 1;
  if (!bill) return;
  const tip = bill * pct / 100;
  const total = bill + tip;
  document.getElementById("tip-result").textContent = currentLang === "fa"
    ? `انعام: ${tip.toFixed(2)} | جمع: ${total.toFixed(2)} | هر نفر: ${(total / people).toFixed(2)}`
    : `Tip: ${tip.toFixed(2)} | Total: ${total.toFixed(2)} | Per person: ${(total / people).toFixed(2)}`;
}

function calcLoan() {
  const P = parseFloat(document.getElementById("loan-amount").value);
  const r = parseFloat(document.getElementById("loan-rate").value) / 100 / 12;
  const n = parseInt(document.getElementById("loan-months").value);
  if (!P || !n) return;
  const monthly = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  document.getElementById("loan-result").textContent = currentLang === "fa"
    ? `قسط ماهانه: ${monthly.toFixed(2)} | کل پرداختی: ${(monthly * n).toFixed(2)}`
    : `Monthly: ${monthly.toFixed(2)} | Total: ${(monthly * n).toFixed(2)}`;
}

function convertBase() {
  const input = document.getElementById("nb-input").value.trim();
  const from = parseInt(document.getElementById("nb-from").value);
  const to = parseInt(document.getElementById("nb-to").value);
  try {
    document.getElementById("nb-result").textContent = parseInt(input, from).toString(to).toUpperCase();
  } catch {
    document.getElementById("nb-result").textContent = "Error";
  }
}

function genFake() {
  const first = ["Ali", "Sara", "Reza", "Neda", "Amir", "Maryam", "Hassan", "Zahra"];
  const last = ["Mohammadi", "Ahmadi", "Hosseini", "Karimi", "Rezaei", "Nouri"];
  const domains = ["gmail.com", "yahoo.com", "outlook.com"];
  const f = first[Math.floor(Math.random() * first.length)];
  const l = last[Math.floor(Math.random() * last.length)];
  const email = `${f.toLowerCase()}.${l.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
  document.getElementById("fake-result").textContent = `Name: ${f} ${l}\nEmail: ${email}\nPhone: +98 9${Math.floor(Math.random()*1000000000).toString().padStart(9,"0")}`;
}

function genQR() {
  const text = document.getElementById("qr-input").value;
  if (!text) return;
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
  document.getElementById("qr-result").innerHTML = `<img src="${url}" alt="QR Code" style="border-radius:12px" />`;
}

let pomoInterval = null, pomoSecs = 25 * 60;
function pomoStart() {
  if (pomoInterval) return;
  pomoInterval = setInterval(() => {
    if (pomoSecs <= 0) { pomoPause(); alert(currentLang === "fa" ? "زمان تمام شد!" : "Time's up!"); return; }
    pomoSecs--;
    const m = String(Math.floor(pomoSecs / 60)).padStart(2, "0");
    const s = String(pomoSecs % 60).padStart(2, "0");
    document.getElementById("pomo-display").textContent = `${m}:${s}`;
  }, 1000);
}
function pomoPause() { clearInterval(pomoInterval); pomoInterval = null; }
function pomoReset() { pomoPause(); pomoSecs = 25 * 60; document.getElementById("pomo-display").textContent = "25:00"; }

function genMeta() {
  const title = document.getElementById("meta-title").value;
  const desc = document.getElementById("meta-desc").value;
  const keywords = document.getElementById("meta-keywords").value;
  document.getElementById("meta-result").textContent = `<title>${title}</title>\n<meta name="description" content="${desc}" />\n<meta name="keywords" content="${keywords}" />\n<meta property="og:title" content="${title}" />\n<meta property="og:description" content="${desc}" />`;
}

function calcAspect() {
  const w = parseInt(document.getElementById("ar-w").value);
  const h = parseInt(document.getElementById("ar-h").value);
  if (!w || !h) return;
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const g = gcd(w, h);
  document.getElementById("ar-result").textContent = `${w}:${h} → ${w/g}:${h/g} (ratio: ${(w/h).toFixed(3)})`;
}

function wordFreq() {
  const text = document.getElementById("wf-input").value.toLowerCase();
  const words = text.match(/[\u0600-\u06FFa-z0-9]+/gi) || [];
  const freq = {};
  words.forEach(w => freq[w] = (freq[w] || 0) + 1);
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 20);
  document.getElementById("wf-result").textContent = sorted.map(([w, c]) => `${w}: ${c}`).join("\n");
}

const morseMap = {
  a:".-", b:"-...", c:"-.-.", d:"-..", e:".", f:"..-.", g:"--.", h:"....", i:"..", j:".---",
  k:"-.-", l:".-..", m:"--", n:"-.", o:"---", p:".--.", q:"--.-", r:".-.", s:"...", t:"-",
  u:"..-", v:"...-", w:".--", x:"-..-", y:"-.--", z:"--..",
  "0":"-----","1":".----","2":"..---","3":"...--","4":"....-","5":".....","6":"-....","7":"--...","8":"---..","9":"----."," ": "/"
};
const reverseMorse = Object.fromEntries(Object.entries(morseMap).map(([k,v]) => [v,k]));

function toMorse() {
  const text = document.getElementById("morse-input").value.toLowerCase();
  document.getElementById("morse-result").textContent = text.split("").map(c => morseMap[c] || c).join(" ");
}

function fromMorse() {
  const code = document.getElementById("morse-input").value.trim().split(/\s+/);
  document.getElementById("morse-result").textContent = code.map(c => reverseMorse[c] || c).join("");
}

function checkDiff() {
  const t1 = document.getElementById("diff1").value;
  const t2 = document.getElementById("diff2").value;
  document.getElementById("diff-result").textContent = t1 === t2
    ? (currentLang === "fa" ? "✅ متن‌ها یکسان هستند" : "✅ Texts are identical")
    : (currentLang === "fa" ? "❌ متن‌ها متفاوت هستند" : "❌ Texts are different");
}

function testRegex() {
  try {
    const pattern = document.getElementById("regex-pattern").value;
    const flags = document.getElementById("regex-flags").value;
    const text = document.getElementById("regex-text").value;
    const regex = new RegExp(pattern, flags);
    const matches = text.match(regex);
    document.getElementById("regex-result").textContent = matches
      ? `Matches (${matches.length}):\n` + matches.join("\n")
      : (currentLang === "fa" ? "هیچ تطابقی یافت نشد" : "No matches found");
  } catch (e) {
    document.getElementById("regex-result").textContent = "Error: " + e.message;
  }
}

function previewMD() {
  let md = document.getElementById("md-input").value;
  md = md.replace(/^### (.*$)/gim, "<h3>$1</h3>")
         .replace(/^## (.*$)/gim, "<h2>$1</h2>")
         .replace(/^# (.*$)/gim, "<h1>$1</h1>")
         .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
         .replace(/\*(.*)\*/gim, "<em>$1</em>")
         .replace(/`(.*?)`/gim, "<code>$1</code>")
         .replace(/\n/g, "<br>");
  document.getElementById("md-result").innerHTML = md;
}

function genPicsum() {
  const w = document.getElementById("pic-w").value || 600;
  const h = document.getElementById("pic-h").value || 400;
  const url = `https://picsum.photos/${w}/${h}`;
  document.getElementById("pic-result").textContent = url;
  document.getElementById("pic-preview").innerHTML = `<img src="${url}" style="max-width:100%;border-radius:12px" alt="Random" />`;
}

function copyText(id) {
  const el = document.getElementById(id);
  const text = el.textContent || el.innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert(currentLang === "fa" ? "کپی شد!" : "Copied!");
  });
}
