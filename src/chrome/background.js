import { MOCKUP_COURSES } from './mockup';
import { MOCKUP_NOTICES } from './mockup/notices';
import { MOCKUP_TODOS } from './mockup/todos';

function mockupListener(msg, sendResponse) {
  if (msg.type === 'courses') {
    sendResponse(MOCKUP_COURSES);
  } else if (msg.type === 'todos') {
    switch (msg.course) {
      case '오픈소스소프트웨어실습':
        sendResponse(MOCKUP_TODOS.oss);
        break;
      case '모바일앱프로그래밍실습':
        sendResponse(MOCKUP_TODOS.mobile);
        break;
      case '운영체제':
        sendResponse(MOCKUP_TODOS.os);
        break;
      default:
        sendResponse({ data: 'unknown' });
    }
  } else if (msg.type === 'notices') {
    switch (msg.course) {
      case '오픈소스소프트웨어실습':
        sendResponse(MOCKUP_NOTICES.oss);
        break;
      case '모바일앱프로그래밍실습':
        sendResponse(MOCKUP_NOTICES.mobile);
        break;
      case '운영체제':
        sendResponse(MOCKUP_NOTICES.os);
        break;
      default:
        sendResponse({ data: 'unknown' });
    }
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
