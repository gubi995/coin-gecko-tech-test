import { ComponentProps } from 'react';

import classes from './Button.module.scss';

interface ButtonPros extends ComponentProps<'button'> {}

const Button = ({ className, ...props }: ButtonPros) => {
  const buttonClassName = `${classes.component} ${className}}`;

  return <button className={buttonClassName} {...props} />;
};

export default Button;
