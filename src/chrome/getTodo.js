import { LOCALSTORAGE_KEYS } from '../utils/constants';

export async function getTodo(courseID, authToken) {
  const courseInfo = await getCourseInfo(courseID);
  const userID = courseInfo[0];
  const courseName = courseInfo[1];
  const studentID = await getStudentID(courseID, userID, authToken);

  if (userID === undefined || authToken === undefined) {
    return;
  } else {
    const todo = await _getTodo(
      courseID,
      courseName,
      userID,
      studentID,
      authToken,
    );

    return todo;
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

async function getStudentID(courseID, userID, authToken) {
  let studentID;

  let storaged = await chrome.storage.local.get([LOCALSTORAGE_KEYS.sid]);
  if (Object.keys(storaged).length !== 0) {
    studentID = storaged.sid;
  } else {
    let endpoint =
      'https://canvas.skku.edu/learningx/api/v1/courses/' +
      courseID +
      '/total_learnstatus/users/' +
      userID;
    const response = await fetch(endpoint, {
      headers: { Authorization: authToken, Accept: 'application/json' },
    });
    const responseJson = await response.json();

    studentID = Number(responseJson['item']['user_login']);
    chrome.storage.local.set({ [LOCALSTORAGE_KEYS.sid]: studentID });
  }

  return studentID;
}

async function _getTodo(courseID, courseName, userID, studentID, authToken) {
  let endpoint =
    'https://canvas.skku.edu/learningx/api/v1/courses/' +
    courseID +
    '/allcomponents_db?user_id=' +
    userID +
    '&user_login=' +
    studentID +
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
    if (responseJson[i]['completed'] === false) {
      //if it has score
      if (
        !(
          responseJson[i]['points_possible'] === null ||
          responseJson[i]['points_possible'] === 0
        )
      ) {
        let dueTime = new Date(responseJson[i]['due_at']);
        let unlockTime = new Date(responseJson[i]['unlock_at']);
        //if it is not expired
        if (curTime < dueTime && curTime > unlockTime) {
          //if it is course
          if (responseJson[i]['type'] === 'commons') {
            if (responseJson[i]['use_attendance'] === true) {
              let video = {};
              video.id = responseJson[i]['assignment_id'];
              video.title = responseJson[i]['title'];
              video.time = responseJson[i]['commons_content']['duration'];
              video.courseName = courseName.split('_')[0];
              video.due = dueTime;
              video.url = responseJson[i]['view_info']['view_url'];
              videos.push(video);
            }
          }
          //if it is assignment
          else if (responseJson[i]['type'] === 'assignment') {
            let assignment = {};
            assignment.id = responseJson[i]['assignment_id'];
            assignment.title = responseJson[i]['title'];
            assignment.courseName = courseName.split('_')[0];
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
