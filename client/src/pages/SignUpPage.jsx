import { useState } from "react";
import { useUserStore } from "../stores/useUserStore.js";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    userName:"",
    password:"",
    email:"",
  });

  const { signUp } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl shadow-lg max-w-md bg-gray-800 p-8 w-full"
      >
        <h2 className="text-center text-xl text-white mb-8">signUp</h2>
        <div className="mb-6">
          <label className="block text-white">UserName</label>
          <input
            className="text-white w-full px-4 py-2 bg-gray-800 rounded border border-cyan-400 focus:outline-none focus:ring focus:ring-cyan-400"
            type="text"
            value={formData.userName}
            placeholder="UserName"
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <label className="block text-white">Email</label>
          <input
            className="text-white w-full px-4 py-2 bg-gray-800 rounded border border-cyan-400 focus:outline-none focus:ring focus:ring-cyan-400"
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <label className="block text-white">Password</label>
          <input
            className="text-white w-full px-4 py-2 bg-gray-800 rounded border border-cyan-400 focus:outline-none focus:ring focus:ring-cyan-400"
            type="Password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-xl text-white cursor-pointer bg-cyan-500 hover:bg-cyan-600 font-semibold transition-colors"
        >
          signup
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
