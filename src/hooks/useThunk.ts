import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

type ReturnType = [(arg?: any) => Promise<void>, boolean, Error | null];

const useThunk = (thunkAction: any): ReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const dispatch = useDispatch<AppDispatch>();

  const runThunk = useCallback(
    async (arg?: any) => {
      setIsLoading(true);
      try {
        await dispatch(thunkAction(arg));
      } catch (error) {
        setError(new Error('Error loading users....'));
      } finally {
        setIsLoading(false);
      }
    },
    [thunkAction, dispatch]
  );

  return [runThunk, isLoading, error];
};

export default useThunk;
