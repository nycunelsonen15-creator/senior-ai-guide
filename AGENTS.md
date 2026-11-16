# AGENTS.md - 長輩專屬 AI 使用手冊開發規範

## 1. 專案目的 (Project Purpose)
本專案是一個專為銀髮族與長輩設計的「AI 數位生活使用手冊」網頁，旨在用最簡單、親切、無壓力的方式，教導長輩如何在日常生活中運用 AI（如 ChatGPT、Gemini）解決買菜煮飯、健康諮詢、旅遊規劃與防範詐騙等問題。
本文件用於規範專案架構與教學單元的撰寫標準，讓 AI 協作者能持續新增風格一致、長輩易讀的教學單元。

## 2. 專案目錄結構 (Directory Structure)
```text
/
├── AGENTS.md                 # AI 協作與長輩友善設計規範（本文件）
├── index.html                # 網站主框架（包含大字體切換鈕、單元選單、閱讀區）
├── style.css                 # 銀髮友善高對比暖色系樣式表
├── app.js                    # 動態讀取 lessons/index.json、字級調整與一鍵複製邏輯
└── lessons/                  # 教學單元存放區
    ├── index.json            # 教學單元目錄索引檔
    └── [編號]-[slug].html    # 個別教學單元的 HTML 內容片段
```

## 3. 整體視覺與長輩友善設計規範 (Senior-Friendly Design System)
- **視覺定位**：溫暖、明亮、高對比、無壓迫感的電子書與學習手冊。
- **色彩規範**：
  - 頁面背景：`#FAF8F5`（護眼米白紙張色，避免純白刺眼）
  - 卡片背景：`#FFFFFF`（純白卡片搭配明顯邊框 `#D6CFC7`）
  - 主要文字：`#1F2937`（深炭灰，確保高對比清晰度）
  - 主強調色：`#1D4ED8`（沉穩深藍，用於標題與主要按鈕）
  - 提示框顏色：`#FEF3C7` 淺暖黃底配 `#B45309` 深琥珀邊框（用於貼心小叮嚀）
- **字級與按鈕規範**：
  - 預設內文字級為 `20px`，行高 `1.8`，並提供「標準 / 特大（24px）」一鍵切換功能。
  - 所有可點擊按鈕與選單高度至少 `48px`，避免長輩誤觸。

## 4. 新增教學單元規範 (Content Creation Rules)
當使用者要求「新增一個教學單元」或「加入新主題」時，AI **必須**嚴格遵守以下三個步驟與寫作原則：

### 寫作語氣與用詞原則（極重要）
1. **禁止使用英文專有名詞與技術術語**：不可出現 Prompt、LLM、Token、模型參數等字眼，一律改用「問問題的句子」、「AI 小幫手」、「對話框」等生活化詞彙。
2. **多用具體生活情境**：從長輩每天會遇到的事切入（例如：看健檢報告、收到奇怪簡訊、孫子要回家吃飯）。

### 步驟 A：檔案命名與放置
- 所有新單元必須放在 `lessons/` 資料夾內。
- 檔名格式：`NNN-kebab-case-topic.html`（例如：`003-travel-planning.html`），編號接續 `lessons/index.json` 中最新編號遞增。

### 步驟 B：教學單元 HTML 片段格式
檔案**不可**包含 `<html>`、`<head>` 或 `<body>` 標籤，僅需撰寫 `<article>` 內容片段，並固定包含以下四個區塊：
```html
<article class="lesson-content">
  <header class="lesson-header">
    <span class="lesson-badge">單元分類（如：生活妙招 / 防詐安全 / 健康保健）</span>
    <h1>單元主標題（簡短白話，不超過 16 字）</h1>
    <p class="lesson-intro">用兩句話說明學會這招對生活有什麼幫助。</p>
  </header>

  <section class="step-box">
    <h2>第一步：什麼時候可以用這招？</h2>
    <p>舉出 1～2 個長輩熟悉的生活場景...</p>
  </section>

  <section class="step-box">
    <h2>第二步：直接複製這句話問 AI</h2>
    <p>請點擊下方的藍色按鈕複製句子，再貼到 AI 對話框送出即可：</p>
    <div class="prompt-card">
      <p class="prompt-text" id="prompt-sample">「這裡放可以直接複製給 AI 的完整口語範例句子」</p>
      <button class="copy-btn" onclick="copyPrompt('prompt-sample', this)">點我複製這句話</button>
    </div>
  </section>

  <section class="tip-box">
    <h2>貼心小叮嚀</h2>
    <ul>
      <li>提醒注意事項（例如：個資不要輸入、AI 回答僅供參考等）</li>
    </ul>
  </section>
</article>
```

### 步驟 C：同步更新 `lessons/index.json`
建立 HTML 檔案後，**必須**同步在 `lessons/index.json` 陣列中新增對應物件：
```json
{
  "id": "003",
  "title": "單元主標題",
  "category": "單元分類",
  "summary": "一句話白話說明（限 35 字內）",
  "file": "lessons/003-travel-planning.html"
}
```

## 5. AI 開發限制與禁止事項 (Constraints & Guardrails)
1. **保持純靜態架構**：禁止引入 React、Vue 或任何需要打包建置的工具，確保可直接透過 GitHub Pages 運行。
2. **禁止擅自修改核心檔案**：新增教學單元時，AI **只允許**新增 `lessons/*.html` 並修改 `lessons/index.json`，不得更動 `index.html`、`style.css` 與 `app.js`。
3. **必須包含可複製範例**：每個教學單元都必須提供 `.prompt-card` 區塊與 `copyPrompt` 按鈕，讓長輩不用打字也能直接練習。
