import React from "react";
import {renderToString} from "react-dom/server";
import {Provider} from "react-redux";
import {StaticRouter} from "react-router-dom";
import serialize from "serialize-javascript"; // prevent XSS attacks
import {Helmet} from "react-helmet";
import App from "../client/components/App";

export default async (path, store, context) => {
  await App.preInitStore(store, path);

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={path} context={context}>
        <App/>
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  return `
      <html>
          <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
  integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
  crossorigin="anonymous"
/>
          </head>
          <body>
              <div id="root">${content}</div>
              <script>window.INITIAL_STATE=${serialize(
    store.getState()
  )}</script>
              <script src="bundle.js"></script>
          </body>
      </html>
    `;
};
