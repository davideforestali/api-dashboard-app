import React, { useContext } from "react";
import BookContext from "../contexts/BookContext";

const Dashboard = () => {
  const { featuredAuthors, languageDistribution, dashboardLoading } =
    useContext(BookContext);

  if (dashboardLoading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="dashboard-container">
      <h2 className="section-header">Dashboard</h2>
      <h3>Featured Authors</h3>
      {featuredAuthors.length > 0 ? (
        <ul className="item-list">
          {featuredAuthors.map(([author, count], index) => (
            <li key={index}>
              {author} - {count} books
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-data-text">No featured authors found.</p>
      )}
      <h3>Language Distribution</h3>
      {languageDistribution.length > 0 ? (
        <ul className="item-list">
          {languageDistribution.map(([language, count], index) => (
            <li key={index}>
              {language.toUpperCase()} - {count} books
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-data-text">No data on book languages available.</p>
      )}
    </div>
  );
};

export default Dashboard;
