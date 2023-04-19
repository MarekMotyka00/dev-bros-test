import { gql, useQuery } from '@apollo/client';

type PaginationProps = { currentPage: number; search: string; pokemonsToShow: number; setPage: Function };

export default function Pagination(props: PaginationProps) {
  const { currentPage, search, pokemonsToShow, setPage } = props;
  // get all pokemons for pagination
  const POKEMONS_FULL_LIST_QUERY = gql`
    query samplePokeAPIquery {
      pokemon_v2_pokemon(
        where: {
          pokemon_v2_pokemonspecy: { pokemon_v2_generation: { name: { _eq: "generation-i" } } }
          pokemon_v2_pokemonforms: { form_name: { _eq: "" } }
          ${search ? `name: { _ilike: "%${search}%" }` : ''}
        }
      ) {
        name
        id
      }
    }
  `;
  const { data, loading, error } = useQuery(POKEMONS_FULL_LIST_QUERY);
  if (loading) return <div>Loading...</div>;
  const maxPage = Math.ceil(data.pokemon_v2_pokemon.length / pokemonsToShow);
  let paginationNumbers = [];
  if (maxPage <= 3) {
    console.log('first');
    for (let i = 1; i < maxPage - 1; i++) {
      paginationNumbers[i] = i + 1;
    }
  } else if (currentPage < maxPage - 3 && currentPage >= 3) {
    console.log('second');
    for (let i = currentPage - 2; i < currentPage + 1; i++) {
      paginationNumbers[i] = i + 1;
    }
  } else if (currentPage > maxPage - 4 && currentPage <= maxPage - 1) {
    console.log('third');
    for (let i = currentPage - 2; i < currentPage + 1; i++) {
      paginationNumbers[i] = i + 1;
    }
  } else {
    if (currentPage >= maxPage - 1) {
      console.log('before last');
      for (let i = maxPage - 3; i < maxPage - 1; i++) {
        paginationNumbers[i] = i + 1;
      }
    } else if (currentPage < 3 && currentPage > 1) {
      for (let i = currentPage; i < currentPage + 2; i++) {
        paginationNumbers[i] = i;
      }
    } else {
      console.log('last');
      for (let i = currentPage; i < currentPage + 2; i++) {
        paginationNumbers[i] = i + 1;
      }
    }
  }
  if (maxPage > 1) {
    return (
      <div className='flex w-full justify-center items-center py-8 gap-4'>
        <button className='text-[#555555]' type='button' onClick={() => (currentPage > 1 ? setPage(currentPage - 1) : null)}>
          Prev
        </button>
        <button
          className={`${currentPage === 1 ? 'border-2 border-[#1D1D1D] rounded-lg p-2' : 'text-[#555555]'} w-10 h-10 leading-none`}
          type='button'
          onClick={() => setPage(1)}>
          1
        </button>
        {currentPage > 3 && <span className='text-[#555555]'>...</span>}
        {paginationNumbers.map((number) => (
          <button
            type='button'
            className={`${currentPage === number ? 'border-2 border-[#1D1D1D] rounded-lg p-2' : 'text-[#555555]'} w-10 h-10 leading-none`}
            onClick={() => setPage(number)}>
            {number}
          </button>
        ))}
        {currentPage + 2 < maxPage && <span className='text-[#555555]'>...</span>}
        <button
          className={`${currentPage === maxPage ? 'border-2 border-[#1D1D1D] rounded-lg p-2' : 'text-[#555555]'} w-10 h-10 leading-none`}
          type='button'
          onClick={() => setPage(maxPage)}>
          {maxPage}
        </button>
        <button className='text-[#555555]' type='button' onClick={() => (currentPage >= maxPage ? null : setPage(currentPage + 1))}>
          Next
        </button>
      </div>
    );
  } else {
    return null;
  }
}
