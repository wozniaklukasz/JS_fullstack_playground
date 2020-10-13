import React from "react";
// import styled from "styled-components";
import {Container} from "react-bootstrap"
import Header from "./Header";
import Router from "../Routes";
import Footer from "./Footer";

// const GridWrapper = styled.div`
//     display: grid;
//     grid-template-rows: 1fr;
//     grid-template-areas:
//     "main"
//     "footer";
//     height: 100%;
//   `;
//
// const GridMain = styled.div`
//     grid-area: main;
//   `;
//
// const GridFooter = styled.div`
//     grid-area: footer;
//   `;

const App = () => {
  return (
    <>
      <Header/>
      <Container style={{paddingTop: '60px'}}>
        <Router/>
      </Container>
      <Footer/>
    </>
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
