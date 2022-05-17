export function todoAPI(courseID) {
  let userID = getuserID(courseID);
  console.log(userID);

  let authToken = getcookie();
  console.log(authToken);
}

async function getuserID(courseID) {
  let basicurl = 'https://canvas.skku.edu/api/v1/courses/' + courseID;
  const response = await fetch(basicurl, {
    headers: { Accept: 'application/json' },
  });
  const responseJson = await response.json();

  let userID = responseJson['enrollments'][0]['user_id'];

  return userID;
}

async function getcookie() {
  const cookies = await chrome.cookies.getAll({ domain: 'canvas.skku.edu' });
  console.log(cookies);
  let token;
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].name === 'xn_api_token') {
      token = cookies[i].value;
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
