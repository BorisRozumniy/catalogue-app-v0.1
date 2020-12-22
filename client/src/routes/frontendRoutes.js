import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { Container } from "reactstrap";
import { frontendUrls } from "../routes/frontendUrls";
import Auth from '../modules/registration/Auth'
import Catalogue from "../modules/catalogue/Catalogue";
import Registration from "../modules/registration/Auth";
import EditProduct from "../modules/product/EditProduct";
import AddProduct from "../modules/product/AddProduct";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Container>
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
          <Route path={frontendUrls.addProduct}>
            <AddProduct />
          </Route>
          <Route path={frontendUrls.home}>
            <h1>Welcome to our store</h1>
          </Route>
        </Switch>
      </Container>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
