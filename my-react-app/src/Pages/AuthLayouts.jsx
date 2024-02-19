import { Link } from "react-router-dom";

const AuthLayouts = (props) => {
  const { children, title, type } = props;
  return (
    <div className="flex justify-center min-h-screen items-center ">
      <div className="flex gap-x-2">
        <div className="w-full max-w-xs">
          <h1 className="text-blue-600 font-bold text-3xl ">{title}</h1>

          <p className="font-medium text-slate-500 mb-8">
            Welcome, Please enter your details
          </p>
          {children}
          <p className="text-sm mt-5 text-center ">
            {type === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <Link
              className="font-bold text-blue-600"
              to={type === "login" ? "/register" : "/login"}>
              {type === "login" ? "Sign In" : "Login"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayouts;

const navigation = () => {
  if (type === "login") {
    return (
      <p className="text-sm mt-5 text-center ">
        Don't have an account?
        <Link className="font-bold text-blue-600" to="/register">
          Sign Up
        </Link>
      </p>
    );
  } else {
    return (
      <p className="text-sm mt-5 text-center ">
        Already have an account?
        <Link className="font-bold text-blue-600" to="/login">
          Login
        </Link>
      </p>
    );
  }
};
