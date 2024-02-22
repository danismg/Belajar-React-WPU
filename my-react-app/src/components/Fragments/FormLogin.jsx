import { useEffect, useRef, useState } from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { login } from "../../services/auth.service";

const FormLogin = () => {
  const [loginFailed, setLoginFailed] = useState("");
  const handleLogin = (event) => {
    // untuk membuat form tidak melakukan reload
    event.preventDefault();
    console.log("Login");
    // mengambil value dari form
    // localStorage.setItem("username", event.target.username.value);
    // localStorage.setItem("password", event.target.password.value);
    // window.location.href = "/products";

    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    login(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res);
        window.location.href = "/products";
      } else {
        setLoginFailed(res.response.data);
      }
    });
  };

  const usernameRef = useRef(null);
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleLogin}>
      <InputForm
        label="Email"
        name="username"
        type="text"
        placeholder="Jhon Doe"
        ref={usernameRef}></InputForm>
      <InputForm
        label="Password"
        name="password"
        type="password"
        placeholder="****"></InputForm>
      <Button classname="bg-blue-600 w-full" type="submit">
        Login
      </Button>
      {loginFailed && <p className="text-red-500">{loginFailed}</p>}
    </form>
  );
};

export default FormLogin;
