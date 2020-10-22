import React from "react";
import {Button} from 'react-bootstrap';

const HomePage = () => {
  return (
    <div>
      <h1>JS Playground</h1>

      <h4>Links:</h4>
      <a href="https://github.com/wozniaklukasz/JS_fullstack_playground" target="projectGhRepo">
        <Button variant="outline-dark">
          GH Repo
        </Button>
      </a>
      <a href="/graphql" target="graphql">
        <Button variant="outline-danger">
          GraphQL
        </Button>
      </a>

      <h4>TODO (v.1):</h4>
      <ul>
        <li>CRUD users</li>
        <li>Admin can change users role</li>
        <li>Docker compose with deploy</li>
        <li>Tests</li>
        <li>CSS grid (keep it simple!)</li>
        <li>GH CI/CD</li>
        <li>Readme</li>
      </ul>
    </div>
  );
};

export default HomePage;
