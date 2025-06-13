import type { TextareaHTMLAttributes } from 'react';
import style from './Textarea.module.css';


type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ ...props }: TextareaProps) {
  return <textarea className={style.textarea} {...props} />;
}
