import Form from "../components/Form";

/**
 * Returns login form
 */

function Login() {
  return (
    <>
      <Form route="/api/token/" method="login" />
    </>
  );
}

export default Login;
