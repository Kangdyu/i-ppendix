import { useEffect, useState } from 'react';

function App() {
  const [courses, setCourses] = useState(null);
  const [todos, setTodos] = useState(null);
  const [notices, setNotices] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const cResponse = await chrome.runtime.sendMessage({
        type: 'courses',
        mockup: true,
      });
      const tResponse = await chrome.runtime.sendMessage({
        type: 'todos',
        course: '오픈소스소프트웨어실습',
        mockup: true,
      });
      const nResponse = await chrome.runtime.sendMessage({
        type: 'notices',
        course: '오픈소스소프트웨어실습',
        mockup: true,
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
      {courses && (
        <ul>
          {courses.map(course => (
            <li key={course.id}>{course.name}</li>
          ))}
        </ul>
      )}
      {todos?.videos && (
        <ul>
          {todos.videos.map(todo => (
            <li key={todo.id}>
              {todo.title} {todo.due}
            </li>
          ))}
        </ul>
      )}
      {todos?.assignments && (
        <ul>
          {todos.assignments.map(todo => (
            <li key={todo.id}>
              {todo.title} {todo.due}
            </li>
          ))}
        </ul>
      )}
      {notices && (
        <ul>
          {notices.map(notice => (
            <li key={notice.id}>{notice.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
