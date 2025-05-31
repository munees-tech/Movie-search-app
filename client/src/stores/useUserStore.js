import axios from "../utils/axios.js";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useUserStore = create((set) => ({
  isLoading: false,
  user: null,
  chackingAuth: false,

  signUp: async ({ userName, password, email }) => {
    set({ isLoading: true });
    try {
      const res = await axios.post("/auth/signup", {
        userName,
        password,
        email,
      });
      set({ user: res.data });
      toast.success("Account created succesfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async ({ email, password }) => {
    set({ isLoading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data });
      toast.success("Login Succesfull");
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: false });
    try {
      await axios.post("/auth/logout");
      set({ user: null });
      toast.success("Logout Succesfull");
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async ({ profilePic }) => {
    set({ isLoading: true });
    try {
      const res = await axios.put("/auth/update-profile", { profilePic });
      set({ user: res.data, isLoading: false });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  chackAuth: async () => {
    set({ isLoading: false });
    try {
      const res = await axios.get("/auth/me");
      set({ user: res.data, chackingAuth: false });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
