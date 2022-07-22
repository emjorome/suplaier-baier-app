import { apiUrl } from "../../apiUrl"
import { useFetch } from "../../hooks"
import { ContExpTitle } from "./ContExpTitle"
import { ContListaCat } from "./ContListaCat"

export const ContExplorar = () => {

  const {data, isLoading} = useFetch(`${apiUrl}/catProductos`);
  
  const {rows: categorias} = !!data && data;

  return (
    <div className="explorarCat">
      <ContExpTitle/>
      <hr className="hrGeneral"/>
      {isLoading
      ? <p>Cargando</p>
      : <ContListaCat categorias={categorias}/>
      }
      
    </div>
  )
}
