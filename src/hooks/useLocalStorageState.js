import { useEffect, useState } from 'react';

function useLocalStorageState(key, initialState) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const storagedFavoriteNotices = localStorage.getItem(key);
    if (storagedFavoriteNotices) {
      setState(JSON.parse(storagedFavoriteNotices));
    } else {
      localStorage.setItem(key, JSON.stringify(initialState));
    }
  }, [key, initialState]);

  function setStateWithLocalStorage(newState) {
    localStorage.setItem(key, JSON.stringify(newState));
    setState(newState);
  }

  return [state, setStateWithLocalStorage];
}

export default useLocalStorageState;
