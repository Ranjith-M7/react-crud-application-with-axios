import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Update() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/" + id)
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put("http://localhost:3000/users/" + id, values).then((res) => {
      setValues(res);
      navigate("/");
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className=" bg-white w-50 border shadow rounded p-5">
        <h1 className="mb-3">Update User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter name"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter Phone"
              value={values.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            />
          </div>

          <button className="btn btn-sm btn-success me-2">Update</button>
          <Link to="/" className="btn btn-sm btn-primary">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Update;
