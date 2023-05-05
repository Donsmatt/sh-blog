import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
const Register = () => {
  const navigate = useNavigate()

  const [errMessage, setErrMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    gender: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Clicked");

    fetch("https://blog.shbootcamp.com.ng/signup.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === "error") {
          setErrMessage(data.message);
          setTimeout(() => {
            setErrMessage("");
          }, 3000);
        } else {
          setSuccessMessage(data.message);
          setTimeout(() => {
            navigate("/login");
            setInputs({
              username: "",
              email: "",
              gender: "",
              password: "",
            });
          }, 3000);
        }
        console.log(data, inputs);
      });
  };

  return (
    <div className="tommy bg-gradient-to-br from-purple-600 to-purple-950">
      <h1 className="t-h1 text-white">Register</h1>
      <form className="t-form">
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          className="t-input"
          onChange={handleChange}
        />
        <input
          required
          type="text"
          placeholder="email"
          name="email"
          className="t-input"
          onChange={handleChange}
        />
        <select name="gender" onChange={handleChange} className="t-input">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          className="t-input"
          onChange={handleChange}
        />
        <div className="text-center">
          <Button text="SIGNUP" onClick={handleSubmit} />
        </div>
        <p className="text-sm text-center text-red-600">{errMessage}</p>
        <p className="text-sm text-center text-green-600">{successMessage}</p>
        <span className="t-span">
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
