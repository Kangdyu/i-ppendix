function messageListener(msg, sender, sendResponse) {
  if (msg.type === 'courses') {
    sendResponse({ data: 'courses' });
  } else if (msg.type === 'todos') {
    sendResponse({ data: `${msg.course} todos` });
  } else if (msg.type === 'notices') {
    sendResponse({ data: `${msg.course} notices` });
  }

  // for async behavior
  return true;
}

chrome.runtime.onMessage.addListener(messageListener);
