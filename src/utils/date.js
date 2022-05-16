function getDayString(dayNumber) {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[dayNumber];
}

export function formatDate(dateString) {
  const nDate = new Date(dateString);

  const year = nDate.getFullYear();
  const month = nDate.getMonth() + 1;
  const date = nDate.getDate();
  const day = getDayString(nDate.getDay());
  const hour = nDate.getHours();
  const min = nDate.getMinutes();

  return `${year}.${month}.${date}(${day}) ${hour}:${min}`;
}

export function formatRemainTimeFromNow(dateString) {
  const ms = new Date(dateString) - Date.now();

  const min = parseInt((ms / (1000 * 60)) % 60);
  const hour = parseInt((ms / (1000 * 60 * 60)) % 24);
  const day = parseInt(ms / (1000 * 60 * 60 * 24));

  let result = '';
  if (day > 0) result = `${day}일`;
  else if (hour > 0) result = `${hour}시간`;
  else if (min > 0) result = `${min}분`;

  return result;
}
