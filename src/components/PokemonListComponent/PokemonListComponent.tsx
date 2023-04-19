import React, { useState } from 'react';
import PokemonListItem from '../PokemonListItem/PokemonListItem';
import { gql, useQuery } from '@apollo/client';
import Pagination from './Pagination/Pagination';

type PokemonItem = {
  id: number;
  name: string;
};

export default function PokemonListComponent(props: any) {
  const { search } = props;
  const pokemonsToShow = 12;
  const [page, setPage] = useState(1);
  // TODO debounce

  // get paged list of pokemons with the ability to search
  const POKEMONS_QUERY = gql`
  query samplePokeAPIquery {
    pokemon_v2_pokemon(
      where: {
        pokemon_v2_pokemonspecy: { pokemon_v2_generation: { name: { _eq: "generation-i" } } }
        pokemon_v2_pokemonforms: { form_name: { _eq: "" } }
        ${search ? `name: { _ilike: "%${search}%" }` : ''}
      }
      limit: ${pokemonsToShow}
      offset: ${search ? '0' : (page - 1) * pokemonsToShow}
    ) {
      name
      id
    }
  }
`;

  const { data, loading } = useQuery(POKEMONS_QUERY);
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <div className='layout grid gap-6 mb-8 sm:grid-cols-2 md:grid-cols-4'>
        {data.pokemon_v2_pokemon.map((item: PokemonItem) => (
          <PokemonListItem name={item.name} key={item.id} pokemonId={item.id} />
        ))}
      </div>
      <div className='bg-[#8FFF83] h-28'>
        <Pagination currentPage={page} search={search} pokemonsToShow={pokemonsToShow} setPage={setPage}></Pagination>
      </div>
      <div className='bg-[#6AC663] h-28'></div>
    </>
  );
}
