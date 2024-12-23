import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Book_UpDateForm() {
  const [state, setState] = useState({
    booktitle: "",
    author: "",
    formate: "",
    Topic: "",
    PubYear: 1990,
  });

  const url = "http://localhost:5000/"; // Ensure this matches the backend port
  const params = useParams();

  // Handle changes to form inputs
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  // Fetch book data when the component is mounted
  useEffect(() => {
    axios
      .get(url + "getbook/" + params.id)
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => {
        console.log("Error occurred while fetching book data");
      });
  }, [params.id]);

  // Handle form submission
  const OnSubmit = (e) => {
    e.preventDefault();
    const bookdata = {
      booktitle: state.booktitle,
      PubYear: state.PubYear,
      author: state.author,
      Topic: state.Topic,
      formate: state.formate,
    };

    // Send POST request to update the book
    axios
      .post(url + "updatebook/" + params.id, bookdata)
      .then((res) => {
        console.log("Book updated successfully", res.data);
      })
      .catch((err) => {
        console.log("Error occurred during book update:", err);
      });
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Update Book Id: {state.booktitle}</h3>
      <form onSubmit={OnSubmit}>
        <div className="form-group">
          <label>Book Title: </label>
          <input
            className="form-control"
            type="text"
            name="booktitle"
            value={state.booktitle}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Book Authors: </label>
          <input
            className="form-control"
            name="author"
            value={state.author}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>
            Pick Book topic:{" "}
            <select
              className="form-control"
              name="Topic"
              value={state.Topic}
              onChange={handleChange}
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Programming">Programming</option>
              <option value="Data Science">Data Science</option>
              <option value="AI">AI</option>
              <option value="Engineering">Engineering</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>Format: </label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-label"
              type="radio"
              name="formate"
              value="Hard Copy"
              checked={state.formate === "Hard Copy"}
              onChange={handleChange}
            />
            <label className="form-check-label"> Hard Copy </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-label"
              type="radio"
              name="formate"
              value="Electronic Copy"
              checked={state.formate === "Electronic Copy"}
              onChange={handleChange}
            />
            <label className="form-check-label"> Electronic Copy</label>
          </div>
        </div>

        <br />
        <label>
          Publication Year (between 1980 and 2025):
          <input
            type="range"
            name="PubYear"
            min="1980"
            max="2025"
            value={state.PubYear}
            onChange={handleChange}
          />
        </label>
        <center>
          <div className="form-group">
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
        </center>
      </form>
    </div>
  );
}

export default Book_UpDateForm;
