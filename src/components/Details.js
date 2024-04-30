import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Details = () => {
  const [book, setBook] = useState({});
  const { isbn } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://openlibrary.org/isbn/${isbn}.json`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error("Fetching book details failed:", error);
      })
      .finally(() => setLoading(false));
  }, [isbn]);

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="details-container">
      <h1 className="details-header">{book.title}</h1>
      {book.description && (
        <p className="detail-item">
          Description: {book.description.value || book.description}
        </p>
      )}
      {book.number_of_pages && (
        <p className="detail-item">Pages: {book.number_of_pages}</p>
      )}
      {book.publish_date && (
        <p className="detail-item">Publish Date: {book.publish_date}</p>
      )}
      {book.physical_format && (
        <p className="detail-item">Physical Format: {book.physical_format}</p>
      )}
      {book.publishers && (
        <ul className="details-list">
          <strong>Publishers:</strong>
          {book.publishers.map((el, i) => (
            <li key={i}>{el}</li>
          ))}
        </ul>
      )}
      {book.publish_places && (
        <ul className="details-list">
          <strong>Publish Places:</strong>
          {book.publish_places.map((el, i) => (
            <li key={i}>{el}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Details;
