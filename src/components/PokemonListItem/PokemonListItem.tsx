import React from 'react';

type PokemonListItem = {
  name: string;
  imgSrc: {
    front_default: string;
  };
};

function PokemonListItem(props: PokemonListItem) {
  const { name, imgSrc } = props;
  return (
    <div className='rounded-lg flex flex-col'>
      <div className='bg-white p-10'></div>
    </div>
  );
}

export default PokemonListItem;
