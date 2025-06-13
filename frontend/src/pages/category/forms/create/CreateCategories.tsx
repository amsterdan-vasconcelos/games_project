import { useState } from 'react';
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
import { Textarea } from '../../../../components/ui/textarea/Textarea';
import { useCategory } from '../../../../hooks/useCategory';
import { useDialog } from '../../../../hooks/useDialog';

import style from './CreateCategories.module.css';
import { validateForm } from '../../../../utils/validateForm';

export function NewCategory({ onCreated }: { onCreated?: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { create } = useCategory();
  const { closeDialog } = useDialog();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm(title);

    if (!isValid) return;

    try {
      await create({
        title: title,
        description: description,
      });
      setTitle('');
      setDescription('');
      closeDialog();
      toast.success('Category created successfully!');
      onCreated?.();
    } catch (error) {
      console.log(error);
      toast.error('Error creating category.');
    }
  };

  return (
    <div className={style.newCategory}>
      <DialogContent className={style.dialogContent}>
        <DialogHeader>
          <DialogTitle className={style.dialogTitle}>New category</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <form className={style.form}>
          <div className={style.formGroup}>
            <Label asterisk>Title</Label>
            <Input
              placeholder='Mario Kart 8'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={style.formGroup}>
            <label>Description</label>
            <Textarea
              placeholder='Amazing game'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </form>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            <p>Save category</p>
            <p>+</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
}
