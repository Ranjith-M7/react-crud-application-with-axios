import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      axios
        .delete("http://localhost:3000/users/" + id)
        .then((res) => location.reload())
        .catch((err) => console.log(err));
    }
  };

  const Filter = (event) => {
    setRecords(
      data.filter((f) =>
        f.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100 ">
      <h1>List of users</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-between mb-3">
          <input
            type="text"
            placeholder="search"
            className="form-control w-25"
            onChange={Filter}
          />
          <Link to={"/create"} className="btn btn-success">
            Add +
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.phone}</td>
                <td>
                  <Link
                    to={`/read/${d.id}`}
                    className="btn btn-sm btn-info mx-1"
                  >
                    Read
                  </Link>
                  <Link
                    to={`update/${d.id}`}
                    className="btn btn-sm btn-primary mx-1"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger mx-1"
                    onClick={(e) => handleDelete(d.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
