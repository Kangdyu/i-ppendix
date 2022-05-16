import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { MOCKUP_COURSES } from './chrome/mockup/courses';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import NotFoundPage from './pages/NotFoundPage';

const FullScreenFlexContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  height: 100%;
`;

const Container = styled.div`
  padding: 36px 60px;
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
    <BrowserRouter basename='/index.html'>
      <FullScreenFlexContainer>
        <Sidebar courses={courses} />
        <Container>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='course' element={<CoursePage />}>
              <Route path=':courseId' element={<CoursePage />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Container>
      </FullScreenFlexContainer>
    </BrowserRouter>
  );
}

export default App;
