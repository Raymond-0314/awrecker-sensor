# 網站內容修改指南

## 先看這張表

| 想修改什麼 | 編輯位置 |
| --- | --- |
| 某款產品的名稱、短說明、順序、圖片、支援環境 | `docs/_data/products/產品代號.json` |
| 控制器與語言名稱 | `docs/_data/environments.json` |
| 某款產品的中文介紹 | `docs/_content/products/產品代號.zh.md` |
| 某款產品的英文介紹 | `docs/_content/products/產品代號.en.md` |
| 某環境的中文教學 | `docs/_content/tutorials/產品代號/控制器-語言.zh.md` |
| 某環境的英文教學 | `docs/_content/tutorials/產品代號/控制器-語言.en.md` |
| 圖片檔案 | `docs/public/images/products/` |
| 首頁版型、滑動與彈跳視窗 | `docs/.vitepress/theme/components/Home.vue` |
| 教學選擇器的呈現 | `docs/.vitepress/theme/components/TutorialPicker.vue` |
| 字級、圖片尺寸、間距與色彩 | `docs/.vitepress/theme/style.css` |

產品代號目前為 `S8`、`S16`、`Hue12`。英文與中文分開保存；繁體中文代號為 `zh`。

## 每款產品分別設定支援組合

例如 `docs/_data/products/Hue12.json` 裡的 `support`：

```json
"support": {
  "spike": ["python"],
  "ev3": []
}
```

這代表這款產品只提供 SPIKE＋Pybricks Python 的路徑。EV3 會停用；選擇 SPIKE 後，SPIKE App 與 Pybricks Block 會停用。其他產品不受影響。可以刪除未支援的控制器鍵，也可以保留空陣列。

| 代號 | 顯示名稱 |
| --- | --- |
| `spike` | SPIKE |
| `ev3` | EV3 |
| `app` | SPIKE App |
| `block` | Pybricks Block |
| `python` | Pybricks Python |

以上範例是操作方式，並非硬體相容性聲明。現有三款產品各自持有預覽用的 `support` 設定，須依實測結果逐款更新。`compatibilityNote.zh`／`.en` 可以逐款修改視窗提示。

如果新增一個支援組合，先提供該產品、該組合的中英兩份教學檔，再把組合加進 `support`。缺少教學檔時建置會指出完整路徑，避免使用者跳到空白頁。

## 換成正式產品照片

1. 把圖片放到 `docs/public/images/products/`，建議用無空格的英文檔名。
2. 修改該產品 JSON 的 `image`，例如：`"image": "/images/products/S8.webp"`。
3. 修改 `imageAlt.zh`／`.en` 的圖片替代文字。

圖片建議正方形、至少 800×800。網站會用 `object-fit: contain` 保留全圖，不強行裁切。現有 SVG 是灰階示意圖形，可直接換成 PNG、JPG 或 WebP。

介紹或教學內插入圖片：

```markdown
![接線方式](/images/products/S8-wiring.png)
```

VitePress 會處理 GitHub Pages 子路徑。每個產品介紹只需改一份中文與一份英文，會自動加入該產品的所有教學頁。

## 修改文字與程式

`.md` 是 Markdown 文字檔，可直接使用 VS Code 或 GitHub 網頁編輯。

```markdown
## 功能說明

輸入產品介紹文字。

### 讀取數值

說明參數、單位與回傳值。
```

程式範例用三個反引號包住，第一行標記 `python`。修改教學時不要改產品介紹，兩者會在建置時自動組合。

## 新增第四款產品

1. 複製一份 `docs/_data/products/` 裡的 JSON，設定不重複的 `slug`（例如 `S8`，可用大小寫英文、數字與連字號，不可含空格） 與 `order`。
2. 設定 `routeBase` 為 `products/新代號`。
3. 提供 `_content/products/新代號.zh.md` 與 `.en.md`。
4. 提供 `support` 列出的每個組合對應的中英教學檔。
5. 放入圖片並更新 `image`。

首頁會自動載入並排序，不必修改首頁元件。電腦顯示三款主要產品，後方有更多產品時會露出下一款並漸層；手機顯示一款主要產品與下一款的一小部分。

## 預覽與發布

```bash
npm ci
npm run docs:dev
```

```bash
npm run docs:build
```

每次啟動或建置會自動把產品設定、介紹及教學組合成頁面。**不要手動修改產生的 `docs/tutorials/`、`docs/products/` 或 `docs/en/` 產品頁**；這些檔案會重新產生。正式內容只改 `_data`、`_content` 和 `public`。

已移除的支援組合，會在下次準備頁面時移除其自動產生路由；原始教學 Markdown 會保留，可之後重新啟用。

GitHub Pages 工作流程會自動建置。所有修改連同 `.github`、`scripts` 一起提交即可。

## v13 產品命名

產品代號固定為 `S8`、`S16`、`Hue12`，大小寫需一致。設定檔、介紹、教學資料夾與 routeBase 全部使用這些代號。顯示名稱可含空格，不要把顯示名稱填入 slug。

教學圖片請放在 `docs/public/images/tutorials/<產品>/<環境>/`，Markdown 使用 `/images/tutorials/...` 絕對網址，避免被不同語系頁面的位置影響。
