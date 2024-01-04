import { ContMenuTitleDemands } from "./ContMenuTitleDemands"
import { Link } from "react-router-dom"

export const ContMenuDemands = () => {
  
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
                to={`/propuestas_de_demandas`} 
                key={4} 
                className="explorarCat__lista__item"
            >
                <span className="material-symbols-rounded icon--sm">
                thumb_up
                </span>
                <p className="paragraph--mid--2">Propuestas de demandas</p>
            </Link>
         </div>
        </div>
  )
}