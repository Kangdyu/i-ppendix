import { MOCKUP_COURSES } from './mockup/courses';
import { MOCKUP_NOTICES } from './mockup/notices';
import { MOCKUP_TODOS } from './mockup/todos';
import { getTodo } from './getTodo';

function mockupListener(msg, sendResponse) {
  if (msg.type === 'courses') {
    sendResponse(MOCKUP_COURSES);
  } else if (msg.type === 'todos') {
    //const todosData = MOCKUP_TODOS[msg.courseId];
    const todosData = getTodo(29484);
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

function messageListener(msg, sender, sendResponse) {
  if (msg.mockup === true) {
    mockupListener(msg, sendResponse);
  } else {
    if (msg.type === 'courses') {
      sendResponse({ data: 'courses' });
    } else if (msg.type === 'todos') {
      sendResponse({ data: `${msg.course} todos` });
    } else if (msg.type === 'notices') {
      sendResponse({ data: `${msg.course} notices` });
    }
  }

  // for async behavior
  return true;
}

chrome.runtime.onMessage.addListener(messageListener);
