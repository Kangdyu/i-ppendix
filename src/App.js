import { useEffect, useState } from 'react';

function App() {
  const [courses, setCourses] = useState(null);
  const [todos, setTodos] = useState(null);
  const [notices, setNotices] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const cResponse = await chrome.runtime.sendMessage({
        type: 'courses',
      });
      const tResponse = await chrome.runtime.sendMessage({
        type: 'todos',
        course: 'oss',
      });
      const nResponse = await chrome.runtime.sendMessage({
        type: 'notices',
        course: 'oss',
      });

      setCourses(cResponse.data);
      setTodos(tResponse.data);
      setNotices(nResponse.data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>i-ppendix</h1>
      {courses && <div>{courses}</div>}
      {todos && <div>{todos}</div>}
      {notices && <div>{notices}</div>}
    </div>
  );
}

export default App;
