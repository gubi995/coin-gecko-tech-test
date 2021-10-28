import { FC, ReactElement } from 'react';

import classes from './Skeleton.module.scss';

interface SkeletonProps {
  isLoading: boolean;
  width?: string;
  height?: string;
  children: ReactElement;
}

const Skeleton: FC<SkeletonProps> = ({
  isLoading,
  children,
  width = '12ch',
  height = '1rem',
}) => {
  return isLoading ? (
    <span
      className={classes.component}
      role="progressbar"
      style={{ width, height }}
    />
  ) : (
    children
  );
};

export default Skeleton;
