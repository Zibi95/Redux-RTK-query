import { PropsWithChildren, useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';
import Button from './Button';

interface ExpendablePanelProps {
  header: JSX.Element;
}

const ExpandablePanel = ({
  header,
  children,
}: PropsWithChildren<ExpendablePanelProps>) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className='mb-2 border rounded'>
      <div className='flex justify-between cursor-pointer p-2 gap-3 items-center'>
        {header}
        <Button onClick={handleClick}>
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </Button>
      </div>
      {expanded && <div className='p-2 border-t'>{children}</div>}
    </div>
  );
};

export default ExpandablePanel;
