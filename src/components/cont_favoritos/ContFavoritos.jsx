import { favoritos } from "../../data"
import { ContFavTitle } from "./ContFavTitle"
import { ContListaFav } from "./ContListaFav"

export const ContFavoritos = () => {

  //cargar lista de favoritos por comprador

  return (
    <div className="favoritosProv">
      <ContFavTitle/>
      <hr className="hrGeneral"/>
      <ContListaFav favoritos={favoritos}/>
    </div>
  )
}
