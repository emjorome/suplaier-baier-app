import { Link } from "react-router-dom"

export const ContListaAct = ({ofertasActivasByUser}) => {

  const producto = {
    idProducto: 1,
    nombre: "Manzana",
    descripcion: "Manzana fresca de tipo ... traída desde ...",
    costoUnitario: 0.5,
    nombreProveedor: "Agrícola S.A.",
    //aqui debe ser un album de Img, abrir nueva tabla de unos a muchos
    urlImg: "https://t2.ev.ltmcdn.com/es/posts/7/0/2/germinar_semillas_de_manzana_como_hacerlo_y_cuidados_2207_600.jpg",
  };

  return (
    <div className="actividadesRec__lista">
      {
        ofertasActivasByUser.map(ofertaActiva => {

          return <Link 
              to={`/oferta/${ofertaActiva.idOferta}`} 
              key={ofertaActiva.idOferta} 
              className="actividadesRec__lista__item"
            >
            <div className="actividadesRec__lista__item__enCurso"></div>
            <span className="material-symbols-rounded icon--sm actividadesRec__lista__item__delete">
              cancel
            </span>
            <p className="paragraph--mid--2"><b>{producto.nombre}</b></p>
            <p className="paragraph--mid--2">{producto.nombreProveedor}</p>
            <p className="paragraph--mid--2">{ofertaActiva.fechaLimite}</p>
          </Link>
        })
      }
    </div>
  )
}
