import HeroImage from "../components/HeroImage";
import BookCard from "../components/BookCard";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../app/features/book";

const HomePage = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);
  console.log(books.map((book) => book.title || "emoty"));
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <HeroImage />

      <section className=" max-w-[1024px] px-8 lg:px-0 bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mx-auto mt-12 gap-y-6 gap-x-5 pb-12">
        {loading && <p className="text-center text-3xl">Loading books...</p>}
        {error && <p className="text-center text-3xl">Something Went Wrong</p>}
        {!loading && !error && (
          <>
            {" "}
            {books.map((book) => (
              <BookCard key={book._id} title={book.title} />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default HomePage;
