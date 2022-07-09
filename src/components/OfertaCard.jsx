//import { useFetch } from "../hooks/useFetch";
import { EtiquetaOferta } from "./EtiquetaOferta"
import { ProgressBar } from "./ProgressBar";

//Para hacer una ofertaCard, yo solo necesito como param
//el objeto de la oferta
export const OfertaCard = ({oferta}) => {

  //aqui con el idProducto, hacer get del producto
  const {idProducto,
        idProveedor, 
        cantMin,
        cantMax,
        actualProductos,
        fechaLimite,
        estado,
      } = oferta;

  //const {data} = useFetch(urlGetImagen);
  //const {producto} = data;

  //const {data} = useFetch(urlGetProveedor);
  //const {proveedor} = data;
  //const {nombre} = proveedor;

  const nombreProveedor = "Agrícola S.A.";
  const producto = {
    nombre: "Manzana",
    descripcion: "Manzana fresca de tipo ... traída desde ...",
    costoUnitario: 0.5,
    //aqui debe ser un album de Img, abrir nueva tabla de unos a muchos
    urlImg: "https://t2.ev.ltmcdn.com/es/posts/7/0/2/germinar_semillas_de_manzana_como_hacerlo_y_cuidados_2207_600.jpg",
  }

  const {nombre: nombreProd, costoUnitario: costoU, urlImg} = producto;

  return (
    <div className="oferta-card" onClick={() => console.log("click en oferta :o")}>
      <div className="oferta-card__imgbox">
        <img className="oferta-card__imgbox__img" src={urlImg} alt={nombreProd}/>
      </div>
      <div className="oferta-card__datosbox">
        <EtiquetaOferta estado={estado}/>
        <div className="oferta-card__datosbox__title u-margin-bottom-small">
          <p className="paragraph paragraph--bold paragraph--mid">{nombreProd}</p>
          <p className="paragraph">{nombreProveedor}</p>
        </div>
        <div className="oferta-card__datosbox__otros">
          <div>
            <p className="paragraph">En oferta: {cantMax - actualProductos} / { cantMax }</p>
            <ProgressBar 
              actualProductos={actualProductos} 
              cantMax={cantMax}
            />
            <p className="paragraph">Fecha vigencia: {fechaLimite}</p>
          </div>
          <div>
            <p className="paragraph u-padding-right-medium">Precio unitario: {"$" + costoU}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
