import { Navigate, Route, Routes } from "react-router-dom";
import { NavbarComp } from "../components";
import {
  SubirProductoComp,
  CrearDemanda,
  CompraIndividualPage,
  HistorialOfertasPage,
  MainCompPage,
  MiPerfil,
  Notificaciones,
  OfeCanPage,
  OfePenPage,
  OfertaDetalle,
  OrdCompPage,
  OrdConfPage,
  OrdFinPage,
  ProdByCatPage,
  SearchPage,
} from "../pages";
import { PerfilProveedor } from "../pages/PerfilProveedor";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../auth";
import { useNavigate } from "react-router-dom";

export const CompRoutes = () => {
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
      <NavbarComp />
      <div>
        <Routes>
          <Route path="comprador" element={<MainCompPage />} />
          <Route path="oferta/:ofertaId" element={<OfertaDetalle />} />
          <Route path="subir_producto" element={<SubirProductoComp />} />
          <Route path="crear_demanda" element={<CrearDemanda />} />
          <Route path="historial_ofertas" element={<HistorialOfertasPage />} />
          <Route path="categoria" element={<ProdByCatPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="notificaciones" element={<Notificaciones />} />
          <Route path="perfil_proveedor" element={<PerfilProveedor />} />
          <Route
            path="oferta_individual/:IdCompra"
            element={<CompraIndividualPage />}
          />
          <Route path="ofertas_pendientes" element={<OfePenPage />} />
          <Route path="ofertas_canceladas" element={<OfeCanPage />} />
          <Route path="ordenes_compra" element={<OrdCompPage />} />
          <Route path="ordenes_por_confirmar" element={<OrdConfPage />} />
          <Route path="ordenes_finalizadas" element={<OrdFinPage />} />
          <Route path="mi_perfil" element={<MiPerfil />} />

          <Route path="/*" element={<Navigate to="comprador" />} />
        </Routes>
      </div>
    </>
  );
};
