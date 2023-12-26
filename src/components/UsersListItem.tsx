import { GoTrash } from 'react-icons/go';

import useThunk from '../hooks/useThunk';
import { removeUser } from '../store';
import { User } from '../store/slices/userSlice';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

interface UsersListItemProps {
  user: User;
}

const UsersListItem = ({ user }: UsersListItemProps) => {
  const [deleteUserHandler, isDeletingUser] = useThunk(removeUser);

  const { name, id } = user;

  const handleClick = () => {
    deleteUserHandler(id);
  };

  const header = (
    <div className='flex gap-3'>
      <Button loading={isDeletingUser} danger rounded onClick={handleClick}>
        <GoTrash />
      </Button>
      {name}
    </div>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
};

export default UsersListItem;
