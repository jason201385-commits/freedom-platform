import { developmentPages } from '../development/pages.js';
import type { TesterCopyKey } from './copy.js';
import { FEATURE_SEEDS } from './features.js';
import { TESTER_FLAGS } from './flags.js';
import coverageFile from './coverage.json';
import { COVERAGE_STATUSES, TEST_CAMPAIGN, TESTER_AREAS, TESTER_GROUPS, type CoverageStatus, type FeatureSeed, type TesterAreaId, type TesterFlag, type TesterPermission, type TesterText } from './types.js';

export type TesterFeature = {
  id: string;
  area: TesterAreaId;
  groups: FeatureSeed['groups'];
  permission: TesterPermission;
  defaultOff: boolean;
  priority: boolean;
  href: string | null;
  title: TesterText | null;
  where: TesterText | null;
  purpose: string | null;
  sources: readonly string[];
  coverage: CoverageStatus;
  extra: boolean;
  flags: readonly TesterFlag[];
};

export type TesterMap = {
  campaign: typeof TEST_CAMPAIGN;
  areas: readonly TesterAreaId[];
  features: readonly TesterFeature[];
  flags: readonly TesterFlag[];
};

type PageRef = { id: string; title: string; purpose: string; source_paths: readonly string[] };
type CoverageFile = { format?: unknown; features?: unknown };

const fail = (message: string): never => { throw new TypeError(message); };

export function assembleTesterMap(pages: readonly PageRef[], seeds: readonly FeatureSeed[], coverage: CoverageFile, flags: readonly TesterFlag[]): TesterMap {
  if (coverage.format !== 'freedom.tester-coverage/v1' || typeof coverage.features !== 'object' || coverage.features === null || Array.isArray(coverage.features)) fail('invalid_coverage');
  const statusById = coverage.features as Record<string, unknown>;
  const seen = new Set<string>();
  const pageById = new Map(pages.map(page => [page.id, page]));
  if (pageById.size !== pages.length) fail('duplicate_feature');
  for (const page of pages) if (!seeds.some(seed => seed.id === page.id)) fail('missing_feature');
  const features: TesterFeature[] = seeds.map(seed => {
    if (seen.has(seed.id)) fail('duplicate_feature');
    seen.add(seed.id);
    const page = pageById.get(seed.id);
    if (!page && !seed.extra) fail('unknown_feature');
    if (seed.extra && (page || seed.extra.sources.length === 0)) fail('invalid_feature');
    if (seed.title && seed.title.some(line => line.trim() === '')) fail('invalid_feature');
    if (page && seed.title && seed.title[0] !== page.title) fail('invalid_feature');
    if (!seed.groups.length || new Set(seed.groups).size !== seed.groups.length || seed.groups.some(group => !TESTER_GROUPS.includes(group))) fail('invalid_feature');
    if (!TESTER_AREAS.includes(seed.area)) fail('invalid_feature');
    if (seed.href !== null && !seed.href.startsWith('/')) fail('invalid_feature');
    if (seed.href === null && seed.where === null) fail('invalid_feature');
    const status = statusById[seed.id];
    if (!Object.hasOwn(statusById, seed.id)) fail('missing_coverage');
    if (typeof status !== 'string' || !(COVERAGE_STATUSES as readonly string[]).includes(status)) fail('invalid_coverage');
    const related = flags.filter(item => item.features.includes(seed.id));
    if (seed.defaultOff && related.length === 0) fail('missing_default_off_flag');
    return Object.freeze({
      id: seed.id, area: seed.area, groups: seed.groups, permission: seed.permission, defaultOff: seed.defaultOff, priority: seed.priority,
      href: seed.href, title: seed.title, where: seed.where, purpose: page?.purpose ?? null,
      sources: page ? page.source_paths : seed.extra!.sources, coverage: status as CoverageStatus, extra: !page, flags: Object.freeze(related),
    });
  });
  for (const id of Object.keys(statusById)) if (!seen.has(id)) fail('unknown_coverage');
  const known = new Set(features.map(feature => feature.id));
  for (const item of flags) {
    if (!item.env.startsWith('FREEDOM_') || !item.env.endsWith('_ENABLED')) fail('invalid_flag');
    if (item.label.some(line => line.trim() === '')) fail('invalid_flag');
    for (const id of item.features) if (!known.has(id)) fail('unknown_flag_feature');
  }
  return Object.freeze({ campaign: TEST_CAMPAIGN, areas: TESTER_AREAS, features: Object.freeze(features), flags: Object.freeze([...flags]) });
}

export function testerMap(): TesterMap {
  return assembleTesterMap(developmentPages, FEATURE_SEEDS, coverageFile, TESTER_FLAGS);
}

export function areaCopyKey(area: TesterAreaId): TesterCopyKey {
  return `area_${area}`;
}

export function areaBodyKey(area: TesterAreaId): TesterCopyKey {
  return `area_${area}_body`;
}
