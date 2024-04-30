import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tabs from './components/Tabs';
import Details from './components/Details';
import './App.css'
import { BookProvider } from './contexts/BookContext';

function App() {
  return (
    <BookProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Tabs />} />
          <Route path="/details/:isbn" element={<Details />} />
        </Routes>
      </Router>
    </BookProvider>
  );
}

export default App;
