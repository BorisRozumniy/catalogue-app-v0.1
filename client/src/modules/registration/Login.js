import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { actionPostLogin } from "../../redux/actions/auth";
import { frontendUrls } from "../../routes/frontendUrls";
import Input from "../components/Input";
import { MainContainer } from "../components/MainContainer";
import { PrimaryButton as Button } from "../components/Button";

const Login = ({ error, actionPostLogin }) => {
  useEffect(() => {
    error.errors && toast.error(error.errors[0].msg);
    error.message && toast.error(error.message);
  }, [error]);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    actionPostLogin(data);
  };

  return (
    <MainContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center mb-3 mt-5">Sign in</h1>
        <ToastContainer />
        <Input
          ref={register({ required: "Email is required." })}
          id="email"
          type="text"
          label="email"
          name="email"
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <Input
          ref={register({
            required: "Password is required.",
            minLength: { value: 8, message: "Password is too short" },
          })}
          id="password"
          type="password"
          label="password"
          name="password"
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        <div className="px-5">
          <Button fullWidth type="submit">
            Login
          </Button>
        </div>
        <Link to={frontendUrls.registration}>Create Account</Link>
      </form>
    </MainContainer>
  );
};

const mapStateToProps = (state) => ({
  error: state.userReducer.userRequestError,
});

export default connect(mapStateToProps, {
  actionPostLogin,
})(Login);
