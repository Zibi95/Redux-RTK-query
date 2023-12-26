import { useFetchAlbumsQuery } from '../store';
import { User } from '../store/slices/userSlice';
import ExpandablePanel from './ExpandablePanel';
import SkeletonLoader from './SkeletonLoader';

interface AlbumsListProps {
  user: User;
}

const AlbumsList = ({ user }: AlbumsListProps) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);

  let content;
  if (isLoading) {
    content = <SkeletonLoader times={3} />;
  } else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content = data?.map(({ id, title }) => (
      <ExpandablePanel key={id} header={<div>{title}</div>}>
        List of photos
      </ExpandablePanel>
    ));
  }

  return (
    <div>
      <div>Albums for {user.name}</div>
      <div>{content}</div>
    </div>
  );
};

export default AlbumsList;
