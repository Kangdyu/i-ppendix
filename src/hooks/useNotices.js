import { useQuery } from 'react-query';
import { fetcher } from '../utils/fetcher';

function useNotices({ courseId, mockup }) {
  const { data: notices, ...props } = useQuery(
    ['notices', courseId],
    () => fetcher({ type: 'notices', courseId, mockup }),
    { staleTime: Infinity, cacheTime: Infinity },
  );

  return { notices, ...props };
}

export default useNotices;
