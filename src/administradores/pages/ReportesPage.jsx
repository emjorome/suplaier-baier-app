import { BuscadorAdm, ContNavegar} from "../components"

export const ReportesPage = () => {
  return (
    <div className="admContainer">
      <div className="adm-main-container__izqCont">
        <ContNavegar/>
      </div>
      <div className="admMainContainer">
        <h1>Reportes</h1>
        <hr className="hrGeneral"/>
        <div>
          <div className="admBusquedaBox">
            <BuscadorAdm tipoBusqueda={"reportes"}/>
          </div>
          <div className="admPrincipalContainer">
            <p className="paragraph"> Por el momento no hay reportes registrados</p>
          </div>
        </div>
      </div>
    </div>
  )
}
