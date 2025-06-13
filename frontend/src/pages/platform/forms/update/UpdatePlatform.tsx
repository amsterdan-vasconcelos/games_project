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
import { useDialog } from '../../../../hooks/useDialog';
import { usePlatform } from '../../../../hooks/usePlatform';
import type { EditPlatformWithOnCreatedProps } from '../../../../types/Platform';
import { toInputDateString } from '../../../../utils/toInputDateString';

import { validateForm } from '../../../../utils/validateForm';
import style from './UpdatePlatform.module.css';

export function EditPlatform({
  platform,
  onCreated,
}: EditPlatformWithOnCreatedProps) {
  const [title, setTitle] = useState(platform.title);
  const [company, setCompany] = useState(platform.company);
  const [year, setYear] = useState(platform.acquisition_year);
  const [imageUrl, setImageUrl] = useState(platform.image_url);
  const { update } = usePlatform();
  const { closeDialog } = useDialog();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm(title, platform.image_url);

    if (!isValid) return;
    
    try {
      if (platform._id) {
        await update({
          itemId: platform._id,
          platformData: {
            title: title,
            company: company,
            acquisition_year: year ? new Date(year) : undefined,
            image_url: imageUrl,
            _id: platform._id,
          },
        });
      }

      toast.success('Platform updated successfully!');
      onCreated();
      closeDialog();
    } catch (error) {
      console.error('Error updating platform:', error);
      toast.error('Failed to update platform.');
    }
  };

  return (
    <div className={style.editPlatform}>
      <DialogContent className={style.dialogContent}>
        <DialogHeader>
          <DialogTitle className={style.dialogTitle}>Edit platform</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <form className={style.form}>
          <div className={style.formGroup}>
            <Label>
              Title<span className={style.required}>*</span>
            </Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className={style.formGroup}>
            <Label>Company</Label>
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className={style.formGroup}>
            <Label>Acquisition year</Label>
            <Input
              type='date'
              value={toInputDateString(year)}
              placeholder='YYYY-MM-DD'
              onChange={(e) =>
                setYear(e.target.value ? new Date(e.target.value) : undefined)
              }
            />
          </div>

          <div className={style.formGroup}>
            <Label>Platform image (url)</Label>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
        </form>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            <p>Edit platform</p>
            <p>+</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
}
