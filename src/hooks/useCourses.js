import useSWRImmutable from 'swr/immutable';
import { fetcher } from '../utils/fetcher';

function useCourses({ mockup = false }) {
  const { data: courses, error } = useSWRImmutable('courses', type =>
    fetcher({ type, mockup }),
  );

  return { courses, error };
}

export default useCourses;
