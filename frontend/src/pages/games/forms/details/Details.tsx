import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
  Dialog,
  DialogTrigger,
} from '../../../../components/ui/dialog/Dialog';
import { Input } from '../../../../components/ui/input/Input';
import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { Button } from '../../../../components/ui/button/Button';
import {
  Select,
  SelectGroup,
  SelectItem,
} from '../../../../components/ui/select/Select';
import style from './Details.module.css';

type UpdateModalProps = HTMLAttributes<HTMLElement> & {
  updateForm?: ReactNode;
  deleteForm?: ReactNode;
};

export function DetailsGame({ updateForm, deleteForm }: UpdateModalProps) {
  const [new_title] = useState('');
  const [new_description] = useState('');
  const [category] = useState('');
  const [new_status] = useState('');
  const [plataform] = useState('');
  const [url_image] = useState('');

  return (
    <div className={style.newGame}>
      <DialogContent className={style.dialogContent}>
        <DialogHeader>
          <DialogTitle className={style.dialogTitle}>
            Details: NAME GAME
          </DialogTitle>
          <DialogClose className={style.dialogClose} />
        </DialogHeader>

        <form className={style.form}>
          <div className={style.formGroup}>
            <label>
              Title<span className={style.required}>*</span>
            </label>
            <div>
              <Input placeholder={'title'} value={new_title} readOnly />
            </div>
          </div>

          <div className={style.formGroup}>
            <label>Description</label>
            <div>
              <textarea
                placeholder={'description'}
                value={new_description}
                readOnly
                className={style.textarea}
              />
            </div>
          </div>

          <div className={style.containerData}>
            <div className={style.containerRow}>
              <div className={style.formGroup}>
                <label htmlFor='category'>
                  Category <span className={style.required}>*</span>
                </label>
                <Select variant='disable' value={category} disabled>
                  <SelectGroup>
                    <SelectItem>Select Category</SelectItem>
                  </SelectGroup>
                </Select>
              </div>
              <div className={style.formGroup}>
                <label htmlFor='plataform'>
                  Plataform <span className={style.required}>*</span>
                </label>
                <Select variant='disable' value={plataform} disabled>
                  <SelectGroup>
                    <SelectItem>Select Plataform</SelectItem>
                  </SelectGroup>
                </Select>
              </div>
            </div>

            <div className={style.containerRow}>
              <div className={style.formGroup}>
                <label htmlFor='status'>
                  Status <span className={style.required}>*</span>
                </label>
                <Select variant='disable' value={new_status} disabled>
                  <SelectGroup>
                    <SelectItem value={''}>Select Status</SelectItem>
                  </SelectGroup>
                </Select>
              </div>
            </div>
          </div>

          <div className={style.formGroup}>
            <label htmlFor='image_url'>Imagem (URL)</label>
            <div>
              <Input
                type='text'
                placeholder='http://cdn...'
                value={url_image}
                readOnly
              />
            </div>
          </div>
        </form>

        <DialogFooter>
          <Dialog>
            <DialogTrigger>
              <Button>
                <p className={style.button}>DELETE</p>
              </Button>
            </DialogTrigger>
            {deleteForm}
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <Button>
                <p className={style.button}>EDIT</p>
              </Button>
            </DialogTrigger>
            {updateForm}
          </Dialog>
        </DialogFooter>
      </DialogContent>
    </div>
  );
}
