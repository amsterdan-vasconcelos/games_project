import type { ButtonHTMLAttributes } from 'react';

import style from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'white' | 'turquoise' | 'gray';
};

export function Button({ variant = 'turquoise', ...props }: ButtonProps) {
  return <button className={`${style[variant]} ${style.button}`} {...props} />;
}
