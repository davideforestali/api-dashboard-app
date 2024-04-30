import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  // books
  const [booksByPage, setBooksByPage] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [booksLoading, setBooksLoading] = useState(false);

  // dashboard
  const [featuredAuthors, setFeaturedAuthors] = useState([]);
  const [languageDistribution, setLanguageDistribution] = useState([]);
  const [dashboardLoading, setDashboardBooksLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!booksByPage[currentPage]) {
        setBooksLoading(true);
        try {
          const response = await axios.get(
            `https://openlibrary.org/search.json?q=books&page=${currentPage}&limit=${booksPerPage}`
          );
          setBooksByPage((prev) => ({
            ...prev,
            [currentPage]: response.data.docs, 
          }));
        } catch (error) {
          console.error("Error fetching books:", error);
        }
        setBooksLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage, booksByPage, booksPerPage]);

  useEffect(() => {
    setDashboardBooksLoading(true);
    axios
      .get("https://openlibrary.org/search.json?q=books&limit=50")
      .then((response) => {
        const authorsCount = {};
        const languagesCount = {};

        response.data.docs.forEach((book) => {
          if (book.author_name) {
            book.author_name.forEach((author) => {
              authorsCount[author] = (authorsCount[author] || 0) + 1;
            });
          }

          if (book.language) {
            book.language.forEach((lang) => {
              languagesCount[lang] = (languagesCount[lang] || 0) + 1;
            });
          }
        });

        const sortedAuthors = Object.entries(authorsCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5); // top 5 authors
        setFeaturedAuthors(sortedAuthors);

        const sortedLanguages = Object.entries(languagesCount).sort(
          (a, b) => b[1] - a[1]
        );
        setLanguageDistribution(sortedLanguages);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      })
      .finally(() => {
        setDashboardBooksLoading(false);
      });
  }, []);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <BookContext.Provider
      value={{
        books: booksByPage[currentPage] || [],
        booksLoading,
        handleNextPage,
        handlePreviousPage,
        currentPage,
        featuredAuthors,
        languageDistribution,
        dashboardLoading,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookContext;
