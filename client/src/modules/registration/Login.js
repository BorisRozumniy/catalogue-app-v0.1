import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Row, Col } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { actionPostLogin } from "../../redux/actions/auth";
import { frontendUrls } from "../../routes/frontendUrls";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-center mb-3 mt-5">Sign in/Sign Up</h1>
      <ToastContainer />
      <TextField
        name="email"
        type="email"
        label="email"
        variant="outlined"
        error={error.errors && error.errors[0].param === "email"}
        helperText={error.errors && error.errors[0].msg}
        style={{ marginBottom: 18 }}
        fullWidth
        inputRef={register({
          pattern: {
            value: /[A-Za-z]{3}/,
            message: "error message",
          },
        })}
      />
      <TextField
        name="password"
        type="password"
        variant="outlined"
        label="password"
        error={
          (errors.password && errors.password.message) ||
          (error.errors && error.errors[0].param === "password")
        }
        helperText={
          (error.errors && error.errors[0].msg) ||
          (errors.password && errors.password.message)
        }
        style={{ marginBottom: 18 }}
        fullWidth
        inputRef={register({
          required: "PASSWORD REQUIRED",
          minLength: { value: 8, message: "too short" },
        })}
      />
      <Row>
        <Col sm={8}>
          <Button
            className="w-100 text-uppercase"
            variant="outlined"
            color="primary"
            type="submit"
          >
            Login
          </Button>
        </Col>
      </Row>
      <Link to={frontendUrls.registration}>Create Account</Link>
    </form>
  );
};

const mapStateToProps = (state) => ({
  error: state.userReducer.userRequestError,
});

export default connect(mapStateToProps, {
  actionPostLogin,
})(Login);
