import { listaOfertas, productos } from "../data";

export const getOfertaById = (id) => {
  return listaOfertas.find(oferta => oferta.idOferta === id);
}

export const getProductoById = (id) => {
  return productos.find(prod => prod.idProducto === id);
}