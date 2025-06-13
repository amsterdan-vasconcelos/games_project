import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '../../../../components/ui/dialog/Dialog';
import { Label } from '../../../../components/ui/label/Label';
import { Input } from '../../../../components/ui/input/Input';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/ui/button/Button';
import {
  Select,
  SelectGroup,
  SelectItem,
} from '../../../../components/ui/select/Select';
import { useGame } from '../../../../hooks/useGame';
import style from './Create.module.css';
import { useCategory } from '../../../../hooks/useCategory';
import { usePlatform } from '../../../../hooks/usePlatform';
import { useDialog } from '../../../../hooks/useDialog';
import { type CategoryProps } from '../../../../types/Category';
import { type PlatformProps } from '../../../../types/Platform';
import { toast } from 'react-toastify';

type Status = 'Playing' | 'Done' | 'Abandoned';

type DataState = {
  title: string;
  description: string;
  category: string;
  acquisition_date: string;
  status: Status;
  platform: string;
  finish_date: string;
  image_url: string;
  favorite: boolean;
};

export function CreateGame({ onCreated }: { onCreated?: () => void }) {
  const [data, setData] = useState<DataState>({
    title: '',
    description: '',
    category: '',
    platform: '',
    image_url: '',
    status: 'Playing',
    favorite: false,
    acquisition_date: '',
    finish_date: '',
  });
  const [categoryList, setCategoryList] = useState<CategoryProps[]>([]);
  const [platformList, setPlatformList] = useState<PlatformProps[]>([]);

  const { closeDialog } = useDialog();
  const { getAll: getAllCategories } = useCategory();
  const { getAll: getAllPlatforms } = usePlatform();

  const {
    title,
    description,
    category,
    platform,
    image_url,
    acquisition_date,
    finish_date,
    favorite,
  } = data;

  useEffect(() => {
    const fetchData = async () => {
      const categoryList = await getAllCategories();

      if (!categoryList.length) {
        toast.error('You need to create a category first');
        return;
      }

      if (categoryList.length === 1) {
        setData((prev) => ({
          ...prev,
          category: categoryList[0].title,
        }));
      }

      const platformList = await getAllPlatforms({});
      setPlatformList(platformList);
      setCategoryList(categoryList);
    };
    fetchData();
  }, []);

  const { create, error } = useGame();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.title.trim().length < 3) {
      toast.error('Game title needs at least 3 characters required');
      return;
    }
    try {
      await create({
        title,
        description,
        category,
        acquisition_date: new Date(acquisition_date),
        status,
        platform,
        finish_date: new Date(finish_date),
        image_url,
        favorite,
      });
      toast.success('Game registred success!');
      closeDialog();
      onCreated?.();
    } catch {
      console.log(error);
      toast.error('Error to create game');
    }
  };

  return (
    <div className={style.newGame}>
      <DialogContent className={style.dialogContent}>
        <DialogHeader>
          <DialogTitle className={style.dialogTitle}>New Game</DialogTitle>
          <DialogClose className={style.dialogClose} />
        </DialogHeader>

        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <Label asterisk htmlFor='title'>
              Title
            </Label>
            <div>
              <Input
                placeholder='Mario Kart 8'
                id='title'
                value={data.title}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
          </div>

          <div className={style.formGroup}>
            <Label asterisk htmlFor='description'>
              Description
            </Label>
            <div>
              <textarea
                id='description'
                placeholder='Amazing game'
                value={data.description}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, title: e.target.value }))
                }
                className={style.textarea}
              />
            </div>
          </div>

          <div className={style.containerData}>
            <div className={style.containerRow}>
              <div className={style.formGroup}>
                <Label asterisk htmlFor='category'>
                  Category
                </Label>
                <Select
                  id='category'
                  variant='modal'
                  value={data.category}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, category: e.target.value }))
                  }>
                  <SelectGroup>
                    <SelectItem value=''>Select Category</SelectItem>
                    {categoryList.map((cat) => (
                      <SelectItem key={cat.title} value={cat.title}>
                        {cat.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </Select>
              </div>
              <div className={style.formGroup}>
                <Label asterisk htmlFor='platform'>
                  Platform
                </Label>
                <Select
                  id='platform'
                  variant='modal'
                  value={data.platform}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, platform: e.target.value }))
                  }>
                  <SelectGroup>
                    <SelectItem value=''>Select Platform</SelectItem>
                    {platformList.map((plat) => (
                      <SelectItem key={plat.title} value={plat.title}>
                        {plat.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </Select>
              </div>
            </div>

            <div className={style.containerRow}>
              <div className={style.formGroup}>
                <Label asterisk htmlFor='acquisition_date'>
                  Acquisition date
                </Label>
                <div>
                  <Input
                    id='acquisition_date'
                    type='date'
                    variant='squared'
                    value={data.acquisition_date}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        acquisition_date: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className={style.formGroup}>
                <Label asterisk htmlFor='finish_date'>
                  Finish Date
                </Label>
                <div>
                  <Input
                    id='finish_date'
                    type='date'
                    variant='squared'
                    value={data.finish_date}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        finish_date: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className={style.containerRow}>
              <div className={style.formGroup}>
                <Label asterisk htmlFor='status'>
                  Status
                </Label>
                <Select
                  id='status'
                  variant='modal'
                  value={data.status}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      status: e.target.value as Status,
                    }))
                  }>
                  <SelectGroup>
                    <SelectItem value={'Playing'}>Playing</SelectItem>
                    <SelectItem value={'Done'}>Done</SelectItem>
                    <SelectItem value={'Abandoned'}>Abandoned</SelectItem>
                  </SelectGroup>
                </Select>
              </div>
              <div className={style.formGroup}>
                <div className={style.checkbox}>
                  <div>
                    <input
                      type='checkbox'
                      name='favorite'
                      id='favorite'
                      checked={data.favorite}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          favorite: e.target.checked,
                        }))
                      }
                    />
                  </div>
                  <Label asterisk htmlFor='favorite'>
                    Favorite
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className={style.formGroup}>
            <Label htmlFor='image_url' asterisk>
              Imagem (URL)
            </Label>
            <div>
              <Input
                id='image_url'
                type='text'
                placeholder='http://cdn...'
                value={data.image_url}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, image_url: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>
              <p className={style.button}>CREATE</p>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </div>
  );
}
