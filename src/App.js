import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MOCKUP_COURSES } from './chrome/mockup/courses';
import Home from './components/Home';
import Sidebar from './components/Sidebar';

const Container = styled.main`
  display: flex;
  width: 100%;
  min-height: 100vh;
  height: 100%;
`;

function App() {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    async function fetchCourses() {
      const response = await chrome.runtime.sendMessage({
        type: 'courses',
        mockup: true,
      });

      setCourses(response.data);
    }

    fetchCourses();
  }, []);

  if (courses == null) return <main>Loading...</main>;

  return (
    <Container>
      <Sidebar courses={courses} />
      <Home />
    </Container>
  );
}

export default App;
