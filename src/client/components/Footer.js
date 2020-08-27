import React from "react";
import styled from "styled-components";

const Footer = () => {
  const Wrapper = styled.footer`
    height: 10em;
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 100%); 
  `;

  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: beige;
  `;

  return (
    <Wrapper>
      <Title>footer</Title>
    </Wrapper>
  );
};

export default Footer;
