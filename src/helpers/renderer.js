import React from "react";
import {renderToString} from "react-dom/server";
import {Provider} from "react-redux";
import {StaticRouter} from "react-router-dom";
import serialize from "serialize-javascript"; // prevent XSS attacks
import {Helmet} from "react-helmet";
import {ServerStyleSheet} from 'styled-components';
import App from "../client/components/App";

export default async (path, store, context) => {
  await App.preInitStore(store, path);

  const body = (
    <Provider store={store}>
      <StaticRouter location={path} context={context}>
        <App/>
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();
  const sheet = new ServerStyleSheet();
  const content = renderToString(sheet.collectStyles(body));
  const styles = sheet.getStyleTags(); // have to be declared after sheet.collectStyles

  return `
      <html>
          <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${styles}
            <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
  integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
  crossorigin="anonymous"
/>
          </head>
          <body>
              <div id="root" style="height: 100%">${content}</div>
              <script>window.INITIAL_STATE=${serialize(
    store.getState()
  )}</script>
              <script src="bundle.js"></script>
          </body>
      </html>
    `;
};
