import { Navigate, Route, Routes } from "react-router-dom"
import { NavbarAdm } from "../components"
import { AdmOfertasPage, MainAdmPage, OfertaDetalleAdm, PagosPage, ReportesPage, SolRegistroPage, UsuariosPage } from "../pages"

export const AdmRoutes = () => {
  return (
    <>
      <NavbarAdm/>
      <div>
        <Routes>
          <Route path="administrador" element={<MainAdmPage/>}/>
          <Route path="usuarios" element={<UsuariosPage/>}/>
          <Route path="reportes" element={<ReportesPage/>}/>
          <Route path="pagos" element={<PagosPage/>}/>
          <Route path="ofertas" element={<AdmOfertasPage/>}/>
          <Route path="oferta_detalle/:idOferta" element={<OfertaDetalleAdm/>}/>
          <Route path="solicitudes_registro" element={<SolRegistroPage/>}/>

          <Route path="/*" element={<Navigate to="administrador"/>}/>
        </Routes>
      </div>  
    </>
  )
}
