import type { HTMLAttributes } from 'react';

import style from './Card.module.css';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'modal' | 'auth';
};

export function Card({ variant = 'modal', ...props }: CardProps) {
  return <div className={style[variant]} {...props} />;
}

type CardHeader = HTMLAttributes<HTMLDivElement>;

export function CardHeader({ ...props }: CardHeader) {
  return <div className={style.header} {...props} />;
}

type CardTitle = HTMLAttributes<HTMLHeadingElement> & {
  tag?: 'h1' | 'h2' | 'h3' | 'h4';
};

export function CardTitle({ tag = 'h3', ...props }: CardTitle) {
  const Tag = tag;

  return <Tag className={style.title} {...props} />;
}

type CardDescription = HTMLAttributes<HTMLParagraphElement>;

export function CardDescription({ ...props }: CardDescription) {
  return <p className={style.description} {...props} />;
}

type CardContent = HTMLAttributes<HTMLDivElement>;

export function CardContent({ ...props }: CardContent) {
  return <div className={style.content} {...props} />;
}

type CardFooter = HTMLAttributes<HTMLDivElement>;

export function CardFooter({ ...props }: CardFooter) {
  return <div className={style.footer} {...props} />;
}
