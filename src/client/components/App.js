import React from "react";
import {Container} from "react-bootstrap"
import Header from "./Header";
import { renderRoutes } from "react-router-config";
import { fetchCurrentUser } from "./features/auth/authSlice";

const App = ({ route }) => {
  return (
    <Container>
      <Header />
      {renderRoutes(route.routes)}
    </Container>
  );
};

const loadData = (store) => store.dispatch(fetchCurrentUser());

export default {
  component: App,
  loadData,
};
