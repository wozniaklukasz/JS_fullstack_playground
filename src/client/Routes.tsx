import React from "react";
import {matchPath} from 'react-router-dom';
import {renderRoutes} from "react-router-config";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import AdminsPage from "./pages/AdminsPage";
import NotFoundPage from "./pages/NotFoundPage";
import UsersList from './features/users/UsersList';

const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    component: UsersPage,
    path: "/users",
    childComponentsPreInitStore: [UsersList] // array of page components with preInitStore
  },
  {
    component: AdminsPage,
    path: "/admins"
  },
  {
    component: NotFoundPage
  }
];

const Router = () => {
  return (
    <div>{renderRoutes(routes)}</div>
  )
};

Router.preInitStore = async (store, url) => {
  const route = routes.find(route =>
    matchPath(url, {
      exact: true,
      path: route.path
    })
  );

  if (route && route.childComponentsPreInitStore && route.childComponentsPreInitStore.length > 0) {
    await Promise.all(route.childComponentsPreInitStore.map(async childComponent => childComponent.preInitStore(store)))
  }

  // @ts-ignore
  if (!route || !route.component || !route.component.preInitStore) return;

  // @ts-ignore
  await route.component.preInitStore(store);
};

export default Router;
