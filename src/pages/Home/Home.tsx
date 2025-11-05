import { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../utils/isAuthenticated";

export default function Home() {
  const [auth] = useState(isAuthenticated());
  return (
    <>
      {auth && <h3>Logged in</h3>}
      <Link to="/logout">logout</Link>
      <br></br>
      <Link to="/">home screen</Link>
      <br></br>
      <Link to="/login">Login</Link>
    </>
  );
}
