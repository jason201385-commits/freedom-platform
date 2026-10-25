import { TESTER_LANGUAGES, type TesterLanguage, type TesterText } from './types.js';

export const testerCopy = {
  lede: ['這一週把全站功能分成測試區。對照你的組別，看路線、預設關閉的開關，和需要權限的項目。', 'This week’s features are grouped into test areas. Find your group, the route, switches that are off by default, and anything that needs permission.', '今週の機能をテスト区域に分けています。担当グループ、経路、初期状態でオフのスイッチ、権限が要る項目を確認してください。', '이번 주 기능을 테스트 구역으로 나눴습니다. 담당 그룹, 경로, 기본으로 꺼진 스위치, 권한이 필요한 항목을 확인하세요.', 'Las funciones de esta semana están en zonas de prueba. Busca tu grupo, la ruta, los interruptores apagados por defecto y lo que pide permiso.'],
  window: ['測試週 {start} – {end}。', 'Test week {start} – {end}.', 'テスト週 {start}–{end}。', '테스트 주간 {start}–{end}.', 'Semana de prueba {start} – {end}.'],
  joinTitle: ['怎麼加入測試', 'How to join', '参加方法', '참여 방법', 'Cómo participar'],
  joinBody: ['到社群聯絡{guild}。公會長的站內暱稱是「{nickname}」。不要把私人聯絡方式貼到公開頁或 Issue。', 'Contact {guild} in the community. The guild leader’s site nickname is “{nickname}”. Do not post private contact details on a public page or in an Issue.', 'コミュニティで{guild}に連絡してください。ギルドリーダーのサイト内ニックネームは「{nickname}」です。個人の連絡先を公開ページや Issue に書かないでください。', '커뮤니티에서 {guild}에 연락하세요. 길드장의 사이트 닉네임은 「{nickname}」입니다. 개인 연락처를 공개 페이지나 Issue에 올리지 마세요.', 'Contacta a {guild} en la comunidad. El apodo del líder en el sitio es «{nickname}». No publiques datos de contacto en una página pública ni en un Issue.'],
  reportTitle: ['怎麼回報', 'How to report', '報告の仕方', '보고 방법', 'Cómo informar'],
  reportBody: ['用每個會員頁右上角「頁面工具」裡的「提出想法」。它會整理成 GitHub Issue。先搜尋是否已有相同問題，再寫預期結果與實際畫面。', 'Use “Share an idea” inside Page tools at the top-right of each member page. It becomes a GitHub Issue. Search for an existing report first, then describe what you expected and what you saw.', '各会員ページ右上の「ページツール」にある「アイデア」を使います。GitHub Issue になります。先に重複を検索し、期待と実際の画面を書いてください。', '각 회원 페이지 오른쪽 위 「페이지 도구」의 「아이디어」를 사용하세요. GitHub Issue가 됩니다. 먼저 중복을 찾고, 기대한 결과와 실제 화면을 적으세요.', 'Usa «Compartir una idea» en las herramientas de página, arriba a la derecha de cada página de miembro. Crea un Issue de GitHub. Busca duplicados primero y describe lo esperado y lo que viste.'],
  reportPrivacy: ['不要寫入信箱、電話、密碼、權杖、身分證件或別人的私人對話。截圖前先遮掉個人資料。', 'Do not include email, phone numbers, passwords, tokens, identity documents, or someone else’s private messages. Hide personal data before attaching a screenshot.', 'メール、電話、パスワード、トークン、身分証、他人の個人メッセージは書かないでください。スクリーンショットの個人情報は隠してください。', '이메일, 전화, 비밀번호, 토큰, 신분증, 다른 사람의 개인 대화는 적지 마세요. 스크린샷의 개인정보는 가리세요.', 'No incluyas correo, teléfono, contraseñas, tokens, documentos de identidad ni mensajes privados de otra persona. Oculta los datos personales en las capturas.'],
  reportClosed: ['站內檢舉預設關閉。測試問題請用「提出想法」或 GitHub Issue，不要用檢舉。', 'In-site reporting is off by default. Report test findings with “Share an idea” or a GitHub Issue, not the report control.', 'サイト内の通報は初期状態でオフです。テスト結果は「アイデア」か GitHub Issue で送り、通報機能は使わないでください。', '사이트 내 신고는 기본적으로 꺼져 있습니다. 테스트 결과는 「아이디어」나 GitHub Issue로 보내고 신고 기능은 쓰지 마세요.', 'La denuncia dentro del sitio está apagada por defecto. Informa con «Compartir una idea» o un Issue de GitHub, no con la denuncia.'],
  issuesLink: ['開啟 GitHub Issues', 'Open GitHub Issues', 'GitHub Issues を開く', 'GitHub Issues 열기', 'Abrir GitHub Issues'],
  redesignNote: ['標成優先的項目來自已合併的改版 PR #{pr}。若線上 /api/v1/health 的 release_sha 還不含這次改版，等畫面出現再測，不要把尚未部署記成故障。', 'Priority items come from merged redesign PR #{pr}. If the live /api/v1/health release_sha does not include that redesign yet, wait until the screen appears. A not-yet-deployed screen is not a defect.', '優先マークはマージ済みの改修 PR #{pr} です。公開中の /api/v1/health の release_sha にまだ含まれない場合は、画面が出てからテストし、未配備を不具合にしないでください。', '우선 표시는 병합된 개편 PR #{pr}입니다. 라이브 /api/v1/health 의 release_sha에 아직 없으면 화면이 나온 뒤에 테스트하고, 미배포를 결함으로 적지 마세요.', 'Lo marcado como prioridad viene del PR de rediseño #{pr} ya fusionado. Si el release_sha de /api/v1/health en producción aún no lo incluye, espera a ver la pantalla. Que no esté desplegado no es un defecto.'],
  flagNote: ['「預設關閉」表示程式在沒有打開對應環境開關時不提供該能力。線上是否開啟以 /api/v1/site 的同名欄位為準，地圖不代替那份狀態。', '“Off by default” means the code does not offer that capability until its environment switch is on. Whether production has it on is the matching field on /api/v1/site. This map does not replace that status.', '「初期オフ」は、対応する環境スイッチを入れるまでその機能が無いことを示します。本番で有効かは /api/v1/site の同名項目を見てください。この地図はその状態の代わりになりません。', '「기본 꺼짐」은 해당 환경 스위치를 켜기 전에는 기능이 없다는 뜻입니다. 운영에서 켜졌는지는 /api/v1/site 의 같은 필드를 보세요. 이 지도가 그 상태를 대신하지 않습니다.', '«Apagado por defecto» significa que el código no ofrece esa capacidad hasta activar su interruptor. Si producción lo tiene activo está en el campo homónimo de /api/v1/site. Este mapa no sustituye ese estado.'],
  noTransaction: ['進階區可以看供貨、商店與協作，不要建立真實交易、不要付款，也不要把預留或試算當成已收款。', 'The advanced area covers supply, stores, and contribution. Do not create a real transaction, do not pay, and do not treat a hold or an estimate as money received.', '上級ゾーンでは供給、ショップ、協作を確認できます。実際の取引や支払いはせず、予約や試算を入金済みにしないでください。', '고급 구역에서는 공급, 상점, 협업을 확인합니다. 실제 거래나 결제를 만들지 말고, 예약이나 시산을 입금으로 보지 마세요.', 'La zona avanzada cubre suministro, tiendas y contribución. No crees una transacción real, no pagues y no tomes una reserva o un cálculo como dinero cobrado.'],
  coverageNote: ['每一項的狀態（未測、測試中、已測、有問題）寫在靜態檔。公會長或貢獻者用 PR 更新，這個頁面不會寫入資料庫。', 'Each status (not tested, testing, tested, problem) lives in a static file. Guild leaders or contributors update it by PR. This page does not write to a database.', '各項目の状態（未テスト、テスト中、テスト済、問題あり）は静的ファイルです。ギルドリーダーまたは貢献者が PR で更新します。このページはデータベースに書き込みません。', '각 상태(미테스트, 테스트 중, 테스트함, 문제 있음)는 정적 파일입니다. 길드장이나 기여자가 PR로 고칩니다. 이 페이지는 데이터베이스에 쓰지 않습니다.', 'Cada estado (sin probar, en prueba, probado, con problema) está en un archivo estático. Lo actualizan líderes o contribuidores con un PR. Esta página no escribe en una base de datos.'],
  coverageFile: ['狀態檔：modules/tester-map/coverage.json', 'Status file: modules/tester-map/coverage.json', '状態ファイル：modules/tester-map/coverage.json', '상태 파일: modules/tester-map/coverage.json', 'Archivo de estado: modules/tester-map/coverage.json'],
  filterAll: ['全部組別', 'All groups', 'すべてのグループ', '모든 그룹', 'Todos los grupos'],
  filterPriority: ['只看優先', 'Priority only', '優先のみ', '우선만', 'Solo prioridad'],
  filterOff: ['只看預設關閉', 'Off by default only', '初期オフのみ', '기본 꺼짐만', 'Solo apagados por defecto'],
  searchLabel: ['搜尋功能', 'Search features', '機能を検索', '기능 검색', 'Buscar funciones'],
  searchPlaceholder: ['頁名、路徑或開關', 'Page, route, or switch', 'ページ、経路、スイッチ', '페이지, 경로, 스위치', 'Página, ruta o interruptor'],
  empty: ['這個篩選沒有項目。清掉條件再看一次。', 'Nothing matches this filter. Clear it and look again.', 'この絞り込みに項目がありません。条件を外してもう一度見てください。', '이 필터에는 항목이 없습니다. 조건을 지우고 다시 보세요.', 'No hay nada con este filtro. Quítalo y vuelve a mirar.'],
  count: ['顯示 {shown} / {total}', 'Showing {shown} / {total}', '{total} 件中 {shown} 件', '{total}개 중 {shown}개', 'Mostrando {shown} / {total}'],
  backHome: ['回自由工坊', 'Back to the workshop', '自由工坊に戻る', '자유공방으로 돌아가기', 'Volver al taller'],
  groupA: ['A 新朋友・手機', 'A New friends · phone', 'A 新しい仲間・スマホ', 'A 새 친구 · 휴대폰', 'A Nuevos · móvil'],
  groupB: ['B 新朋友・電腦', 'B New friends · computer', 'B 新しい仲間・パソコン', 'B 새 친구 · 컴퓨터', 'B Nuevos · ordenador'],
  groupC: ['C 老成員・手機', 'C Existing members · phone', 'C これまでのメンバー・スマホ', 'C 기존 멤버 · 휴대폰', 'C Miembros actuales · móvil'],
  groupD: ['D 老成員・電腦', 'D Existing members · computer', 'D これまでのメンバー・パソコン', 'D 기존 멤버 · 컴퓨터', 'D Miembros actuales · ordenador'],
  groupE: ['E 進階', 'E Advanced', 'E 上級', 'E 고급', 'E Avanzado'],
  status_untested: ['未測', 'Not tested', '未テスト', '미테스트', 'Sin probar'],
  status_testing: ['測試中', 'Testing', 'テスト中', '테스트 중', 'En prueba'],
  status_tested: ['已測', 'Tested', 'テスト済', '테스트함', 'Probado'],
  status_issue: ['有問題', 'Problem', '問題あり', '문제 있음', 'Con problema'],
  badgePriority: ['優先', 'Priority', '優先', '우선', 'Prioridad'],
  badgeOff: ['預設關閉', 'Off by default', '初期オフ', '기본 꺼짐', 'Apagado por defecto'],
  permission_public: ['不必登入', 'No sign-in', 'ログイン不要', '로그인 불필요', 'Sin iniciar sesión'],
  permission_member: ['要登入', 'Sign-in required', 'ログインが必要', '로그인 필요', 'Hay que iniciar sesión'],
  permission_guild: ['要公會管理權限', 'Guild management permission', 'ギルド管理権限が必要', '길드 관리 권한 필요', 'Permiso de gestión del gremio'],
  permission_admin: ['要平台管理員權限', 'Platform admin permission', 'プラットフォーム管理者権限が必要', '플랫폼 관리자 권한 필요', 'Permiso de administración'],
  permission_business: ['要該業務空間的成員資格', 'Membership in that business space', 'そのビジネススペースのメンバー資格が必要', '해당 비즈니스 공간의 멤버 자격 필요', 'Hay que ser miembro de ese espacio de negocio'],
  area_welcome: ['新朋友路徑', 'Newcomer path', '新しい仲間の経路', '새 친구 경로', 'Ruta de quienes llegan'],
  area_daily: ['會員日常', 'Everyday member', '会員の日常', '회원의 일상', 'Día a día del miembro'],
  area_people: ['認識與公開頁', 'People and public pages', '人と公開ページ', '사람과 공개 페이지', 'Personas y páginas públicas'],
  area_advanced: ['進階：協作與商務', 'Advanced: contribution and commerce', '上級：協作と商務', '고급: 기여와 거래', 'Avanzado: contribución y comercio'],
  area_restricted: ['需要權限', 'Needs permission', '権限が必要', '권한 필요', 'Requiere permiso'],
  area_welcome_body: ['A、B 先走註冊或登入、選一個公會、打開一本技能書，並看社群入口。', 'Groups A and B start with registration or sign-in, pick one guild, open one skill book, and check the community links.', 'A と B は登録またはログイン、ギルドを一つ選ぶ、スキルブックを一冊開く、コミュニティ入口を確認します。', 'A와 B는 가입 또는 로그인, 길드 하나 선택, 스킬북 한 권 열기, 커뮤니티 입구를 확인합니다.', 'A y B empiezan por registrarse o entrar, eligen un gremio, abren un libro de habilidades y revisan los enlaces de la comunidad.'],
  area_daily_body: ['手機走 A 或 C，電腦走 B 或 D。新朋友走第一次，老成員複測改版後的首頁、公會、技能書、動態、訊息與個人空間。', 'Phone: A or C. Computer: B or D. New friends take a first pass. Existing members retest the redesigned home, guilds, skill books, feed, messages, and personal space.', 'スマホは A または C、パソコンは B または D。新しい仲間は初回、これまでのメンバーは改修後のホーム、ギルド、スキルブック、投稿、メッセージ、個人スペースを再確認します。', '휴대폰은 A 또는 C, 컴퓨터는 B 또는 D. 새 친구는 첫 사용, 기존 멤버는 개편된 홈, 길드, 스킬북, 피드, 메시지, 개인 공간을 다시 확인합니다.', 'Móvil: A o C. Ordenador: B o D. Quienes llegan hacen un primer recorrido. Los miembros actuales repiten inicio, gremios, libros, feed, mensajes y espacio personal tras el rediseño.'],
  area_people_body: ['公開頁不必登入也能看的，A–D 都可以點開。好友、小隊與排行較適合已有關係的 C、D。', 'Public pages can be opened without an account by A–D. Friends, squads, and rankings suit C and D, who already have relationships.', 'ログインなしで開ける公開ページは A〜D の誰でも確認できます。友達、小隊、ランキングは関係が既にある C と D 向きです。', '로그인 없이 여는 공개 페이지는 A–D 모두 볼 수 있습니다. 친구, 스쿼드, 순위는 관계가 있는 C와 D에게 맞습니다.', 'Las páginas públicas las puede abrir A–D sin cuenta. Amigos, equipos y clasificaciones encajan con C y D, que ya tienen relaciones.'],
  area_advanced_body: ['E 負責協作與商務。不要建立真實交易。', 'Group E covers contribution and commerce. Do not create a real transaction.', 'E が協作と商務を担当します。実際の取引は作らないでください。', 'E가 기여와 거래를 맡습니다. 실제 거래는 만들지 마세요.', 'E cubre contribución y comercio. No crees una transacción real.'],
  area_restricted_body: ['有平台管理員或公會管理權限的人才進得去。沒有權限就略過，不要向別人索取帳號。', 'Only people who already have platform-admin or guild-management permission can enter. If you do not, skip these. Do not ask someone else for an account.', 'プラットフォーム管理者またはギルド管理権限が既にある人だけ入れます。無ければ飛ばし、他人にアカウントを求めないでください。', '이미 플랫폼 관리자 또는 길드 관리 권한이 있는 사람만 들어갑니다. 없으면 건너뛰고, 다른 사람에게 계정을 요구하지 마세요.', 'Solo entra quien ya tiene permiso de administración o de gestión del gremio. Si no lo tienes, sáltalo. No pidas la cuenta de otra persona.'],
  flagsTitle: ['環境開關', 'Environment switches', '環境スイッチ', '환경 스위치', 'Interruptores de entorno'],
  flagsBody: ['下面每個開關在程式裡都要明確設成 true 才會打開，所以預設是關。', 'Each switch below stays off until the program explicitly sets it to true.', '次のスイッチは、プログラムが明示的に true にするまでオフです。', '아래 스위치는 프로그램이 명시적으로 true로 설정하기 전까지 꺼져 있습니다.', 'Cada interruptor sigue apagado hasta que el programa lo pone explícitamente en true.'],
  operatorFlags: ['只在本機或維運使用', 'Local or operator only', 'ローカルまたは運用のみ', '로컬 또는 운영 전용', 'Solo local u operación'],
  attachedFlags: ['相關開關', 'Related switches', '関連スイッチ', '관련 스위치', 'Interruptores relacionados'],
  route: ['路徑', 'Route', '経路', '경로', 'Ruta'],
  pageTitle: ['測試員地圖', 'Tester map', 'テスターマップ', '테스터 지도', 'Mapa de pruebas'],
  about: ['這個功能在做什麼', 'What this does', 'この機能の内容', '이 기능이 하는 일', 'Qué hace'],
  siteModes: ['站點狀態，不是預設關閉的功能開關', 'Site status, not an off-by-default switch', 'サイト状態。初期オフのスイッチではありません', '사이트 상태이며, 기본으로 꺼진 스위치가 아닙니다', 'Estado del sitio, no un interruptor apagado por defecto'],
  noSiteKey: ['這個開關沒有同名欄位在 /api/v1/site。', 'This switch has no field of the same name on /api/v1/site.', 'このスイッチに対応する同名項目は /api/v1/site にありません。', '이 스위치와 같은 이름의 필드는 /api/v1/site 에 없습니다.', 'Este interruptor no tiene un campo del mismo nombre en /api/v1/site.'],
  groupsLabel: ['組別', 'Groups', 'グループ', '그룹', 'Grupos'],
  openFeature: ['打開', 'Open', '開く', '열기', 'Abrir'],
} as const satisfies Record<string, TesterText>;

export type TesterCopyKey = keyof typeof testerCopy;

export function testerLine(language: TesterLanguage, text: TesterText) {
  return text[TESTER_LANGUAGES.indexOf(language)];
}

export function testerText(language: TesterLanguage, key: TesterCopyKey, values: Record<string, string | number> = {}) {
  return testerLine(language, testerCopy[key]).replace(/\{([a-zA-Z]+)\}/g, (match, name: string) => Object.hasOwn(values, name) ? String(values[name]) : match);
}
