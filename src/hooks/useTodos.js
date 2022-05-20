import { useQuery } from 'react-query';
import { fetcher } from '../utils/fetcher';

function useTodos({ courseId, mockup }) {
  const { data: todos, ...props } = useQuery(
    ['todos', courseId],
    () => fetcher({ type: 'todos', courseId, mockup }),
    { staleTime: Infinity, cacheTime: Infinity },
  );

  return { todos, ...props };
}

export default useTodos;
