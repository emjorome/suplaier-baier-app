import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth";
import { getProductoById, getProductosByIdProveedor } from "../../helpers/getOfertaById";
import { useForm } from "../../hooks";

export const FormCrearOferta = () => {

  const {authState} = useContext(AuthContext);
  const {user} = authState;

  const d = new Date();

  const {
      formState,
      idProducto,
      cantMin,
      cantMax,
      descripcion,
      fechaLimite,
      onInputChange} = useForm({
        idProducto: -1,
        idProveedor: user.id,
        cantMin: 0,
        cantMax: 0,
        descripcion: "",
        actualProductos: 0,
        fechaLimite: "2022-07-21",
        fechaCreacion: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
        estado: "En Curso",
      });
  
  const onContinuarCrearOferta = (e) => {
    e.preventDefault();
    console.log(formState);

  }

  const productosProv = getProductosByIdProveedor(user.id);

  const [producto, setProducto] = useState({});

  useEffect(() => {
    setProducto(getProductoById(parseInt(idProducto)));
  
  }, [idProducto]);
  

  return (
    <form onSubmit={onContinuarCrearOferta}>
      <div className="compraProducto__box">
          <div className="formSubirProducto u-margin-top-small">
            <select 
              name="idProducto"
              className="formSubirProducto__input paragraph paragraph"
              onChange={onInputChange}
            >
              <option defaultValue={"none"}>
                Seleccionar producto
              </option> 
              {
                productosProv.map(prod => 
                  <option value={prod.idProducto} key={prod.nombre}>
                    {prod.nombre}
                  </option>)
              }
            </select>
          </div>
          {
          (idProducto !== -1) && 
          <div className="oferta-detalle__productoBox u-margin-top-small">
            <div className="oferta-detalle__productoBox__imgBox">
              <img 
                className="oferta-detalle__productoBox__imgBox__img" 
                src={producto?.urlImg} 
                alt={producto?.nombre} 
              />
            </div>
            <div className="oferta-detalle__productoBox__desc">
              <div className="oferta-detalle__productoBox__desc__text">
                <p className="paragraph"><b>{producto?.nombre}</b></p>
                <p className="paragraph"><b>Precio unitario: $ {producto?.costoUnitario}</b></p>
                <p className="paragraph">{producto?.descripcion}</p>
              </div>
            </div>
          </div>
          }
          <div className="formSubirProducto u-margin-top-small">
            <textarea
              type="text"
              placeholder="Descripción de la oferta"
              className="formSubirProducto__textArea paragraph"
              name="descripcion"
              autoComplete="off"
              value={descripcion}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="formSubirProducto u-margin-top-small">
            <input
              type="number"
              placeholder="Unidades mínimas para cerrar la oferta"
              className="formSubirProducto__input paragraph"
              name="cantMin"
              autoComplete="off"
              value={cantMin}
              onChange={onInputChange}
              min={1}
              required
            />
          </div>
          <div className="formSubirProducto u-margin-top-small">
            <input
              type="number"
              placeholder="Unidades en total a vender"
              className="formSubirProducto__input paragraph"
              name="cantMax"
              autoComplete="off"
              value={cantMax}
              onChange={onInputChange}
              min={1}
              required
            />
          </div>
          <div className="formSubirProducto u-margin-top-small">
            <input
              type="date"
              className="formSubirProducto__input paragraph"
              name="fechaLimite"
              autoComplete="off"
              value={fechaLimite}
              onChange={onInputChange}
              required
            />
          </div>
      </div>

      <div className="metodoPago__btnBox">
        <button
          type="submit" 
          className="btn btn--blue"
        >Continuar</button>
      </div>
    </form>
  )
}
