import type { FeatureSeed, TesterGroup, TesterPermission, TesterText } from './types.js';

const text = (zh: string, en: string, ja: string, ko: string, es: string): TesterText => [zh, en, ja, ko, es];
const daily = ['A', 'B', 'C', 'D'] as const satisfies readonly TesterGroup[];
const everyone = ['A', 'B', 'C', 'D', 'E'] as const satisfies readonly TesterGroup[];
const newcomers = ['A', 'B'] as const satisfies readonly TesterGroup[];
const veterans = ['C', 'D'] as const satisfies readonly TesterGroup[];
const advanced = ['E'] as const satisfies readonly TesterGroup[];

const tab = (id: string, area: FeatureSeed['area'], groups: readonly TesterGroup[], permission: TesterPermission, options: Partial<Pick<FeatureSeed, 'defaultOff' | 'priority' | 'href' | 'where' | 'title'>> = {}): FeatureSeed => ({
  id, area, groups, permission, defaultOff: options.defaultOff ?? false, priority: options.priority ?? false,
  href: options.href === undefined ? `/#${id}` : options.href, title: options.title ?? null, where: options.where ?? null,
});

export const FEATURE_SEEDS: readonly FeatureSeed[] = [
  tab('tester-map', 'welcome', everyone, 'public', { href: '/tester-map', title: text('測試員地圖', 'Tester map', 'テスターマップ', '테스터 지도', 'Mapa de pruebas') }),
  tab('registration', 'welcome', newcomers, 'public', { href: '/', priority: true, title: text('註冊與登入', 'Registration and sign-in', '登録とログイン', '가입과 로그인', 'Registro e inicio de sesión'), where: text('未登入時的首頁。', 'The home screen before sign-in.', 'ログイン前の最初の画面。', '로그인 전 첫 화면.', 'La primera pantalla antes de entrar.') }),
  tab('onboarding', 'welcome', newcomers, 'member', { href: null, title: text('新人定位', 'Newcomer positioning', '新しいメンバーの方向づけ', '새 회원 방향 잡기', 'Orientación de quien llega'), where: text('登入後若還沒完成定位，會先進入這個流程。完成後可從「我的定位」再調整。', 'After sign-in, an unfinished positioning flow comes first. Later, adjust it from My positioning.', 'ログイン後、方向づけが未完了ならこの流れが先に出ます。完了後は「自分の方向」から調整できます。', '로그인 후 방향 잡기가 끝나지 않았다면 이 흐름이 먼저 나옵니다. 끝나면 「내 방향」에서 조정합니다.', 'Tras entrar, si la orientación no está hecha, este flujo va primero. Después se ajusta en Mi orientación.') }),
  tab('positioning', 'welcome', newcomers, 'member'),
  tab('community', 'welcome', newcomers, 'member'),
  tab('home', 'daily', daily, 'member', { priority: true }),
  tab('guilds', 'daily', daily, 'member', { priority: true }),
  tab('skills', 'daily', daily, 'member', { priority: true }),
  tab('skillbooks', 'daily', daily, 'member', { href: '/#skills', priority: true, title: text('技能書介紹', 'Skill book introduction', 'スキルブックの紹介', '스킬북 소개', 'Introducción del libro de habilidades'), where: text('從技能書架打開一本書的介紹。', 'Open a book’s introduction from the skill shelf.', 'スキル本棚から一冊の紹介を開きます。', '스킬 서가에서 책 소개를 엽니다.', 'Abre la introducción de un libro desde el estante.') }),
  tab('social', 'daily', daily, 'member', { priority: true }),
  tab('messages', 'daily', daily, 'member', { priority: true, where: text('右下角訊息泡泡。', 'The message bubble at the bottom right.', '右下のメッセージ吹き出し。', '오른쪽 아래 메시지 말풍선.', 'La burbuja de mensajes, abajo a la derecha.') }),
  { id: 'chat-stickers', area: 'daily', groups: daily, permission: 'member', defaultOff: false, priority: true, href: '/#messages', title: text('聊天貼圖', 'Chat stickers', 'チャットスタンプ', '채팅 스티커', 'Stickers del chat'), where: text('右下角訊息泡泡裡的貼圖。', 'Stickers inside the message bubble at the bottom right.', '右下のメッセージ吹き出しの中のスタンプ。', '오른쪽 아래 메시지 말풍선 안의 스티커.', 'Stickers dentro de la burbuja de mensajes, abajo a la derecha.'), extra: { sources: ['apps/portal-web/src/modules/ChatContent.tsx'] } },
  { id: 'notifications', area: 'daily', groups: daily, permission: 'member', defaultOff: false, priority: true, href: null, title: text('通知', 'Notifications', '通知', '알림', 'Avisos'), where: text('右上角的通知鈴鐺，沒有獨立網址。', 'The notification bell at the top right. It has no separate address.', '右上の通知ベル。独立したアドレスはありません。', '오른쪽 위 알림 종. 별도의 주소는 없습니다.', 'La campana de avisos, arriba a la derecha. No tiene una dirección propia.'), extra: { sources: ['apps/portal-web/src/modules/NotificationBell.tsx'] } },
  { id: 'appearance', area: 'daily', groups: daily, permission: 'member', defaultOff: false, priority: true, href: null, title: text('外觀', 'Appearance', '外観', '모양', 'Apariencia'), where: text('右上角頭像選單裡的外觀。', 'Appearance, inside the avatar menu at the top right.', '右上のアバターメニューにある外観。', '오른쪽 위 아바타 메뉴의 모양.', 'Apariencia, dentro del menú del avatar, arriba a la derecha.'), extra: { sources: ['apps/portal-web/src/modules/SettingsMenu.tsx'] } },
  { id: 'play', area: 'daily', groups: daily, permission: 'public', defaultOff: false, priority: false, href: '/play', title: text('離譜日常', 'Absurd Daily', 'ありえない日常', '말도 안 되는 일상', 'Día absurdo'), where: text('會員首頁有入口。未登入也可以直接開這個網址。', 'The member home links here. This address also opens without signing in.', '会員ホームに入口があります。ログインせずにこのアドレスも開けます。', '회원 홈에 입구가 있습니다. 로그인하지 않아도 이 주소를 열 수 있습니다.', 'El inicio del miembro enlaza aquí. Esta dirección también abre sin entrar.'), extra: { sources: ['apps/portal-web/src/games/AbsurdDaily.tsx'] } },
  tab('events', 'daily', daily, 'member'),
  tab('profile', 'daily', daily, 'member', { priority: true }),
  tab('account', 'daily', daily, 'member'),
  tab('todos', 'daily', daily, 'member'),
  tab('my-content', 'daily', daily, 'member', { defaultOff: true, priority: true, where: text('主導覽只有開關打開才看得到。', 'The main navigation shows this only when the switch is on.', 'メインの導線はスイッチがオンのときだけ表示します。', '기본 탐색은 스위치가 켜져 있을 때만 보입니다.', 'La navegación principal lo muestra solo con el interruptor activo.') }),
  tab('community-search', 'daily', daily, 'member', { defaultOff: true, priority: true, where: text('主導覽只有開關打開才看得到。未登入時，開關打開才有公開搜尋。', 'The main navigation shows this only when the switch is on. Before sign-in, public search appears only then.', 'メインの導線はスイッチがオンのときだけ表示します。ログイン前の公開検索もそのときだけです。', '기본 탐색은 스위치가 켜져 있을 때만 보입니다. 로그인 전 공개 검색도 그때만 나옵니다.', 'La navegación principal lo muestra solo con el interruptor activo. Antes de entrar, la búsqueda pública aparece solo entonces.') }),
  tab('members', 'people', daily, 'member'),
  tab('friends', 'people', daily, 'member'),
  tab('services', 'people', daily, 'public', { href: '/services', where: text('公開服務頁不必登入。新增自己的服務要先登入，會員入口在 /#services。', 'The public service page needs no sign-in. Adding your own service needs an account; the member entry is /#services.', '公開サービスページはログイン不要。自分のサービス追加はログインが必要で、会員入口は /#services。', '공개 서비스 페이지는 로그인이 필요 없습니다. 내 서비스를 추가하려면 로그인해야 하며, 회원 입구는 /#services 입니다.', 'La página pública de servicios no pide entrar. Añadir el tuyo sí pide cuenta; la entrada de miembro es /#services.') }),
  tab('promotion', 'people', veterans, 'member'),
  tab('highlights', 'people', daily, 'public', { href: '/highlights', where: text('公開回顧不必登入。會員書架在 /#highlights。', 'The public retrospective needs no sign-in. The member shelf is /#highlights.', '公開の振り返りはログイン不要。会員の棚は /#highlights。', '공개 회고는 로그인이 필요 없습니다. 회원 서가는 /#highlights 입니다.', 'La retrospectiva pública no pide entrar. El estante del miembro es /#highlights.') }),
  tab('squads', 'people', veterans, 'member'),
  { id: 'journal', area: 'people', groups: daily, permission: 'public', defaultOff: false, priority: true, href: '/journal', title: text('共創誌', 'Co-creation journal', '共創誌', '공동창작 저널', 'Diario de cocreación'), where: text('公開共創誌，不必登入。', 'The public co-creation journal. No sign-in.', '公開の共創誌。ログイン不要。', '공개 공동창작 저널. 로그인 불필요.', 'Diario público de cocreación. Sin iniciar sesión.'), extra: { sources: ['apps/portal-web/src/journal/App.tsx'] } },
  tab('tasks', 'advanced', advanced, 'member'),
  tab('opensource', 'advanced', advanced, 'member'),
  tab('cocreation', 'advanced', advanced, 'member'),
  tab('workbench', 'advanced', advanced, 'member'),
  tab('showcase', 'advanced', advanced, 'member'),
  tab('engagement', 'advanced', advanced, 'member'),
  tab('marketing', 'advanced', advanced, 'member'),
  tab('private-ai', 'advanced', advanced, 'member', { defaultOff: true, where: text('「創作與合作」裡。模型推論要等開關打開；還沒開不要記成故障。', 'Under Create and collaborate. Model inference waits for its switch. If it is off, that is not a defect.', '「創作と協力」の中。モデル推論はスイッチがオンになるまで待ちます。オフは不具合ではありません。', '「창작과 협업」 안. 모델 추론은 스위치가 켜질 때까지 기다립니다. 꺼져 있는 것은 결함이 아닙니다.', 'En Crear y colaborar. La inferencia espera su interruptor. Si está apagada, no es un defecto.') }),
  tab('ar', 'advanced', advanced, 'member', { defaultOff: true, where: text('「社群參與」裡。相機與發布要等開關打開。', 'Under Get involved. The camera and publishing wait for the switch.', '「コミュニティに参加」の中。カメラと公開はスイッチがオンになるまで待ちます。', '「커뮤니티 참여」 안. 카메라와 게시는 스위치가 켜질 때까지 기다립니다.', 'En Participar. La cámara y la publicación esperan el interruptor.') }),
  tab('supplier', 'advanced', advanced, 'member'),
  tab('retail', 'advanced', advanced, 'member'),
  tab('stores', 'advanced', advanced, 'member', { where: text('商店頁在導覽裡看得到。結帳與多數商品能力仍是預設關閉，不要建立真實交易。', 'The store page is in the navigation. Checkout and most product tools stay off by default. Do not create a real transaction.', 'ショップページは導線にあります。決済と多くの商品機能は初期オフです。実際の取引は作らないでください。', '상점 페이지는 탐색에 있습니다. 결제와 대부분의 상품 기능은 기본적으로 꺼져 있습니다. 실제 거래는 만들지 마세요.', 'La página de la tienda está en la navegación. El pago y la mayoría de herramientas siguen apagados. No crees una transacción real.') }),
  tab('reservations', 'advanced', advanced, 'member'),
  tab('supplier-console', 'advanced', advanced, 'member', { href: '/#stores/supply', defaultOff: true, title: text('供應商營運中心', 'Supplier operations', 'サプライヤー運営', '공급자 운영 센터', 'Centro de operaciones del proveedor'), where: text('供貨區的商品庫。開關關閉時沿用原來的供貨頁。', 'The product library in the supply area. When the switch is off, the original supply page remains.', '供給エリアの商品庫。スイッチがオフのときは元の供給ページのままです。', '공급 구역의 상품 보관함. 스위치가 꺼져 있으면 원래 공급 페이지를 그대로 씁니다.', 'La biblioteca de productos del suministro. Con el interruptor apagado sigue la página de suministro original.') }),
  tab('business', 'advanced', advanced, 'business', { defaultOff: true, where: text('「管理」裡。開店啟動台關閉時不會出現。沒有業務空間資格就略過。', 'Under Manage. Hidden while the launchpad is off. Skip it without membership in that business space.', '「管理」の中。起動台がオフのときは出ません。そのビジネススペースの資格が無ければ飛ばします。', '「관리」 안. 시작대가 꺼져 있으면 나타나지 않습니다. 그 비즈니스 공간의 자격이 없으면 건너뜁니다.', 'En Gestionar. No aparece mientras la plataforma de arranque está apagada. Sáltalo si no perteneces a ese espacio.') }),
  tab('admin', 'restricted', advanced, 'admin', { href: '/admin', title: null, where: text('另開管理台。沒有平台管理員權限就略過，不要向別人要帳號。', 'Opens the admin desk separately. Skip it without platform-admin permission. Do not ask someone else for an account.', '管理画面を別に開きます。プラットフォーム管理者権限が無ければ飛ばし、他人にアカウントを求めないでください。', '관리 화면을 따로 엽니다. 플랫폼 관리자 권한이 없으면 건너뛰고, 다른 사람에게 계정을 요구하지 마세요.', 'Abre la mesa de administración aparte. Sáltala sin permiso de administración. No pidas la cuenta de otra persona.') }),
  tab('guild-workspace', 'restricted', advanced, 'guild', { where: text('導覽「管理」裡。沒有公會管理權限就略過，不要向別人要帳號。', 'Under Manage. Skip it without guild-management permission. Do not ask someone else for an account.', '導線の「管理」の中。ギルド管理権限が無ければ飛ばし、他人にアカウントを求めないでください。', '탐색의 「관리」 안. 길드 관리 권한이 없으면 건너뛰고, 다른 사람에게 계정을 요구하지 마세요.', 'En Gestionar. Sáltalo sin permiso de gestión del gremio. No pidas la cuenta de otra persona.') }),
];
