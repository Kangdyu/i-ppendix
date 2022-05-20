import { getCourse } from './getCourse';

export async function getNotice(cid) {
  let notices = [];
  let ENDPOINT =
    'https://canvas.skku.edu/api/v1/courses/' +
    String(cid) +
    '/discussion_topics?only_announcements=true&per_page=40&page=1&filter_by=all&no_avatar_fallback=1&include[]=sections_user_count&include[]=sections';
  const response = await fetch(ENDPOINT, {
    headers: { Accept: 'application/json' },
  });
  const responseJson = await response.json();
  for (let key in Object.keys(responseJson)) {
    let data = responseJson[key];
    let notice = {};
    notice.id = data.id;
    notice.title = data.title;
    notice.postedDate = new Date(data.created_at);
    notice.url = data.url;
    notices.push(notice);
  }
  return notices;
}
