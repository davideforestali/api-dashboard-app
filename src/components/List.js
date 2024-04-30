import React, { useContext } from "react";
import BookContext from "../contexts/BookContext";

const List = () => {
  const {
    books,
    booksLoading,
    handleNextPage,
    handlePreviousPage,
    currentPage,
  } = useContext(BookContext);

  if (booksLoading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="list-container">
      <ul className="item-list">
        {books?.map((book) => (
          <li key={book.key}>
            {book.isbn && book.isbn.length > 0 ? (
              <a
                href={`/details/${book.isbn[0]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-text"
              >
                {book.title}
              </a>
            ) : (
              <span>{book.title} (No ISBN)</span>
            )}
          </li>
        ))}
      </ul>
      <div>
        <button
          className="navigation-button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button className="navigation-button" onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default List;
