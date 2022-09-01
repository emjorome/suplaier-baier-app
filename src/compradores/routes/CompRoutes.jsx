import { Navigate, Route, Routes } from "react-router-dom"
import { NavbarComp } from "../components"
import { CompraIndividualPage, HistorialOfertasPage, MainCompPage, MiPerfil, Notificaciones, OfeCanPage, OfePenPage, OfertaDetalle, OrdCompPage, OrdConfPage, OrdFinPage, ProdByCatPage, SearchPage } from "../pages"
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
          <Route path="oferta_individual/:IdCompra" element={<CompraIndividualPage/>}/>
          <Route path="ofertas_pendientes" element={<OfePenPage/>}/>
          <Route path="ofertas_canceladas" element={<OfeCanPage/>}/>
          <Route path="ordenes_compra" element={<OrdCompPage/>}/>
          <Route path="ordenes_por_confirmar" element={<OrdConfPage/>}/>
          <Route path="ordenes_finalizadas" element={<OrdFinPage/>}/>
          <Route path="mi_perfil" element={<MiPerfil/>}/>

          <Route path="/*" element={<Navigate to="comprador"/>}/>
        </Routes>
      </div>  
    </>
  )
}
