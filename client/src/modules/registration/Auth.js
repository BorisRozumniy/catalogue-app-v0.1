import React, { useState } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  actionPostRegistration,
  actionPostLogin,
} from "../../redux/actions/auth";
import { Row, Col } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";


const Auth = ({ actionPostRegistration, actionPostLogin }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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
          onChange={changeHandler}
          label="email"
          variant="outlined"
          style={{ marginBottom: 18 }}
          fullWidth
        />
        <TextField
          name="password"
          type="password"
          onChange={changeHandler}
          label="password"
          variant="outlined"
          style={{ marginBottom: 18 }}
          fullWidth
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

export default connect(null, { actionPostRegistration, actionPostLogin })(Auth);
