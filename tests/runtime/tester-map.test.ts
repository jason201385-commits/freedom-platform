import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { developmentPages } from '../../modules/development/pages.js';
import { FEATURE_SEEDS, SITE_MODES, TESTER_FLAGS, TEST_CAMPAIGN, assembleTesterMap, testerCopy, testerMap, type FeatureSeed } from '../../modules/tester-map/index.js';
import { interfaceMessages } from '../../apps/portal-web/src/interface-messages.js';
import { workspaceNav } from '../../apps/portal-web/src/Navigation.js';

const FLAG_SOURCES = [
  'apps/platform-api/src/server.ts',
  'apps/platform-api/src/worker.ts',
  'apps/platform-api/src/worker-private-ai.ts',
  'modules/agent-commerce/operations/runtime-settings.ts',
];
const PRIORITY = ['home', 'guilds', 'skills', 'skillbooks', 'social', 'messages', 'chat-stickers', 'notifications', 'profile', 'appearance', 'community-search', 'my-content', 'registration', 'journal'];
const REDESIGN_EVIDENCE: Record<string, string[]> = {
  home: ['MemberHome.tsx'], guilds: ['GuildCard.tsx'], skills: ['SkillsPanel.tsx'], skillbooks: ['SkillBookIntro.tsx'],
  social: ['SocialZone.tsx'], messages: ['MemberMessages.tsx'], 'chat-stickers': ['ChatContent.tsx'], notifications: ['NotificationBell.tsx'],
  profile: ['PersonalSpace.tsx'], appearance: ['SettingsMenu.tsx'], 'community-search': ['CommunitySearch.tsx'], 'my-content': ['MyContent.tsx'],
  registration: ['EntryResources.tsx'], journal: ['journal/App.tsx'],
};

const envNames = [...new Set(FLAG_SOURCES.flatMap(path => readFileSync(path, 'utf8').match(/FREEDOM_[A-Z0-9_]+_ENABLED/g) ?? []))];
const siteLine = readFileSync('apps/platform-api/src/platform-app.ts', 'utf8').split('\n').find(line => line.includes("'/api/v1/site'")) ?? '';
const siteKeys = [...siteLine.matchAll(/\b([a-z][a-z0-9_]*_enabled)\b/g)].map(match => match[1]);

test('tester map classifies every development page, navigation tab and environment switch', () => {
  const map = testerMap();
  const ids = map.features.map(feature => feature.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(ids.filter(id => !developmentPages.some(page => page.id === id)).sort(), ['appearance', 'chat-stickers', 'journal', 'notifications', 'play']);
  for (const page of developmentPages) assert.ok(ids.includes(page.id), page.id);
  for (const id of [workspaceNav.primary, ...workspaceNav.groups.map(group => group.pages)].flat()) assert.ok(ids.includes(id), id);
  for (const feature of map.features) {
    assert.ok(feature.groups.length > 0, feature.id);
    if (feature.area === 'advanced' || feature.area === 'restricted') assert.deepEqual([...feature.groups], ['E'], feature.id);
    if (feature.title === null) assert.ok(Object.hasOwn(interfaceMessages, `nav.${feature.id}`), feature.id);
    else feature.title.forEach(line => assert.ok(line.trim(), feature.id));
    for (const path of feature.sources) assert.ok(existsSync(path), `${feature.id} ${path}`);
    if (feature.extra) assert.ok(feature.sources.length > 0, feature.id);
  }
  assert.equal(map.features.find(feature => feature.id === 'admin')?.permission, 'admin');
  assert.equal(map.features.find(feature => feature.id === 'guild-workspace')?.permission, 'guild');
  for (const id of ['ar', 'community-search', 'my-content', 'private-ai', 'supplier-console', 'business']) assert.equal(map.features.find(feature => feature.id === id)?.defaultOff, true, id);
  assert.equal(map.features.find(feature => feature.id === 'stores')?.defaultOff, false);
  for (const id of PRIORITY) assert.equal(map.features.find(feature => feature.id === id)?.priority, true, id);
  assert.equal(map.features.find(feature => feature.id === 'community')?.priority, false);
  assert.deepEqual(envNames.sort(), TESTER_FLAGS.map(item => item.env).sort());
  for (const item of TESTER_FLAGS) if (item.siteKey) assert.ok(siteKeys.includes(item.siteKey), item.env);
  for (const key of siteKeys) assert.ok(TESTER_FLAGS.some(item => item.siteKey === key) || SITE_MODES.some(item => item.key === key), key);
  assert.equal(map.features.every(feature => feature.coverage === 'untested'), true);
  assert.equal(map.campaign.leaderNickname, '我不是JasonC');
  assert.equal(map.campaign.issuesUrl, 'https://github.com/FreeTWAI/freedom-platform/issues');
});

test('tester map copy stays in five languages and does not add personal names', () => {
  const bundle = JSON.stringify([testerCopy, FEATURE_SEEDS, TESTER_FLAGS, SITE_MODES, TEST_CAMPAIGN]);
  for (const lines of Object.values(testerCopy)) {
    assert.equal(lines.length, 5);
    for (const line of lines) assert.ok(line.trim());
  }
  const visible = bundle.replaceAll(TEST_CAMPAIGN.leaderNickname, '');
  assert.doesNotMatch(visible, /Jason|Chiou|chuanen|gmail|@/);
  assert.match(testerCopy.noTransaction[0], /不要建立真實交易/);
  assert.match(testerCopy.reportClosed[0], /提出想法/);
});

test('redesign priority follows the merged page files when that commit is present', () => {
  let files: string[] = [];
  try { files = execFileSync('git', ['diff', '--name-only', `${TEST_CAMPAIGN.redesignMerge}^1`, TEST_CAMPAIGN.redesignMerge], { encoding: 'utf8' }).split('\n').filter(Boolean); }
  catch { files = []; }
  if (!files.length) return;
  for (const [id, needles] of Object.entries(REDESIGN_EVIDENCE)) assert.ok(needles.some(needle => files.some(file => file.includes(needle))), id);
});

test('tester map rejects a drifted inventory or coverage file', () => {
  const pages = developmentPages.map(page => ({ id: page.id, title: page.title, purpose: page.purpose, source_paths: page.source_paths }));
  const coverage = { format: 'freedom.tester-coverage/v1', features: Object.fromEntries(FEATURE_SEEDS.map(seed => [seed.id, 'untested'])) };
  assert.equal(assembleTesterMap(pages, FEATURE_SEEDS, coverage, TESTER_FLAGS).features.length, FEATURE_SEEDS.length);
  assert.throws(() => assembleTesterMap(pages.slice(1), FEATURE_SEEDS, coverage, TESTER_FLAGS), { message: 'unknown_feature' });
  assert.throws(() => assembleTesterMap([...pages, pages[0]], FEATURE_SEEDS, coverage, TESTER_FLAGS), { message: 'duplicate_feature' });
  const missingPage = pages.filter(page => page.id !== 'home');
  assert.throws(() => assembleTesterMap(missingPage, FEATURE_SEEDS.filter(seed => seed.id !== 'home'), coverage, TESTER_FLAGS), { message: 'unknown_coverage' });
  const orphan: FeatureSeed = { ...FEATURE_SEEDS[0], id: 'not-a-page', extra: undefined };
  assert.throws(() => assembleTesterMap(pages, [...FEATURE_SEEDS, orphan], { ...coverage, features: { ...coverage.features, 'not-a-page': 'untested' } }, TESTER_FLAGS), { message: 'unknown_feature' });
  assert.throws(() => assembleTesterMap(pages, FEATURE_SEEDS, { ...coverage, features: { ...coverage.features, home: 'done' } }, TESTER_FLAGS), { message: 'invalid_coverage' });
  const { home: _ignored, ...withoutHome } = coverage.features;
  assert.throws(() => assembleTesterMap(pages, FEATURE_SEEDS, { ...coverage, features: withoutHome }, TESTER_FLAGS), { message: 'missing_coverage' });
  assert.throws(() => assembleTesterMap(pages, FEATURE_SEEDS, coverage, [...TESTER_FLAGS, { ...TESTER_FLAGS[0], env: 'FREEDOM_ABSENT_ENABLED', features: ['missing'] }]), { message: 'unknown_flag_feature' });
});

test('the public route is linked from the shell without entering the community link list', () => {
  assert.match(readFileSync('apps/portal-web/src/App.tsx', 'utf8'), /\/tester-map/);
  assert.match(readFileSync('apps/portal-web/src/Navigation.tsx', 'utf8'), /href="\/tester-map"/);
  const community = readFileSync('apps/portal-web/src/modules/Community.tsx', 'utf8');
  const links = community.slice(community.indexOf('export const communityLinks'), community.indexOf('export type CatalogBook'));
  assert.equal(links.match(/https:\/\//g)?.length, 4);
  assert.equal(links.includes('/tester-map'), false);
  assert.match(community, /href="\/tester-map"/);
});
