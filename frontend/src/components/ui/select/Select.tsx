import type {
  LabelHTMLAttributes,
  OptgroupHTMLAttributes,
  OptionHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';

import style from './Select.module.css';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  variant?: 'modal' | 'default' | 'disable';
};
type SelectItemProps = OptionHTMLAttributes<HTMLOptionElement>;
type SelectGroupProps = OptgroupHTMLAttributes<HTMLOptGroupElement>;
type SelectLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Select({ variant = 'default', ...props }: SelectProps) {
  return <select className={`${style[variant]} ${style.select}`} {...props} />;
}

export function SelectItem({ children, ...props }: SelectItemProps) {
  return (
    <option className={style.item} {...props}>
      {children}
    </option>
  );
}

export function SelectGroup({ children, ...props }: SelectGroupProps) {
  return (
    <optgroup className={style.group} {...props}>
      {children}
    </optgroup>
  );
}

export function SelectLabel({ children, ...props }: SelectLabelProps) {
  return (
    <label className={style.label} {...props}>
      {children}
    </label>
  );
}

export function SelectValue({ value }: { value: string }) {
  return <span className={style.value}>{value}</span>;
}

export function SelectSeparator() {
  return <hr className={style.separator} />;
}
