import { useState, useEffect } from 'react'
import { ProductCard } from '../../../components/Elements/ProductCard'

export const FeaturedProducts = () => {
  const [featuredBooks, setfeaturedBook] = useState([]);
  useEffect(() => {
    async function fetchFeaturedBook() {
      const response = await fetch('https://localhost:44347/api/Book/featured');
      const data = await response.json();

      setfeaturedBook(data);
    }
    fetchFeaturedBook();

  }, [])
  return (
    <section className="my-20">
      <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">Featured eBooks</h1>
      <div className="flex flex-wrap justify-center lg:flex-row">
        {
          featuredBooks.map((book) => (

            < ProductCard book={book} key={book.id} />
          ))
        }


      </div>
    </section>
  )
}
