// Simple Interverse search indexer
// Supports searching across sites and MeTube video content

import sites from '../sites';
import { videos as meTubeVideos } from '../sites/metube/videos';

const synonyms = new Map([
  ['yt', 'youtube'],
  ['u tube', 'youtube'],
  ['you tube', 'youtube'],
  ['vid', 'video'],
  ['videos', 'video'],
  ['watch', 'video'],
  ['tube', 'youtube'],
]);

function normalizeQuery(q) {
  if (!q) return '';
  const base = q.trim().toLowerCase();
  return synonyms.get(base) || base;
}

function scoreTextMatch(text, query) {
  if (!text || !query) return 0;
  const t = text.toLowerCase();
  if (t === query) return 5;
  if (t.startsWith(query)) return 4;
  if (t.includes(query)) return 3;
  return 0;
}

function scoreKeywords(keywords = [], query) {
  return Math.max(0, ...keywords.map((k) => scoreTextMatch(k, query)));
}

export function searchInterverse(queryRaw) {
  const query = normalizeQuery(queryRaw);
  if (!query) return [];

  const results = [];

  // Sites
  sites.forEach((site) => {
    const s = Math.max(
      scoreTextMatch(site.name, query),
      scoreTextMatch(site.domain, query),
      scoreTextMatch(site.description, query),
      scoreKeywords(site.keywords, query)
    );
    if (s >= 3) {
      results.push({
        type: 'site',
        siteId: site.id,
        title: site.name,
        subtitle: site.description,
        score: s + 3, // bump sites
        site,
      });
    }
  });

  // MeTube videos
  meTubeVideos.forEach((v) => {
    const s = Math.max(
      scoreTextMatch(v.title, query),
      scoreTextMatch(v.channel, query),
      scoreKeywords(v.tags, query),
      scoreTextMatch(v.category, query)
    );
    if (s >= 3) {
      results.push({
        type: 'video',
        siteId: 'metube',
        id: v.id,
        title: v.title,
        subtitle: `${v.channel} • ${v.views}`,
        score: s,
        video: v,
      });
    }
  });

  results.sort((a, b) => b.score - a.score);
  return results;
}

export default searchInterverse;


