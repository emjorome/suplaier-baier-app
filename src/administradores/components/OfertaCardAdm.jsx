import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../apiUrl";
import { EtiquetaOferta, ProgressBar } from "../../components"

export const OfertaCardAdm = ({oferta, esProveedor = false}) => {

  const navigate = useNavigate();

  const onClickOferta = () => {
    !esProveedor 
    ?
    navigate(`/oferta/${oferta.IdPublicacion}`)
    :
    navigate(`/mi_oferta/${oferta.IdPublicacion}`);
  }
  const {IdProducto,
        IdProveedor, 
        Maximo,
        ActualProductos,
        FechaLimite,
        IdEstadoOferta,
      } = oferta;

  const [producto, setProducto] = useState();
  const [proveedor, setProveedor] = useState();
  const [estadoOferta, setEstadoOferta] = useState();
  const [nombreProveedor, setNombreProveedor] = useState();
  const [datosProd, setDatosProd] = useState({});

  const getProductoOferta = async() => {
    const resp = await fetch(`${apiUrl}/productos?id=${IdProducto}`);
    const data = await resp.json();
    const {rows: producto} = !!data && data;
    setProducto(producto[0]);
  }

  const getProveedorOferta = async() => {
    const resp = await fetch(`${apiUrl}/proveedores?id=${IdProveedor}`);
    const data = await resp.json();
    const {rows: proveedor} = !!data && data;
    setProveedor(proveedor[0]);
  }

  const getEstadoOferta = async() => {
    const resp = await fetch(`${apiUrl}/estados?id=${IdEstadoOferta}`);
    const data = await resp.json();
    const {rows: estado} = !!data && data;
    setEstadoOferta(estado[0]);
  }

  useEffect(() => {
    getProductoOferta();
    getProveedorOferta();
    getEstadoOferta();
    // eslint-disable-next-line
  }, [oferta])

  useEffect(() => {
    setNombreProveedor(proveedor?.Nombre);
  }, [proveedor])
  
  useEffect(() => {
    setDatosProd({
      nombreProd: producto?.Name,
      costoU: producto?.ValorU,
      urlImg: producto?.UrlImg,
    })
  
  }, [producto])
  
  return (
    <div 
      className="oferta-card-adm u-margin-top-small animate__animated animate__fadeIn" 
      onClick={onClickOferta}
    >
      <div className="oferta-card-adm__imgbox">
        <img className="oferta-card-adm__imgbox__img" src={datosProd?.urlImg} alt={datosProd?.nombreProd}/>
      </div>
      <div className="oferta-card__datosbox">
        <EtiquetaOferta estado={estadoOferta?.Descripcion}/>
        <div className="oferta-card-adm__datosbox__title u-margin-bottom-small">
          <p className="paragraph paragraph--bold paragraph--mid">{datosProd?.nombreProd}</p>
          <p className="paragraph">{nombreProveedor}</p>
        </div>
        <div className="oferta-card__datosbox__otros">
          <div className="oferta-card-adm__datosbox__otros__der">
            <p className="paragraph u-padding-right-medium">Precio unitario: {"$" + datosProd?.costoU}</p>
            <p className="paragraph">En oferta: {Maximo - ActualProductos} / { Maximo }</p>
            <ProgressBar 
              actualProductos={ActualProductos} 
              cantMax={Maximo}
            />
            <p className="paragraph">Fecha vigencia: {FechaLimite.split("T")[0]}</p>
            
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
