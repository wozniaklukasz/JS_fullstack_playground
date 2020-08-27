import React from "react";
import { Helmet } from "react-helmet";
import UsersList from "../components/features/users/UsersList";

const UsersPage = () => {
  return (
    <div>
      <Helmet>
        <title>{`Users page SSR`}</title>
        <meta property="og:title" content="Users App" />
      </Helmet>
      <UsersList />
    </div>
  );
};

export default UsersPage;
