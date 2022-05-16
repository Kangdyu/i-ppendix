export function todoAPI(courseID) {
  let userID = getuserID(courseID);
  console.log(userID);

  let cookie = getcookie('xn_api_token');
  console.log(cookie);
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

function getcookie(token_name) {
  let value;
  if (typeof window !== 'undefined') {
    console.log('not undefined..');
    value = window.document.cookie.match(
      '(^|;) ?' + token_name + '=([^;]*)(;|$)',
    );
  } else {
    console.log('undefined..');
  }
  return value ? value[2] : null;
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
