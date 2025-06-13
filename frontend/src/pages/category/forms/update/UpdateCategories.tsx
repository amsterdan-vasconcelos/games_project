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
import { useCategory } from '../../../../hooks/useCategory';
import { useDialog } from '../../../../hooks/useDialog';
import type { EditCategoryWithOnCreatedProps } from '../../../../types/Category';
import { validateForm } from '../../../../utils/validateForm';
import style from './UpdateCategories.module.css';

export function EditCategory({
  category,
  onCreated,
}: EditCategoryWithOnCreatedProps) {
  const [title, setTitle] = useState(category.title);
  const [description, setDescription] = useState(category.description || '');
  const { update } = useCategory();
  const { closeDialog } = useDialog();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm(title);

    if (!isValid) return;

    try {
      await update({
        category: category,
        categoryData: {
          title: title,
          description: description,
        },
        itemId: category._id,
      });
      toast.success('Category updated successfully!!');
      closeDialog();
      onCreated();
    } catch (error) {
      console.log(error);
      toast.error('Error updating category.');
    }
  };

  return (
    <div className={style.editCategory}>
      <DialogContent className={style.dialogContent}>
        <DialogHeader>
          <DialogTitle className={style.dialogTitle}>Edit category</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <form className={style.form}>
          <div className={style.formGroup}>
            <Label asterisk>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className={style.formGroup}>
            <label>Description</label>
            <textarea
              placeholder='Enter category description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={style.textarea}
            />
          </div>
        </form>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            <p>Edit category</p>
            <p>+</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
}
