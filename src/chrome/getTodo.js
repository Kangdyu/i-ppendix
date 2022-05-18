export async function getTodo(courseID) {
  const userID = await getUserID(courseID);
  const Token = await getCookie('xn_api_token');
  const authToken = 'Bearer ' + Token;

  if (typeof userID === undefined || typeof authToken === undefined) {
    return 'unknown';
  } else {
    console.log(userID);
    console.log(courseID);
    console.log(authToken);
    _getTodo(courseID, userID, authToken);
  }
}

async function getUserID(courseID) {
  let endpoint = 'https://canvas.skku.edu/api/v1/courses/' + courseID;
  const response = await fetch(endpoint, {
    headers: { Accept: 'application/json' },
  });
  const responseJson = await response.json();

  let userID = responseJson['enrollments'][0]['user_id'];

  return userID;
}

async function getCookie(tokenName) {
  const cookies = await chrome.cookies.getAll({ domain: 'canvas.skku.edu' });

  let token;
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].name === tokenName) {
      token = cookies[i].value;
      break;
    }
  }
  return token;
}

async function _getTodo(courseID, userID, authToken) {
  let endpoint =
    'https://canvas.skku.edu/learningx/api/v1/courses/' +
    courseID +
    '/allcomponents_db?user_id=' +
    userID +
    '&role=1';
  const response = await fetch(endpoint, {
    headers: { Authorization: authToken, Accept: 'application/json' },
  });
  const responseJson = await response.json();
  console.log(responseJson);

  //implement refine responseJson
}
