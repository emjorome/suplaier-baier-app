import {  useEffect, useState } from "react";
import { apiUrl } from "../../../apiUrl";
import { ContActividades, OrdenCard, ContExplorar, ContFavoritos } from "../../../components"
import { ContMenu } from "../../../components/cont_menu/ContMenu"
import { ProdOfertaButtonBox } from "../../components";

export const OrdCompPageProv = () => {

  const [comprasPorConf, setComprasPorConf] = useState([]);


  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const handleSeleccion = (event) => {
    const opcionSeleccionada = event.target.value;
    setOpcionSeleccionada(opcionSeleccionada);
  };

  const getComprasPorConf = async() => {
    const resp = await fetch(`${apiUrl}/compras?idEstado=${1}`);
    const data = await resp.json();
    const {rows: compras} = !!data && data;
    setComprasPorConf(compras);
  }

  useEffect(() => {
    getComprasPorConf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showEmptyArray = !!comprasPorConf && comprasPorConf?.length === 0;

  return (
    <div className="comp-main-container u-margin-top-navbar">
    <div className="comp-main-container__izqCont">
      <ContMenu/>
      <ProdOfertaButtonBox/>
      <ContExplorar />
      <ContFavoritos />
    </div>
    <div className="comp-main-container__divSepIzq"></div>
    <div className="comp-main-container__medCont">
      <div className="comp-main-container__medCont__ofertas">
        <div className="explorarCat__titleCardOferta">
        <div  className="explorarCat__titleCardOferta__tituloBox">
          <span className="material-symbols-rounded icon-grey icon--sm">
            arrow_forward_ios
          </span>
          <p className="paragraph--mid"><b>Órdenes de compra</b></p>
          </div>
          <div></div>
          <div className="explorarCat__titleCardOferta__filtrarBox">
          <span className="material-symbols-rounded icon-grey icon--bg">
              filter_list
            </span>
                   <select value={opcionSeleccionada} onChange={handleSeleccion} className="formSubirProducto__inputBox__selectFilter">
                     <option value="todos">Todas</option>
                     <option value="opcionFechaM">Fecha - Mayor a menor</option>
                     <option value="opcionFecham">Fecha - Menor a mayor</option>
                   </select>
                   </div>
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
            esProveedor={true}
          />
        ))}
      </div>
    </div>
    <div className="comp-main-container__divSepDer"></div>
    <div className="comp-main-container__derCont">
      <ContActividades esProveedor={true}/>
    </div>
  </div>
  )
}
