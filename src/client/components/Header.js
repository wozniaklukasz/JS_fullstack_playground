import React, { useEffect } from "react";
import {Container} from "react-bootstrap"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "./features/auth/authSelectors";
import { fetchCurrentUser } from "./features/auth/authSlice";

const Header = () => {
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const authButton = (a) =>
    a ? (
      <a href="/api/logout">{`Logout (${currentUser.name})`}</a>
    ) : (
      <>
        <a href="/auth/google">Login Google</a>
        <a href="/auth/facebook">Login Facebook</a>
        <a href="/auth/twitter">Login Twitter</a>
      </>
    );

  return (
    <Container>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <Link to="/admins">Admins</Link>
      {authButton(currentUser)}
    </Container>
  );
};

export default Header;
