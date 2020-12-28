import React, { useState } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { actionPostRegistration, actionPostLogin } from "../../redux/actions/auth";

import { Row, Col, Input, Label, Button } from "reactstrap";

const Auth = ({
  actionPostRegistration,
  actionPostLogin,
}) => {
  const [form, setForm] = useState({
    email: '', password: ''
  });

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  
  const registerHandler = () => {
    actionPostRegistration(form)
  };

  const loginHandler = () => {
    actionPostLogin(form)
  };

  return (
    <Row className="justify-content-center">
      <Col xs={6}>
        <h1 className="text-center">Auth</h1>
        <ToastContainer />
        <Label className="w-100 text-uppercase">
          email
          <Input
            name="email"
            type="text"
            onChange={changeHandler}
          />
        </Label>
        <Label className="w-100 text-uppercase">
          password
          <Input
            name="password"
            type="password"
            onChange={changeHandler}
          />
        </Label>
        <Row>
          <Col sm={4}>
            <Button
              color="info"
              outline
              type="submit"
              className="w-100 text-uppercase"
              onClick={loginHandler}
            >
              Login
            </Button>
          </Col>
          <Col sm={8}>
            <Button
              color="warning"
              type="submit"
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


export default connect(
  null,
  { actionPostRegistration, actionPostLogin }
)(Auth);