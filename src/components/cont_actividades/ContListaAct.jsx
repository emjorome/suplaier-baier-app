import { useState } from "react";
import { Link } from "react-router-dom"
//import { AuthContext } from "../../auth";

export const ContListaAct = () => {

  // const {authState} = useContext(AuthContext);
  // const {user: comprador} = authState;

  // eslint-disable-next-line
  const [ofertasActivasByComp, setOfertasActivasByComp] = useState([]);

  // const getOfertasActivasByIdProveedor = async(id) => {
  //   const resp = await fetch(`${apiUrl}/compras?idProveedor=${id}&idEstadoOferta=1`);
  //   const data = await resp.json();
  //   const {rows: ofertasActivas} = !!data && data;
  //   setOfertasActivasByComp(ofertasActivas);
  // }

  // useEffect(() => {
  //   getOfertasActivasByIdProveedor(proveedor.id);
  // }, [comprador.id])

  const showEmptyArray = ofertasActivasByComp?.length === 0;

  return (
    <div className="actividadesRec__lista">
      {showEmptyArray
        ? <p className="paragraph">No tienes ofertas activas</p>
        :
        ofertasActivasByComp?.map(ofertaActiva => {

          return <Link 
              to={`/oferta/${ofertaActiva.idOferta}`} 
              key={ofertaActiva.idOferta} 
              className="actividadesRec__lista__item"
            >
            <div className="actividadesRec__lista__item__enCurso"></div>
            <span className="material-symbols-rounded icon--sm actividadesRec__lista__item__delete">
              cancel
            </span>
            {/* <p className="paragraph--mid--2"><b>{producto.nombre}</b></p>
            <p className="paragraph--mid--2">{producto.nombreProveedor}</p>
            <p className="paragraph--mid--2">{ofertaActiva.fechaLimite}</p> */}
          </Link>
        })
      }
    </div>
  )
}
