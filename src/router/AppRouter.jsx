import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AdmRoutes } from "../administradores";
import { AuthContext, LoginPage, SignupPage } from "../auth";
import { CompRoutes } from "../compradores";
import { ProvRoutes } from "../proveedores";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

  const {authState} = useContext(AuthContext);

  const getRoutesByTypeOfUser = (tipo) => {
    switch (tipo) {
      case "comprador":
        return <CompRoutes/>;
      case "proveedor":
        return <ProvRoutes/>;
      default:
        return <AdmRoutes/>;
    }
  }

  return (
    <>
      <Routes>
        //Rutas publicas
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage/>
          </PublicRoute>
        }/>
        <Route path="/signup" element={
          <PublicRoute>
            <SignupPage/>
          </PublicRoute>
        }/>
        //Rutas privadas
        <Route path="/*" element={
          <PrivateRoute>
            {getRoutesByTypeOfUser(authState?.user?.tipo)}
          </PrivateRoute>
        }/>
      </Routes>
    </>
  )
}
