import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAdmins } from "../components/features/admins/adminsSelectors";
import { fetchAdmins } from "../components/features/admins/adminsSlice";
import requireAdminPermission from "../components/hocs/requireAdminPermission";

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

AdminsPage.preInitStore = (store) => store.dispatch(fetchAdmins());

export default requireAdminPermission(AdminsPage);
