import React, { useState } from 'react';
import PokemonListComponent from '../components/PokemonListComponent/PokemonListComponent';

function PokemonList() {
  const [search, setSearch] = useState('');
  return (
    <section className='bg-blue-300 h-screen'>
      <div className='layout'>
        <form action='' className='flex justify-center py-10'>
          <input
            type='text'
            className='outline-none w-[300px] py-2 px-6'
            name='search'
            id='search'
            onChange={(e) => setSearch(e.target.value)}
            placeholder='search'
          />
        </form>
        <div className='flex flex-col justify-between items-start md:flex-row'>
          <h4 className='text-black mb-2'>Výsledky vyhledávání</h4>
          <button type='button' className='bg-none border-none outline-none underline text-red-600'>
            Smazat filtry
          </button>
        </div>
        <PokemonListComponent search={search}></PokemonListComponent>
      </div>
    </section>
  );
}

export default PokemonList;
