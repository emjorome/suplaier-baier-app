import { BuscadorAdm } from "../components"
import { ContNavegar } from "../components/ContNavegar"

export const SolRegistroPage = () => {
  return (
    <div className="admContainer">
      <div className="adm-main-container__izqCont">
        <ContNavegar/>
      </div>
      <div className="admMainContainer">
        <h1>Solicitudes de registro</h1>
        <hr className="hrGeneral"/>
        <div className="admBusquedaBox">
          <BuscadorAdm tipoBusqueda={"solicitudes"}/>
        </div>
        <div className="admPrincipalContainer">
          <p className="paragraph"> Por el momento no hay solicitudes registradas</p>
        </div>
      </div>
    </div>
  )
}
