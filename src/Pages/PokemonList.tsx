import React, { useRef, useState } from 'react';
import PokemonListComponent from '../components/PokemonListComponent/PokemonListComponent';

function PokemonList() {
  const [search, setSearch] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  return (
    <section className='bg-blue-300 h-screen pt-10'>
      <div className='layout'>
        <form action='' className='flex justify-center mb-10'>
          <input
            ref={searchInputRef}
            type='text'
            className='outline-none w-[300px] py-2 px-6'
            name='search'
            id='search'
            onChange={(e) => setSearch(e.target.value)}
            placeholder='search'
          />
        </form>
        <div className='flex flex-col justify-between mb-4 items-start md:flex-row'>
          <h4 className='text-black mb-2'>Výsledky vyhledávání</h4>
          <button
            type='button'
            className='bg-none border-none outline-none underline text-red-600'
            onClick={() => {
              setSearch('');
              if (searchInputRef.current != null) {
                searchInputRef.current.value = '';
              }
            }}>
            Smazat filtry
          </button>
        </div>
        <PokemonListComponent search={search}></PokemonListComponent>
      </div>
    </section>
  );
}

export default PokemonList;
