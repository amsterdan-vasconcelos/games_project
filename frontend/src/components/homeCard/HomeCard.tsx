import type { ReactNode } from 'react';
import { Button } from '../ui/button/Button';
import { Dialog, DialogTrigger } from '../ui/dialog/Dialog';
import styles from './HomeCard.module.css';

type HomeCardProps = {
  icon?: string;
  title?: string;
  count?: number;
  haveButton?: boolean;
  createForm?: ReactNode;
};

export function HomeCard({
  icon,
  title,
  count,
  haveButton,
  createForm,
}: HomeCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.icon}>
          <img src={icon} />
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.count}>{count}</div>
      </div>

      <div className={styles.bottom}>
        {haveButton && (
          <Dialog>
            <DialogTrigger>
              <Button variant='white' style={{ color: '#6C6C6C' }}>
                + Add new
              </Button>
            </DialogTrigger>
            {createForm}
          </Dialog>
        )}
      </div>
    </div>
  );
}
