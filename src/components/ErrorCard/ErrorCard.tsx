import classes from './ErrorCard.module.scss';

interface ErrorCardProps {
  title: string;
  description: string;
}

const ErrorCard = ({ title, description }: ErrorCardProps) => {
  return (
    <div className={classes.component}>
      <span className={classes.title}>{title}</span>
      <span className={classes.description}>{description}</span>
    </div>
  );
};

export default ErrorCard;
