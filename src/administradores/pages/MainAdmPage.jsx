
import { ContNavegar } from "../components/ContNavegar"

export const MainAdmPage = () => {
  return (
    <div className="admContainer">
      <div className="adm-main-container__izqCont">
        <ContNavegar/>
      </div>
      <div className="admMainContainer">
        <h1>Bienvenido Administrador!</h1>
        <hr className="hrGeneral"/>
        <div className="imgAdmPanel">
          <div className="imgAdmPanel--box">
            <img 
              src="suplaier_horizontal_degradado.png" 
              className="imgAdmPanel--img animate__animated animate__fadeIn" 
              alt="logo-sup" 
            />
          </div>
        </div>
      </div>
    </div>
  )
}
