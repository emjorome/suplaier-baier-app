import { useContext } from "react";
import { AuthContext } from "../../auth";
import { categorias } from "../../data";
import { useForm } from "../../hooks";

export const FormSubirProducto = () => {

  const {authState} = useContext(AuthContext);
  const {user} = authState;

  const {
      formState,
      nombreProducto,
      descripcion,
      costoUnitario,
      stock,
      onInputChange} = useForm({
        nombreProducto: "",
        descripcion: "",
        costoUnitario: 0.00,
        nombreProveedor: user.nombre,
        stock: 0,
        categoria: "",
        urlImg: "",
      });
  
  const onContinuarSubirProducto = (e) => {
    e.preventDefault();
    console.log(formState);

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
                categorias.map(cat => 
                  <option value={cat.nombre} key={cat.nombre}>
                    {cat.nombre}
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
