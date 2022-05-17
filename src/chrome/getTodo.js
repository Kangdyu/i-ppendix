export async function getTodo(courseID) {
  let userID;
  await getUserID(courseID).then(appdata => {
    userID = appdata;
  });
  console.log(userID);

  let authToken;
  await getCookie('xn_api_token').then(appdata => {
    authToken = appdata;
  });
  console.log(authToken);

  //implement with userID, authToken
}

async function getUserID(courseID) {
  let basicurl = 'https://canvas.skku.edu/api/v1/courses/' + courseID;
  const response = await fetch(basicurl, {
    headers: { Accept: 'application/json' },
  });
  const responseJson = await response.json();

  let userID = responseJson['enrollments'][0]['user_id'];

  return userID;
}

async function getCookie(token_name) {
  const cookies = await chrome.cookies.getAll({ domain: 'canvas.skku.edu' });

  let token;
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].name === token_name) {
      token = cookies[i].value;
      break;
    }
  }
  return token;
}

/*
const ENDPOINT = 'https://canvas.skku.edu/api/v1/users/self/favorites/courses';

export async function getDataFromICampus() {
  const response = await fetch(ENDPOINT, {
    headers: { Accept: 'application/json' },
  });
  const responseJson = await response.json();

  console.log(responseJson);
  return responseJson;
}
*/
