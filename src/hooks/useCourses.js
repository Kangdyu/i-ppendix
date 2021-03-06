import { useQuery } from 'react-query';
import { fetcher } from '../utils/fetcher';

function useCourses({ mockup }) {
  const { data: courses, ...props } = useQuery('courses', () =>
    fetcher({ type: 'courses', mockup }),
  );

  return { courses, ...props };
}

export default useCourses;
