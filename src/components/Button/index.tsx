import React, { ButtonHTMLAttributes } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import styles from './Button.module.less';
import Icon from '../Icon/index';

export type ButtonType = 'danger' | 'primary' | 'warning' | 'default';
export type ButtonProps = ButtonHTMLProps & {
  type?: ButtonType;
  loading?: boolean;
};
type ButtonHTMLProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

const Button: React.FC<ButtonProps> = ({
  type = 'default',
  loading = false,
  children,
  className,
  ...rests
}) => {
  const buttonClass = classNames(styles.button, {
    [styles.danger]: type === 'danger',
    [styles.primary]: type === 'primary',
    [styles.warning]: type === 'warning',
    [styles.default]: type === 'default',
    [styles.loading]: loading,
    [className as string]: className,
  });

  return (
    <button type="button" className={buttonClass} {...rests}>
      {loading ? (
        <Icon icon={faSpinner} className={styles.spinner} spin={true} />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
