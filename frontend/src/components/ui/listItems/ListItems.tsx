import { useState, type ReactNode } from 'react';

import {
  eye,
  eyeClosed,
  imageController,
  pen,
  penBlack,
  star,
  starFilled,
  trash,
  trashBlack,
} from '../../../utils/icons';
import { Dialog, DialogTrigger } from '../dialog/Dialog';

import styles from './ListItems.module.css';

interface ListItemsProps {
  imageUrl?: string;
  camp1?: string;
  camp2?: string;
  camp3?: string;
  camp4?: string;
  camp5?: string;
  iconDetails?: true;
  iconEdit?: true;
  iconDelete?: true;
  iconStar?: boolean;
  detailsForm?: ReactNode;
  editForm?: ReactNode;
  deleteForm?: ReactNode;
  onStarClick?: () => void;
}

const ListItems = ({
  imageUrl,
  camp1,
  camp2,
  camp3,
  camp4,
  camp5,
  iconDetails,
  iconEdit,
  iconDelete,
  iconStar,
  detailsForm,
  editForm,
  deleteForm,
  onStarClick,
}: ListItemsProps) => {
  const [starred, setStarred] = useState(false);

  const handleStarClick = () => {
    setStarred((prev) => !prev);
    onStarClick?.();
  };

  const [hoveredIcon, setHoveredIcon] = useState<
    'view' | 'edit' | 'delete' | null
  >(null);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl ? imageUrl : imageController}
          alt='Card Icon'
          className={styles.cardImage}
        />
      </div>

      <div className={styles.cardTexts}>
        {camp1 && <span>{camp1}</span>}
        <span>{camp2 || ''}</span>
        <span>{camp3 || ''}</span>
        <span>{camp4 || ''}</span>
        <span>{camp5 || ''}</span>

        {iconStar && (
          <img
            src={starred ? starFilled : star}
            alt={starred ? 'Star Filled' : 'Star'}
            className={styles.icon}
            onClick={handleStarClick}
          />
        )}
      </div>

      <div className={styles.cardIcons}>
        {iconDetails && (
          <Dialog>
            <DialogTrigger>
              <button
                className={styles.icon}
                onMouseEnter={() => setHoveredIcon('view')}
                onMouseLeave={() => setHoveredIcon(null)}>
                <img
                  src={hoveredIcon === 'view' ? eye : eyeClosed}
                  alt='View'
                />
              </button>
            </DialogTrigger>
            {detailsForm}
          </Dialog>
        )}

        {iconEdit && (
          <Dialog>
            <DialogTrigger>
              <button
                className={styles.icon}
                onMouseEnter={() => setHoveredIcon('edit')}
                onMouseLeave={() => setHoveredIcon(null)}>
                <img src={hoveredIcon === 'edit' ? pen : penBlack} alt='Edit' />
              </button>
            </DialogTrigger>
            {editForm}
          </Dialog>
        )}

        {iconDelete && (
          <Dialog>
            <DialogTrigger>
              <button
                className={styles.icon}
                onMouseEnter={() => setHoveredIcon('delete')}
                onMouseLeave={() => setHoveredIcon(null)}>
                <img
                  src={hoveredIcon === 'delete' ? trash : trashBlack}
                  alt='Delete'
                />
              </button>
            </DialogTrigger>
            {deleteForm}
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default ListItems;
