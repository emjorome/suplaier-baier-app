import { useEffect, useState } from "react";
import { apiUrl } from "../../apiUrl";
import { ContActividades, ContExplorar, ContFavoritos, OrdenCard } from "../../components"
import { ContMenu } from "../../components/cont_menu/ContMenu"

export const OrdCompPage = () => {

  const [comprasPorConf, setComprasPorConf] = useState([]);

  const getComprasPorConf = async() => {
    const resp = await fetch(`${apiUrl}/compras?idEstado=${1}`);
    const data = await resp.json();
    const {rows: compras} = !!data && data;
    setComprasPorConf(compras);
  }

  useEffect(() => {
    getComprasPorConf();
    // eslint-disable-next-line
  }, [])

  const showEmptyArray = !!comprasPorConf && comprasPorConf?.length === 0;

  return (
    <div className="comp-main-container u-margin-top-navbar">
    <div className="comp-main-container__izqCont">
      <ContMenu/>
      <ContExplorar/>
      <ContFavoritos/>
    </div>
    <div className="comp-main-container__divSepIzq"></div>
    <div className="comp-main-container__medCont">
      <div className="comp-main-container__medCont__ofertas">
        <div className="explorarCat__title">
          <span className="material-symbols-rounded icon-grey icon--sm">
            arrow_forward_ios
          </span>
          <p className="paragraph--mid"><b>Tus órdenes de compra</b></p>
        </div>
        <hr className="hrGeneral"/>
        {
          showEmptyArray &&  
          <p className="paragraph">Por el momento no tienes órdenes de compra.</p>
        }
        {
        comprasPorConf?.map(compra => (
          <OrdenCard 
            key={compra.IdCompra}
            compra={compra}
          />
        ))}
      </div>
    </div>
    <div className="comp-main-container__divSepDer"></div>
    <div className="comp-main-container__derCont">
      <ContActividades/>
    </div>
  </div>
  )
}
