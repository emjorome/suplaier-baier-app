import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../apiUrl';

export const ContListaActItem = ({ofertaActiva: compra}) => {

  const [productoCompra, setProductoCompra] = useState({});
  const [ofertaCompra, setOfertaCompra] = useState(null);
  const [proveedorCompra, setProveedorCompra] = useState({});

  const getProductoById = async() => {
    const resp = await fetch(`${apiUrl}/productos?id=${ofertaCompra?.IdProducto}`);
    const data = await resp.json();
    const {rows: producto} = !!data && data;
    setProductoCompra(producto[0]);
  }

  const getOfertaByCompra = async() => {
    const resp = await fetch(`${apiUrl}/ofertas?id=${compra.IdOferta}`);
    const data = await resp.json();
    const {rows: oferta} = !!data && data;
    setOfertaCompra(oferta[0]);
  }

  const getProveedorById = async() => {
    const resp = await fetch(`${apiUrl}/usuarios?idUsuario=${ofertaCompra?.IdProveedor}`);
    const data = await resp.json();
    const {rows: proveedor} = !!data && data;
    setProveedorCompra(proveedor[0]);
  }

  useEffect(() => {
    !!ofertaCompra && getProductoById();
    !!ofertaCompra && getProveedorById();
    // eslint-disable-next-line
  }, [ofertaCompra])
  

  useEffect(() => {
    getOfertaByCompra();
    // eslint-disable-next-line
  }, [compra])
  
  return (
    <Link 
      to={`/oferta_individual/${compra.IdCompra}`} 
      key={compra.IdOferta} 
      className="actividadesRec__lista__item"
    >
    <div className="actividadesRec__lista__item__enCurso"></div>
    {/* <span className="material-symbols-rounded icon--sm actividadesRec__lista__item__delete">
      cancel
    </span> */}
    <p className="paragraph--mid--2"><b>{productoCompra?.Name}</b></p>
    <p className="paragraph--mid--2">{proveedorCompra?.Nombre}</p>
    <p className="paragraph--mid--2">{(ofertaCompra?.FechaLimite)?.split("T")[0]}</p>
  </Link>
  )
}
