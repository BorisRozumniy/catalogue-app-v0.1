import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, Container } from "reactstrap";
import { frontendUrls } from "../../routes/frontendUrls";
import { actionLogout } from "../../redux/actions/auth";
import { actionClearProducts } from "../../redux/actions/products";

const Header = ({ email, actionLogout, actionClearProducts }) => {
  const handleLogout = () => {
    actionClearProducts();
    actionLogout();
  };
  return (
    <Navbar color="light" light expand="md" className="mb-4">
      <Container className="justify-content-center">
        <Nav className="text-uppercase p-3">
          <NavItem className="mr-2 my-4 my-lg-2">
            <NavLink
              exact
              to={frontendUrls.home}
              activeClassName="bg-warning"
              className="p-3"
            >
              home
            </NavLink>
          </NavItem>
          <NavItem className="mr-2 my-4 my-lg-2">
            <NavLink
              to={frontendUrls.catalogue}
              activeClassName="bg-warning"
              className="p-3"
            >
              catalogue
            </NavLink>
          </NavItem>
          <NavItem className="mr-2 my-4 my-lg-2">
            <NavLink
              to={frontendUrls.registration}
              activeClassName="bg-warning"
              className="p-3"
            >
              registration
            </NavLink>
          </NavItem>
          <div className="mr-2 my-4 my-lg-2">
            {email && email}
            <button type="button rounded" onClick={handleLogout}>
              logout
            </button>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  email: state.userReducer.email,
});

export default connect(mapStateToProps, {
  actionLogout,
  actionClearProducts,
})(Header);
