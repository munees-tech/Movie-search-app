import { useUserStore } from "../stores/useUserStore.js";
import React, { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import Loading from "../components/Loading.js";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login, isLoading } = useUserStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isLoading) return <Loading />;
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl shadow-lg max-w-md bg-gray-800 p-8 w-full"
      >
        <h2 className="text-center text-xl text-white mb-8">Login</h2>
        <div className="mb-6">
          <div className="flex gap-1.5">
            <MdOutlineMailOutline size={20} className="text-white" />
            <label htmlFor="Email" className="block text-white mb-1.5">
              Email
            </label>
          </div>
          <input
            className="text-white w-full px-4 py-2 bg-gray-800 rounded border border-cyan-400 focus:outline-none focus:ring focus:ring-cyan-400"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <div className="flex gap-1.5">
            <RiLockPasswordLine size={20} className="text-white" />
            <label className="block text-white">Password</label>
          </div>
          <input
            className="text-white w-full px-4 py-2 bg-gray-800 rounded border border-cyan-400 focus:outline-none focus:ring focus:ring-cyan-400"
            type="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-xl text-white cursor-pointer bg-cyan-500 hover:bg-cyan-600 font-semibold transition-colors"
        >
          Login
        </button>
        <div className="text-center text-gray-200">
          <p className="text-base-content/60 mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Create account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
