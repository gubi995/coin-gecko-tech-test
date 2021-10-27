import classes from './Loading.module.scss';

interface LoadingProps {
  className?: string;
}

const Loading = ({ className }: LoadingProps) => {
  return (
    <div className={`${classes.component} ${className}`} role="progressbar" />
  );
};

export default Loading;
