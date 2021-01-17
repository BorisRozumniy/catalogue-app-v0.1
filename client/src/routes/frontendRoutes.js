import React from 'react'
import { connect } from "react-redux";
import {Switch, Route, Redirect} from 'react-router-dom'
import Container from '@material-ui/core/Container';
import { frontendUrls } from "../routes/frontendUrls";
import Auth from '../modules/registration/Auth'
import Catalogue from "../modules/catalogue/Catalogue";
import Registration from "../modules/registration/Auth";
import Header from "../modules/header/Header";
import EditProduct from "../modules/product/EditProduct";

const Routes = ({ email }) => (
  <Container maxWidth="md">
    {email && (
      <>
        <Header />
        <Switch>
          <Route path={frontendUrls.catalogue}>
            <Catalogue />
          </Route>
          <Route path={frontendUrls.registration}>
            <Registration />
          </Route>
          <Route path={frontendUrls.editProduct}>
            <EditProduct />
          </Route>
          <Route path={frontendUrls.home}>
            <h1>Welcome to our store</h1>
          </Route>
        </Switch>
      </>
    )}
    {!email && (
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    )}
  </Container>
);

const mapStateToProps = (state) => ({
  email: state.userReducer.email,
});

export default connect(
  mapStateToProps,
  {}
)(Routes);
