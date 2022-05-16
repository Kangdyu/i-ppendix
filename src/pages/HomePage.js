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

  console.log(queries);

  return <PageContentContainer title='Home'>HomePage</PageContentContainer>;
}

export default HomePage;
