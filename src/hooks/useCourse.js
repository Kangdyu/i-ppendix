import { useQuery } from 'react-query';
import { fetcher } from '../utils/fetcher';

function useCourse({ courseId, mockup }) {
  const { data: course, ...props } = useQuery(['course', courseId], () =>
    fetcher({ type: 'course', courseId, mockup }),
  );

  return { course, ...props };
}

export default useCourse;
