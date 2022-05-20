export async function getCourseList() {
  let courses = [];
  const ENDPOINT =
    'https://canvas.skku.edu/api/v1/users/self/favorites/courses';
  const response = await fetch(ENDPOINT, {
    headers: { Accept: 'application/json' },
  });
  const responseJson = await response.json();
  for (let key in Object.keys(responseJson)) {
    let data = responseJson[key];
    let courseData = {};
    courseData.id = Number(data.id);
    courseData.name = data.name.split('_')[0];
    let str = data.course_code;
    let courseCode = str.slice(str.indexOf('_') + 1, str.indexOf('('));
    let professorName = str.slice(str.indexOf('(') + 1, str.indexOf(')'));
    courseData.courseCode = courseCode;
    courseData.professorName = professorName;
    courses.push(courseData);
  }
  chrome.storage.local.set({ data: courses }, () => {
    console.log(courses);
    console.log('saved to chrome');
  });
  return courses;
}

export async function getCourse(courseId) {
  let courseList;
  chrome.storage.local.get(['data'], res => {
    courseList = res;
  });
  if (!courseList) {
    courseList = await getCourseList();
  }
  let course = courseList.find(courseData => courseData.id === courseId);
  return course;
}
