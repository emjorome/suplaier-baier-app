import { Navigate, Route, Routes } from "react-router-dom"
import { NavbarComp } from "../components"
import { HistorialOfertasPage, MainCompPage, MiPerfil, Notificaciones, OfertaDetalle, ProdByCatPage, SearchPage } from "../pages"
import { PerfilProveedor } from "../pages/PerfilProveedor"

export const CompRoutes = () => {
  return (
    <>
      <NavbarComp/>
      <div>
        <Routes>
          <Route path="comprador" element={<MainCompPage/>}/>
          <Route path="oferta/:ofertaId" element={<OfertaDetalle />}/>
          <Route path="historial_ofertas" element={<HistorialOfertasPage/>}/>
          <Route path="categoria" element={<ProdByCatPage/>}/>
          <Route path="search" element={<SearchPage/>}/>
          <Route path="notificaciones" element={<Notificaciones/>}/>
          <Route path="perfil_proveedor" element={<PerfilProveedor/>}/>
          <Route path="mi_perfil" element={<MiPerfil/>}/>

          <Route path="/*" element={<Navigate to="comprador"/>}/>
        </Routes>
      </div>  
    </>
  )
}
