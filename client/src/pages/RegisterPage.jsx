import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful");
    } catch (err) {
      alert("Registeration failed.Please try again");
    }
  };
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-28">
        <h1 className="text-2xl text-center mb-4 font-semibold">Register</h1>
        <form className="max-w-sm mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="yourpassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary my-2 hover:scale-105 transition">
            Register
          </button>
          <div className="flex items-center justify-center gap-2">
            <div className="text-center py-2">
              Already Registered?
              <Link to={"/login"} className="underline ml-2">
                Login
              </Link>
            </div>
          </div>
        </form>
        <div className="flex items-center gap-16 bg-white border py-1 mt-4 rounded-lg shadow-sm hover:shadow-lg cursor-pointer ">
          <FcGoogle className="w-8 h-8 left-0" />
          <p className="text-center justify-center">Continue with Google</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
