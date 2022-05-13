function messageListener(msg, sender, sendResponse) {
  console.log('received message from react', msg);

  sendResponse({ data: 'HI!' });

  // for async behavior
  return true;
}

chrome.runtime.onMessage.addListener(messageListener);
