import orderListIcon from '../../../assets/orderList.svg';
import styles from './HeaderList.module.css';

type Header = {
  sort: string;
  label: string;
};

type HeaderListProps = {
  fields: Header[];
  onSortClick: (sort: string) => void;
};

const HeaderList = ({ fields, onSortClick }: HeaderListProps) => {
  return (
    <div className={styles.headerRow}>
      <div className={styles.imageSpace} />

      {fields.map(({ sort, label }, index) => (
        <div
          key={index}
          className={styles.headerItem}
          onClick={() => onSortClick(sort)}>
          {label}
          <img src={orderListIcon} alt='Order List' />
        </div>
      ))}

      <div className={styles.iconsSpace} />
    </div>
  );
};

export default HeaderList;
