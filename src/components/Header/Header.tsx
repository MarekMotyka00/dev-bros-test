import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-[#FF3E4E] py-6 text-white'>
      <div className='layout flex justify-between items-center'>
        <Link to='/'>
          <img src='/img/pokeapi_logo.png' alt='' className='w-1/3 sm:w-32' />
        </Link>
        <nav className='flex gap-4'>
          <Link to='/o-nas'>O nás</Link>
          <Link to='/pokemons'>Pokémoni</Link>
        </nav>
      </div>
    </header>
  );
}
