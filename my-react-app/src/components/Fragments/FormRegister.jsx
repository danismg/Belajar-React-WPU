import Button from "../Elements/Button";
import InputForm from "../Elements/Input";

const FormRegister = () => {
  return (
    <form action="">
      <InputForm
        label="Fullname"
        name="fullname"
        type="text"
        placeholder="insert your name here.."></InputForm>

      <InputForm
        label="Email"
        name="email"
        type="email"
        placeholder="email"></InputForm>

      <InputForm
        label="Password"
        name="password"
        type="password"
        placeholder="****"></InputForm>

      <InputForm
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="****"></InputForm>
      <Button classname="bg-blue-600 w-full ">Register</Button>
    </form>
  );
};

export default FormRegister;
