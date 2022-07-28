import { useContext, useEffect, useState } from "react";
import { apiUrl } from "../../apiUrl";
import { AuthContext } from "../../auth";
import { ContListaActProvItem } from "./ContListaActProvItem";

export const ContListaActProv = () => {

  const {authState} = useContext(AuthContext);
  const {user: proveedor} = authState;

  const [ofertasActivasByProv, setOfertasActivasByProv] = useState();

  const getOfertasActivasByIdProveedor = async(id) => {
    const resp = await fetch(`${apiUrl}/publicaciones?idProveedor=${id}&idEstadoOferta=1`);
    const data = await resp.json();
    const {rows: ofertasActivas} = !!data && data;
    setOfertasActivasByProv(ofertasActivas);
  }

  useEffect(() => {
    getOfertasActivasByIdProveedor(proveedor.id);
  }, [proveedor.id])
  
  return (
    <div className="actividadesRec__lista">
      {
        ofertasActivasByProv?.map(ofertaActiva => 
          <ContListaActProvItem 
            ofertaActiva={ofertaActiva}
            key={ofertaActiva.IdPublicacion}
          />)
      }
    </div>
  )
}
