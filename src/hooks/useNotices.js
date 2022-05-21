import { useQuery } from 'react-query';
import { fetcher } from '../utils/fetcher';

function useNotices({ courseId, mockup }) {
  const { data: notices, ...props } = useQuery(['notices', courseId], () =>
    fetcher({ type: 'notices', courseId, mockup }),
  );

  return { notices, ...props };
}

export default useNotices;
