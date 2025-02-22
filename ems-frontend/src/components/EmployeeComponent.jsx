import React, { useEffect, useState } from "react";
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();

  // Fetch employee data if updating
  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error("Error fetching employee:", error);
        });
    }
  }, [id]);

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };
      console.log("Sending Employee Data:", employee);

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log("Updated Employee:", response.data);
            navigate("/employees");
          })
          .catch((error) => {
            console.error("Error updating employee:", error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log("Created Employee:", response.data);
            navigate("/employees");
          })
          .catch((error) => {
            console.error("Error creating employee:", error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = {};

    if (!firstName.trim()) {
      errorsCopy.firstName = "First Name is Required";
      valid = false;
    }

    if (!lastName.trim()) {
      errorsCopy.lastName = "Last Name is Required";
      valid = false;
    }

    if (!email.trim()) {
      errorsCopy.email = "Email is Required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    return <h2 className="text-center">{id ? "Update Employee" : "Add Employee"}</h2>;
  }

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form onSubmit={saveOrUpdateEmployee}>
              <div className="form-group mb-2">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter your First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter your Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <button className="btn btn-success" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
