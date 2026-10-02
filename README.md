# AWRECKER Sensors — VitePress

黑白灰色系的中英雙語產品文件網站。首頁採無框線水平展示，先選擇產品、控制器與語言，再開啟產品介紹與教學整合頁。

**內容修改請先閱讀 [EDITING.md](EDITING.md)。**

## 本機預覽

使用 Node.js 22 或以上。

```bash
npm ci
npm run docs:dev
```

## 建置

```bash
npm run docs:build
npm run docs:preview
```

## GitHub Pages

1. 把完整專案（含 `.github`、`scripts`）提交至 repository 的 `main`。
2. Settings → Pages → Source 選擇 **GitHub Actions**。
3. 查看 Actions 的 Deploy documentation to GitHub Pages。

工作流程會自動套用 repository 子路徑。本機子路徑檢查：`PAGES_BASE=/awrecker-sensors/ npm run docs:build`。

## 架構

- `_data/products/*.json`：逐款產品的顯示資訊、圖片與支援矩陣。
- `_content/products/*.md`：逐款產品的共用介紹。
- `_content/tutorials/<product>/*.md`：依控制器與語言分開的教學。
- `public/images/products/`：圖片資源。
- `scripts/prepare-docs.mjs`：驗證設定並組合頁面。
- `.vitepress/theme/components/`：首頁、語言切換與教學選擇等元件。

現在仍使用示意圖形與預覽支援矩陣，產品規格、接線、驅動及相容性須確認。距離感測器程式使用模擬讀值；顏色與力量感測器教學內容待補。

離線的 AWRECKER-preview.html 用於版型與流程確認。正式操作請以 VitePress 網站為準。尚未完成實際瀏覽器尺寸測試。

## v13 產品命名

產品代號固定為 `S8`、`S16`、`Hue12`，大小寫需一致。設定檔、介紹、教學資料夾與 routeBase 全部使用這些代號。顯示名稱可含空格，不要把顯示名稱填入 slug。

教學圖片請放在 `docs/public/images/tutorials/<產品>/<環境>/`，Markdown 使用 `/images/tutorials/...` 絕對網址，避免被不同語系頁面的位置影響。
