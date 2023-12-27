import { GoTrash } from 'react-icons/go';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import { Album } from '../store/apis/alubmsApi';
import { useRemoveAlbumMutation } from '../store';

interface AlbumListItemProps {
  album: Album;
}

const AlbumListItem = ({ album }: AlbumListItemProps) => {
  const [removeAlbum, { isLoading }] = useRemoveAlbumMutation();

  const { title, id } = album;

  const handleRemoveAlbum = () => {
    removeAlbum(album);
  };

  const header = (
    <div className='flex gap-3'>
      <Button loading={isLoading} danger onClick={handleRemoveAlbum} rounded>
        <GoTrash />
      </Button>
      {title}
    </div>
  );

  return (
    <ExpandablePanel key={id} header={header}>
      List of photos
    </ExpandablePanel>
  );
};

export default AlbumListItem;
