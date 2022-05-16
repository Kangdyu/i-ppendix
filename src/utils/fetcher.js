export async function fetcher({ type, courseId, mockup }) {
  return await chrome.runtime.sendMessage({ type, courseId, mockup });
}
