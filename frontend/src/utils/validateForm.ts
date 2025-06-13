import { toast } from 'react-toastify';

export const validateForm = (title: string, imageUrl?: string): boolean => {
  if (title.trim().length < 3) {
    toast.error('Title must be at least 3 characters long.');
    return false;
  }

  if (imageUrl && !/^https?:\/\//.test(imageUrl)) {
    toast.error('The image URL must start with http:// or https://.');
    return false;
  }

  return true;
};
