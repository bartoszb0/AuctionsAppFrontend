import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/constants";
import api from "../../utils/api";
import displayError from "../../utils/displayError";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import "./Form.css";

/**
 * Returns form for logging or registering the user.
 */

type submitProps = {
  name: string;
};

function Submit({ name }: submitProps) {
  const status = useFormStatus();

  return (
    <>
      {status.pending ? (
        <LoadingIndicator />
      ) : (
        <button className="form-button" type="submit">
          {name}
        </button>
      )}
    </>
  );
}

type formProps = {
  route: string;
  method: string;
};

export default function Form({ route, method }: formProps) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const username = formData.get("username")?.toString().trim().toLowerCase();
    const password = formData.get("password")?.toString();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err) {
      displayError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form action={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <TextField
          id="outlined-required"
          label="Username"
          type="text"
          name="username"
          required
          sx={{ width: 300 }}
        />
        <TextField
          id="outlined-required"
          label="Password"
          type="password"
          name="password"
          required
          sx={{ width: 300 }}
        />
        {loading && <LoadingIndicator />}
        <Submit name={name} />
      </form>
      <div className="formLinkDiv">
        <Link
          to={`/${name === "Login" ? "register" : "login"}`}
          className="formLink"
        >
          {name === "Login" ? "Register" : "Login"} here
        </Link>
      </div>
    </>
  );
}
