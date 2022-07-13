import { Navigate, Route, Routes } from "react-router-dom"
import { NavbarComp } from "../components"
import { HistorialOfertasPage, MainCompPage, OfertaDetalle, ProdByCatPage, SearchPage } from "../pages"

export const CompRoutes = () => {
  return (
    <>
      <NavbarComp/>
      <div>
        <Routes>
          <Route path="comprador" element={<MainCompPage/>}/>
          <Route path="oferta/:ofertaId" element={<OfertaDetalle />}/>
          <Route path="historial_ofertas" element={<HistorialOfertasPage/>}/>
          <Route path="categoria/:nombreCat" element={<ProdByCatPage/>}/>
          <Route path="search" element={<SearchPage/>}/>

          <Route path="/*" element={<Navigate to="comprador"/>}/>
        </Routes>
      </div>  
    </>
  )
}
