import useThunk from '../hooks/useThunk';
import { removeUser } from '../store';
import { User } from '../store/slices/userSlice';

interface UsersListItemProps {
  user: User;
}

const UsersListItem = ({ user }: UsersListItemProps) => {
  const [deleteUserHandler, isDeletingUser, deleteUserError] =
    useThunk(removeUser);

  const { name, id } = user;

  return (
    <div
      onClick={() => deleteUserHandler(id)}
      key={id}
      className='mb-2 border rounded'
    >
      <div className='flex cursor-pointer p-2 justify-between items-center'>
        {name}
      </div>
    </div>
  );
};

export default UsersListItem;
