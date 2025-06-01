import HomePage from "./pages/HomePage";
import Movies from "./components/Movies";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import Loading from "./components/Loading";
import ProfilePage from "./pages/ProfilePage"

const App = () => {
  const { user , chackAuth , chackingAuth } = useUserStore();

  useEffect(() => {
    chackAuth();
  }, [chackAuth]);

  if (chackingAuth) return <Loading />;
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to={'/login'}/>} />
        <Route path="/me" element={user ? <ProfilePage /> : <Navigate to={'/login'} />}/>
        <Route path="/movies/:id" element={user ? <Movies />  : <Navigate to={'/login'}/>} />
        <Route path="/login" element={!user ? <LoginPage />:<Navigate to={'/'}/>}/>
        <Route path="/signup" element={!user ? <SignUpPage />:<Navigate to={'/'}/>} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
