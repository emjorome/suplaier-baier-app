import { useContext, useEffect, useState } from "react";
import { apiUrl } from "../../apiUrl";
import { AuthContext } from "../../auth";
import { useForm } from "../../hooks";
import { AccionExitosa } from "./AccionExitosa";
import { ResumenProducto } from "./ResumenProducto";

export const FormSubirProducto = () => {

  const {authState} = useContext(AuthContext);
  const {user} = authState;

  const [imgExists, setImgExists] = useState(false);
  const [imagen, setImagen] = useState();
  const [showResumenProducto, setShowResumenProducto] = useState(false);
  const [showAccionExitosa, setShowAccionExitosa] = useState(false);
  const [categorias, setCategorias] = useState([]);

  const getImg = async (urlImg) => {
    const reader = new FileReader();
    reader.readAsDataURL(urlImg);
    reader.onloadend = () => {
      const base64data = reader.result;
      setImagen(base64data);
    };
  };

  const {
      formState, nombreProducto, descripcion, costoUnitario, stock,urlImg, onInputChange} = useForm({
        nombreProducto: "", descripcion: "", costoUnitario: 0.00, nombreProveedor: user.nombre,
        stock: 0, categoria: {}, urlImg: "",
      });

  const getCategorias = async() => {
    const resp = await fetch(`${apiUrl}/catProductos`);
    const data = await resp.json();
    const {rows: categorias} = !!data && data;
    setCategorias(categorias);
  }

  useEffect(() => {
    getCategorias();
  }, [])
  

  useEffect(() => {
    //aqui se debe validar el url
    if(urlImg !== ""){
      setImgExists(true);
      getImg(urlImg);
    } else {
      setImgExists(false);
    }
  }, [urlImg])
  
  
  const onContinuarSubirProducto = (e) => {
    e.preventDefault();
    setShowResumenProducto(true);
  }

  return (
    <form onSubmit={onContinuarSubirProducto}>
      <div className="compraProducto__box">
          <div className="formSubirProducto u-margin-top-small">
            <input
              type="text"
              placeholder="Nombre del producto"
              className="formSubirProducto__input paragraph"
              name="nombreProducto"
              autoComplete="off"
              value={nombreProducto}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="formSubirProducto u-margin-top-small">
            <textarea
              type="text"
              placeholder="Descripción"
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
              placeholder="Precio unitario en USD"
              className="formSubirProducto__input paragraph"
              name="costoUnitario"
              autoComplete="off"
              value={costoUnitario}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="formSubirProducto u-margin-top-small">
            <input
              type="number"
              placeholder="Stock disponible"
              className="formSubirProducto__input paragraph"
              name="stock"
              autoComplete="off"
              value={stock}
              onChange={onInputChange}
              min={1}
              required
            />
          </div>
          <div className="formSubirProducto u-margin-top-small">
            <select 
              name="categoria"
              className="formSubirProducto__input paragraph"
              onChange={onInputChange}
            >
              <option defaultValue={"none"}>
                Seleccionar categoría
              </option> 
              {
                categorias?.map(cat => 
                  <option value={JSON.stringify(cat)} key={cat.IdCatProducto}>
                    {cat.Nombre}
                  </option>)
              }
            </select>
          </div>
          <div className="formSubirProducto u-margin-top-small">
            <input
              type="file"
              placeholder="Subir imagen o foto del producto"
              className="formSubirProducto__input paragraph paragraph--grey--2"
              name="urlImg"
              autoComplete="off"
              accept="image/*"
              onChange={onInputChange}
            />
          </div>
          {imgExists &&
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <img src={imagen} alt={urlImg} className="resumenProducto__ventana__img" />
            </div>
          }
      </div>

      <div className="metodoPago__btnBox">
        <button
          type="submit" 
          className="btn btn--blue"
        >Continuar</button>
      </div>
      <div>
        {
          showResumenProducto &&
          <ResumenProducto 
            formState={formState} 
            setShowResumenProducto={setShowResumenProducto}
            setShowAccionExitosa={setShowAccionExitosa}
          />
        }
        {
          showAccionExitosa &&
          <AccionExitosa
            texto={'¡Producto subido con éxito!'}
            setShowAccionExitosa={setShowAccionExitosa}
          />
        }
      </div>
    </form>
  )
}
