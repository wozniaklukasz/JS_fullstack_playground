import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAdmins } from "../components/features/admins/adminsSelectors";
import { fetchAdmins } from "../components/features/admins/adminsSlice";
import requireAuth from "../components/hocs/requireAuth";

const AdminsPage = () => {
  const dispatch = useDispatch();
  const admins = useSelector(getAdmins);

  useEffect(() => {
    dispatch(fetchAdmins())
  }, [dispatch, fetchAdmins]);

  return (
    <div>
      List of Admins:
      <ul>
        {admins.map((a) => (
          <li key={a.id}>
            {a.id}. {a.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

// SSR way to fetch initial data (to not double-render)
const loadData = (store) => store.dispatch(fetchAdmins());

export default {
  component: requireAuth(AdminsPage), // component because of react-router-config SSR approach
  loadData,
};
