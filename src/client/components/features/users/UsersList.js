import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "./usersSelectors";
import {fetchUsers} from "./usersSlice";

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, fetchUsers]);

  return (
    <ul>
      {users.map((u) => (
        <li key={u._id}>
          {u.name} - {u.facebookId ? "FB" : null} {u.googleId ? "G" : null}
        </li>
      ))}
    </ul>
  );
};

UsersList.preInitStore = (store) => store.dispatch(fetchUsers());

export default UsersList;
