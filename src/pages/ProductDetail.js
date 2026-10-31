import { useEffect, useState } from "react";
import { Rating } from "../components/Elements/Rating"
import { Link, useParams } from "react-router-dom";
import { useTitle } from '../hooks/useTitle';
import { UseCart } from "../context/CartContext";
export const ProductDetail = () => {

  const [book, setBook] = useState({});
  const [isBookAdded, setBookAdded] = useState(false);
  const { id } = useParams();

  const { addBook, removeFromCart, cartList } = UseCart();

  useTitle(book.name)
  useEffect(() => {
    async function getBookById() {
      var response = await fetch(`https://localhost:44347/api/Book/id/${id}`);
      var data = await response.json();
      setBook(data);
    }
    getBookById();

  }, [id])

  useEffect(() => {
    var bookfound = cartList.some(x => x.id === book.id);
    setBookAdded(bookfound)
  }, [cartList, book.id])

  return (
    <main>
      <section>
        <h1 className="mt-10 mb-5 text-4xl text-center font-bold text-gray-900 dark:text-slate-200">{book.name}</h1>
        <p className="mb-5 text-lg text-center text-gray-900 dark:text-slate-200">
          {book.overview}
        </p>
        <div className="flex flex-wrap justify-evenly">
          <div className="max-w-xl my-3">
            <img className="rounded" src={book.poster} alt="" />
          </div>
          <div className="max-w-xl my-3">
            <p className="text-3xl font-bold text-gray-900 dark:text-slate-200">
              <span className="mr-1">$</span>
              <span className="">{book.price}</span>
            </p>
            <p className="my-3">
              <span>
                <Rating rating={book.rating}></Rating>
              </span>
            </p>
            <p className="my-4 select-none">
              {book.bestSeller && (<span className="font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2">BEST SELLER</span>)}
              {
                book.inStock ? (<span className="font-semibold text-emerald-600	border bg-slate-100 rounded-lg px-3 py-1 mr-2">INSTOCK</span>)
                  : (<span className="font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2">OUT OF STOCK</span>)
              }
              <span className="font-semibold text-blue-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2">{book.size} MB</span>
            </p>
            {
              book.inStock ?
                (
                  <p className="my-3">
                    {
                      isBookAdded ? (
                        <button onClick={() => removeFromCart(book)} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800`} >Remove Item <i className="ml-1 bi bi-trash3"></i></button>)
                        :
                        (<button onClick={() => addBook(book)} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800`}  >Add To Cart <i className="ml-1 bi bi-plus-lg"></i></button>)
                    }

                  </p>
                )
                :
                <Link to="/products" type="button" className="inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">Explore in Nest<i className="ml-2 bi bi-book"></i></Link>

            }
            <p className="text-lg text-gray-900 dark:text-slate-200">
              {book.longDescription}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
