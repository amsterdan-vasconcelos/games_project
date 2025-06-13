import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { CustomPagination } from '../../components/customPagination/CustomPagination';
import { Header } from '../../components/header/Header';
import HeaderList from '../../components/ui/headerList/HeaderList';
import ListItems from '../../components/ui/listItems/ListItems';
import { useCategory } from '../../hooks/useCategory';
import type { CategoryProps } from '../../types/Category';
import { formatDate } from '../../utils/formatDate';
import { per_page } from '../../utils/getPaginationItems';
import DeleteModal from '../components/DeleteModal';
import { NewCategory } from './forms/create/CreateCategories';
import { EditCategory } from './forms/update/UpdateCategories';

import styles from './Category.module.css';

export type SortHeaders = {
  sort: string;
  label: string;
};

const headers: SortHeaders[] = [
  { sort: 'title', label: 'Title' },
  { sort: 'description', label: 'Description' },
  { sort: 'createdAt', label: 'Created At' },
  { sort: 'updatedAt', label: 'Updated At' },
];

export function Category() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<CategoryProps[]>();
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');
  const { getAll, remove, count } = useCategory();

  const totalPages = Math.ceil(count / per_page);

  const fetchCategories = async () => {
    const categories = await getAll({ page, per_page });
    setCategory(categories);
  };

  const handleDelete = async (id: string): Promise<boolean> => {
    try {
      await remove(id);
      toast.success('Category deleted!');
      fetchCategories();
      return true;
    } catch (error) {
      console.log(error);
      toast.error('Error deleting category.');
      return false;
    }
  };

  const handleSort = async (sort: string) => {
    setDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));

    const categories = await getAll({ sort, dir, page, per_page });
    setCategory(categories);
  };

  useEffect(() => {
    fetchCategories();
  }, [page]);

  return (
    <div className={styles.container}>
      <Header
        title='Categories'
        buttonText='NEW CATEGORY'
        createForm={<NewCategory onCreated={fetchCategories} />}
      />

      <HeaderList fields={headers} onSortClick={handleSort} />

      {category?.map((cat) => (
        <ListItems
          key={cat._id}
          camp1={cat.title}
          camp2={cat.description}
          camp3={formatDate(String(cat.createdAt))}
          camp4={formatDate(String(cat.updatedAt))}
          iconEdit
          iconDelete
          editForm={<EditCategory category={cat} onCreated={fetchCategories} />}
          deleteForm={
            <DeleteModal
              type={'category'}
              onDelete={() => handleDelete(cat._id)}
            />
          }
        />
      ))}

      <CustomPagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
