import Home from "../pages/Home";
import Usuarios from "../pages/Usuarios";
import Reportes from "../pages/Reportes";
import Roles from "../pages/Roles";
import ApiExample from "../pages/ApiExample";

export const routes = [
  {
    name: "Inicio",
    path: "/",
    element: <Home />
  },
  {
    name: "Usuarios",
    path: "/usuarios",
    element: <Usuarios />
  },
  {
  path: "/api",
  element: <ApiExample />,
  name: "API Ejemplo",
  },
  {
  name: "Roles",
  path: "/roles",
  element: <Roles />
  },
  {
    name: "Reportes",
    path: "/reportes",
    element: <Reportes />
  }
];