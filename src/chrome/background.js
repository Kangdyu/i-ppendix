import { MOCKUP_COURSES } from './mockup/courses';
import { MOCKUP_NOTICES } from './mockup/notices';
import { MOCKUP_TODOS } from './mockup/todos';
import { getNotice } from './getNotice';
import { getTodo } from './getTodo';
import { getCourseList } from './getCourse';
import { getCourse } from './getCourse';
import { getCookie } from './getCookie';

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: 'index.html',
  });
});

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

function wrapData(data) {
  return {
    data: data || 'error',
  };
}

function messageListener(msg, sender, sendResponse) {
  if (msg.mockup === true) {
    mockupListener(msg, sendResponse);
  } else {
    getCookie('xn_api_token').then(token => {
      if (token === 'unknown') {
        sendResponse(wrapData(null));
      } else {
        if (msg.type === 'courses') {
          getCourseList().then(data => sendResponse(wrapData(data)));
        } else if (msg.type === 'course') {
          getCourse(msg.courseId).then(data => sendResponse(wrapData(data)));
        } else if (msg.type === 'todos') {
          const authToken = 'Bearer ' + token;
          getTodo(msg.courseId, authToken).then(data =>
            sendResponse(wrapData(data)),
          );
        } else if (msg.type === 'notices') {
          getNotice(msg.courseId).then(data => sendResponse(wrapData(data)));
        }
      }
    });
  }

  // for async behavior
  return true;
}

chrome.runtime.onMessage.addListener(messageListener);
