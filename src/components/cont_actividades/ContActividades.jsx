import { ofertasActivasByUser } from "../../data"
import { ContListaActProv } from "../../proveedores/components/ContListaActProv"
import { ContActTitle } from "./ContActTitle"
import { ContListaAct } from "./ContListaAct"

export const ContActividades = ({esProveedor = false}) => {

  //extraer las ofertas activas por el usuario

  return (
    <div className="actividadesRec">
      <ContActTitle/>
      <hr className="hrGeneral"/>
      {
        !esProveedor
        ?
        <ContListaAct ofertasActivasByUser={ofertasActivasByUser}/>
        :
        <ContListaActProv />
      }
      
    </div>
  )
}
