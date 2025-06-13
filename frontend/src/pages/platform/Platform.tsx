import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { CustomPagination } from '../../components/customPagination/CustomPagination';
import { Header } from '../../components/header/Header';
import HeaderList from '../../components/ui/headerList/HeaderList';
import ListItems from '../../components/ui/listItems/ListItems';
import { usePlatform } from '../../hooks/usePlatform';
import type { PlatformProps } from '../../types/Platform';
import { formatDateYear } from '../../utils/formatDateYear';
import { per_page } from '../../utils/getPaginationItems';
import DeleteModal from '../components/DeleteModal';
import { NewPlatform } from './forms/create/CreatePlatform';
import { EditPlatform } from './forms/update/UpdatePlatform';

import styles from './Platform.module.css';

export type SortHeaders = {
  sort: string;
  label: string;
};

const headers: SortHeaders[] = [
  { sort: 'title', label: 'Title' },
  { sort: 'company', label: 'Company' },
  { sort: 'acquisition_year', label: 'Acquisition year' },
  { sort: 'createdAt', label: 'Created at' },
  { sort: 'updatedAt', label: 'Updated at' },
];

export const Platform = () => {
  const [page, setPage] = useState(1);
  const [platforms, setPlatforms] = useState<PlatformProps[]>([]);
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');
  const { getAll, remove, count } = usePlatform();

  const totalPages = Math.ceil(count / per_page);

  const handleSortClick = async (sort: string) => {
    setDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));

    const platforms = await getAll({ sort, dir, page, per_page });

    setPlatforms(platforms);
  };

  const fetchPlatforms = async () => {
    const platforms = await getAll({ page, per_page });
    setPlatforms(platforms);
  };

  const handleDelete = async (id: string): Promise<boolean> => {
    try {
      await remove(id);
      toast.success('Platform deleted!');
      fetchPlatforms();
      return true;
    } catch (error) {
      console.error('Error deleting platform:', error);
      toast.error('Error deleting platform.');
      return false;
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, [page]);

  return (
    <div className={styles.pageWrapper}>
      <Header
        title='Platforms'
        buttonText='NEW PLATFORM'
        createForm={<NewPlatform oncreated={fetchPlatforms} />}
      />
      <div className={styles.platformContainer}>
        <HeaderList fields={headers} onSortClick={handleSortClick} />

        {platforms?.map((platform, index) => (
          <ListItems
            key={index}
            imageUrl={platform.image_url}
            camp1={platform.title}
            camp2={platform.company}
            camp3={formatDateYear(String(platform.acquisition_year))}
            camp4={formatDateYear(String(platform.createdAt))}
            camp5={formatDateYear(String(platform.updatedAt))}
            iconDetails
            iconEdit
            iconDelete
            editForm={
              <EditPlatform platform={platform} onCreated={fetchPlatforms} />
            }
            deleteForm={
              <DeleteModal
                type='platform'
                onDelete={() => handleDelete(platform._id)}
              />
            }
          />
        ))}
      </div>

      <CustomPagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};
