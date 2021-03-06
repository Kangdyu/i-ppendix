import { HashRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import NotFoundPage from './pages/NotFoundPage';
import useCourses from './hooks/useCourses';
import { MOCKUP } from './utils/constants';

const FullScreenFlexContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  height: 100%;
`;

const Container = styled.div`
  flex: 1;
  padding: 36px 60px;
`;

function App() {
  const { courses, isLoading } = useCourses({ mockup: MOCKUP });

  if (isLoading) return <main>Loading...</main>;

  return (
    <HashRouter>
      <FullScreenFlexContainer>
        <Sidebar courses={courses.data} />
        <Container>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/course' element={<CoursePage />}>
              <Route path=':courseId' element={<CoursePage />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Container>
      </FullScreenFlexContainer>
    </HashRouter>
  );
}

export default App;
