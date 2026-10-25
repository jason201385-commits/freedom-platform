export const TESTER_LANGUAGES = ['zh-Hant', 'en', 'ja', 'ko', 'es'] as const;
export type TesterLanguage = typeof TESTER_LANGUAGES[number];
export type TesterText = readonly [string, string, string, string, string];
export type TesterGroup = 'A' | 'B' | 'C' | 'D' | 'E';
export type TesterAreaId = 'welcome' | 'daily' | 'people' | 'advanced' | 'restricted';
export type CoverageStatus = 'untested' | 'testing' | 'tested' | 'issue';
export type TesterPermission = 'public' | 'member' | 'guild' | 'admin' | 'business';

export const COVERAGE_STATUSES = ['untested', 'testing', 'tested', 'issue'] as const satisfies readonly CoverageStatus[];
export const TESTER_GROUPS = ['A', 'B', 'C', 'D', 'E'] as const satisfies readonly TesterGroup[];
export const TESTER_AREAS = ['welcome', 'daily', 'people', 'advanced', 'restricted'] as const satisfies readonly TesterAreaId[];

export const TEST_CAMPAIGN = Object.freeze({
  start: '2026-10-26',
  end: '2026-11-01',
  guildName: '人才與方向公會',
  leaderNickname: '我不是JasonC',
  issuesUrl: 'https://github.com/FreeTWAI/freedom-platform/issues',
  redesignPullRequest: 1015,
  redesignMerge: '53d528fc1c7160c9eab6bfcb6bbd1c356019dfd0',
});

export type FlagAudience = 'product' | 'operator';

export type TesterFlag = {
  env: string;
  siteKey: string | null;
  features: readonly string[];
  label: TesterText;
  audience: FlagAudience;
};

export type FeatureSeed = {
  id: string;
  area: TesterAreaId;
  groups: readonly TesterGroup[];
  permission: TesterPermission;
  defaultOff: boolean;
  priority: boolean;
  href: string | null;
  title: TesterText | null;
  where: TesterText | null;
  extra?: { sources: readonly string[] };
};
