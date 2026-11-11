# 使用教學

## 01 / 環境準備

### ✔ 請確認控制器、感應器與程式環境

| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | LEGO® Education SPIKE™ Prime Set<br>LEGO® MINDSTORMS® Robot Inventor |
| 感應器 | MBC 神攝手視覺感應器 (SPIKE 版) |
| 程式語言 | Pybricks Blocks |

### ✔ 事前準備

1. 啟動你的機器人與 Pybricks Blocks。
2. 確認主機已安裝 Pybricks 韌體，且相機與主機連線正常。
3. 設定感應器模式，確認與程式設定模式相同。

## 02 / 函數與功能說明

::: info ℹ️ 補充資訊
使用內建顏色感應器積木，將反射光與環境光讀值存入變數，再依目前相機模式拆解。相機模式由機身切換。
:::

<CamModeAccordion>

### ✔ 相機模式概覽

MBC 神攝手視覺感應器共有 5 大主模式，各主模式下還有細分多個子模式，請參考下表說明與 modeID 編號，查找程式說明。

<CamModeOverview />

### ✔ 各模式讀值與解碼

#### 模式一：指定顏色追蹤

<CamModeSection mode="11" title="顏色追蹤 - ① 最多色">

最多讀取 2 色的位置。

| 積木欄位 | 回傳值 |
| --- | --- |
| 反射光 | X1×100+Y1 |
| 環境光 | X2 . Y2 |

reflection() 對應反射光，ambient() 對應環境光。表中的 A . B 代表整數與小數第一位；以 floor(ambient) 取 A、round(ambient×10) % 10 取 B。

反射光位置為 40×30 格，負值先加 6399 再以 100 拆出 X、Y。環境光的位置或寬高使用 8×6 格。Y 向下增加，0 位置表示未找到。

</CamModeSection>

<CamModeSection mode="12" title="顏色追蹤 - ② 多色">

最多讀取 2 色的位置。

| 積木欄位 | 回傳值 |
| --- | --- |
| 反射光 | X1×100+Y1 |
| 環境光 | X2 . Y2 |

reflection() 對應反射光，ambient() 對應環境光。表中的 A . B 代表整數與小數第一位；以 floor(ambient) 取 A、round(ambient×10) % 10 取 B。

反射光位置為 40×30 格，負值先加 6399 再以 100 拆出 X、Y。環境光的位置或寬高使用 8×6 格。Y 向下增加，0 位置表示未找到。

</CamModeSection>

<CamModeSection mode="13" title="顏色追蹤 - ③ 標準">

最多讀取 2 色的位置。

| 積木欄位 | 回傳值 |
| --- | --- |
| 反射光 | X1×100+Y1 |
| 環境光 | X2 . Y2 |

reflection() 對應反射光，ambient() 對應環境光。表中的 A . B 代表整數與小數第一位；以 floor(ambient) 取 A、round(ambient×10) % 10 取 B。

反射光位置為 40×30 格，負值先加 6399 再以 100 拆出 X、Y。環境光的位置或寬高使用 8×6 格。Y 向下增加，0 位置表示未找到。

</CamModeSection>

<CamModeSection mode="14" title="顏色追蹤 - ④ 精細">

最多讀取 1 色的位置與寬高。

| 積木欄位 | 回傳值 |
| --- | --- |
| 反射光 | X1×100+Y1 |
| 環境光 | W1 . H1 |

reflection() 對應反射光，ambient() 對應環境光。表中的 A . B 代表整數與小數第一位；以 floor(ambient) 取 A、round(ambient×10) % 10 取 B。

反射光位置為 40×30 格，負值先加 6399 再以 100 拆出 X、Y。環境光的位置或寬高使用 8×6 格。Y 向下增加，0 位置表示未找到。

</CamModeSection>

#### 模式二：指定座標取色

<CamModeSection mode="21" title="座標取色 - ① 色相">

最多讀取 2 個取樣點的色相，精度依下方欄位格式。

| 積木欄位 | 回傳值 |
| --- | --- |
| 反射光 | Hue1×10+floor(Sat1÷10) |
| 環境光 | Hue2 . min(9,floor(Sat2÷10)) |

reflection() 對應反射光，ambient() 對應環境光。表中的 A . B 代表整數與小數第一位；以 floor(ambient) 取 A、round(ambient×10) % 10 取 B。

除以 10 的小數欄位只保留十位資訊，乘以 10 可還原近似值，最多顯示 90。

</CamModeSection>

<CamModeSection mode="22" title="座標取色 - ② 色相＋飽和">

最多讀取 2 個取樣點的色相與飽和，精度依下方欄位格式。

| 積木欄位 | 回傳值 |
| --- | --- |
| 反射光 | Hue1×10+floor(Sat1÷10) |
| 環境光 | Hue2 . min(9,floor(Sat2÷10)) |

reflection() 對應反射光，ambient() 對應環境光。表中的 A . B 代表整數與小數第一位；以 floor(ambient) 取 A、round(ambient×10) % 10 取 B。

除以 10 的小數欄位只保留十位資訊，乘以 10 可還原近似值，最多顯示 90。

</CamModeSection>

<CamModeSection mode="23" title="座標取色 - ③ 色相＋飽和＋明度">

最多讀取 1 個取樣點的色相、飽和與明度，精度依下方欄位格式。

| 積木欄位 | 回傳值 |
| --- | --- |
| 反射光 | Hue1 |
| 環境光 | Sat1 . min(9,floor(Val1÷10)) |

reflection() 對應反射光，ambient() 對應環境光。表中的 A . B 代表整數與小數第一位；以 floor(ambient) 取 A、round(ambient×10) % 10 取 B。

除以 10 的小數欄位只保留十位資訊，乘以 10 可還原近似值，最多顯示 90。

</CamModeSection>

#### 模式三：依序取色號

<CamModeSection mode="30" title="依序取色號">

讀取由左至右前 2 塊色相與總塊數。

| 積木欄位 | 回傳值 |
| --- | --- |
| 反射光 | Hue1 |
| 環境光 | Hue2 . min(Total,9) |

reflection() 對應反射光，ambient() 對應環境光。表中的 A . B 代表整數與小數第一位；以 floor(ambient) 取 A、round(ambient×10) % 10 取 B。

總數的小數欄位最多顯示 9，代表 9 個或以上。

色相 0 可以代表紅色，請以總塊數判斷前幾格有效。

</CamModeSection>

#### 模式四：循線

<CamModeSection mode="41" title="循線 - ① 黑線">

讀取近、遠偏移、路口類型及有線旗標，共 4 個值。

| 積木欄位 | 回傳值 |
| --- | --- |
| 反射光 | (Near offset+100)×10+Junction |
| 環境光 | Far offset+100 . Flags |

reflection() 對應反射光，ambient() 對應環境光。表中的 A . B 代表整數與小數第一位；以 floor(ambient) 取 A、round(ambient×10) % 10 取 B。

偏移 −100～100，負值表示線在左；角度 −90～90°。Flags 以近、中、遠分別為 1、2、4 相加。Junction 0～5 為無、十字、T、左、右、盡頭。色線先教目標色 1。

</CamModeSection>

<CamModeSection mode="42" title="循線 - ② 白線">

讀取近、遠偏移、路口類型及有線旗標，共 4 個值。

| 積木欄位 | 回傳值 |
| --- | --- |
| 反射光 | (Near offset+100)×10+Junction |
| 環境光 | Far offset+100 . Flags |

reflection() 對應反射光，ambient() 對應環境光。表中的 A . B 代表整數與小數第一位；以 floor(ambient) 取 A、round(ambient×10) % 10 取 B。

偏移 −100～100，負值表示線在左；角度 −90～90°。Flags 以近、中、遠分別為 1、2、4 相加。Junction 0～5 為無、十字、T、左、右、盡頭。色線先教目標色 1。

</CamModeSection>

<CamModeSection mode="43" title="循線 - ③ 色線">

讀取近、遠偏移、路口類型及有線旗標，共 4 個值。

| 積木欄位 | 回傳值 |
| --- | --- |
| 反射光 | (Near offset+100)×10+Junction |
| 環境光 | Far offset+100 . Flags |

reflection() 對應反射光，ambient() 對應環境光。表中的 A . B 代表整數與小數第一位；以 floor(ambient) 取 A、round(ambient×10) % 10 取 B。

偏移 −100～100，負值表示線在左；角度 −90～90°。Flags 以近、中、遠分別為 1、2、4 相加。Junction 0～5 為無、十字、T、左、右、盡頭。色線先教目標色 1。

</CamModeSection>

#### 模式五：物體偵測

<CamModeSection mode="51" title="物體偵測 - ① 物體清單">

讀取前 1 個物體的代碼與位置，另可讀物體總數。

| 積木欄位 | 回傳值 |
| --- | --- |
| 反射光 | X1×100+Y1 |
| 環境光 | Code1 . min(Total,9) |

reflection() 對應反射光，ambient() 對應環境光。表中的 A . B 代表整數與小數第一位；以 floor(ambient) 取 A、round(ambient×10) % 10 取 B。

反射光位置為 40×30 格，負值先加 6399 再以 100 拆出 X、Y。環境光的位置或寬高使用 8×6 格。Y 向下增加，0 位置表示未找到。

只偵測目標色 1–8，物體按面積由大到小排列，位置是質心。Code＝色號×10＋形狀，0 代表無物體。形狀 0～9 為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。

</CamModeSection>

<CamModeSection mode="52" title="物體偵測 - ② 物體詳細">

讀取前 1 個物體的詳細資料，欄位如下。

| 積木欄位 | 回傳值 |
| --- | --- |
| 反射光 | X1×100+Y1 |
| 環境光 | Code1 . min(9,floor(Area1÷10)) |

reflection() 對應反射光，ambient() 對應環境光。表中的 A . B 代表整數與小數第一位；以 floor(ambient) 取 A、round(ambient×10) % 10 取 B。

反射光位置為 40×30 格，負值先加 6399 再以 100 拆出 X、Y。環境光的位置或寬高使用 8×6 格。Y 向下增加，0 位置表示未找到。

除以 10 的小數欄位只保留十位資訊，乘以 10 可還原近似值，最多顯示 90。

只偵測目標色 1–8，物體按面積由大到小排列，位置是質心。Code＝色號×10＋形狀，0 代表無物體。形狀 0～9 為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。

</CamModeSection>

</CamModeAccordion>

## 03 / 範例程式

將相機切到 13 (顏色追蹤 - ③ 標準)，教好目標色 1、2。建立 reflected、ambient、X1、Y1、X2、Y2 變數，在「重複執行」內依序加入以下操作。

| 順序 | 積木操作 |
| --- | --- |
| 1 | 將反射光讀值設為 reflected，環境光讀值設為 ambient。每個欄位每輪只讀一次。 |
| 2 | 如果 reflected < 0，將 reflected 增加 6399。 |
| 3 | X1＝向下取整 (reflected ÷ 100)，Y1＝reflected 除以 100 的餘數。 |
| 4 | X2＝向下取整 (ambient)，Y2＝四捨五入 (ambient × 10) 除以 10 的餘數。 |
| 5 | 如果 X1 或 X2 為 0，顯示對應色號「未找到」；否則顯示其 X、Y。 |
| 6 | 等待 0.1 秒，再開始下一輪。 |

例如 reflected＝2015、ambient＝4.3，會得到色 1 格座標 (20,15)、色 2 格座標 (4,3)。兩色使用的格子大小不同，請各自依 40×30、8×6 格解讀。

### ✔ 循線拆值練習

改用 41、42 或 43 時，近處偏移＝向下取整 (reflected ÷ 10)−100，路口類型＝reflected 除以 10 的餘數。遠處偏移＝向下取整 (ambient)−100，有線旗標＝四捨五入 (ambient×10) 除以 10 的餘數。例如 802、115.5 代表近處 −20、T 字路口、遠處 +15，近與遠兩段有線。

### ✔ 延伸閱讀

需要更多目標、像素位置、面積或原始資料時，請參考[站內 Pybricks Python 教學](./spike-python.md)，其中包含通訊模式 9 的欄位表與完整程式。

## 04 / 【Lego】 Lau Xiao 示範影片

<CamDemoVideos />

[回首頁選擇其他教學](/)
