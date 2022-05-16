import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import NotFoundPage from './pages/NotFoundPage';
import useSWR from 'swr';
import { fetcher } from './utils/fetcher';

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
  const { data: courses, error } = useSWR('courses', type =>
    fetcher({ type, mockup: true }),
  );

  if (error) return <main>Error</main>;
  if (courses == null) return <main>Loading...</main>;

  return (
    <BrowserRouter basename='/index.html'>
      <FullScreenFlexContainer>
        <Sidebar courses={courses.data} />
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
