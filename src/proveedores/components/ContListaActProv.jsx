import { useContext, useEffect, useState } from "react";
import { apiUrl } from "../../apiUrl";
import { AuthContext } from "../../auth";
import { ContListaActProvItem } from "./ContListaActProvItem";
import { ContListaProvCompItem } from "./ContListaProvCompItem";

export const ContListaActProv = () => {

  const {authState} = useContext(AuthContext);
  const {user: proveedor} = authState;

  const [ofertasActivasByProv, setOfertasActivasByProv] = useState();
  const [comprasPagadasByProv, setComprasPagadasByProv] = useState();

  const getOfertasActivasByIdProveedor = async(id) => {
    const resp = await fetch(`${apiUrl}/ofertas?idProveedor=${id}&idEstadosOferta=1`);
    const data = await resp.json();
    const {rows: ofertasActivas} = !!data && data;
    setOfertasActivasByProv(ofertasActivas);
  }

  const getComprasPagadasByIdProveedor = async(id) => {
    const resp = await fetch(`${apiUrl}/compras?idProveedor=${id}&idEstado=3`);
    const data = await resp.json();
    const {rows: comprasPagadas} = !!data && data;
    setComprasPagadasByProv(comprasPagadas);
  }
  

  useEffect(() => {
    getOfertasActivasByIdProveedor(proveedor.IdUsuario);
    getComprasPagadasByIdProveedor(proveedor.IdUsuario);
  }, [proveedor])
  
  return (
    <div className="actividadesRec__lista">
      {
        ofertasActivasByProv?.map(ofertaActiva => 
          <ContListaActProvItem 
            ofertaActiva={ofertaActiva}
            key={ofertaActiva.IdOferta}
          />)
      }
      {
        comprasPagadasByProv?.map(compraPagada => 
          <ContListaProvCompItem
            compraPagada={compraPagada}
            key={compraPagada.IdCompra}
          />)
      }
    </div>
  )
}
