import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DisplayData from './DisplayData';

export default function DeleteBook(props) {
  const [state, setState] = useState([]);
  let params = useParams();

  useEffect(() => {
    console.log("useEffect delete", params.id);
    
    // Send DELETE request to delete the book
    axios.delete("http://localhost:5000/deleteBook/" + params.id)
      .then(res => {
        // Fetch the updated list of books after deletion
        axios.get("http://localhost:5000/allbooks")
          .then(res => {
            setState(res.data);
          })
          .catch(err => {
            console.log("Error occurred while fetching books after deletion");
          });
      })
      .catch(err => {
        console.log("Error occurred while deleting the book");
      });
  }, [params.id]);

  // Log state length after it's updated
  useEffect(() => {
    console.log("Data set in state, state length:", state.length);
  }, [state]);

  return (
    <div>
      <DisplayData Books={state} />
    </div>
  );
}
