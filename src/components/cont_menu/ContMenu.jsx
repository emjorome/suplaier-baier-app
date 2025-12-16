import { ContListaMenu } from "./ContListaMenu"
import { ContListaDemands } from "./ContListaDemands"
import { useContext } from "react"
import { AuthContext } from "../../auth"
import React from "react"
import { ContListaDemandsProv } from "./ContListaDemandsProv"

export const ContMenu = () => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;

  // Determinar si el usuario es proveedor basándose en su IdRol
  const esProveedor = user?.Rol === "proveedor";

  return (
    <>
      {/* 1. MENÚ DE OFERTAS (Siempre se muestra) */}
      <ContListaMenu/>

      {/* 2. MENÚ DE DEMANDAS (Depende del rol) */}
      { !esProveedor
          ? <ContListaDemands/>
          : <ContListaDemandsProv />
      }
    </>
  )
}
export default React.memo(ContMenu);