import React from "react"
import { apiUrl } from "../../apiUrl"
import { useFetch } from "../../hooks"
import { Cargando } from "../generales"
import { ContExpTitle } from "./ContExpTitle"
import { ContListaCat } from "./ContListaCat"

export const ContExplorar = React.memo(() => {

  const {data, isLoading} = useFetch(`${apiUrl}/catProductos`);
  const {rows: categorias} = !!data && data;

  return (
    <div className="explorarCat">
      <ContExpTitle/>
      <hr className="hrGeneral"/>
      {isLoading
      ? <Cargando/>
      : <ContListaCat categorias={categorias}/>
      }
      
    </div>
  )
});
