import rss from '@astrojs/rss';
import { getNews, slugOf } from '../../../lib/content';
import { newsPath } from '../../../i18n';

export async function GET(context) {
  const items = await getNews('fr');
  return rss({
    title: 'Bantu e.V. : Actualités',
    description: 'Actualités et événements de Bantu e.V., Berlin',
    site: context.site,
    items: items.map((n) => ({
      title: n.data.title,
      pubDate: n.data.date,
      description: n.data.summary,
      link: newsPath('fr', slugOf(n.id)),
    })),
  });
}
