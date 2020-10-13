import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getCurrentUser } from "../features/auth/authSelectors";
import UserRoleEnum from '../../../constants/UserRoleEnum';

const requireAdminPermission = (ChildComponent) => (props) => {
  const currentUser = useSelector(getCurrentUser);

//   if (auth === null) return <div>Loading...</div>;

  if (!currentUser || currentUser.userrole !== UserRoleEnum.ADMIN) return <Redirect to="/" />;

  return <ChildComponent {...props} />;
};

export default requireAdminPermission;
