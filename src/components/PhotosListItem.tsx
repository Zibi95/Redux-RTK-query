import { GoSync, GoTrash } from 'react-icons/go';
import { useRemovePhotoMutation } from '../store';
import { Photo } from '../store/apis/photosApi';
import Img from './Img';
import classNames from 'classnames';

interface PhotosListItemProps {
  photo: Photo;
}

const PhotosListItem = ({ photo }: PhotosListItemProps) => {
  const [removePhoto, { isLoading }] = useRemovePhotoMutation();

  const handleRemovePhoto = () => {
    removePhoto(photo);
  };

  return (
    <div onClick={handleRemovePhoto} className='relative cursor-pointer m-2'>
      <Img src={photo.url} className='h-20 w-20' />
      <div
        className={classNames(
          'absolute inset-0 flex items-center justify-center hover: bg-gray-200 opacity-0 hover:opacity-80',
          { 'opacity-100 bg-red-200': isLoading }
        )}
      >
        {isLoading ? (
          <GoSync className='animate-spin text-3xl' />
        ) : (
          <GoTrash className='text-3xl' />
        )}
      </div>
    </div>
  );
};

export default PhotosListItem;
