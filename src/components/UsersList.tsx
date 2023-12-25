import { useEffect } from 'react';
import { AppDispatch, fetchUsers } from '../store';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';

const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, data } = useTypedSelector((state) => state.users);

  console.log(isLoading, error, data);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!isLoading && error) {
    return <div>{error.message}</div>;
  }

  return <div>Data</div>;
};

export default UsersList;
