import AuthLayouts from "../../Pages/AuthLayouts";
import FormLogin from "../Fragments/FormLogin";

const LoginPage = () => {
  return (
    <AuthLayouts title="Login" type="login">
      <FormLogin />
    </AuthLayouts>
  );
};

export default LoginPage;
