import { Navigate, Route, Routes } from "react-router-dom";
import  NavbarProv  from "../components/NavbarProv";
import {
  CrearOferta,
  HistorialOfertasPageProv,
  ListDemandas,
  MainProvPage,
  NotificacionesProv,
  OfertaDetalleProv,
  ProdByCatPageProv,
  SearchPageProv,
  SubirProducto,
  VentaIndDetalle,
  CrearPropuesta
} from "../pages";
import {
  OfeCanPageProv,
  OfePenPageProv,
  OrdCompPageProv,
  OrdConfPageProv,
  OrdFinPageProv,
} from "../pages/menu_pages";

import { MiPerfil } from "../pages/MiPerfil";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../auth";
import { useNavigate } from "react-router-dom";

export const ProvRoutes = () => {
  const navigate = useNavigate();
  let sessionTimer;
  const { logout } = useContext(AuthContext);

  const maxInactivityDuration = 60 * 60 * 1000;
  const resetSessionTimer = () => {
    clearTimeout(sessionTimer);
    sessionTimer = setTimeout(expireSession, maxInactivityDuration);
    localStorage.setItem("lastActivityTime", Date.now().toString());
  };

  // Función para manejar la expiración de la sesión
  const expireSession = () => {
    logout();
    navigate("/sesion_expirada", {
      replace: true,
    });
  };

  useEffect(() => {
    resetSessionTimer();
    // Agrega eventos de detección de actividad (por ejemplo, clics) para restablecer el temporizador
    const activityEvents = ["click", "mousemove", "keypress"];

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetSessionTimer);
    });

    // Limpia los eventos cuando el componente se desmonta o el usuario cierra sesión
    return () => {
      clearTimeout(sessionTimer);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetSessionTimer);
      });
    };
  });

  return (
    <>
      <NavbarProv />
      <div>
        <Routes>
          <Route path="proveedor" element={<MainProvPage />} />
          <Route path="categoria" element={<ProdByCatPageProv />} />
          <Route path="mi_oferta/:ofertaId" element={<OfertaDetalleProv />} />
          <Route path="notificaciones" element={<NotificacionesProv />} />
          <Route
            path="historial_ofertas"
            element={<HistorialOfertasPageProv />}
          />
          <Route path="search" element={<SearchPageProv />} />
          <Route path="subir_producto" element={<SubirProducto />} />
          <Route path="crear_nueva_oferta" element={<CrearOferta />} />
          <Route
            path="venta_individual/:idCompra"
            element={<VentaIndDetalle />}
          />
          <Route path="ofertas_pendientes" element={<OfePenPageProv />} />
          <Route path="ofertas_canceladas" element={<OfeCanPageProv />} />
          <Route path="ordenes_compra" element={<OrdCompPageProv />} />
          <Route path="ordenes_por_confirmar" element={<OrdConfPageProv />} />
          <Route path="ordenes_finalizadas" element={<OrdFinPageProv />} />
          <Route path="mi_perfil" element={<MiPerfil />} />
          <Route path="/demandas" element={<ListDemandas />} />
          <Route path="/crear_propuesta" element={<CrearPropuesta />} />
          <Route path="/*" element={<Navigate to="proveedor" />} />
        </Routes>
      </div>
    </>
  );
};
