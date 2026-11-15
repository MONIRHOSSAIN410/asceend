import { PageView } from '../types';

export const viewToHash = (view: PageView): string => {
  switch (view.type) {
    case 'home':
      return '#home';
    case 'about':
      return '#about';
    case 'leader':
      return `#leader-${view.leaderId}`;
    case 'investor':
      return '#investor';
    case 'accreditations':
      return '#accreditations';
    case 'division':
      return `#division-${view.divisionId}`;
    case 'project':
      return `#project-${view.projectId}`;
    case 'media':
      return `#media-${view.tab}`;
    case 'sustainability':
      return `#sustainability-${view.tab}`;
    case 'contact':
      return '#contact';
    default:
      return '#home';
  }
};

export const hashToView = (hash: string): PageView | null => {
  const clean = hash.replace(/^#\/?/, '').trim();
  if (!clean || clean === 'home') return { type: 'home' };
  if (clean === 'about') return { type: 'about' };
  if (clean.startsWith('leader-')) {
    const leaderId = clean.replace('leader-', '');
    return { type: 'leader', leaderId };
  }
  if (clean === 'investor') return { type: 'investor' };
  if (clean === 'accreditations') return { type: 'accreditations' };
  if (clean.startsWith('division-')) {
    const divisionId = clean.replace('division-', '');
    return { type: 'division', divisionId };
  }
  if (clean.startsWith('project-')) {
    const projectId = clean.replace('project-', '');
    return { type: 'project', projectId };
  }
  if (clean.startsWith('media-')) {
    const tab = clean.replace('media-', '') as 'news' | 'photos' | 'videos';
    return { type: 'media', tab: ['news', 'photos', 'videos'].includes(tab) ? tab : 'news' };
  }
  if (clean.startsWith('sustainability-')) {
    const tab = clean.replace('sustainability-', '') as 'environment' | 'csr';
    return { type: 'sustainability', tab: ['environment', 'csr'].includes(tab) ? tab : 'environment' };
  }
  if (clean === 'contact') return { type: 'contact' };
  return null;
};
