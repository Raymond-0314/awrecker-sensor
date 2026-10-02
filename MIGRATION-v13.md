# v13 命名與路徑修正

- distance → S8；color → S16；force → Hue12。
- 保留上傳專案的 S8 名稱、支援矩陣、首頁、選擇視窗與中英文教學內容。
- 產品 JSON、介紹、教學目錄、圖片目錄與產生頁面全部同步調整。
- 新教學路徑統一為 `/products/S8/...`、`/products/S16/...`、`/products/Hue12/...`。
- 允許混合大小寫 slug，但禁止空格及重複代號。
- 把 S8 的 color.png 搬到 public，引用改成 `/images/tutorials/S8/spike-app/color.png`。
- 保留已設定的 Inventor、EV3 Classroom、EV3-G、clev3r 環境，補上待編輯的中英文教學檔。
- 其餘尚未修改的示例教學文字不當作新硬體的正式 API；請繼續依產品資料編輯。

## 常用位置

| 內容 | S8 | S16 | Hue12 |
|---|---|---|---|
| 產品設定 | `_data/products/S8.json` | `_data/products/S16.json` | `_data/products/Hue12.json` |
| 中文介紹 | `_content/products/S8.zh.md` | `_content/products/S16.zh.md` | `_content/products/Hue12.zh.md` |
| 教學目錄 | `_content/tutorials/S8/` | `_content/tutorials/S16/` | `_content/tutorials/Hue12/` |

以上相對於 docs/。安裝並啟動：

```powershell
npm.cmd ci
npm.cmd run docs:dev
```

缺少內容時請修改 `_content`，不要修改自動產生的 `docs/products` 頁面。
