import { ContListaMenuProv } from "../../proveedores/components/ContListaMenuProv"
import { ContListaMenu } from "./ContListaMenu"
import { ContMenuTitle } from "./ContMenuTitle"


export const ContMenu = ({esProveedor = false}) => {
  
  return (
    <div className="actividadesRec">
    <ContMenuTitle/>
    <hr className="hrGeneral"/>
    {
      !esProveedor
      ?
      <ContListaMenu />
      :
      <ContListaMenuProv />
    }
    
  </div>
  )
}
