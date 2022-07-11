import { ofertasActivasByUser } from "../../data"
import { ContActTitle } from "./ContActTitle"
import { ContListaAct } from "./ContListaAct"

export const ContActividades = () => {

  //extraer las ofertas activas por el usuario

  return (
    <div className="actividadesRec">
      <ContActTitle/>
      <hr className="hrGeneral"/>
      <ContListaAct ofertasActivasByUser={ofertasActivasByUser}/>
    </div>
  )
}
