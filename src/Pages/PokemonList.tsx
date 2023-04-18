import { gql, useQuery } from '@apollo/client';
import React, { useRef } from 'react';
import PokemonListItem from '../components/PokemonListItem/PokemonListItem';

const POKEMONS_QUERY = gql`
  query samplePokeAPIquery {
    pokemon_v2_pokemon(
      where: { pokemon_v2_pokemonsprites: { pokemon_v2_pokemon: { pokemon_v2_pokemonspecy: { generation_id: { _eq: 1 } } } } }
    ) {
      id
      pokemon_v2_pokemonsprites {
        pokemon_id
        sprites
        pokemon_v2_pokemon {
          name
        }
      }
    }
  }
`;

type PokemonItem = {
  id: number;
  pokemon_v2_pokemonsprites: Array<{ sprites: string; pokemon_v2_pokemon: { name: string } }>;
};

function PokemonList() {
  const { data, loading, error } = useQuery(POKEMONS_QUERY);
  const searchRef = useRef(null);
  if (loading) return <div>Loading...</div>;
  console.log(data.pokemon_v2_pokemon);
  const handleSearch = () => {
    //TODO
  };
  return (
    <section>
      <div className='layout'>
        <form action='' className='mx-auto'>
          <input type='text' name='search' id='search' onInput={handleSearch} ref={searchRef} />
        </form>
        <div className='flex flex-col justify-between items-start'>
          <h4 className='text-black mb-2'>Výsledky vyhledávání</h4>
          <button type='button' className='bg-none border-none outline-none underline text-red-600'>
            Smazat filtry
          </button>
        </div>
        <div className='grid'>
          {data.pokemon_v2_pokemon.map((item: PokemonItem) => (
            <PokemonListItem
              name={item.pokemon_v2_pokemonsprites[0].pokemon_v2_pokemon.name}
              imgSrc={JSON.parse(item.pokemon_v2_pokemonsprites[0].sprites)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PokemonList;
