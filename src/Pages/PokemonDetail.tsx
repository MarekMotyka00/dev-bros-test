import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { gql, useQuery } from '@apollo/client';

function PokemonDetail() {
  const { pokemonId } = useParams();
  const POKEMON_DETAIL_QUERY = gql`
    query samplePokeAPIquery {
      pokemon_v2_pokemon(where: { id: { _eq: ${pokemonId} } }) {
        name
        id
        height
        weight
        pokemon_v2_pokemonabilities {
          pokemon_v2_ability {
            name
          }
        }
        pokemon_v2_pokemonstats {
          base_stat
          pokemon_v2_stat {
            name
          }
        }
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
    }
  `;
  const [activeTab, setActiveTab] = useState('profile');
  const { data, loading } = useQuery(POKEMON_DETAIL_QUERY);
  if (loading) return <div>Loading...</div>;
  const baseImgUrl = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';
  return (
    <section className='bg-blue-300 min-h-screen py-10'>
      <div className='layout'>
        <Link className='mb-4 block' to='/'>
          Zpět na přehled
        </Link>
        <nav className='flex justify-center gap-4'>
          <button
            type='button'
            className={`bg-white transition-all text-[#FF3E4E] py-6 px-8 ${activeTab !== 'profile' ? 'opacity-70 translate-y-3' : ''}`}
            onClick={() => setActiveTab('profile')}>
            Profil
          </button>
          <button
            type='button'
            className={`bg-white transition-all text-[#FF3E4E] py-6 px-8 ${activeTab !== 'stats' ? 'opacity-70 translate-y-3' : ''}`}
            onClick={() => setActiveTab('stats')}>
            Statistiky
          </button>
        </nav>
        <div className='flex flex-col gap-8 items-center bg-white rounded-lg p-8 max-w-5xl mx-auto sm:flex-row'>
          <div className='flex flex-col rounded-lg p-10 border'>
            <h1 className='text-[#FF3E4E] mb-10 text-2xl text-center capitalize'>{data.pokemon_v2_pokemon[0].name}</h1>
            <img src={`${baseImgUrl + data.pokemon_v2_pokemon[0].id.toString().padStart(3, '0')}.png`} alt='' />
          </div>
          {activeTab === 'profile' && (
            <div className='flex flex-col w-full max-w-[150px]'>
              <div className='flex flex-col w-full gap-y-4 mb-8'>
                <div className='flex justify-between items-center w-full'>
                  <span className='p-2 rounded-lg bg-[#FF3E4E1A] text-center font-bold'>Typ</span>
                  <span>{data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name}</span>
                </div>
                <div className='flex justify-between items-center w-full'>
                  <span className='p-2 rounded-lg bg-[#FF3E4E1A] text-center font-bold'>Výška</span>
                  <span>{data.pokemon_v2_pokemon[0].height}0 cm</span>
                </div>
                <div className='flex justify-between items-center w-full'>
                  <span className='p-2 rounded-lg bg-[#FF3E4E1A] text-center font-bold'>Váha</span>
                  <span>{data.pokemon_v2_pokemon[0].weight}00 g</span>
                </div>
              </div>
              <div className='flex flex-col'>
                <span className='p-2 rounded-lg bg-[#FF3E4E1A] text-center font-bold mb-2'>Dovednosti</span>
                <ul>
                  {data.pokemon_v2_pokemon[0].pokemon_v2_pokemonabilities.map((ability: any) => (
                    <li>{ability.pokemon_v2_ability.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {activeTab === 'stats' && (
            <div className='flex flex-col gap-y-4 w-full'>
              {data.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats.map((stat: any) => (
                <div className='flex flex-col items-start gap-2 w-full justify-between md:flex-row md:items-center md:gap-10 md:max-w-lg'>
                  <span className='font-bold text-2xl'>{stat.pokemon_v2_stat.name}</span>
                  <ProgressBar progressPercentage={stat.base_stat}></ProgressBar>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PokemonDetail;
