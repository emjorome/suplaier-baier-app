import { useContext } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../../auth";
import { getOfertaActivaByIdProveedor, getProductoById } from "../../helpers/getOfertaById"

export const ContListaActProv = () => {

  const {authState} = useContext(AuthContext);
  const {user: proveedor} = authState;

  // const producto = {
  //   idProducto: 1,
  //   nombre: "Manzana",
  //   descripcion: "Manzana fresca de tipo ... traída desde ...",
  //   costoUnitario: 0.5,
  //   nombreProveedor: "Agrícola S.A.",
  //   //aqui debe ser un album de Img, abrir nueva tabla de unos a muchos
  //   urlImg: "https://t2.ev.ltmcdn.com/es/posts/7/0/2/germinar_semillas_de_manzana_como_hacerlo_y_cuidados_2207_600.jpg",
  // };

  const ofertasActivasByProv = getOfertaActivaByIdProveedor(proveedor.id);

  return (
    <div className="actividadesRec__lista">
      {
        ofertasActivasByProv.map(ofertaActiva => {

          return <Link 
              to={`/mi_oferta/${ofertaActiva.idOferta}`} 
              key={ofertaActiva.idOferta} 
              className="actividadesRec__lista__item"
            >
            <div className="actividadesRec__lista__item__enCurso"></div>
            <span className="material-symbols-rounded icon--sm actividadesRec__lista__item__delete">
              cancel
            </span>
            <p className="paragraph--mid--2"><b>{getProductoById(ofertaActiva.idProducto).nombre}</b></p>
            <p className="paragraph--mid--2">{getProductoById(ofertaActiva.idProducto).nombreProveedor}</p>
            <p className="paragraph--mid--2">{ofertaActiva.fechaLimite}</p>
          </Link>
        })
      }
    </div>
  )
}
