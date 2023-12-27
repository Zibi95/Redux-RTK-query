import { useEffect } from 'react';

import { addUser, fetchUsers } from '../store';
import { useTypedSelector } from '../hooks/useTypedSelector';
import SkeletonLoader from './SkeletonLoader';
import Button from './Button';
import useThunk from '../hooks/useThunk';
import UsersListItem from './UsersListItem';

const UsersList = () => {
  const { data } = useTypedSelector((state) => state.users);
  const [fetchUsersHandler, isLoadingUsers, errorUsers] = useThunk(fetchUsers);
  const [addUserHandler, isAddingUser, addUserError] = useThunk(addUser);

  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);

  const handleUserAdd = () => {
    addUserHandler();
  };

  let content: JSX.Element | JSX.Element[];
  if (isLoadingUsers) {
    content = <SkeletonLoader className='h-10 w-full' times={6} />;
  } else if (errorUsers) {
    content = <div>{errorUsers.message}</div>;
  } else {
    content = data.map((user) => <UsersListItem key={user.id} user={user} />);
  }

  return (
    <div>
      <div className='flex m-2 items-center justify-between'>
        <h1 className='text-xl'>Users</h1>
        <Button success loading={isAddingUser} onClick={handleUserAdd}>
          Add user
        </Button>
      </div>
      {content}
    </div>
  );
};

export default UsersList;
