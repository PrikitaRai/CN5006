import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayData from './DisplayData';

export default function FncDisplayBooks() {
  const [Books, setBooks] = useState([]);
  const url = "http://localhost:5000/allbooks"; // Backend URL

  useEffect(() => {
    axios.get(url)
      .then(res => setBooks(res.data)) // Set the data into Books state
      .catch(err => console.log("Error occurred while fetching books:", err));
  }, []);

  return (
    <div>
      <DisplayData Books={Books} />
    </div>
  );
}
