import React from "react";

/* 
  context (renamed by StaticRouter to staticContext) comes from Promise.all
  declare default value because context exists only on server side (not client side)
*/
const NotFoundPage = ({staticContext = {}}) => {
  staticContext.notFound = true;
  
  return <h1>Not found - 404.</h1>;
};

export default NotFoundPage;
