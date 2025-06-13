import { useState, type FormEvent } from 'react';
import { toast } from 'react-toastify';

import { Button } from '../../../../components/ui/button/Button';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../../components/ui/dialog/Dialog';
import { Input } from '../../../../components/ui/input/Input';
import { Label } from '../../../../components/ui/label/Label';
import { useDialog } from '../../../../hooks/useDialog';
import { usePlatform } from '../../../../hooks/usePlatform';

import { validateForm } from '../../../../utils/validateForm';
import style from './CreatePlatform.module.css';

export function NewPlatform({ oncreated }: { oncreated?: () => void }) {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [acquisition_year, setAcquisition_year] = useState('');
  const [image_url, setImage_Url] = useState('');
  const { closeDialog } = useDialog();
  const { create } = usePlatform();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm(title, image_url);

    if (!isValid) return;

    try {
      const year = new Date(acquisition_year);
      const newPlatform = { acquisition_year: year, company, image_url, title };

      await create(newPlatform);
      toast.success('Platform created successfully!');
      setTitle('');
      setCompany('');
      setAcquisition_year('');
      setImage_Url('');
      closeDialog();
      oncreated?.();
    } catch (error) {
      console.log(error);
      toast.error('Error creating platform.');
    }
  };

  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate(),
    ).padStart(2, '0')}`;
  };

  return (
    <div className={style.newPlatform}>
      <DialogContent className={style.dialogContent}>
        <DialogHeader>
          <DialogTitle className={style.dialogTitle}>New platform</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <Label>
              Title<span className={style.required}>*</span>
            </Label>
            <Input
              placeholder='Epic Games'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={style.formGroup}>
            <Label>Company</Label>
            <Input
              placeholder='Epic'
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className={style.formGroup}>
            <Label>Acquisition year</Label>
            <Input
              type='date'
              placeholder='17/05/2019'
              value={formatDateForInput(acquisition_year)}
              onChange={(e) => setAcquisition_year(e.target.value)}
            />
          </div>

          <div className={style.formGroup}>
            <Label>Platform image (url)</Label>
            <Input
              placeholder='http://cdn....'
              value={image_url}
              onChange={(e) => setImage_Url(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type='submit'>
              <p>Save platform</p>
              <p>+</p>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </div>
  );
}
