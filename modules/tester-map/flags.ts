import type { TesterFlag, TesterText } from './types.js';

const text = (zh: string, en: string, ja: string, ko: string, es: string): TesterText => [zh, en, ja, ko, es];

const flag = (env: string, siteKey: string | null, features: readonly string[], label: TesterText, audience: TesterFlag['audience'] = 'product'): TesterFlag =>
  ({ env, siteKey, features, label, audience });

/** Every switch here stays off until the process sets it to the string true. */
export const TESTER_FLAGS: readonly TesterFlag[] = [
  flag('FREEDOM_AR_ENABLED', 'ar_enabled', ['ar'], text('AR 相機與圖案發布', 'AR camera and marker publishing', 'AR カメラと図案の公開', 'AR 카메라와 도안 게시', 'Cámara AR y publicación de marcadores')),
  flag('FREEDOM_COMMERCE_CHECKOUT_ENABLED', 'commerce_checkout_enabled', ['stores'], text('商店結帳', 'Store checkout', 'ショップの決済', '상점 결제', 'Pago de la tienda')),
  flag('FREEDOM_COMMERCE_CONSOLE_ENABLED', 'commerce_console_enabled', ['stores', 'supplier'], text('商務主控台', 'Commerce console', '商務コンソール', '상거래 콘솔', 'Consola de comercio')),
  flag('FREEDOM_COMMERCE_DROP_SHIP_ENABLED', 'commerce_drop_ship_enabled', ['supplier', 'retail'], text('轉單出貨', 'Drop shipping', '転送出荷', '전달 출고', 'Envío por transferencia')),
  flag('FREEDOM_COMMERCE_EMAIL_ENABLED', null, ['stores'], text('商務電子郵件', 'Commerce email', '商務メール', '상거래 이메일', 'Correo de comercio')),
  flag('FREEDOM_COMMERCE_ORDER_NOTIFICATIONS_ENABLED', null, ['stores', 'messages'], text('訂單通知', 'Order notifications', '注文通知', '주문 알림', 'Avisos de pedidos')),
  flag('FREEDOM_COMMERCE_SELF_SHIP_ENABLED', 'commerce_self_ship_enabled', ['supplier', 'stores'], text('自行出貨', 'Self shipping', '自己で出荷', '직접 출고', 'Envío propio')),
  flag('FREEDOM_COMMUNITY_DISCOVERY_ENABLED', 'community_discovery_enabled', ['members'], text('公開探索入口', 'Public discovery entry', '公開の探索入口', '공개 탐색 입구', 'Entrada de descubrimiento público')),
  flag('FREEDOM_COMMUNITY_RELATIONS_ENABLED', 'community_relations_enabled', ['my-content'], text('書籤與追蹤', 'Bookmarks and follows', 'ブックマークとフォロー', '북마크와 팔로우', 'Marcadores y seguimientos')),
  flag('FREEDOM_COMMUNITY_SEARCH_ENABLED', 'community_search_enabled', ['community-search'], text('搜尋社群內容', 'Search community content', 'コミュニティ内容の検索', '커뮤니티 내용 검색', 'Buscar contenido de la comunidad')),
  flag('FREEDOM_DISTRIBUTION_PHOTOS_ENABLED', 'distribution_photos_enabled', ['retail'], text('通路照片', 'Distribution photos', '流通の写真', '유통 사진', 'Fotos de distribución')),
  flag('FREEDOM_EVENT_BANNER_ENABLED', null, ['events'], text('活動橫幅圖', 'Event banner image', 'イベントのバナー画像', '행사 배너 이미지', 'Imagen de banner del evento')),
  flag('FREEDOM_EVENT_HIGHLIGHT_ENABLED', null, ['highlights'], text('活動集錦媒體', 'Event highlight media', 'イベント記録のメディア', '행사 모음 미디어', 'Medios de los momentos del evento')),
  flag('FREEDOM_EVENT_OUTCOMES_ENABLED', 'event_outcomes_enabled', ['highlights'], text('活動成果', 'Event outcomes', 'イベントの成果', '행사 성과', 'Resultados del evento')),
  flag('FREEDOM_EVENT_PARTICIPATION_ENABLED', 'event_participation_enabled', ['events'], text('活動參與通知', 'Event participation notices', 'イベント参加の通知', '행사 참여 알림', 'Avisos de participación en eventos')),
  flag('FREEDOM_EVENT_VIDEO_ENABLED', null, ['events'], text('活動影片', 'Event video', 'イベント動画', '행사 영상', 'Vídeo del evento')),
  flag('FREEDOM_FIRST_PARTICIPATION_ENABLED', 'first_participation_enabled', ['home', 'my-content'], text('第一次參與', 'First participation', '最初の参加', '첫 참여', 'Primera participación')),
  flag('FREEDOM_GUIDE_FIXTURE_ENABLED', null, [], text('導覽測試素材', 'Guide test fixtures', 'ガイドのテスト素材', '안내 테스트 자료', 'Material de prueba de la guía'), 'operator'),
  flag('FREEDOM_GUILD_LAUNCHPAD_ENABLED', 'guild_launchpad_enabled', ['guilds', 'business', 'stores'], text('公會啟動台', 'Guild launchpad', 'ギルド起動台', '길드 시작대', 'Plataforma de arranque del gremio')),
  flag('FREEDOM_HOSTED_RESERVATIONS_ENABLED', null, ['reservations'], text('建立新的預留', 'Create a new hold', '新しい予約を作る', '새 예약 만들기', 'Crear una nueva reserva')),
  flag('FREEDOM_HOSTED_STORE_PHOTOS_ENABLED', 'hosted_store_photos_enabled', ['stores'], text('商店照片', 'Store photos', 'ショップの写真', '상점 사진', 'Fotos de la tienda')),
  flag('FREEDOM_HOSTED_STORE_PHOTO_UPLOADS_ENABLED', 'hosted_store_photo_uploads_enabled', ['stores'], text('商店照片上傳', 'Store photo uploads', 'ショップ写真のアップロード', '상점 사진 업로드', 'Subida de fotos de la tienda')),
  flag('FREEDOM_MEMBER_BLOCKING_ENABLED', 'member_blocking_enabled', ['members', 'messages'], text('封鎖會員', 'Block a member', 'メンバーのブロック', '회원 차단', 'Bloquear a un miembro')),
  flag('FREEDOM_MEMBER_REPORTING_ENABLED', 'member_reporting_enabled', ['members'], text('站內檢舉', 'In-site reporting', 'サイト内の通報', '사이트 내 신고', 'Denuncia dentro del sitio')),
  flag('FREEDOM_MESSAGE_IMAGE_ENABLED', 'message_images_enabled', ['messages'], text('訊息圖片', 'Message images', 'メッセージ画像', '메시지 이미지', 'Imágenes en mensajes')),
  flag('FREEDOM_NOTIFICATION_PREFERENCES_ENABLED', 'notification_preferences_enabled', ['notifications'], text('通知偏好', 'Notification preferences', '通知の設定', '알림 설정', 'Preferencias de avisos')),
  flag('FREEDOM_PARTICIPATION_METRICS_ENABLED', null, ['tasks'], text('參與計量', 'Participation metrics', '参加の集計', '참여 집계', 'Métricas de participación')),
  flag('FREEDOM_PASSWORD_RESET_EMAIL_ENABLED', 'password_recovery_enabled', ['registration'], text('密碼重設信', 'Password reset email', 'パスワード再設定メール', '비밀번호 재설정 메일', 'Correo para restablecer la contraseña')),
  flag('FREEDOM_PERSONAL_CONTENT_ENABLED', 'personal_content_enabled', ['my-content'], text('我的內容', 'My content', '自分のコンテンツ', '내 콘텐츠', 'Mi contenido')),
  flag('FREEDOM_PRIVATE_AI_ENABLED', null, ['private-ai'], text('私人模型推論', 'Private model inference', '非公開のモデル推論', '비공개 모델 추론', 'Inferencia privada del modelo')),
  flag('FREEDOM_PUBLIC_GUIDE_ENABLED', null, [], text('公開導覽素材', 'Public guide assets', '公開ガイド素材', '공개 안내 자료', 'Material público de la guía')),
  flag('FREEDOM_SERVICE_COVER_ENABLED', null, ['services'], text('服務封面', 'Service cover', 'サービスのカバー', '서비스 표지', 'Portada del servicio')),
  flag('FREEDOM_SHORT_VIDEOS_ENABLED', 'short_videos_enabled', ['social'], text('短片', 'Short videos', '短い動画', '짧은 영상', 'Vídeos cortos')),
  flag('FREEDOM_SKILL_BOOK_STAR_GATE_ENABLED', 'skill_book_star_gate_enabled', ['skills'], text('技能書 Star 門檻', 'Skill book star gate', 'スキルブックの Star 条件', '스킬북 Star 조건', 'Umbral de estrellas del libro')),
  flag('FREEDOM_SKILL_IMAGE_ENABLED', null, ['skills'], text('技能書圖片', 'Skill book image', 'スキルブックの画像', '스킬북 이미지', 'Imagen del libro de habilidades')),
  flag('FREEDOM_SOCIAL_THUMBNAIL_ENABLED', null, ['social'], text('貼文縮圖', 'Post thumbnail', '投稿のサムネイル', '게시물 썸네일', 'Miniatura de la publicación')),
  flag('FREEDOM_SQUAD_OUTCOMES_ENABLED', 'squad_outcomes_enabled', ['squads'], text('小隊成果', 'Squad outcomes', '小隊の成果', '스쿼드 성과', 'Resultados del equipo')),
  flag('FREEDOM_STORE_APPEARANCE_ENABLED', 'store_appearance_enabled', ['stores'], text('商店外觀', 'Store appearance', 'ショップの外観', '상점 모양', 'Apariencia de la tienda')),
  flag('FREEDOM_STORE_CATEGORIES_ENABLED', 'store_categories_enabled', ['stores'], text('商店分類', 'Store categories', 'ショップの分類', '상점 분류', 'Categorías de la tienda')),
  flag('FREEDOM_STORE_GALLERY_ENABLED', 'store_gallery_enabled', ['stores'], text('商店相簿', 'Store gallery', 'ショップのギャラリー', '상점 갤러리', 'Galería de la tienda')),
  flag('FREEDOM_STORE_POLICIES_ENABLED', 'store_policies_enabled', ['stores'], text('商店政策', 'Store policies', 'ショップの方針', '상점 정책', 'Políticas de la tienda')),
  flag('FREEDOM_STORE_VARIANTS_ENABLED', 'store_variants_enabled', ['stores'], text('商品規格', 'Product variants', '商品の規格', '상품 규격', 'Variantes del producto')),
  flag('FREEDOM_SUPPLIER_CONSOLE_ENABLED', 'supplier_console_enabled', ['supplier-console'], text('供應商營運中心', 'Supplier operations', 'サプライヤー運営', '공급자 운영 센터', 'Centro de operaciones del proveedor')),
  flag('FREEDOM_SUPPLY_MATERIAL_MEDIA_ENABLED', 'supply_material_media_enabled', ['supplier-console'], text('供貨素材', 'Supply material media', '供給素材', '공급 자료', 'Material de suministro')),
  flag('FREEDOM_SUPPLY_MATERIAL_UPLOADS_ENABLED', 'supply_material_uploads_enabled', ['supplier-console'], text('供貨素材上傳', 'Supply material uploads', '供給素材のアップロード', '공급 자료 업로드', 'Subida de material de suministro')),
  flag('FREEDOM_SUPPLY_OFFER_PHOTOS_ENABLED', 'supply_offer_photos_enabled', ['supplier-console'], text('供貨報價照片', 'Supply offer photos', '供給オファーの写真', '공급 제안 사진', 'Fotos de la oferta de suministro')),
  flag('FREEDOM_UNIFIED_SHARING_ENABLED', 'unified_sharing_enabled', ['promotion'], text('統一分享', 'Unified sharing', '統一シェア', '통합 공유', 'Compartir unificado')),
];

export const SITE_MODES = [
  { key: 'registration_enabled', label: text('註冊是否開放：本機或已設定註冊社群時才開，不是預設關閉的功能開關。', 'Whether registration is open: on for local or when a registration community is configured. This is not an off-by-default feature switch.', '登録が開いているか：ローカル、または登録コミュニティ設定時のみ。初期オフの機能スイッチではありません。', '가입이 열려 있는지: 로컬이거나 가입 커뮤니티가 설정된 경우에만 켜집니다. 기본으로 꺼진 기능 스위치가 아닙니다.', 'Si el registro está abierto: en local o cuando hay una comunidad de registro. No es un interruptor apagado por defecto.') },
  { key: 'demo_accounts_enabled', label: text('虛構示範帳號：公開環境關閉，其他環境才提供。', 'Fictional demo accounts: off in the public environment, available otherwise.', '架空のデモアカウント：公開環境ではオフ、それ以外では提供。', '가상 데모 계정: 공개 환경에서는 꺼지고, 그 외에는 제공됩니다.', 'Cuentas de demostración ficticias: apagadas en el entorno público y disponibles en los demás.') },
] as const;
