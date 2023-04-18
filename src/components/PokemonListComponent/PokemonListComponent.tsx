import React from 'react';
import PokemonListItem from '../PokemonListItem/PokemonListItem';
import { gql, useQuery } from '@apollo/client';

type PokemonItem = {
  id: number;
  name: string;
};

const pokemonsToShow = 12;
const page = 0;

export default function PokemonListComponent(props: any) {
  const { search } = props;
  // TODO debounce
  const POKEMONS_QUERY = gql`
  query samplePokeAPIquery {
    pokemon_v2_pokemon(
      where: {
        pokemon_v2_pokemonspecy: { pokemon_v2_generation: { name: { _eq: "generation-i" } } }
        pokemon_v2_pokemonforms: { form_name: { _eq: "" } }
        ${search ? `name: { _ilike: "%${search}%" }` : ''}
      }
      limit: ${pokemonsToShow}
      offset: ${page * pokemonsToShow}
    ) {
      name
      id
    }
  }
`;
  const { data, loading, error } = useQuery(POKEMONS_QUERY);
  console.log(data);
  if (loading) return <div>Loading...</div>;
  return (
    <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-4'>
      {data.pokemon_v2_pokemon.map((item: PokemonItem) => (
        <PokemonListItem name={item.name} key={item.id} pokemonId={item.id} />
      ))}
    </div>
  );
}
