import LoginRegisterForm from "../components/LoginRegisterForm";

/**
 * Returns register form
 */

function Register() {
  return <LoginRegisterForm route="/api/user/register/" method="register" />;
}

export default Register;
