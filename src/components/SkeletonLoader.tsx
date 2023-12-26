import classNames from 'classnames';

interface SkeletonLoaderProps {
  times?: number;
  className?: string;
}

const SkeletonLoader = ({ times = 1, className }: SkeletonLoaderProps) => {
  const outerClassNames = classNames(
    'relative',
    'overflow-hidden',
    'bg-gray-200',
    'mb-2.5',
    className
  );
  const innerClassNames = classNames(
    'animate-shimmer',
    'absolute',
    'inset-0',
    '-translate-x-full',
    'bg-gradient-to-r',
    'from-gray-200',
    'via-white',
    'to-gray-200',
    className
  );

  const boxes = Array.from({ length: times }, (_, i) => (
    <div className={outerClassNames} key={i}>
      <div className={innerClassNames} />
    </div>
  ));

  return boxes;
};

export default SkeletonLoader;
