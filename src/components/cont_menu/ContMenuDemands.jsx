import { ContListaMenuProv } from "../../proveedores/components/ContListaMenuProv"
import {ContMenuDemands} from "./ContListaDemands"

export const ContMenuDemands = ({esProveedor = false}) => {
  
  return (
    <div>
    <hr/>
    {
      !esProveedor
      ?
      <ContMenuDemands/>
      :
      <ContListaMenuProv />
    }
    
  </div>
  )
}