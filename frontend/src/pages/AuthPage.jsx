import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role,setRole]= useState("accountant");
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setSubmitting(true);
      if (isLogin) {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}users/login`,
          { email, password }
        );
        
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.role);
          navigate("/analytics");
          toast.success(res.data.message);
        }else{
          toast.error(res.data.message || "Login failed" );
        }
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}users/register`,
          { name, email, password,role }
        );
        toast(res.data.message || "Registration successful, please login");
        if (res.data.success) {
          setIsLogin(true);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 flex items-center justify-center px-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Finance Team Login" : "Finance Team Signup"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
            type="text"
            placeholder="Name"
            className={
              `w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500` 
            }
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <select name="role" id="role" className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500`  }
              value={role}
              onChange={(e)=>setRole(e.target.value)}>
            <option value="accountant">Finance Team</option>
            <option value="manager">Manager</option>
          </select>
            </>
          )}
          
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={submitting}
            className={`relative px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow w-full transition duration-300${
              submitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }`}
          >
            {submitting ? (
              <div className="flex items-center justify-center gap-2">
                <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </div>
            ) : isLogin ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
