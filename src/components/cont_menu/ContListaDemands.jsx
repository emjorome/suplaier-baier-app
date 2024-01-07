import { ContMenuTitleDemands } from "./ContMenuTitleDemands"
import { Link } from "react-router-dom"

export const ContListaDemands = () => {
  
  return (
    <div className="actividadesRec">
    <hr className="hrGeneral"/>
    <ContMenuTitleDemands/>

        <div className="explorarCat__lista">

            <Link 
                to={`/mis_demandas`} 
                key={1} 
                className="explorarCat__lista__item"
            >
                <span className="material-symbols-rounded icon--sm">
                autorenew
                </span>
                <p className="paragraph--mid--2">Mis demandas</p>
            </Link>
            <Link 
                to={`/demandas_aprobadas`} 
                key={2} 
                className="explorarCat__lista__item"
            >
                <span className="material-symbols-rounded icon--sm">
                check_circle
                </span>
                <p className="paragraph--mid--2">Demandas Aprobadas</p>
            </Link>

         </div>
        </div>
  )
}