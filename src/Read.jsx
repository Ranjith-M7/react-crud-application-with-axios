import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Read() {
  const { id } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100 bg-light">
      <div className="bg-white w-50 rounded border shadow p-5">
        <h1>Detail of user</h1>
        <div className="mb-3">{data.name}</div>
        <div className="mb-3">{data.email}</div>
        <div className="mb-3">{data.phone}</div>
        <Link to={"/update/" + id} className="btn btn-sm btn-success me-2">
          Edit
        </Link>
        <Link to="/" className="btn btn-sm btn-primary">
          Back
        </Link>
      </div>
    </div>
  );
}

export default Read;
