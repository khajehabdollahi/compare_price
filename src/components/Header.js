import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Navbar
} from "reactstrap";

const Header = (props) => {
  return (
    <Container
      className="px-0 bg-info d-flex justify-content-center"
      fluid
    >
      <Navbar light expand="md" className="rounded-bottom shadow py-0">
        <Link
          to="/"
          className="mr-auto navbar-brand font-weight-bold"
        >
          <h3 className="text-white">Compare Price</h3>
        </Link>
      </Navbar>
    </Container>
  );
};

export default Header;
