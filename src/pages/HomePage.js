import { useQueries } from 'react-query';
import PageContentContainer from '../components/PageContentContainer';
import useCourses from '../hooks/useCourses';
import { fetcher } from '../utils/fetcher';

function HomePage() {
  const { courses } = useCourses({ mockup: true });
  const queries = useQueries(
    courses.data.map(course => {
      return {
        queryKey: ['todos', course.id],
        queryFn: () =>
          fetcher({ type: 'todos', courseId: course.id, mockup: true }),
      };
    }),
    {
      enabled: !!courses,
    },
  );

  const isLoading = queries.some(query => query.isLoading);
  if (isLoading) return <main>Loading...</main>;

  return (
    <PageContentContainer title='Home'>
      <h2>수업</h2>
      <ul>
        {queries.map(query =>
          query.data.data.videos
            .sort((a, b) => new Date(a.due) - new Date(b.due))
            .map(video => (
              <li key={video.id}>
                {video.title} {video.due}
              </li>
            )),
        )}
      </ul>
      <h2>과제</h2>
      <ul>
        {queries.map(query =>
          query.data.data.assignments
            .sort((a, b) => new Date(a.due) - new Date(b.due))
            .map(assignment => (
              <li key={assignment.id}>
                {assignment.title} {assignment.due}
              </li>
            )),
        )}
      </ul>
    </PageContentContainer>
  );
}

export default HomePage;
