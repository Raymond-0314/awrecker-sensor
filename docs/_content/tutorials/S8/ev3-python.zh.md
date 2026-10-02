## 使用教學 · EV3 · Pybricks Python

從連接準備、函數概念到範例流程，練習讀取與判斷距離。

::: warning 示意教學
目前尚無產品驅動與正式 API。下方範例使用模擬讀值，不會與感測器通訊；實際產品相容性需先驗證。
:::

## 01 / 環境準備

準備 EV3 與適用的 EV3 Pybricks 環境，先確認產品驅動支援此組合。

1. 取得產品接線圖與驅動套件。
2. 確認連接埠與數值單位。
3. 先完成單次數值讀取，再加入迴圈。

## 02 / 函數與功能概念

| 功能 | 本範例函數 | 回傳 / 輸出 |
| --- | --- | --- |
| 讀取數值 | `read_demo_distance()` | 模擬距離，單位 mm |
| 門檻判斷 | `is_near(distance_mm, threshold_mm)` | 布林值 |
| 顯示結果 | `print(message)` | 主控台訊息 |

以上為本示例定義的函數，並非產品 API。正式驅動確認後，將模擬讀值函數替換為實際讀取函數。

<h2 id="example">03 / 範例程式</h2>

```python
## 使用教學 · EV3 · Pybricks Python
def read_demo_distance():
    return 150

def is_near(distance_mm, threshold_mm=200):
    return distance_mm < threshold_mm

distance = read_demo_distance()
print("Distance:", distance, "mm")
if is_near(distance):
    print("Object nearby")
else:
    print("Path clear")
```

## 04 / 動手練習

把模擬距離從 `150` 改為 `300`。門檻為 `200` mm 時，結果會切換成「通道暢通」。數值剛好等於 `200` 時也不觸發接近判斷，因為條件使用 `<`。

## 常見問題

| 情況 | 檢查方式 |
| --- | --- |
| 沒有真實感測器讀值 | 本範例使用模擬資料，需補上正式產品驅動。 |
| 找不到對應積木 | 產品擴充尚待提供，本頁先展示概念流程。 |
| 數值單位不同 | 先確認驅動是否回傳 mm，再進行比較。 |

[回首頁選擇其他教學](/)
