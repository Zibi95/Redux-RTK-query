import { useState } from 'react';
import SkeletonLoader from './SkeletonLoader';
import classNames from 'classnames';

type ImgProps = { src: string; className?: string };

const Img = ({ src, className }: ImgProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <SkeletonLoader className={className} times={1} />}
      <img
        className={classNames(className, { hidden: isLoading })}
        src={src}
        alt='Random pic'
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
};

export default Img;
