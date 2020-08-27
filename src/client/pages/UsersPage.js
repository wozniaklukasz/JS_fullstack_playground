import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../components/features/users/usersSelectors";
import { fetchUsers } from "../components/features/users/usersSlice";

const UsersPage = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, fetchUsers]);

  return (
    <div>
      <Helmet>
        <title>{`${users.length} Users page SSR`}</title>
        <meta property="og:title" content="Users App" />
      </Helmet>
      List of users:
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} - {u.facebookId ? "FB" : null} {u.googleId ? "G" : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

// SSR way to fetch initial data (to not double-render)
const loadData = (store) => store.dispatch(fetchUsers());

export default {
  component: UsersPage, // component because of react-router-config SSR approach
  loadData,
};
