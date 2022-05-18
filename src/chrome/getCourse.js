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
    courseData.name = data.name;
    let str = data.course_code;
    let courseCode = str.slice(str.indexOf('_') + 1, str.indexOf('('));
    let professorName = str.slice(str.indexOf('(') + 1, str.indexOf(')'));
    if (courseCode.length === 10) {
      courseData.courseCode = courseCode;
    } else {
      courseData.courseCode = null;
    }
    if (professorName.length === 3) {
      courseData.professorName = professorName;
    } else {
      courseData.professorName = null;
    }
    courses.push(courseData);
  }
  return courses;
}

export async function getCourse(courseId) {
  const courseList = await getCourseList();
  let course = courseList.find(courseData => {
    if (courseData.id === courseId) return true;
  });
  return course;
}
