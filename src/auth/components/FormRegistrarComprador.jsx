import { useForm } from "../../hooks";
import country from "country-list-js";
import { useEffect, useState } from "react";
import { listaCiudades } from "../../data";
import { AccionExitosaAuth } from "./AccionExitosaAuth";
import { apiUrl } from "../../apiUrl";

export const FormRegistrarComprador = () => {

  const listaPaises = country.names();
  const listaCiudadesEcuador = listaCiudades;
  const [esEcuador, setEsEcuador] = useState(false);
  const [showAccionExitosa, setShowAccionExitosa] = useState(false);

  //validaciones
  const [esUsuarioValido, setEsUsuarioValido] = useState(false);
  const [esNumeroValido, setEsNumeroValido] = useState(false);
  const [esNombreValido, setEsNombreValido] = useState(false);
  const [esIdentificacionValido, setEsIdentificacionValido] = useState(false);
  const [esContrasenaValido, setEsContrasenaValido] = useState(false);
  const [esEmailValido, setEsEmailValido] = useState(false);
  const [esCiudadValido, setEsCiudadValido] = useState(false);

  const {
    formState, Nombre, Identificacion, Usuario, Contrasena, Email, Numero, Pais, Ciudad, direccion, onInputChange} = useForm({
      IdRol: 1, 
      Nombre: "", 
      Identificacion: "", 
      Usuario: "", 
      Contrasena: "", 
      Email: "", 
      Numero: "", 
      Pais: "", 
      Ciudad: "", 
      Direccion: "",
    });

  const uploadUser = async() => {
    const body = formState;
    const resp = await fetch(`${apiUrl}/usuarios`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const data = await resp.json()
    console.log(data);
  }

  useEffect(() => {
    setEsEcuador(Pais === "Ecuador");
  }, [Pais])

  useEffect(() => {
    setEsUsuarioValido(true);
  }, [Usuario])

  useEffect(() => {
    setEsNumeroValido(true);
  }, [Numero])

  useEffect(() => {
    setEsNombreValido(true);
  }, [Nombre])
  
  useEffect(() => {
    setEsEmailValido(true);
  }, [Email])
  
  useEffect(() => {
    setEsIdentificacionValido(true);
  }, [Identificacion])
  
  useEffect(() => {
    setEsContrasenaValido(true);
  }, [Contrasena])
  
  useEffect(() => {
    setEsCiudadValido(true);
  }, [Ciudad])

  //metodos validaciones
  const checkValidUsername = async() => {
    const regexUsername = /^[a-zA-Z0-9_]{3,30}$/;
    if(!regexUsername.test(Usuario)){
      setEsUsuarioValido(false);
      return;
    }
    const resp = await fetch(`${apiUrl}/validarusuario?username=${Usuario}`);
    const data = await resp.json();
    const {rows: result} = !!data && data;
    setEsUsuarioValido(result.length === 0);
    return;
  }

  const validarTodosCampos = () => {
    //se setean todos los campos validadores
    return new Promise((resolve, reject) => {
      
      checkValidUsername();

      const regexEmail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(.\w{2,3})+$/;
      const regexNumero = /^[+]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/im;
      const regexCedula = /^[0-9]{9}[-]?[0-9][-]?([0-9]{3})?$/
      const regexContrasena = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      const regexNombre = /^[a-zA-ZàáąčćęèéįìíòóùúýźñçÀÁĄĆĘÈÉÌÍÒÓÙÚŲÝŹÑÇ']+[ -][a-zA-ZàáąčćęèéįìíòóùúýźñçÀÁĄĆĘÈÉÌÍÒÓÙÚŲÝŹÑÇ ,.'-]+$/;
      const regexCiudad = /^[a-zA-ZàáąčćęèéįìíòóùúýźñçÀÁĄĆĘÈÉÌÍÒÓÙÚŲÝŹÑÇ']+([ -][a-zA-ZàáąčćęèéįìíòóùúýźñçÀÁĄĆĘÈÉÌÍÒÓÙÚŲÝŹÑÇ ,.'-]+)?$/;
      
      if(esUsuarioValido && regexCiudad.test(Ciudad) && regexCedula.test(Identificacion) && regexNombre.test(Nombre) &&
      regexEmail.test(Email) && regexNumero.test(Numero) && regexContrasena.test(Contrasena)) {
        resolve(true)
      } else {
        setEsCiudadValido(regexCiudad.test(Ciudad));
        setEsIdentificacionValido(regexCedula.test(Identificacion));
        setEsNombreValido(regexNombre.test(Nombre));
        setEsEmailValido(regexEmail.test(Email));
        setEsNumeroValido(regexNumero.test(Numero));
        setEsContrasenaValido(regexContrasena.test(Contrasena));

        reject(false);
      }
    })    
  }

  const onRegistrarComprador = (e) => {
    e.preventDefault();
    validarTodosCampos()
      .then(res => uploadUser().then(setShowAccionExitosa(true)))
      .catch(res => {console.warn("Usuario no válido")})
  }

  return (
    <form onSubmit={onRegistrarComprador}>
    <div className="compraProducto__box">
      <p className="paragraph">Ingresar los siguientes datos:</p>
      <hr className="hrGeneral"/>
      <div className="u-margin-top-small"></div> 
      <div className="formRegistrarComp__twoInputsBox">
        <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
          <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
            <label htmlFor="compradorUsuario" align="right" className="paragraph--sm formRegistrarComp__label">Usuario</label>
            <div className="formRegistrarComp__boxError">
              <input
                id="compradorUsuario"
                type="text"
                placeholder="jrodriguez"
                className="formRegistrarComp__input paragraph"
                name="Usuario"
                value={Usuario}
                onChange={onInputChange}
                required
              />
              {
                !esUsuarioValido &&
                <p className="paragraph--red u-padding-left-small">Usuario no válido</p>
              }
            </div>
          </div>
        </div>
        <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
          <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
            <label htmlFor="compradorContrasena" align="right" className="paragraph--sm formRegistrarComp__label">Contraseña</label>
            <div className="formRegistrarComp__boxError">
              <input
                id="compradorContrasena"
                type="password"
                placeholder="contrasena123!"
                className="formRegistrarComp__input paragraph"
                name="Contrasena"
                value={Contrasena}
                onChange={onInputChange}
                required
              />
              {
                !esContrasenaValido &&
                <p className="paragraph--red u-padding-left-small">Su contraseña debe contener al menos 1 dígito, 1 letra mayúscula y minúscula y ser mayor a 8 caracteres.</p>
              }
            </div>
          </div>
        </div>
      </div>
        
      <div className="formRegistrarComp__twoInputsBox">
        <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
          <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
            <label htmlFor="compradorName" align="right" className="paragraph--sm formRegistrarComp__label">Nombre</label>
            <div className="formRegistrarComp__boxError">
              <input
                id="compradorName"
                type="text"
                placeholder="Juan Rodríguez"
                className="formRegistrarComp__input paragraph"
                name="Nombre"
                value={Nombre}
                onChange={onInputChange}
                required
              />
              {
                !esNombreValido &&
                <p className="paragraph--red u-padding-left-small">Nombre y apellido no válidos</p>
              }
            </div>
          </div>

        </div>
        <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
          <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
            <label htmlFor="compradorIdentificacion" align="right" className="paragraph--sm formRegistrarComp__label">C.I.</label>
            <div className="formRegistrarComp__boxError">
              <input
                id="compradorIdentificacion"
                type="text"
                placeholder="0987654321"
                className="formRegistrarComp__input paragraph"
                name="Identificacion"
                value={Identificacion}
                onChange={onInputChange}
                required
              />
              {
                !esIdentificacionValido &&
                <p className="paragraph--red u-padding-left-small">C.I. no válida</p>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="formRegistrarComp__twoInputsBox">
        <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
          <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
            <label htmlFor="compradorEmail" align="right" className="paragraph--sm formRegistrarComp__label">E-mail</label>
            <div className="formRegistrarComp__boxError">
              <input
                id="compradorEmail"
                type="text"
                placeholder="example@gmail.com"
                className="formRegistrarComp__input paragraph"
                name="Email"
                value={Email}
                onChange={onInputChange}
                required
              />
              {
                !esEmailValido &&
                <p className="paragraph--red u-padding-left-small">Email no válido</p>
              }
            </div>
          </div>
          
        </div>
        <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
          <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
            <label htmlFor="compradorCelular" align="right" className="paragraph--sm formRegistrarComp__label">Celular</label>
            <div className="formRegistrarComp__boxError"> 
              <input
                id="compradorCelular"
                type="text"
                placeholder="0998950947"
                className="formRegistrarComp__input paragraph"
                name="Numero"
                value={Numero}
                onChange={onInputChange}
                required
              />
              {
                !esNumeroValido &&
                <p className="paragraph--red u-padding-left-small">Número no válido</p>
              }
            </div>
          </div>

        </div>
      </div>
        <div className="formRegistrarComp__twoInputsBox">
          <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
            <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
              <label htmlFor="compradorPais" align="right" className="paragraph--sm formRegistrarComp__label">País</label>
              <div className="formRegistrarComp__boxError"> 
                <select 
                  name="Pais"
                  className="formRegistrarComp__input paragraph"
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
            </div>
          </div>
          { esEcuador &&
            <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
              <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
                <label htmlFor="compradorCiudad" align="right" className="paragraph--sm formRegistrarComp__label">Ciudad</label>
                <div className="formRegistrarComp__boxError"> 
                  <select 
                    id="compradorCiudad"
                    name="Ciudad"
                    className="formRegistrarComp__input paragraph"
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
                  {
                    (!esCiudadValido || Ciudad === "Seleccionar Ciudad") &&
                    <p className="paragraph--red u-padding-left-small">Ciudad no válida</p>
                  }
                </div>
              </div>

            </div>
            
          }
          {!esEcuador && 
            <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
              <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
                <label htmlFor="compradorCiudad" align="right" className="paragraph--sm formRegistrarComp__label">Ciudad</label>
                <div className="formRegistrarComp__boxError"> 
                  <input
                    id="compradorCiudad"
                    type="text"
                    placeholder="Ingresar ciudad"
                    className="formRegistrarComp__input paragraph"
                    name="Ciudad"
                    value={Ciudad}
                    onChange={onInputChange}
                    required
                  />
                  {
                    !esCiudadValido &&
                    <p className="paragraph--red u-padding-left-small">Ciudad no válida</p>
                  }
                </div>
              </div>
            </div>
          }
        </div>
        <div className="formRegistrarComp__twoInputsBox__one u-margin-top-small">
          <div className="formRegistrarComp__twoInputsBox__one__labelInput"> 
            <label htmlFor="compradorDireccion" align="right" className="paragraph--sm formRegistrarComp__labelv2">Dirección</label>
            <textarea
              id="compradorDireccion"
              type="text"
              placeholder="Sauces 8 Calle 13"
              className="formRegistrarComp__textArea paragraph"
              name="Direccion"
              value={direccion}
              onChange={onInputChange}
              required
            />
          </div>
        </div>
    </div>

    <div className="metodoPago__btnBox">
      <button
        type="submit" 
        className="btn btn--blue"
      >Registrarme</button>
    </div>
    <div>
      {
        showAccionExitosa &&
        <AccionExitosaAuth
          texto={'¡Se ha registrado exitosamente!'}
          setShowAccionExitosa={setShowAccionExitosa}
        />
      }
    </div>
  </form>
  )
}
