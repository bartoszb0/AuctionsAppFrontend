import Form from "../components/Form/Form";

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
