import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  Navigate
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SearchEvents from "./pages/SearchEvents";
import Event1 from "./pages/Event1";
import PersonalInfoPage from "./pages/PersonalInfoPage";
import CreateEvent from "./pages/CreateEvent";
import MyEvents from "./pages/MyEvents";
import MyAccount from "./pages/MyAccount";

// New PrivateRoute component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('token') !== null; // You might want to use a more robust auth check
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/login":
        title = "";
        metaDescription = "";
        break;
      case "/sign-up":
        title = "";
        metaDescription = "";
        break;
      case "/search-events":
        title = "";
        metaDescription = "";
        break;
      case "/event":
        title = "";
        metaDescription = "";
        break;
      case "/personal-info-page":
        title = "";
        metaDescription = "";
        break;
      case "/create-event":
        title = "";
        metaDescription = "";
        break;
      case "/my-events":
        title = "";
        metaDescription = "";
        break;
      case "/my-account":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/search-events" element={<PrivateRoute><SearchEvents /></PrivateRoute>} />
      <Route path="/event" element={<PrivateRoute><Event1 /></PrivateRoute>} />
      <Route path="/personal-info-page" element={<PrivateRoute><PersonalInfoPage /></PrivateRoute>} />
      <Route path="/create-event" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
      <Route path="/my-events" element={<PrivateRoute><MyEvents /></PrivateRoute>} />
      <Route path="/my-account" element={<PrivateRoute><MyAccount /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
