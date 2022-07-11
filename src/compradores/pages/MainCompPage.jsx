import { ContActividades, ContExplorar, ContFavoritos, OfertaCard } from "../../components";
import { listaOfertas } from "../../data";

export const MainCompPage = () => {
  return (
    <div className="comp-main-container u-margin-top-navbar">
      <div className="comp-main-container__izqCont">
        <ContExplorar/>
        <ContFavoritos/>
      </div>
      <div className="comp-main-container__divSepIzq"></div>
      <div className="comp-main-container__medCont">
        <div className="comp-main-container__medCont__ofertas">
          {listaOfertas.map(oferta => (
            <OfertaCard 
              key={oferta.idOferta}
              oferta={oferta}
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
