import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import AdminsPage from "./pages/AdminsPage";
import NotFoundPage from "./pages/NotFoundPage";
import App from "./components/App";

export default [
  {
    ...App,
    routes: [
      {
        path: "/",
        component: HomePage,
        exact: true,
      },
      {
        ...UsersPage, // obj spread because of loadData method
        path: "/users",
      },
      {
        ...AdminsPage,
        path: "/admins"
      },
      {
        component: NotFoundPage
      }
    ]
  }
];
