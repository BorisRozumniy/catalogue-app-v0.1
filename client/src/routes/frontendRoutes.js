import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { frontendUrls } from "../routes/frontendUrls";
import Auth from "../modules/registration/Login";
import Registration from "../modules/registration/Registration";
import Catalogue from "../modules/catalogue/Catalogue";
import Header from "../modules/header/Header";
import Home from "../modules/home";

const Routes = ({ email }) => (
  <Container maxWidth="md">
    {email && (
      <>
        <Header />
        <Switch>
          <Route path={frontendUrls.registration} component={Registration} />
          <Route path={frontendUrls.catalogue} component={Catalogue} />
          <Route path={frontendUrls.home} component={Home} />
          <Redirect to={frontendUrls.home} />
        </Switch>
      </>
    )}
    {!email && (
      <Switch>
        <Route path={frontendUrls.login} exact component={Auth} />
        <Route path={frontendUrls.registration} component={Registration} />
        <Redirect to={frontendUrls.login} />
      </Switch>
    )}
  </Container>
);

const mapStateToProps = (state) => ({
  email: state.userReducer.email,
});

export default connect(mapStateToProps, {})(Routes);
