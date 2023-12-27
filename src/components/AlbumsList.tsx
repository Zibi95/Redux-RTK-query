import { useAddAlbumMutation, useFetchAlbumsQuery } from '../store';
import { User } from '../store/slices/userSlice';
import AlbumListItem from './AlbumListItem';
import Button from './Button';
import SkeletonLoader from './SkeletonLoader';

interface AlbumsListProps {
  user: User;
}

const AlbumsList = ({ user }: AlbumsListProps) => {
  const {
    data,
    error,
    isFetching: isLoadingAlbums,
  } = useFetchAlbumsQuery(user);
  const [addAlbum, { isLoading: isAddingAlbum }] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isLoadingAlbums) {
    content = <SkeletonLoader className='h-10 w-full' times={3} />;
  } else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content = data?.map((album) => (
      <AlbumListItem key={album.id} album={album} />
    ));
  }

  return (
    <div>
      <div className='m-2 flex items-center justify-between'>
        <div className='text-lg font-bold'>Albums for {user.name}</div>
        <Button loading={isAddingAlbum} onClick={handleAddAlbum}>
          + Add album
        </Button>
      </div>

      <div>{content}</div>
    </div>
  );
};

export default AlbumsList;
