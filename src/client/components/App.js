import React from "react";
import {Container} from "react-bootstrap"
import Header from "./Header";
import Router from "../Routes";

const App = () => {
  return (
    <Container>
      <Header/>
      <Router/>
    </Container>
  );
};

App.preInitStore = async (store, url) => {
  try {
    await Router.preInitStore(store, url)
  } catch (e) {
    // this catch is key to display view to user if some api do not respond
    console.error('Error during App.preInitStore: ', e.message ? e.message : e);
  }
};

export default App;
