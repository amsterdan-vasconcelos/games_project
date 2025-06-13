export type PlatformProps = {
  _id: string;
  image_url?: string;
  title: string;
  company?: string;
  acquisition_year?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  is_deleted?: boolean;
};

export type EditPlatformProps = {
  itemId: string;
  platformData: Omit<PlatformProps, 'is_deleted'>;
};

export type EditPlatformWithOnCreatedProps = {
  onCreated: () => void;
  platform: PlatformProps;
}