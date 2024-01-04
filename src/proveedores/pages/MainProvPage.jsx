import { ContActividades, OfertaCard,ContExplorar,ContFavoritos} from "../../components";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth";
import { ProdOfertaButtonBox } from "../components";
import { apiUrl } from "../../apiUrl";
import { ContMenu } from "../../components/cont_menu/ContMenu";
import { obtainUserPermission } from "../../firebase";

export const MainProvPage = () => {
  
  let sessionTimer;
  const {authState} = useContext(AuthContext);
  const {user} = authState;
  

  const [ofertasProv, setOfertasProv] = useState([]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  




  const handleSeleccion = (event) => {
    const opcionSeleccionada = event.target.value;
    setOpcionSeleccionada(opcionSeleccionada);

    console.log(`Opción seleccionada: ${opcionSeleccionada}`);
  };

  const getOfertasProv = async() => {
    const resp = await fetch(`${apiUrl}/ofertas?idProveedor=${user.IdUsuario}`);
    const data = await resp.json();
    const {rows: ofertas} = !!data && data;
    setOfertasProv(ofertas);
  }
  const getOfertasPorFechaMayor = async() => {
    const resp = await fetch(`${apiUrl}/ofertas/orderFechaMayor?idProveedor=${user.IdUsuario}`);
    const data = await resp.json();
    const {rows: ofertasM} = !!data && data;
    setOfertasProv(ofertasM);
  }
  const getOfertasPorFechaMenor = async() => {
    const resp = await fetch(`${apiUrl}/ofertas/orderFechaMenor?idProveedor=${user.IdUsuario}`);
    const data = await resp.json();
    const {rows: ofertasm} = !!data && data;
    setOfertasProv(ofertasm);
  }
  const getOfertasSoloCurso = async() => {
    const resp = await fetch(`${apiUrl}/ofertas?idProveedor=${user.IdUsuario}&idEstadosOferta=${1}`);
    const data = await resp.json();
    const {rows: ofertasc} = !!data && data;
    setOfertasProv(ofertasc);
  }
  
  const seleccionFilter = async(opcionSeleccionada) => {
    switch (opcionSeleccionada) {
      case "opcionFechaM":
        getOfertasPorFechaMayor()
        break;
      case "opcionFecham":
        getOfertasPorFechaMenor()
        break;
      case "opcionSoloCurso": 
        getOfertasSoloCurso()    
      break;  
      default:
        getOfertasProv()
      break;
    }
  }

  useEffect(() => {
    seleccionFilter(opcionSeleccionada);
  }, [opcionSeleccionada]);

  useEffect(() => {
    getOfertasProv();

    // eslint-disable-next-line
  }, [authState])

  
  obtainUserPermission();

  const showEmptyArray = ofertasProv.length === 0;

  return (
    <div className="comp-main-container u-margin-top-navbar">
      <div className="comp-main-container__izqCont">
        <ContMenu/>
        <ProdOfertaButtonBox/>
        <ContExplorar/>
        <ContFavoritos/>
      </div>
      <div className="comp-main-container__divSepIzq"></div>
      <div className="comp-main-container__medCont">
        <div className="comp-main-container__medCont__ofertas">
          <div className="explorarCat__titleCardOferta">
          <div  className="explorarCat__titleCardOferta__tituloBox">
            <span className="material-symbols-rounded icon-grey icon--sm">
              arrow_forward_ios
            </span>
            <p className="paragraph--mid"><b>Mis ofertas</b></p>
            </div>
              <div></div>
             <div className="explorarCat__titleCardOferta__filtrarBox">
              <span className="material-symbols-rounded icon-grey icon--bg">
              filter_list
            </span>
                   <select value={opcionSeleccionada} onChange={handleSeleccion} className="formSubirProducto__inputBox__selectFilter">
                     <option value="todos">Todas</option>
                     <option value="opcionFechaM">Fecha de cierre - Mayor a menor</option>
                     <option value="opcionFecham">Fecha de cierre - Menor a mayor</option>
                     <option value="opcionSoloCurso">Solo en curso</option>
                  </select>
                  </div>
                  
                 
          </div>
          <hr className="hrGeneral"/>
          {
          showEmptyArray
          ? <p className="paragraph">Por el momento no tienes ofertas creadas </p>
          :
          ofertasProv.map(oferta => (
            <OfertaCard 
              key={oferta?.IdOferta}
              oferta={oferta}
              esProveedor={true}
            />
          ))
          }
        </div>
      </div>
      <div className="comp-main-container__divSepDer"></div>
      <div className="comp-main-container__derCont">
        <ContActividades esProveedor={true}/>
      </div>
    </div>
  )

}
