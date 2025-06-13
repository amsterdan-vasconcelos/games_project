import type { HTMLAttributes, ReactNode } from 'react';
import { Button } from '../ui/button/Button';
import style from './Header.module.css';
import { arrow } from '../../utils/icons';
import { useSidebar } from '../../hooks/useSidebar';
import { Dialog, DialogTrigger } from '../ui/dialog/Dialog';

type HeaderProps = HTMLAttributes<HTMLElement> & {
  title?: string;
  buttonText?: string;
  hiddenButton?: boolean;
  hiddenLine?: boolean;
  createForm?: ReactNode;
};

export function Header({
  title,
  buttonText,
  children,
  hiddenButton,
  hiddenLine,
  createForm,
  ...props
}: HeaderProps) {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <header className={style.header} {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          className={style.toggleBtn}
          onClick={toggleSidebar}
          style={{ left: isOpen ? '285px' : '75px' }}
          aria-label='Toggle sidebar'>
          <img
            src={arrow}
            alt='Toggle'
            className={`${style.arrowIcon} ${!isOpen ? style.rotated : ''}`}
          />
        </button>
        <h1 className={style.title}>{title}</h1>
      </div>
      <div className={style.texts}>
        {!hiddenButton && (
          <Dialog>
            <DialogTrigger>
              <Button>{buttonText}</Button>
            </DialogTrigger>
            {createForm}
          </Dialog>
        )}
        {children}
        {!hiddenLine && <div className={style.line}></div>}
      </div>
    </header>
  );
}
