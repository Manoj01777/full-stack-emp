import { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees()
  }, []);
  function getAllEmployees()
  {
    listEmployees()
    .then((response) => {
      console.log("Fetched Employees:", response.data); // Debugging log
      setEmployees(response.data);
    })
    .catch((error) => {
      console.error("Error fetching employees:", error);
    });
  }

  function addNewEmployee() {
    navigate("/add-employee");
  }

  function updateEmployee(id) {
    navigate(`/update-employee/${id}`);
  }
  function removeEmployee(id) {
    console.log(id);
    deleteEmployee(id).then((response)=>
    {
      getAllEmployees();
    }).catch(error=>
    {
      console.error(error);
      
    }
    )
    
  }

  return (
    <div className="container">
      <h2>List of Employees</h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>
                  <button className="btn btn-info" onClick={() => updateEmployee(employee.id)} > Update</button>
                  <button
                    className="btn btn-danger" style={{marginLeft:'10px'}}
                    onClick={() => removeEmployee(employee.id)} > Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
