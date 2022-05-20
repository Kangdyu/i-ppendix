export async function getCookie(tokenName) {
  const cookies = await chrome.cookies.getAll({ domain: 'canvas.skku.edu' });

  let token = 'unknown';
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].name === tokenName) {
      token = cookies[i].value;
      break;
    }
  }
  return token;
}
