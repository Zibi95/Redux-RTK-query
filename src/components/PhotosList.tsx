import { useAddPhotoMutation, useFetchPhotosQuery } from '../store';
import { Album } from '../store/apis/alubmsApi';
import Button from './Button';
import PhotosListItem from './PhotosListItem';
import SkeletonLoader from './SkeletonLoader';

interface PhotosListProps {
  album: Album;
}

const PhotosList = ({ album }: PhotosListProps) => {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  const [addPhoto, { isLoading }] = useAddPhotoMutation();

  console.log(data);

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  let content;
  if (isFetching) {
    content = <div className='flex items-center h-20 w-20'>Loading...</div>;
  } else if (error) {
    content = <div>Error loading photos.</div>;
  } else {
    content = data?.map((photo) => (
      <PhotosListItem key={photo.id} photo={photo} />
    ));
  }

  return (
    <div>
      <div className='m-2 flex items-center justify-between'>
        <div className='text-lg font-bold'>Photos In {album.title}</div>
        <Button
          className='w-40 h-10'
          loading={isLoading}
          onClick={handleAddPhoto}
        >
          + Add Photo
        </Button>
      </div>

      <div className='mx-8 justify-center flex-wrap flex gap-3'>{content}</div>
    </div>
  );
};

export default PhotosList;
