import { forwardRef, type InputHTMLAttributes } from 'react';

import style from './Input.module.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'squared' | 'rounded';
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, variant = 'squared', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`${style[variant]} ${style.input}`}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';
