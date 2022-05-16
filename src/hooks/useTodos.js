import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

function useTodos({ courseId, mockup = false }) {
  const { data: todos, error } = useSWR(`todos_${courseId}`, key =>
    fetcher({ type: key.split('_')[0], courseId, mockup }),
  );

  return { todos, error };
}

export default useTodos;
