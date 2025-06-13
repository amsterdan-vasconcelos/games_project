import { useEffect, useState, type ChangeEvent } from 'react';
import { Select, SelectItem, SelectGroup } from '../ui/select/Select';
import search from '../../assets/search.svg';
import { Button } from '../ui/button/Button';
import { Input } from '../ui/input/Input';
import style from './Filterbar.module.css';
import { useCategory } from '../../hooks/useCategory';
import type { CategoryProps } from '../../types/Category';

type Props = {
  onSearch: (filters: FiltersState) => void;
  onClear: () => void;
};

export type FiltersState = {
  search: string;
  category: string;
  favorite: string;
};

export const GameFilters = ({ onSearch, onClear }: Props) => {
  const [filters, setFilters] = useState<FiltersState>({
    search: '',
    category: '',
    favorite: '',
  });

  const { getAll } = useCategory();
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAll();
      setCategories(data);
    };
    fetchCategories();
  }, [getAll]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFilters((prev) => ({
      ...prev,
      [name]: checked !== undefined ? checked.toString() : value,
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({ search: '', category: '', favorite: '' });
    onClear();
  };

  return (
    <div className={style.filtercontainer}>
      <div className={style.querys}>
        <h3>Filters</h3>
        <Input
          type='text'
          name='search'
          variant='rounded'
          placeholder='Search Game'
          value={filters.search}
          onChange={handleChange}
        />

        <Select
          name='category'
          value={filters.category}
          variant='default'
          onChange={handleChange}>
          <SelectItem value=''>Select Category</SelectItem>
          <SelectGroup>
            {categories.map((cat) => (
              <SelectItem key={cat.title} value={cat.title}>
                {cat.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </Select>

        <Select
          name='favorite'
          variant='default'
          value={filters.favorite}
          onChange={handleChange}>
          <SelectItem value=''>Favorite status</SelectItem>
          <SelectItem value='true'>Yes</SelectItem>
          <SelectItem value='false'>No</SelectItem>
        </Select>
      </div>

      <div className={style.buttons}>
        <Button variant='gray' onClick={handleClear}>
          Clear
        </Button>
        <Button variant='turquoise' onClick={handleSearch}>
          <div className={style.searchbtn}>
            Search
            <img src={search} alt='Search' />
          </div>
        </Button>
      </div>
    </div>
  );
};
