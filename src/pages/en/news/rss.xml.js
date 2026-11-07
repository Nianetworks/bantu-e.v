import rss from '@astrojs/rss';
import { getNews, slugOf } from '../../../lib/content';
import { newsPath } from '../../../i18n';

export async function GET(context) {
  const items = await getNews('en');
  return rss({
    title: 'Bantu e.V. – News',
    description: 'News and events from Bantu e.V., Berlin',
    site: context.site,
    items: items.map((n) => ({
      title: n.data.title,
      pubDate: n.data.date,
      description: n.data.summary,
      link: newsPath('en', slugOf(n.id)),
    })),
  });
}
