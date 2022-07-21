//import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { getProductoById, getProveedorById } from "../../helpers/getOfertaById";
import { EtiquetaOferta } from "./EtiquetaOferta"
import { ProgressBar } from "./ProgressBar";

//Para hacer una ofertaCard, yo solo necesito como param
//el objeto de la oferta
export const OfertaCard = ({oferta, esProveedor = false}) => {

  const navigate = useNavigate();

  const onClickOferta = () => {
    !esProveedor 
    ?
    navigate(`/oferta/${oferta.idOferta}`)
    :
    navigate(`/mi_oferta/${oferta.idOferta}`);
  }

  //aqui con el idProducto, hacer get del producto
  const {//idProducto,
        idProveedor, 
        //cantMin,
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

  const proveedor = getProveedorById(idProveedor);
  const {nombre: nombreProveedor} = proveedor;
  const producto = getProductoById(oferta.idProducto);

  const {nombre: nombreProd, costoUnitario: costoU, urlImg} = producto;

  return (
    <div 
      className="oferta-card" 
      onClick={onClickOferta}
    >
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
          <div className="oferta-card__datosbox__otros__der">
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
