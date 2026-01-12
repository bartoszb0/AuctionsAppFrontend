import LoginRegisterForm from "../components/LoginRegisterForm";

/**
 * Returns login form
 */

function Login() {
  return (
    <>
      <LoginRegisterForm route="/api/token/" method="login" />
    </>
  );
}

export default Login;
