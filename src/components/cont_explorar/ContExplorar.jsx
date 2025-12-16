import React, { useState } from "react"
import { apiUrl } from "../../apiUrl"
import { useFetch } from "../../hooks"
import { Cargando } from "../generales"
import { ContExpTitle } from "./ContExpTitle"
import { ContListaCat } from "./ContListaCat"

export const ContExplorar = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const {data, isLoading} = useFetch(`${apiUrl}/catProductos`);
  const {rows: categorias} = !!data && data;

  return (
    <div className="explorarCat sidebar-section"> 
      <ContExpTitle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}/>
      {isOpen && (
        <div className="sidebar-section__content animate-slide-down">
          {/* Movi la línea HR aquí dentro para que se oculte al cerrar */}
          {/* <hr className="hrGeneral"/>  */}
          {isLoading
            ? <Cargando/>
            : <ContListaCat categorias={categorias}/>
          }
        </div>
      )}
    </div>
  )
});