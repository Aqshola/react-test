import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Note from "./pages/Note";
import { useEffect } from "react";
import supabase from "./supa/supabase";
import useStore from "./store/zs";
import "antd/dist/antd.css";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/Route/PrivateRoute";
import PublicRoute from "./components/Route/PublicRoute";
import Navbar from "./components/Nav/Navbar";
import useLogout from "./hooks/auth/useLogout";

function App() {
  const setLogin = useStore((state) => state.login);
  const [logout]=useLogout()
  
  useEffect(() => {
    let currSession = supabase.auth.session();
    if (currSession) {
      setLogin(currSession.user);
    } else {
      logout()
    }
  }, [setLogin, logout]);

  
  return (
    <>
      <Navbar />
      <div style={{ padding: "25px" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="signup"
                element={
                  <PublicRoute>
                    <SignUp />
                  </PublicRoute>
                }
              />
              <Route
                path="note/:id"
                element={
                  <PrivateRoute>
                    <Note />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
