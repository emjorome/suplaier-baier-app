import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth";

export const PublicRoute = ({children}) => {

  const {authState} = useContext(AuthContext);

  const tipoPage = (tipo) => {
    switch (tipo) {
      case "comprador":
        return "/comprador";
      case "proveedor":
        return "/proveedor";
      default:
        return "/administrador";
    }
  }

  return (
    !authState.logged
    ? children
    : <Navigate to={tipoPage(authState?.user?.tipo)}/>
  )
}
