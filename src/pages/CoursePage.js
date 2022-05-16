import { useParams } from 'react-router-dom';
import PageContentContainer from '../components/PageContentContainer';

function CoursePage() {
  const params = useParams();
  return (
    <PageContentContainer title='Course'>
      Course {params.courseId}
    </PageContentContainer>
  );
}

export default CoursePage;
