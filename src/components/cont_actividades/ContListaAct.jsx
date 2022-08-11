import { useContext, useEffect, useState } from "react";
import { apiUrl } from "../../apiUrl";
import { AuthContext } from "../../auth";
import { ContListaActItem } from "./ContListaActItem";

export const ContListaAct = () => {

  const {authState} = useContext(AuthContext);
  const {user} = authState;

  // eslint-disable-next-line
  const [ofertasActivasByComp, setOfertasActivasByComp] = useState([]);

  const getComprasByComprador = async() => {
    const resp = await fetch(`${apiUrl}/compras?idComprador=${user.IdUsuario}`);
    const data = await resp.json();
    const {rows: compras} = !!data && data;
    //seleccionar ofertas activas (es decir, que no han finalizado)
    setOfertasActivasByComp(compras.filter(compra => compra.IdEstado !== 9));
  }

  useEffect(() => {
    getComprasByComprador();
    // eslint-disable-next-line
  }, [])
  

  const showEmptyArray = ofertasActivasByComp?.length === 0;

  return (
    <div className="actividadesRec__lista">
      {showEmptyArray
        ? <p className="paragraph">No tienes ofertas activas</p>
        :
        ofertasActivasByComp?.map(ofertaActiva => {
          return <ContListaActItem ofertaActiva={ofertaActiva} key={ofertaActiva.IdCompra}/>
        })
      }
    </div>
  )
}
