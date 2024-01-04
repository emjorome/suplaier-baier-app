import { ContListaMenuProv } from "../../proveedores/components/ContListaMenuProv"
import { ContListaMenu } from "./ContListaMenu"

export const ContMenuOfe = ({esProveedor = false}) => {
  
  return (
    <div>
    <hr/>
    {
      !esProveedor
      ?
      <ContListaMenu/>
      :
      <ContListaMenuProv />
    }
    
  </div>
  )
}