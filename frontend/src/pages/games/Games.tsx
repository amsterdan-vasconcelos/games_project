import { Header } from '../../components/header/Header';
import { useGame } from '../../hooks/useGame';
import HeaderList from '../../components/ui/headerList/HeaderList';
import ListItems from '../../components/ui/listItems/ListItems';
import { DetailsGame } from './forms/details/Details';
import { GameFilters } from '../../components/filterbar/Filterbar';
import { UpdateGame } from './forms/update/Update';
import style from './Games.module.css';
import { CreateGame } from './forms/create/Create';
/* import DeleteModal from '../components/DeleteModal'; */
import { useEffect, useState } from 'react';
import type { GameProps } from '../../types/Game';
import { formatDate } from '../../utils/formatDate';

export type SortHeaders = {
  sort: string;
  label: string;
};

const headers: SortHeaders[] = [
  { sort: 'title', label: 'Title' },
  { sort: 'category', label: 'Category' },
  { sort: 'createdAt', label: 'Created At' },
  { sort: 'updatedAt', label: 'Updated At' },
  { sort: 'favorite', label: 'Favorite' },
];

export function Games() {
  const [games, setGames] = useState<GameProps[]>([]);
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');
  const { getAll } = useGame();

  const handleSortClick = async (sort: string) => {
    setDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));

    const games = await getAll({ sort, dir });

    setGames(games);
  };

  const fetchGames = async () => {
    const data = await getAll({});
    setGames(data);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  /*  const handleDelete = async (id: string): Promise<boolean> =>{
    try{
      await remove(id);
      toast.success('Game excluded with success')
      fetchGames();
      return true;
    } catch (error){
      toast.error('Error excluding game')
      return false
    }
  } */

  return (
    <div>
      <div className={style.gamepage}>
        <Header title='Games' buttonText='NEW GAME' createForm={<CreateGame />}>
          <GameFilters onSearch={() => {}} onClear={() => {}} />
        </Header>
        <HeaderList fields={headers} onSortClick={handleSortClick} />

        {games.map((game, index) => (
          <ListItems
            key={index}
            imageUrl={game.image_url}
            camp1={game.title}
            camp2={game.category}
            camp3={formatDate(String(game.createdAt))}
            iconDetails
            iconEdit
            iconDelete
            iconStar
            detailsForm={
              <DetailsGame
                game={game}
                /* deleteForm={
                  <DeleteModal 
                    type='game'
                    onCancel={() => {}}
                    onDelete={() => false}
                  />
                }  */
                updateForm={<UpdateGame game={game} onCreated={fetchGames} />}
              />
            }
            editForm={<UpdateGame game={game} onCreated={fetchGames} />}
            /* deleteForm={
              <DeleteModal
                type='game'
                onCancel={() => {}}
                onDelete={() => {}}
              />
            } */
            onStarClick={() => console.log('Star', index)}
          />
        ))}
      </div>
    </div>
  );
}
