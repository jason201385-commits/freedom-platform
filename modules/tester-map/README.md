# tester-map

人才與方向公會社群測試週（2026-10-26 至 2026-11-01）的「測試員地圖」。志工選擇 A–E 小組後，照分關任務一步步測試平台功能：每一步寫明開哪裡、試什麼、確認什麼，以及怎麼用「想法」回報。完成步驟與關卡可獲得勳章。下方保留完整功能清單、負責小組與測試狀態。

## 負責範圍

- 模組 ID：`tester-map`；維護角色：`community`（不是 GitHub 寫入權或業務授權）。
- 頁面：會員區 `#tester-map`；未登入時同一個 `/#tester-map` 以公開頁呈現，從「自由工坊社群」頁連入。
- `areas.ts`：測試區、功能、A–E 小組，以及 2026-10-25 在公開 `/api/v1/site` 觀察到的旗標開關。功能名稱依介面順序附五種語言。
- `coverage.ts`：每項功能的狀態（未測／測試中／已測／有問題）。「有問題」必須附公開 GitHub Issue 編號。
- `service.ts`：純函式，負責驗證、統計與依小組篩選。
- `quest.ts`：原 8 個關卡加供應商／銷售者 2 條角色路線、各步驟的五語說明與 A–E 建議路線。每一步都對應 `areas.ts` 的功能；預設關閉的功能只留在清單裡。
- `progress.ts`：本機進度。鍵名 `freedom-tester-map-progress-v1`，做法同 newcomer-guides 的 `engine/preferences.ts`：防禦性解析、寫入失敗不影響操作，可一鍵清除。勳章完全由本機進度推導。進度與勳章不是官方紀錄、XP 或獎勵，也不送伺服器。
- 排行榜尚未實作，頁面只標示「規劃中，需團隊協調」。伺服器端進度、勳章與自願排行榜的提案見 [COORDINATION.md](COORDINATION.md)；在協調前不得新增 schema、migration、API 或旗標。
- 沒有 API、資料庫、migration 或權限。頁面不發任何請求，也不讀取 session；旗標欄位只是有日期的觀察紀錄，不能開關功能。

## 更新方式

1. 測試狀態一律用 PR 更新 `coverage.ts`，一次改一項。不要寫姓名、Email、截圖或其他個資。
2. 新增或調整任務步驟時，`features` 只能填 `areas.ts` 的功能 ID；測試會檢查每個可測功能都有步驟、每關都有步驟。
3. 平台新增頁面、`modules/development/pages.ts` 頁面 ID 或 `/api/v1/site` 旗標時，在 `areas.ts` 補上對應功能與 `coverage.ts` 狀態。`tests/runtime/tester-map.test.ts` 會核對 TabId、開發頁面 ID 與 site 旗標，漏掉任何一項都會失敗。
4. 公開網站旗標改變時，更新 `TESTER_FLAGS` 與 `TESTER_FLAGS_OBSERVED_AT`。
5. 回報管道沿用每頁的「想法」頁面工具（建立 GitHub Issue）。站內檢舉（`member_reporting`）未開放，不能列為回報方式。

```sh
node --import tsx --test tests/runtime/tester-map.test.ts
npm run typecheck
npm run module:check
npm run build
npx playwright test tests/e2e/tester-map.spec.ts
```

模組 metadata 與測試通過，不代表功能已上線、已驗收或已部署。

## 供應商與銷售者測試地圖（2026-11-05 source candidate）

沿用 #1046 的測試員地圖，不另建進度系統：`commerce.ts` 提供供應商 5 步與銷售者 6 步的五語內容，`quest.ts` 納入既有步驟白名單，頁面頂端兩張路線卡可聚焦到各自第一個未完成步驟。沿用既有設計、勳章及本機儲存；舊步驟 ID／已完成紀錄與 A–E 建議路線不變。新增兩個角色關卡會增加整體總步數與「全圖踏查」的完成門檻，但不撤銷舊的分關或小組路線勳章。不把完成勾選當成實際功能驗收。

- 供應商：本人商品庫 → 商品草稿／驗證 → 商品詳情的供貨方案預覽及既有審核 → 合作、預留及報表 → 中斷／重試／回報。
- 銷售者：本人測試商店 → 開店準備 → 供貨方案／售價／版本與可用狀態 → 草稿預覽 → 店主預留與訂單 → 返回／重試／回報。
- `#supplier`／`#retail` 是既有 AI／MD 準備入口，不是營運中心；角色步驟只從 `#stores/supply`／`#stores` 開始，後續使用本人所選商品庫／商店的既有連結，不硬寫 tenant／instance ID。
- 正式站只讀；新增／修改只在負責人指定並授權的隔離測試環境使用合成資料。不得為闖關發布、接受協議、填金流憑證、建立真實交易、收付款、退款或出貨。遇未開放、無權限、缺測試資料則記錄受阻，不標完成。
- 不改 API、資料庫、migration、旗標或 `coverage.ts`，不把歷史旗標觀察當目前線上狀態。不啟用仍未審核的 stores／supplier-console 角色導覽。

查重時間：2026-11-05 05:39–05:43 UTC；基準 main `3f66d63e093c79a9118e4a953baab893d6e12dcc`。#1046 已合併；#1214（分享）、#1215（帳號進度與回饋）仍 open，並由 #1266 整合。當時所有 open PR 與 supplier／seller／測試地圖相關已關閉 Issues／PR 搜尋未見相同的兩條角色路線；不代表未公開的工作不存在。既有運作與角色導覽文件保留作者及來源。

整合 #1215 時保留它的帳號 hook、回饋／報告和分享接線，只納入本次角色內容與頁面區塊；`features` 只標記該步實際測試的 supplier-console 或 stores，不把選讀的 AI／MD 頁或買家「我的訂單」誤算為已測。仍須在整合版重新跑帳號 API／回饋映射與瀏覽器測試。

來源核對：
- [供應商首次旅程](../../docs/platform-plan/execution/supplier-console/first-journey.md)
- [供應商路由](../agent-commerce/supplier-console/ui/route.ts)、[商品詳情](../agent-commerce/supplier-console/ui/pages/Product.tsx)、[條件與審核](../agent-commerce/supplier-console/ui/pages/Terms.tsx)
- [銷售者說明](../agent-commerce/seller-console/README.md)、[銷售者路由](../agent-commerce/seller-console/route.ts)
- [供貨方案實際顯示](../agent-commerce/hosted-ui/SupplyOfferPresentation.tsx)

### 本輪驗證與尚未驗項

- `node --import tsx --test tests/runtime/tester-map.test.ts`：16/16 通過，包含角色分離、五語完整、既有步驟保存、原 E 路線勳章及正確營運入口。
- `npm run typecheck`、`npm run build`、`npm run module:check`、`git diff --check` 通過。module check 保留既有 `GuildMemberCard.tsx` 未登錄警告；build 保留 chunk-size 警告。
- 實際 `TesterMap` 的 React SSR 結構檢查通過：兩條路線、5／6 個步驟、唯一 HTML ID、可聚焦標題、入口、初始進度與安全說明。這不是瀏覽器或視覺驗證。
- Playwright `--list` 成功收集 6 案，新增 `TESTER-006` 涵蓋鍵盤、角色切換、續做、重載、收合重開與 390px。**案例未執行**：沒有已核實的隔離 PostgreSQL；另試不連 DB 的 production bundle 瀏覽器驗證，Chromium 因環境 socket 權限無法啟動，受審查提權又於環境啟動階段失敗。沒有停用瀏覽器 sandbox 或繞過限制。
- `freedom verify --base-ref 3f66d63e093c79a9118e4a953baab893d6e12dcc`：exit 2／unavailable；descriptor 與 producer contract bytes 通過，`runtime.full` 因 `test_database_required` 未執行，surface coverage 因 `registration_behavior_audit_required` 未執行。
- `runtime.full`、完整 E2E、實際視覺、手機／Safari、登入帳號、正式站行為、#1215／#1266 整合版、遠端 CI、發布與部署均未驗證。本輪不授權合併或部署；後續 fork 分支／Draft PR 的實際發布結果以 GitHub 紀錄為準。
