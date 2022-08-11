import { Navigate, Route, Routes } from "react-router-dom"
import { NavbarProv } from "../components/NavbarProv"
import { CrearOferta, HistorialOfertasPageProv, MainProvPage, NotificacionesProv, OfertaDetalleProv, ProdByCatPageProv, SearchPageProv, SubirProducto, VentaIndDetalle } from "../pages"

export const ProvRoutes = () => {
  return (
    <>
      <NavbarProv />
      <div>
        <Routes>
          <Route path="proveedor" element={<MainProvPage/>}/>
          <Route path="categoria" element={<ProdByCatPageProv/>}/>
          <Route path="mi_oferta/:ofertaId" element={<OfertaDetalleProv />}/>
          <Route path="notificaciones" element={<NotificacionesProv/>}/>
          <Route path="historial_ofertas" element={<HistorialOfertasPageProv/>}/>
          <Route path="search" element={<SearchPageProv/>}/>
          <Route path="subir_producto" element={<SubirProducto/>}/>
          <Route path="crear_nueva_oferta" element={<CrearOferta/>}/>
          <Route path="venta_individual/:idCompra" element={<VentaIndDetalle/>}/>

          <Route path="/*" element={<Navigate to="proveedor"/>}/>
        </Routes>
        
      </div>  
    </>
  )
}
