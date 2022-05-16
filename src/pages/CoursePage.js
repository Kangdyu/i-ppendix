import { useParams } from 'react-router-dom';
import PageContentContainer from '../components/PageContentContainer';
import useTodos from '../hooks/useTodos';

function CoursePage() {
  const { courseId } = useParams();
  const { todos, error } = useTodos({ courseId, mockup: true });

  if (error) return <main>Error</main>;
  if (todos == null) return <main>Loading...</main>;

  return (
    <PageContentContainer title='Course'>
      <h2>수업</h2>
      <ul>
        {todos.data.videos.map(video => (
          <li key={video.id}>{video.title}</li>
        ))}
      </ul>
      <h2>과제</h2>
      <ul>
        {todos.data.assignments.map(assignment => (
          <li key={assignment.id}>{assignment.title}</li>
        ))}
      </ul>
    </PageContentContainer>
  );
}

export default CoursePage;
