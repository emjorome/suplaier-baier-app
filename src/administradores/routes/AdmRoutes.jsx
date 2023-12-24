import { Navigate, Route, Routes } from "react-router-dom";
import { NavbarAdm } from "../components";
import {
  AdmOfertasPage,
  MainAdmPage,
  OfertaDetalleAdm,
  PagosPage,
  ReportesPage,
  SolRegistroPage,
  UsuariosPage,
} from "../pages";
import { SolicitudDetalleAdm } from "../pages/SolicitudDetalleAdm";

import { useEffect, useContext } from "react";
import { AuthContext } from "../../auth";
import { useNavigate } from "react-router-dom";

export const AdmRoutes = () => {
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
      <NavbarAdm />
      <div>
        <Routes>
          <Route path="administrador" element={<MainAdmPage />} />
          <Route path="usuarios" element={<UsuariosPage />} />
          <Route path="reportes" element={<ReportesPage />} />
          <Route path="pagos" element={<PagosPage />} />
          <Route path="ofertas" element={<AdmOfertasPage />} />
          <Route
            path="oferta_detalle/:idOferta"
            element={<OfertaDetalleAdm />}
          />
          <Route
            path="solicitud/:idSolicitud"
            element={<SolicitudDetalleAdm />}
          />
          <Route path="solicitudes_registro" element={<SolRegistroPage />} />

          <Route path="/*" element={<Navigate to="administrador" />} />
        </Routes>
      </div>
    </>
  );
};
