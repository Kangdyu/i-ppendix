export async function fetcher({ type, courseId, mockup = false }) {
  return await chrome.runtime.sendMessage({ type, courseId, mockup });
}
