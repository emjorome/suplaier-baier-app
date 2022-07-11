import { ContExpTitle } from "./ContExpTitle"
import { ContListaCat } from "./ContListaCat"
import { categorias } from "../../data";

export const ContExplorar = () => {

  //cargar aqui lista de categorias

  return (
    <div className="explorarCat">
      <ContExpTitle/>
      <hr className="hrGeneral"/>
      <ContListaCat categorias={categorias}/>
    </div>
  )
}
