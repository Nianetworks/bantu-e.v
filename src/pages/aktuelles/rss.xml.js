import rss from '@astrojs/rss';
import { getNews, slugOf } from '../../lib/content';
import { newsPath } from '../../i18n';

export async function GET(context) {
  const items = await getNews('de');
  return rss({
    title: 'Bantu e.V.: Aktuelles',
    description: 'Neuigkeiten und Veranstaltungen von Bantu e.V., Berlin',
    site: context.site,
    items: items.map((n) => ({
      title: n.data.title,
      pubDate: n.data.date,
      description: n.data.summary,
      link: newsPath('de', slugOf(n.id)),
    })),
  });
}
