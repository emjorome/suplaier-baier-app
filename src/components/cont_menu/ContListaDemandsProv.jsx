import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ContMenuTitleDemands } from "./ContMenuTitleDemands";

export const ContListaDemandsProv = () => {
  // Estado para controlar abrir/cerrar
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="actividadesRec sidebar-section">
      {/* <hr className="hrGeneral"/> */}
      
      {/* Título con la lógica de click */}
      <ContMenuTitleDemands isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}/>

      {/* Lista desplegable */}
      {isOpen && (
        <div className="explorarCat__lista sidebar-section__content animate-slide-down">
            <Link 
                to={`/demandas`} 
                key={1} 
                className="explorarCat__lista__item sidebar-subitem"
            >
                <span className="material-symbols-rounded icon--sm">
                    autorenew
                </span>
                <p className="paragraph--mid--2">Explorar demandas</p>
            </Link>
         </div>
      )}
    </div>
  )
}