import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { useHttp } from '../../hooks/http.hook';
import { useMessage } from '../../hooks/message.hook';
import { actionPostLogin } from "../../redux/actions/auth";

import backendApiUrls from "../../routes/backendUrls";
import { Row, Col, Input, Label, Button } from "reactstrap";

const Auth = ({
  actionPostLogin,
}) => {
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp();
  const [form, setForm] = useState({
    email: '', password: ''
  });

  useEffect(() => {
    clearError()
    message(error)
  }, [error, message, clearError]);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  
  const registerHandler = async () => {
    try {
      const data = await request(backendApiUrls.register, 'POST', {...form})
      toast.success(data.message)
    } catch (e) {
      console.log('---', e)
    }
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
              disabled={loading}
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
              disabled={loading}
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
  { actionPostLogin }
)(Auth);