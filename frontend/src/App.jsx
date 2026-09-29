 import { useState } from "react";
import "./App.css";

function App() {
  const [student, setStudent] = useState({
    name: "",
    rollNo: "",
    dept: "",
    className: "",
    year: "",
    email: "",
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  // Send data to Express backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Student information saved successfully!");

        console.log("Saved student:", data);

        // Clear the form
        setStudent({
          name: "",
          rollNo: "",
          dept: "",
          className: "",
          year: "",
          email: "",
        });
      } else {
        alert(data.message || "Failed to save student");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Cannot connect to backend");
    }
  };

  return (
    <div className="page">
      <div className="login-card">
        <h1>Student Information</h1>

        <p className="subtitle">
          Enter your student details
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              value={student.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Roll No</label>
            <input
              name="rollNo"
              type="text"
              placeholder="Enter your roll number"
              value={student.rollNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Department</label>
            <input
              name="dept"
              type="text"
              placeholder="Enter your department"
              value={student.dept}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Class</label>
            <input
              name="className"
              type="text"
              placeholder="Enter your class"
              value={student.className}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Year</label>
            <input
              name="year"
              type="text"
              placeholder="Enter your year"
              value={student.year}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={student.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default App;