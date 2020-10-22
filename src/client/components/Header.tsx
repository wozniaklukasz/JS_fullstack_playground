import React, {useEffect} from "react";
import {Button, Container, Nav, Navbar, OverlayTrigger, Popover} from "react-bootstrap"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser} from "./features/auth/authSelectors";
import {fetchCurrentUser} from "./features/auth/authSlice";

const Header = () => {
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Choose login service</Popover.Title>
      <Popover.Content>
        <a href="/auth/google">
          <Button size="sm" variant="outline-primary">
            Login Google
          </Button>
        </a>
        <a href="/auth/facebook">
          <Button size="sm" variant="outline-primary">
            Login Facebook
          </Button>
        </a>
        <a href="/auth/twitter">
          <Button size="sm" variant="outline-primary">
            Login Twitter
          </Button>
        </a>
      </Popover.Content>
    </Popover>
  );

  const authButton = (logged) =>
    logged ? (
      <a href="/api/logout">
        <Button variant="success">
          {`Logout (${currentUser.name})`}
        </Button>
      </a>
    ) : (
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <Button variant="success">Log in</Button>
      </OverlayTrigger>
    );

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Link to="/" className="navbar-brand">JS Playground</Link>
        <Nav className="mr-auto">
          <Link to="/users" className="nav-link">Users</Link>
          <Link to="/admins" className="nav-link">Admins</Link>
        </Nav>
        <Nav className="justify-content-end">
          {authButton(currentUser)}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
