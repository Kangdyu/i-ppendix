import { MOCKUP_COURSES } from './mockup/courses';
import { MOCKUP_NOTICES } from './mockup/notices';
import { MOCKUP_TODOS } from './mockup/todos';
import { getNotice } from './getNotice';
import { getTodo } from './getTodo';
import { getCourseList } from './getCourse';
import { getCourse } from './getCourse';

function mockupListener(msg, sendResponse) {
  if (msg.type === 'courses') {
    sendResponse(MOCKUP_COURSES);
  } else if (msg.type === 'todos') {
    const todosData = MOCKUP_TODOS[msg.courseId];
    let response;
    if (todosData === undefined) {
      response = { data: 'unknown' };
    } else {
      response = todosData;
    }
    sendResponse(response);
  } else if (msg.type === 'notices') {
    const noticesData = MOCKUP_NOTICES[msg.courseId];
    let response;
    if (noticesData === undefined) {
      response = { data: 'unknown' };
    } else {
      response = noticesData;
    }
    sendResponse(response);
  }
}

async function messageListener(msg, sender, sendResponse) {
  if (msg.mockup === true) {
    mockupListener(msg, sendResponse);
  } else {
    if (msg.type === 'courses') {
      const courses = await getCourseList();
      let response;
      if (courses === undefined) {
        response = { data: 'unknown' };
      } else {
        response = courses;
      }
      sendResponse(response);
    } else if (msg.type === 'course') {
      const courseData = await getCourse(msg.courseId);
      let response;
      if (courseData === undefined) {
        response = { data: 'unknown' };
      } else {
        response = courseData;
      }
      sendResponse(response);
    } else if (msg.type === 'todos') {
      const todosData = await getTodo(msg.courseId);
      let response;
      if (todosData === undefined) {
        response = { data: 'unknown' };
      } else {
        response = todosData;
      }
      sendResponse(response);
    } else if (msg.type === 'notices') {
      let response;
      let noticeData;
      getNotice(msg.courseId).then(res => (noticeData = res));
      if (noticeData === undefined) {
        response = { data: 'unknown' };
      } else {
        response = noticeData;
      }
      sendResponse(response);
    }
  }

  // for async behavior
  return true;
}

chrome.runtime.onMessage.addListener(messageListener);
