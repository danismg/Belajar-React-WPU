import { useEffect, useRef } from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";

const FormLogin = () => {
  const handleLogin = (event) => {
    // untuk membuat form tidak melakukan reload
    event.preventDefault();
    console.log("Login");
    // mengambil value dari form
    localStorage.setItem("email", event.target.email.value);
    localStorage.setItem("password", event.target.password.value);
    window.location.href = "/products";
  };

  const emailRef = useRef(null);
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleLogin}>
      <InputForm
        label="Email"
        name="email"
        type="email"
        placeholder="email"
        ref={emailRef}></InputForm>
      <InputForm
        label="Password"
        name="password"
        type="password"
        placeholder="****"></InputForm>
      <Button classname="bg-blue-600 w-full" type="submit">
        Login
      </Button>
    </form>
  );
};

export default FormLogin;
