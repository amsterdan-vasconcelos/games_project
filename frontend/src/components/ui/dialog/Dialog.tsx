import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

import { DialogProvider } from '../../../context/DialogContext';
import { useDialog } from '../../../hooks/useDialog';
import { x } from '../../../utils/icons';
import { Slot } from '../slot/Slot';
import style from './Dialog.module.css';

type DialogProps = { children: ReactNode };
type DialogHeader = HTMLAttributes<HTMLDivElement>;
type DialogTitle = HTMLAttributes<HTMLHeadingElement>;
type DialogDescription = HTMLAttributes<HTMLParagraphElement>;
type DialogContent = HTMLAttributes<HTMLDivElement>;
type DialogFooter = HTMLAttributes<HTMLDivElement>;
type DialogTrigger = ButtonHTMLAttributes<HTMLButtonElement>;
type DialogClose = ButtonHTMLAttributes<HTMLButtonElement>;

export function Dialog({ children }: DialogProps) {
  return <DialogProvider>{children}</DialogProvider>;
}

export function DialogTrigger({ ...props }: DialogTrigger) {
  const { openDialog } = useDialog();

  return <Slot onClick={openDialog} {...props} />;
}

export function DialogClose({ ...props }: DialogClose) {
  const { closeDialog } = useDialog();

  return (
    <button onClick={closeDialog} className={style.close} {...props}>
      <img src={x} alt='close' />
    </button>
  );
}

export function DialogHeader({ ...props }: DialogHeader) {
  return <div className={style.header} {...props} />;
}

export function DialogTitle({ ...props }: DialogTitle) {
  return <div className={style.title} {...props} />;
}

export function DialogDescription({ ...props }: DialogDescription) {
  return <p className={style.description} {...props} />;
}

export function DialogContent({ children, ...props }: DialogContent) {
  const { isOpen } = useDialog();
  if (!isOpen) return;

  return (
    <div className={style.wrapper}>
      <div className={style.content} {...props}>
        {children}
      </div>
    </div>
  );
}

export function DialogFooter({ ...props }: DialogFooter) {
  return <div className={style.footer} {...props} />;
}
