import { useContext, useEffect, useState } from "react";
import { apiUrl } from "../../apiUrl";
import { AuthContext } from "../../auth";
import { useForm } from "../../hooks";
import { AccionExitosa } from "./AccionExitosa";
import { ResumenOferta } from "./ResumenOferta";

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
        fechaLimite: "",
        fechaCreacion: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
        fechaModificacion: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
        estado: true,
        idEstadoOferta: 1,
      });

  const [productosProv, setProductosProv] = useState([]);
  const [producto, setProducto] = useState({});
  const [productoExiste, setProductoExiste] = useState(false);
  const [imagen, setImagen] = useState();
  const [showResumenOferta, setShowResumenOferta] = useState(false);
  const [showAccionExitosa, setShowAccionExitosa] = useState(false);
  
  const onContinuarCrearOferta = (e) => {
    e.preventDefault();
    console.log(formState);
    setShowResumenOferta(true);

  }

  const getProductos = async() => {
    const resp = await fetch(`${apiUrl}/productos?idProveedor=${user.id}`);
    const data = await resp.json();
    const {rows: productos} = !!data && data;
    setProductosProv(productos);
  }

  useEffect(() => {
    getProductos();
    // eslint-disable-next-line
  }, [])
  
  const getProductoSelect = async(id) => {
    if (id !== "Seleccionar producto" && id !== -1) {
      const resp = await fetch(`${apiUrl}/productos?id=${id}`);
      const data = await resp.json();
      const {rows: producto} = !!data && data;
      setProductoExiste(true);
      setProducto(producto[0]);
    } else {
      setProductoExiste(false);
    }
    
  }

  const getImg = async (urlImg, id) => {
    if (id !== "Seleccionar producto" && id !== -1) {
      setImagen(urlImg);
    }
  };


  useEffect(() => {
    getProductoSelect(idProducto);
  }, [idProducto]);

  useEffect(() => {
    getImg(producto.UrlImg, idProducto);
  }, [producto, idProducto])
  

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
                  <option value={prod.IdProducto} key={prod.Name}>
                    {prod.Name}
                  </option>)
              }
            </select>
          </div>
          {
          productoExiste && 
          <div className="formCrearOferta__productoBox u-margin-top-small">
            <div className="formCrearOferta__productoBox__imgBox">
              <img 
                className="formCrearOferta__productoBox__imgBox__img" 
                src={imagen} 
                alt={producto?.Name} 
              />
            </div>
            <div className="oferta-detalle__productoBox__desc">
              <div className="oferta-detalle__productoBox__desc__text">
                <p className="paragraph"><b>{producto?.Name}</b></p>
                <p className="paragraph"><b>Precio unitario: $ {producto?.ValorU}</b></p>
                <p className="paragraph">{producto?.Descripcion}</p>
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
        {
          showResumenOferta &&
          <ResumenOferta 
            formState={formState} 
            setShowResumenOferta={setShowResumenOferta}
            setShowAccionExitosa={setShowAccionExitosa}
          />
        }
        {
          showAccionExitosa &&
          <AccionExitosa
            texto={'¡Oferta creada con éxito!'}
            setShowAccionExitosa={setShowAccionExitosa}
          />
        }
      </div>
    </form>
  )
}
