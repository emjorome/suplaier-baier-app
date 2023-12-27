import { useEffect, useState } from "react";
import { apiUrl } from "../../apiUrl";
import {
  ContActividades,
  ContExplorar,
  ContFavoritos,
  OfertaCard,
} from "../../components";
import { ContMenu } from "../../components/cont_menu/ContMenu";
import { ProdDemandaButtonBox } from "../components";
export const OrdFinPage = () => {
  const [ofertasTodos, setOfertasTodos] = useState([]);

  const getOfertasTodos = async () => {
    //ofertas finalizadas
    const resp = await fetch(`${apiUrl}/ofertas?idEstadosOferta=${9}`);
    const data = await resp.json();
    const { rows: ofertas } = !!data && data;
    setOfertasTodos(ofertas);
  };

  useEffect(() => {
    getOfertasTodos();
    // eslint-disable-next-line
  }, []);

  const showEmptyArray = ofertasTodos?.length === 0;

  return (
    <div className="comp-main-container u-margin-top-navbar">
      <div className="comp-main-container__izqCont">
        <ContMenu />
        <ProdDemandaButtonBox />

        <ContExplorar />
        <ContFavoritos />
      </div>
      <div className="comp-main-container__divSepIzq"></div>
      <div className="comp-main-container__medCont">
        <div className="comp-main-container__medCont__ofertas">
          <div className="explorarCat__title">
            <span className="material-symbols-rounded icon-grey icon--sm">
              arrow_forward_ios
            </span>
            <p className="paragraph--mid">
              <b>Ofertas Finalizadas</b>
            </p>
          </div>
          <hr className="hrGeneral" />
          {showEmptyArray ? (
            <p className="paragraph">
              Por el momento no hay ofertas culminadas.
            </p>
          ) : (
            ofertasTodos?.map((oferta) => (
              <OfertaCard key={oferta.IdOferta} oferta={oferta} />
            ))
          )}
        </div>
      </div>
      <div className="comp-main-container__divSepDer"></div>
      <div className="comp-main-container__derCont">
        <ContActividades />
      </div>
    </div>
  );
};
