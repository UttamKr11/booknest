import { useState, useEffect } from 'react';
import { ProductCard } from '../../components/Elements/ProductCard'
import { FilterBar } from './components/FilterBar';
import { useTitle } from '../../hooks/useTitle';
import { useFilter } from '../../context/FilterContext';

export const ProductsList = (book) => {
  const [show, setShow] = useState(false);
  const handleShowFilter = () => (
    setShow(!show)
  );

  const { booksList, initBooks } = useFilter();
  useTitle("Explore our collection at ");
  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch('https://localhost:44347/api/Book');
      const data = await response.json();
      initBooks(data);
    }

    fetchBooks();
  }, [initBooks])

  return (
    <main>
      <section className="my-5">
        <div className="my-5 flex justify-between">
          <span className="text-2xl font-semibold dark:text-slate-100 mb-5">All eBooks ({booksList.length})</span>
          <span>
            <button onClick={() => handleShowFilter()} id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700" type="button">
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
            </button>
          </span>
        </div>

        <div className="flex flex-wrap justify-center lg:flex-row">
          {
            booksList.map((book) => (

              < ProductCard book={book} key={book.id} />
            ))
          }
        </div>
      </section>
      {
        (show && <FilterBar setShow={setShow} />)
      }

    </main>
  )
}
