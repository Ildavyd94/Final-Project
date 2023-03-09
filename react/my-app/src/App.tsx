import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./index.scss";
import { useAppDispatch } from "./app/hooks";
import Home from "./pages/Home";
import SinglePage from "./pages/SinglePage";
import Header from "./components/Header/Header";
import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/Register/Register";
import Footer from "./components/Footer/Footer";
import { useAppSelector } from "./app/hooks";
import { fetchRefresh, isLogin } from "./appSlices/SignInSlice";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const DarkTheme = useAppSelector((state) => state.Theme);
  const isLoggedIn = useAppSelector((state) => state.User.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && JSON.parse(user).refresh) {
      dispatch(fetchRefresh({ refresh: JSON.parse(user).refresh }));
    }
    const verifyInterval = setInterval(() => {
      if (user && JSON.parse(user).refresh) {
        dispatch(fetchRefresh({ refresh: JSON.parse(user).refresh }));
      }
    }, 300000);

    return () => clearInterval(verifyInterval);
  }, [dispatch]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && JSON.parse(user).access && isLoggedIn) {
      dispatch(isLogin(JSON.parse(user).access));
    }
  }, [dispatch, isLoggedIn]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isShows, setisShows] = useState(false);

  return (
    <div className={DarkTheme ? "dark" : "light"}>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isShows={isShows}
        setisShows={setisShows}
      />
      <Routes>
       
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/registration" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route
            index
            path="/*"
            element={<Home isShows={isShows} searchTerm={searchTerm} />}
          />
          <Route path="/posts/:id" element={<SinglePage />} />
        </Route>
        
        
      </Routes>

      <Footer />
    </div>
  );
}

export default App;