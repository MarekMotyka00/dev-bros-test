import React from 'react';
import { Link } from 'react-router-dom';

type PokemonListItemProps = {
  name: string;
  pokemonId: number;
};

function PokemonListItem(props: PokemonListItemProps) {
  const baseImgUrl = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';
  const { name, pokemonId } = props;
  return (
    <Link to={`/pokemon/${pokemonId}`} className='rounded-lg flex flex-col'>
      <div className='bg-white p-10'>
        <img src={`${baseImgUrl + pokemonId.toString().padStart(3, '0')}.png`} alt='' className='mx-auto' />
      </div>
      <div className='bg-[#FF3E4E] py-6 px-10 text-center text-white flex justify-center items-center'>{name}</div>
    </Link>
  );
}

export default PokemonListItem;
