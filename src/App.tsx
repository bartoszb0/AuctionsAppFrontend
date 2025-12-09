import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Auction from "./pages/Auction/Auction";
import FollowedUsersAuction from "./pages/FollowedUsersAuctions";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import NewAuction from "./pages/NewAuction/NewAuction";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import SearchResult from "./pages/SearchResult";
import UserProfile from "./pages/UserProfile/UserProfile";
import { isAuthenticated } from "./utils/isAuthenticated";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function HeaderLayout() {
  return (
    <>
      <Header auth={isAuthenticated()} />
      <Outlet />
    </>
  );
}

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/auctions/:auctionId" element={<Auction />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="*" element={<NotFound />}></Route>
          <Route element={<ProtectedLayout />}>
            <Route path="/followed" element={<FollowedUsersAuction />} />
            <Route path="/create" element={<NewAuction />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
      </Routes>

      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        closeButton={false}
        closeOnClick
      />
    </BrowserRouter>
  );
}

export default App;
