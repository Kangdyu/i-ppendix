export async function getTodo(courseID) {
  const courseInfo = await getCourseInfo(courseID);
  const userID = courseInfo[0];
  const courseName = courseInfo[1];
  const Token = await getCookie('xn_api_token');
  const authToken = 'Bearer ' + Token;

  if (typeof userID === undefined || typeof authToken === undefined) {
    return;
  } else {
    const todo = await _getTodo(courseID, courseName, userID, authToken);
    return { data: todo };
  }
}

async function getCourseInfo(courseID) {
  let endpoint = 'https://canvas.skku.edu/api/v1/courses/' + courseID;
  const response = await fetch(endpoint, {
    headers: { Accept: 'application/json' },
  });
  const responseJson = await response.json();

  let userID = responseJson['enrollments'][0]['user_id'];
  let courseName = responseJson['name'];
  return [userID, courseName];
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

async function _getTodo(courseID, courseName, userID, authToken) {
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

  //implement refine responseJson
  const curTime = new Date();

  let videos = [];
  let assignments = [];
  for (let i = 0; i < responseJson.length; i++) {
    // if task is not completed
    if (!responseJson[i]['completed']) {
      //if it has score
      if (
        !(
          responseJson[i]['points_possible'] === null ||
          responseJson[i]['points_possible'] === 0
        )
      ) {
        let dueTime = new Date(responseJson[i]['due_at']);
        //if it is not expired
        if (curTime < dueTime) {
          //if it is course
          if (responseJson[i]['type'] === 'commons') {
            let video = {};
            video.id = responseJson[i]['assignment_id'];
            video.title = responseJson[i]['title'];
            video.time = responseJson[i]['commons_content']['duration'];
            video.courseName = courseName;
            video.due = dueTime;
            video.url = responseJson[i]['view_info']['view_url'];
            videos.push(video);
          }
          //if it is assignment
          else if (responseJson[i]['type'] === 'assignment') {
            let assignment = {};
            assignment.id = responseJson[i]['assignment_id'];
            assignment.title = responseJson[i]['title'];
            assignment.courseName = courseName;
            assignment.due = dueTime;
            assignment.url = responseJson[i]['view_info']['view_url'];
            assignments.push(assignment);
          }
        }
      }
    }
  }

  return { videos: videos, assignments: assignments };
}
