import { ContMenuTitleDemands } from "./ContMenuTitleDemands"
import { Link } from "react-router-dom"

export const ContListaDemandsProv = () => {
  
  return (
    <div className="actividadesRec">
    <hr className="hrGeneral"/>
    <ContMenuTitleDemands/>

        <div className="explorarCat__lista">

            <Link 
                to={`/explorar_demandas`} 
                key={1} 
                className="explorarCat__lista__item"
            >
                <span className="material-symbols-rounded icon--sm">
                    autorenew
                </span>
                <p className="paragraph--mid--2">Explorar demandas</p>
            </Link>
         </div>
        </div>
  )
}