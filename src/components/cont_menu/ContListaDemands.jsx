import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ContMenuTitleDemands } from "./ContMenuTitleDemands";

export const ContListaDemands = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="actividadesRec sidebar-section">
      <ContMenuTitleDemands isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}/>
      {isOpen && (
        <div className="explorarCat__lista sidebar-section__content animate-slide-down">
            <Link 
                to={`/mis_demandas`} 
                key={1} 
                className="explorarCat__lista__item sidebar-subitem"
            >
                <span className="material-symbols-rounded icon--sm">
                    autorenew
                </span>
                <p className="paragraph--mid--2">Mis demandas</p>
            </Link>

            <Link 
                to={`/demandas_aprobadas`} 
                key={2} 
                className="explorarCat__lista__item sidebar-subitem"
            >
                <span className="material-symbols-rounded icon--sm">
                    check_circle
                </span>
                <p className="paragraph--mid--2">Demandas Aprobadas</p>
            </Link>
         </div>
      )}
    </div>
  )
}