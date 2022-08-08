import { useForm } from "../../hooks";
import country from "country-list-js";
import { useEffect, useState } from "react";
import { listaCiudades } from "../../data";



export const FormRegistrarComprador = () => {

  const listaPaises = country.names();
  const [listaCiudadesEcuador, setListaCiudadesEcuador] = useState(listaCiudades);
  const [esEcuador, setEsEcuador] = useState(false);

  const {
    formState, nombre, identificacion, usuario, contrasena, email, numero, pais, ciudad, direccion, onInputChange} = useForm({
      idRol: 1, 
      nombre: "", 
      identificacion: "", 
      usuario: "", 
      contrasena: "", 
      email: "", 
      numero: "", 
      pais: "", 
      ciudad: "", 
      direccion: "",
    });

  //IdRol, Nombre, Identificacion, Usuario, Contrasena, Email, Numero, Pais, Ciudad, Direccion

  useEffect(() => {
    setEsEcuador(pais === "Ecuador");
  }, [pais])
  

  const onRegistrarComprador = () => {
    console.log("registrando como comprador")
  }

  return (
    <form onSubmit={onRegistrarComprador}>
    <div className="compraProducto__box">
        <div className="formSubirProducto u-margin-top-small">
          <label htmlFor="compradorUsuario">Usuario</label>
          <input
            id="compradorUsuario"
            type="text"
            placeholder="jrodriguez"
            className="formSubirProducto__input paragraph"
            name="usuario"
            value={usuario}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="formSubirProducto u-margin-top-small">
          <label htmlFor="compradorContrasena">Contraseña</label>
          <input
            id="compradorContrasena"
            type="password"
            placeholder="contrasena123!"
            className="formSubirProducto__input paragraph"
            name="contrasena"
            value={contrasena}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="formSubirProducto u-margin-top-small">
          <label htmlFor="compradorName">Nombre y Apellido</label>
          <input
            id="compradorName"
            type="text"
            placeholder="Juan Rodríguez"
            className="formSubirProducto__input paragraph"
            name="nombre"
            value={nombre}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="formSubirProducto u-margin-top-small">
          <label htmlFor="compradorIdentificacion">C.I.</label>
          <input
            id="compradorIdentificacion"
            type="text"
            placeholder="0987654321"
            className="formSubirProducto__input paragraph"
            name="identificacion"
            value={identificacion}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="formSubirProducto u-margin-top-small">
          <label htmlFor="compradorEmail">E-mail</label>
          <input
            id="compradorEmail"
            type="text"
            placeholder="example@gmail.com"
            className="formSubirProducto__input paragraph"
            name="email"
            value={email}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="formSubirProducto u-margin-top-small">
          <label htmlFor="compradorCelular">Celular</label>
          <input
            id="compradorCelular"
            type="text"
            placeholder="0998950947"
            className="formSubirProducto__input paragraph"
            name="numero"
            value={numero}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="formRegistrarComprador">
          <div className="formSubirProducto u-margin-top-small">
            <label htmlFor="compradorPais">País</label>
            <select 
              name="pais"
              className="formSubirProducto__input paragraph"
              onChange={onInputChange}
            >
              <option defaultValue={"none"}>
                Seleccionar País
              </option> 
              {
                listaPaises?.map(pais => 
                  <option value={pais} key={pais}>
                    {pais}
                  </option>)
              }
            </select>
          </div>
          { esEcuador &&
            <div className="formSubirProducto u-margin-top-small">
  `          <label htmlFor="compradorCiudad">Ciudad</label>
              <select 
                name="ciudad"
                className="formSubirProducto__input paragraph"
                onChange={onInputChange}
              >
                <option defaultValue={"none"}>
                  Seleccionar Ciudad
                </option> 
                {
                  listaCiudadesEcuador?.map(ciudad => 
                    <option value={ciudad.city} key={ciudad.city}>
                      {ciudad.city}
                    </option>)
                }
              </select>
            </div>
            
          }
          {!esEcuador && 
            <div className="formSubirProducto u-margin-top-small">
              <label htmlFor="compradorCiudad">Ciudad</label>
              <input
                id="compradorCiudad"
                type="text"
                placeholder="Ingresar ciudad"
                className="formSubirProducto__input paragraph"
                name="ciudad"
                value={ciudad}
                onChange={onInputChange}
                required
              />
            </div>
          }
        </div>
        <div className="formSubirProducto u-margin-top-small">
          <label htmlFor="compradorDireccion">Dirección</label>
          <textarea
            id="compradorDireccion"
            type="text"
            placeholder="Sauces 8 Calle 13"
            className="formSubirProducto__textArea paragraph"
            name="direccion"
            value={direccion}
            onChange={onInputChange}
            required
          />
        </div>

    </div>

    {/* <div className="metodoPago__btnBox">
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
    </div> */}
  </form>
  )
}
