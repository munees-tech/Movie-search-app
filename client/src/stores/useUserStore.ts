import axios from "../utils/axios.js";
import { create } from "zustand";
import { toast } from "react-hot-toast";

interface User {
  userName: string;
  email: string;
  profilepic: string;
}

interface UserStore {
  isLoading: boolean;
  user: User | null;
  chackingAuth: boolean;
  signUp:(data:{userName:string,password:string,email:string}) => Promise<void>;
  login:(data: {email:string , password:string}) => Promise<void>;
  logout:()=>Promise<void>;
  updateProfile:(data:{profilePic:string}) => Promise<void>;
  chackAuth:() => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
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
    } catch (error:any) {
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
    } catch (error:any) {
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
    } catch (error:any) {
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
    } catch (error:any) {
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
    } catch (error:any) {
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
