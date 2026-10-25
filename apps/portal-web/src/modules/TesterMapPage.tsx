import { useEffect, useMemo, useState } from 'react';
import { areaBodyKey, areaCopyKey, SITE_MODES, testerLine, testerMap, testerText, TESTER_GROUPS, type TesterAreaId, type TesterFeature, type TesterGroup, type TesterLanguage } from '../../../../modules/tester-map/index';
import { interfaceMessages, type InterfaceMessage } from '../interface-messages';
import { LanguagePicker, useLanguage } from '../language';
import { PageTools } from '../PageTools';
import './TesterMap.css';

const hasMessage = (key: string): key is InterfaceMessage => Object.hasOwn(interfaceMessages, key);

function featureLabel(feature: TesterFeature, language: TesterLanguage, t: (key: InterfaceMessage) => string) {
  if (feature.title) return testerLine(language, feature.title);
  const key = `nav.${feature.id}`;
  return hasMessage(key) ? t(key) : feature.id;
}

export function TesterMapPage() {
  const map = useMemo(() => testerMap(), []);
  const { language, t } = useLanguage();
  const lang = language as TesterLanguage;
  const [group, setGroup] = useState<TesterGroup | 'all'>('all');
  const [priorityOnly, setPriorityOnly] = useState(false);
  const [offOnly, setOffOnly] = useState(false);
  const [query, setQuery] = useState('');
  useEffect(() => { document.title = `${testerText(lang, 'pageTitle')} — 自由工坊`; }, [lang]);
  const needle = query.trim().toLocaleLowerCase();
  const shown = map.features.filter(feature => {
    if (group !== 'all' && !feature.groups.includes(group)) return false;
    if (priorityOnly && !feature.priority) return false;
    if (offOnly && !feature.defaultOff) return false;
    if (!needle) return true;
    const flags = feature.flags.map(item => `${item.env} ${item.siteKey ?? ''} ${testerLine(lang, item.label)}`).join(' ');
    return `${featureLabel(feature, lang, t)} ${feature.href ?? ''} ${feature.id} ${feature.purpose ?? ''} ${flags}`.toLocaleLowerCase().includes(needle);
  });
  const text = (key: Parameters<typeof testerText>[1], values?: Record<string, string | number>) => testerText(lang, key, values);
  return <main className="tester-map stack">
    <header className="tester-map-top">
      <a className="btn btn-ghost btn-small" href="/">{text('backHome')}</a>
      <LanguagePicker />
      <PageTools pageId="tester-map" compact />
    </header>
    <div>
      <h1>{text('pageTitle')}</h1>
      <p>{text('lede')}</p>
      <p>{text('window', { start: map.campaign.start, end: map.campaign.end })}</p>
    </div>
    <section className="card stack" aria-labelledby="tester-map-join">
      <h2 id="tester-map-join">{text('joinTitle')}</h2>
      <p>{text('joinBody', { guild: map.campaign.guildName, nickname: map.campaign.leaderNickname })}</p>
    </section>
    <section className="card stack" aria-labelledby="tester-map-report">
      <h2 id="tester-map-report">{text('reportTitle')}</h2>
      <p>{text('reportBody')}</p>
      <p>{text('reportPrivacy')}</p>
      <p>{text('reportClosed')}</p>
      <p><a className="btn btn-ghost btn-small" href={map.campaign.issuesUrl} target="_blank" rel="noopener noreferrer">{text('issuesLink')} <span aria-hidden="true">↗</span></a></p>
    </section>
    <section className="card stack">
      <p>{text('redesignNote', { pr: map.campaign.redesignPullRequest })}</p>
      <p>{text('flagNote')}</p>
      <p>{text('noTransaction')}</p>
      <p>{text('coverageNote')}</p>
      <p className="tester-map-meta">{text('coverageFile')}</p>
    </section>
    <div className="tester-map-filters">
      <button type="button" className="btn btn-ghost btn-small" aria-pressed={group === 'all'} onClick={() => setGroup('all')}>{text('filterAll')}</button>
      {TESTER_GROUPS.map(id => <button key={id} type="button" className="btn btn-ghost btn-small" aria-pressed={group === id} onClick={() => setGroup(id)}>{text(`group${id}`)}</button>)}
      <button type="button" className="btn btn-ghost btn-small" aria-pressed={priorityOnly} onClick={() => setPriorityOnly(value => !value)}>{text('filterPriority')}</button>
      <button type="button" className="btn btn-ghost btn-small" aria-pressed={offOnly} onClick={() => setOffOnly(value => !value)}>{text('filterOff')}</button>
      <label className="field tester-map-search">{text('searchLabel')}<input type="search" value={query} maxLength={80} placeholder={text('searchPlaceholder')} onChange={event => setQuery(event.target.value)} /></label>
    </div>
    <p role="status">{text('count', { shown: shown.length, total: map.features.length })}</p>
    {shown.length === 0 && <p className="card">{text('empty')}</p>}
    {map.areas.map(area => <Area key={area} area={area} features={shown.filter(feature => feature.area === area)} language={lang} labelFor={feature => featureLabel(feature, lang, t)} />)}
    <details className="card stack">
      <summary>{text('flagsTitle')}</summary>
      <p>{text('flagsBody')}</p>
      <ul className="tester-map-flags">{map.flags.map(item => <li key={item.env}><code>{item.env}</code> {testerLine(lang, item.label)}{item.audience === 'operator' ? ` · ${text('operatorFlags')}` : ''}{item.siteKey ? ` · ${item.siteKey}` : ` · ${text('noSiteKey')}`}</li>)}</ul>
      <h2>{text('siteModes')}</h2>
      <ul className="tester-map-flags">{SITE_MODES.map(item => <li key={item.key}><code>{item.key}</code> {testerLine(lang, item.label)}</li>)}</ul>
    </details>
  </main>;
}

function Area({ area, features, language, labelFor }: { area: TesterAreaId; features: readonly TesterFeature[]; language: TesterLanguage; labelFor: (feature: TesterFeature) => string }) {
  if (!features.length) return null;
  return <section className="stack" aria-labelledby={`tester-area-${area}`}>
    <header><h2 id={`tester-area-${area}`}>{testerText(language, areaCopyKey(area))}</h2><p>{testerText(language, areaBodyKey(area))}</p></header>
    {features.map(feature => <article className="card stack tester-map-feature" key={feature.id}>
      <header>
        <h3>{labelFor(feature)}</h3>
        <span className={`badge${feature.coverage === 'issue' ? ' tester-map-issue' : ''}`}>{testerText(language, `status_${feature.coverage}`)}</span>
        {feature.priority && <span className="badge">{testerText(language, 'badgePriority')}</span>}
        {feature.defaultOff && <span className="badge tester-map-off">{testerText(language, 'badgeOff')}</span>}
        <span className="badge">{testerText(language, `permission_${feature.permission}`)}</span>
      </header>
      <p className="tester-map-meta">{testerText(language, 'groupsLabel')}：{feature.groups.map(id => testerText(language, `group${id}`)).join('、')}</p>
      {feature.href && <p>{testerText(language, 'route')} <a href={feature.href}>{feature.href}</a></p>}
      {feature.where && <p>{testerLine(language, feature.where)}</p>}
      {feature.purpose && <details><summary>{testerText(language, 'about')}</summary><p lang="zh-Hant">{feature.purpose}</p></details>}
      {feature.flags.length > 0 && <details><summary>{testerText(language, 'attachedFlags')}</summary><ul className="tester-map-flags">{feature.flags.map(item => <li key={item.env}><code>{item.env}</code> {testerLine(language, item.label)}{item.siteKey ? ` · ${item.siteKey}` : ''}</li>)}</ul></details>}
    </article>)}
  </section>;
}
