import { useEffect } from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth";
import { obtainUserPermission } from "../firebase/obtainPermission";

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

  useEffect(() => {
    //Permission for notifications
    obtainUserPermission()
    
    // eslint-disable-next-line
  }, [authState])
  

  return (
    !authState.logged
    ? children
    : <Navigate to={tipoPage(authState?.user?.tipo)}/>
  )
}
