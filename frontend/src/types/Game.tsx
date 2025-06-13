export type GameProps = {
  _id?: string;
  image_url: string;
  title: string;
  description: string;
  category: string;
  platform: string;
  status: string;
  favorite: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  acquisition_date: Date;
  finish_date: Date;
  is_deleted?: boolean;
};

export type EditGameProps = {
  itemId: string;
  game: GameProps;
  gameData: Partial<GameProps>;
};

export type EditGamesWithOnCreatedProps = {
  onCreated: () => void;
  game: GameProps;
};
