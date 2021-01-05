import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  actionPostRegistration,
  actionPostLogin,
} from "../../redux/actions/auth";
import { Row, Col } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";


const Auth = ({
  error,
  actionPostRegistration,
  actionPostLogin,
}) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    error.errors && toast.error(error.errors[0].msg);
    error.message && toast.error(error.message);
  }, [error]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = () => {
    actionPostRegistration(form);
  };

  const loginHandler = () => {
    actionPostLogin(form);
  };

  return (
    <Row className="justify-content-center">
      <Col xs={6}>
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
          onChange={changeHandler}
        />
        <TextField
          name="password"
          type="password"
          variant="outlined"
          label="password"
          error={error.errors && error.errors[0].param === "password"}
          helperText={error.errors && error.errors[0].msg}
          style={{ marginBottom: 18 }}
          fullWidth
          onChange={changeHandler}
        />
        <Row>
          <Col sm={8}>
            <Button
              className="w-100 text-uppercase"
              variant="outlined" color="primary"
              type="submit"
              onClick={loginHandler}
            >
              Login
            </Button>
          </Col>
          <Col sm={4}>
            <Button
              variant="contained" color="primary" component="span"
              className="w-100 text-uppercase"
              onClick={registerHandler}
            >
              Registration
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  error: state.userReducer.userRequestError,
});

export default connect(mapStateToProps, {
  actionPostRegistration,
  actionPostLogin,
})(Auth);
