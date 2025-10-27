import { useForm } from "../../hooks";
//import country from "country-list-js";
import { useEffect, useState } from "react";
import { provincias } from "../../data";
import { AccionExitosaAuth } from "./AccionExitosaAuth";
import { apiUrl } from "../../apiUrl";
import { useNavigate } from "react-router-dom";
import { TerminosPage } from "../pages";
//import { ValidacionCedulaRucService } from "../helpers/validacionesRuc";

export const FormRegistrarComprador = () => {

  // const listaPaises = country.names();
  // const listaCiudadesEcuador = listaCiudades;
  // const [esEcuador, setEsEcuador] = useState(false);
  const [showAccionExitosa, setShowAccionExitosa] = useState(false);
  const [listaCiudadesUser, setListaCiudadesUser] = useState([]);
  const [tipoIdSelected, setTipoIdSelected] = useState("")
  const [imgExists, setImgExists] = useState(false);
  const [imagen, setImagen] = useState("no-img.jpeg");
  const [showTerminos, setShowTerminos] = useState(false);
  const navigate = useNavigate();

  //validaciones
  const [esUsuarioValido, setEsUsuarioValido] = useState(true);
  const [esNumeroValido, setEsNumeroValido] = useState(true);
  const [esNombreValido, setEsNombreValido] = useState(true);
  const [esIdentificacionValido, setEsIdentificacionValido] = useState(true);
  const [esContrasenaValido, setEsContrasenaValido] = useState(true);
  const [esEmailValido, setEsEmailValido] = useState(true);
  const [esProvinciaValido, setEsProvinciaValido] = useState(true);
  const [esCiudadValido, setEsCiudadValido] = useState(true);
  const [esConfValido, setEsConfValido] = useState(true);
  const [esCodigoInvitacionValido, setEsCodigoInvitacionValido] = useState(true);
  const [esCodigoExistente, setEsCodigoExistente] = useState(true);

  const {
    formState, Nombre, Identificacion, Usuario, Contrasena, ContrasenaConf, Email, urlImg, Numero, TipoId, Provincia, Ciudad, Direccion, CodigoInvitacion, onInputChange, setNameValueEmpty} = useForm({
      IdRol: 1, 
      Nombre: "", 
      Identificacion: "", 
      Usuario: "", 
      Contrasena: "", 
      Email: "", 
      Numero: "", 
      Pais: "Ecuador",
      Provincia: "", 
      Ciudad: "", 
      Direccion: "",
      TipoId:"Cédula",
      ContrasenaConf: "",
      CodigoInvitacion: "",
      urlImg: imagen
    });

  const uploadUser = async() => {
    const newBody = {
      ...formState,
       // eslint-disable-next-line
      ["urlImg"] : imagen,
    }
    const body = newBody;
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

  //metodos validaciones
  const checkValidUsername = async() => {
    const regexUsername = /^[a-zA-Z0-9_]{3,30}$/;
    if(!regexUsername.test(Usuario)){
      setEsUsuarioValido(false);
      return;
    }
    try{
      const resp = await fetch(`${apiUrl}/validarusuario?username=${Usuario}`);
      const data = await resp.json();
      const {rows: result} = !!data && data;
      const esValido = result.length === 0;
      setEsUsuarioValido(esValido);
      return esValido;
    }catch(error){
      console.error("Error al validar el usuario:", error);
      setEsUsuarioValido(false);
      return false;
    }
  }

  const checkValidarCodigo = async () => {
    if (CodigoInvitacion.length === 0) {
      setEsCodigoExistente(true); 
      return true;
    }
    const url = `${apiUrl}/aceptarRegistro/validarcodigo?codigo=${CodigoInvitacion}`;
    try {
      const resp = await fetch(url);
      const data = await resp.json(); 
      setEsCodigoExistente(data.success);
      return data.success;
    } catch (error) {
      console.error("Fetch falló en checkValidarCodigo:", error);
      setEsCodigoExistente(false);
      return false;
    }
  }

  const validarTodosCampos = () => {
    //se setean todos los campos validadores
    return new Promise(async (resolve, reject) => {

      const esUsuarioOk = await checkValidUsername();

      //reglas definidas para los campos del formulario
      const regexEmail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(.\w{2,3})+$/;
      const regexNumero = /^[+]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/im;
      const regexCedula = /^[0-9]{9}[-]?[0-9][-]?([0-9]{3})?$/
      const regexNombre = /^[a-zA-ZàáąčćęèéįìíòóùúýźñçÀÁĄĆĘÈÉÌÍÒÓÙÚŲÝŹÑÇ']+[ -][a-zA-ZàáąčćęèéįìíòóùúýźñçÀÁĄĆĘÈÉÌÍÒÓÙÚŲÝŹÑÇ ,.'-]+$/;
      const regexCiudad = /^[a-zA-ZàáąčćęèéįìíòóùúýźñçÀÁĄĆĘÈÉÌÍÒÓÙÚŲÝŹÑÇ']+([ -][a-zA-ZàáąčćęèéįìíòóùúýźñçÀÁĄĆĘÈÉÌÍÒÓÙÚŲÝŹÑÇ ,.'-]+)?$/;
      const regexContrasena = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!_.-]{8,}$/;
      const regexCodigoInvitacion = /^[a-z]+\d{10}$/;

      //validaciones
      const esProvinciaOk = (Provincia !== "Seleccionar Provincia" && Provincia !== "");
      const esCiudadOk = regexCiudad.test(Ciudad);
      const esCedulaOk = regexCedula.test(Identificacion);
      const esNombreOk = regexNombre.test(Nombre);
      const esEmailOk = regexEmail.test(Email);
      const esNumeroOk = regexNumero.test(Numero);
      const esContrasenaOk = regexContrasena.test(Contrasena);
      const esConfOk = (Contrasena === ContrasenaConf);

      //Se valida primero el formato del código antes de verificar si existe
      const esCodigoInvitacionOk = (CodigoInvitacion.length === 0) || regexCodigoInvitacion.test(CodigoInvitacion);
      setEsCodigoInvitacionValido(esCodigoInvitacionOk);

      let esCodigoExistenteOk = false;
      if(esCodigoInvitacionOk) esCodigoExistenteOk = await checkValidarCodigo();

      setEsProvinciaValido(esProvinciaOk);
      setEsCiudadValido(esCiudadOk);
      setEsIdentificacionValido(esCedulaOk);
      setEsNombreValido(esNombreOk);
      setEsEmailValido(esEmailOk);
      setEsNumeroValido(esNumeroOk);
      setEsContrasenaValido(esContrasenaOk);
      setEsConfValido(esConfOk);

      if(esUsuarioOk && esCiudadOk && esProvinciaOk && esCedulaOk && esNombreOk && esEmailOk && esNumeroOk && esContrasenaOk
        && esConfOk && esCodigoInvitacionOk && esCodigoExistenteOk) resolve(true);
      else reject(false);
    })
  }
  
  const getImg = async (urlImg) => {
    const reader = new FileReader();
    reader.readAsDataURL(urlImg);
    reader.onloadend = () => {
      const base64data = reader.result;
      setImagen(base64data);
    };
  };

  const onRegistrarComprador = (e) => {
    e.preventDefault();
    validarTodosCampos()
      .then(res => {
        setShowTerminos(true)
        })
      //.then(res => uploadUser().then(setShowAccionExitosa(true)))
      .catch(res => {console.warn("Usuario no válido")})
  }

  const printStates =  () => {
    let childrenArray = [];
    for(const key in provincias){
      const nombre_provincia = provincias[key].provincia;
      const nom = nombre_provincia.charAt(0) + nombre_provincia.substring(1).toLowerCase();
      childrenArray.push(<option value={nom} key={nom}> {nom}</option>)
    }

    return childrenArray;
  }

  useEffect(() => {
    let lista = []
    for(const key in provincias){
      if (provincias[key].provincia === Provincia.toUpperCase()){
        let resList = provincias[key].cantones;
        for(const key in resList){
          const ciudadNombre = resList[key].canton;
          lista.push(ciudadNombre.charAt(0) + ciudadNombre.substring(1).toLowerCase());
        }
      }
    }
    setListaCiudadesUser(lista);
  
  }, [Provincia])

  useEffect(() => {
    setTipoIdSelected(TipoId)
  }, [TipoId])

  useEffect(() => {
    //aqui se debe validar el url
    if(urlImg !== "no-img.jpeg"){
      setImgExists(true);
      getImg(urlImg);
    } else {
      setImgExists(false);
    }
  }, [urlImg])

  const onDeleteImg = () => {
    setImgExists(false);
    const inp = document.getElementById("formSubirLogo");
    inp.value = "";
    setNameValueEmpty("urlImg");
  }

  return (
    <div>
    <form onSubmit={onRegistrarComprador}>
    <div className="compraProducto__box">
      <p className="paragraph">Ingresar los siguientes datos (Los campos con <span style={{ color: 'red' }}>*</span> son obligatorios):</p>
      <hr className="hrGeneral"/>
      <div className="u-margin-top-small"></div> 
      <div className="formRegistrarComp__twoInputsBox">
        <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
          <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
            <label htmlFor="compradorUsuario" align="center" className="paragraph--sm formRegistrarComp__label">Usuario
              <span style={{ color: 'red' }}>*</span></label>
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
            <label htmlFor="compradorName" align="center" className="paragraph--sm formRegistrarComp__label">Nombre
              <span style={{ color: 'red' }}>*</span></label>
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
      </div>  
      <div className="formRegistrarComp__twoInputsBox">
        <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
          <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
            <label htmlFor="compradorContrasena" align="center" className="paragraph--sm formRegistrarComp__label">Contraseña
              <span style={{ color: 'red' }}>*</span></label>
            <div className="formRegistrarComp__boxError">
              <input
                id="compradorContrasena"
                type="password"
                placeholder="Contrasena_segura.1234-!"
                className="formRegistrarComp__input paragraph"
                name="Contrasena"
                value={Contrasena}
                onChange={onInputChange}
                required
              />
              {
                !esContrasenaValido &&
                <p className="paragraph--red u-padding-left-small">Su contraseña debe ser mayor a 8 caracteres y debe contener al menos: 1 dígito, 1 letra mayúscula y minúscula, y 1 carácter especial ( !_.- ).</p>
              }
            </div>
          </div>
        </div>
        <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
          <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
            <label htmlFor="compradorContrasenaConf" align="center" className="paragraph--sm formRegistrarComp__label">Confirmar contraseña
              <span style={{ color: 'red' }}>*</span></label>
            <div className="formRegistrarComp__boxError">
              <input
                id="compradorContrasenaConf"
                type="password"
                placeholder="Contrasena_segura.1234-!"
                className="formRegistrarComp__input paragraph"
                name="ContrasenaConf"
                value={ContrasenaConf}
                onChange={onInputChange}
                required
              />
              {
                !esConfValido &&
                <p className="paragraph--red u-padding-left-small">Contraseñas no coinciden</p>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="formRegistrarComp__twoInputsBox">
        <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
          <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
            <label htmlFor="identificacionUser" align="center" className="paragraph--sm formRegistrarComp__label">Tipo ID
              <span style={{ color: 'red' }}>*</span></label>
            <div className="formRegistrarComp__boxError"> 
              <select 
                id="identificacionUser"
                name="TipoId"
                className="formRegistrarComp__input paragraph"
                onChange={onInputChange}
              >
                <option defaultValue={"none"}>
                  Cédula
                </option> 
                <option>
                  RUC
                </option> 
              </select>
            </div>
          </div>
        </div>
        <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
          <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
            <label htmlFor="compradorIdentificacion" align="center" className="paragraph--sm formRegistrarComp__label">{tipoIdSelected}
              <span style={{ color: 'red' }}>*</span></label>
            <div className="formRegistrarComp__boxError">
              <input
                id="compradorIdentificacion"
                type="text"
                placeholder={tipoIdSelected === "Cédula" ? "0987650947" : "0987650947-001" }
                className="formRegistrarComp__input paragraph"
                name="Identificacion"
                value={Identificacion}
                onChange={onInputChange}
                required
              />
              {
                !esIdentificacionValido &&
                <p className="paragraph--red u-padding-left-small">{tipoIdSelected} no válida</p>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="formRegistrarComp__twoInputsBox">
        <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
          <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
            <label htmlFor="compradorEmail" align="center" className="paragraph--sm formRegistrarComp__label">E-mail
              <span style={{ color: 'red' }}>*</span></label>
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
            <label htmlFor="compradorCelular" align="center" className="paragraph--sm formRegistrarComp__label">Celular
              <span style={{ color: 'red' }}>*</span></label>
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
              <label htmlFor="compradorProvincia" align="center" className="paragraph--sm formRegistrarComp__label">Provincia
                <span style={{ color: 'red' }}>*</span></label>
              <div className="formRegistrarComp__boxError"> 
                <select
                  id="compradorProvincia"
                  name="Provincia"
                  className="formRegistrarComp__input paragraph"
                  onChange={onInputChange}
                >
                  <option defaultValue={"none"}>
                    Seleccionar Provincia
                  </option> 
                  {
                    printStates()
                  }
                </select>
                {
                  !esProvinciaValido &&
                  <p className="paragraph--red u-padding-left-small">Seleccione una provincia</p>
                }
              </div>
            </div>
          </div>
          <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
            <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
              <label htmlFor="compradorCiudad" align="center" className="paragraph--sm formRegistrarComp__label">Ciudad
                <span style={{ color: 'red' }}>*</span></label>
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
                    listaCiudadesUser?.map(ciudad => 
                      <option value={ciudad} key={ciudad}>
                        {ciudad}
                      </option>)
                  }
                </select>
                {
                  (!esCiudadValido || Ciudad === "Seleccionar Ciudad") &&
                  <p className="paragraph--red u-padding-left-small">Seleccione una ciudad</p>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="formRegistrarComp__twoInputsBox">
          <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
            <div className="formRegistrarComp__twoInputsBox__izq__labelInput"> 
              <label htmlFor="compradorDireccion" align="center" className="paragraph--sm formRegistrarComp__label">Dirección
                <span style={{ color: 'red' }}>*</span></label>
              <div className="formRegistrarComp__boxError">
                <textarea
                  id="compradorDireccion"
                  type="text"
                  placeholder="Sauces 8 Calle 13"
                  className="formRegistrarComp__textArea paragraph"
                  name="Direccion"
                  value={Direccion}
                  onChange={onInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
            <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
              <label htmlFor="compradorCodigoInvitacion" align="center" className="paragraph--sm formRegistrarComp__label">Código de invitación</label>
              <div className="formRegistrarComp__boxError">
                <input
                  id="compradorCodigoInvitacion"
                  name="CodigoInvitacion"
                  type="text"
                  placeholder="lmessi0857392167"
                  className="formRegistrarComp__input paragraph"
                  value={CodigoInvitacion}
                  onChange={onInputChange}
                />
                {
                  !esCodigoInvitacionValido &&
                  <p className="paragraph--red u-padding-left-small">El formato del código ingresado es incorrecto (ej: lmessi0857392167)</p>
                }
                {
                  esCodigoInvitacionValido && !esCodigoExistente &&
                  <p className="paragraph--red u-padding-left-small">El código de invitación no es válido</p>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="formRegistrarComp__twoInputsBox">
          <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
            <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
              <label htmlFor="formSubirLogo" align="center" className="paragraph--sm formRegistrarComp__label">Foto/Logo</label>
              <div className="formRegistrarComp__boxError">
                <input
                  id="formSubirLogo"
                  type="file"
                  placeholder="Subir imagen o foto de su cuenta"
                  className="formSubirProducto__inputBox__input paragraph paragraph--grey--2"
                  name="urlImg"
                  accept="image/*"
                  onChange={onInputChange}
                />
              </div>
            </div>
          </div>
          {imgExists &&
            <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
              <label align="right" htmlFor="formSubirProdImagen" className="paragraph--sm paragraph--bold formSubirProducto__label"></label>
              <div className="formRegistrarComp__twoInputsBox__izq__logoBox">
                <span className="material-symbols-rounded icon-white deleteIconImg" onClick={onDeleteImg}>
                cancel
                </span>
                <img src={imagen} alt={urlImg} className="formRegistrarComp__twoInputsBox__izq__logoBox__logo" />
              </div>
            </div>
          }
        </div>
    </div>
    <div className="metodoPago__btnBox">
      <button
        type="submit" 
        className="btn btn--blue"
      >Continuar</button>
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
  {
    showTerminos &&
    <TerminosPage 
      uploadUser={uploadUser} 
      setShowAccionExitosa={setShowAccionExitosa}
      setShowTerminos={setShowTerminos}
    />
  }
  </div>
  )
}
