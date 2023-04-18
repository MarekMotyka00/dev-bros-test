import React from 'react';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import PokemonList from './Pages/PokemonList';
import PokemonDetail from './Pages/PokemonDetail';

function App() {
  return (
    <div className='App'>
      <Header></Header>
      <Routes>
        <Route path='/' element={<PokemonList />}></Route>
        <Route path='/:pokemonName' element={<PokemonDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
