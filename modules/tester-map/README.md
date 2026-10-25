# 測試員地圖

公開頁 `/tester-map`。測試週把全站功能分成測試區，讓測試者與其他訪客對照組別、路徑、預設關閉的開關，以及需要權限的項目。

## 負責範圍

- 模組 ID：`tester-map`；維護角色：`community`（不是 GitHub 寫入權或業務授權）。
- 對外入口：`index.ts`。頁面：`apps/portal-web/src/modules/TesterMapPage.tsx`。
- 功能清單來自 `modules/development/pages.ts`、導覽與 `FREEDOM_*_ENABLED`。新頁面、新導覽項或新開關沒有歸類時，測試會失敗。
- 覆蓋狀態只在 `coverage.json`（未測、測試中、已測、有問題）。公會長或貢獻者用 PR 更新。這個模組不寫資料庫、不建立帳號，也不建立交易。
- 加入方式寫的是公會名稱與站內暱稱。不要在這一頁加入其他人的姓名、信箱或私人聯絡方式。

## 驗證

```sh
node scripts/freedom.mjs module-check
node --import tsx --test tests/runtime/tester-map.test.ts
npm run typecheck
```

有前端修改時先 build，再跑 `tests/e2e/tester-map.spec.ts`。該瀏覽器測試需要隔離的 PostgreSQL。
