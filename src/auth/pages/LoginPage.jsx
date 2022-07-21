import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { usuariosRegistrados } from "../../data/usuarios";
import { AuthContext } from "../context";
import { 
  validarLoginAdministradorById, 
  validarLoginCompradorById, 
  validarLoginProveedorById } from "../helpers";

export const LoginPage = () => {

  const navigate = useNavigate();
  const {login} = useContext(AuthContext);

  //usuarios de ejemplo
  const usuarioComp = usuariosRegistrados.find(user => user.tipo === "comprador");
  const usuarioProv = usuariosRegistrados.find(user => user.tipo === "proveedor");
  const usuarioAdm = usuariosRegistrados.find(user => user.tipo === "administrador");

  const onLoginAsComprador = (user) => {

    if (validarLoginCompradorById(user.id)){

      login(user);

      navigate("/comprador", {
        replace: true,
      }); 
    } 
    
    else {
      console.log("Usuario comprador no registrado");
    }
    
  }

  const onLoginAsProveedor = (user) => {

    if (validarLoginProveedorById(user.id)){

      login(user);

      navigate("/proveedor", {
        replace: true,
      }); 
    } 
    
    else {
      console.log("Usuario proveedor no registrado");
    }
  }

  const onLoginAsAdministrador = (user) => {

    if (validarLoginAdministradorById(user.id)){

      login(user);

      navigate("/administrador", {
        replace: true,
      }); 
    } 
    
    else {
      console.log("Usuario administrador no registrado");
    }
  }

  return (
    <div className="loginPage">
      {/* div central */}
      <div className="loginPage__centralbox">
        <div className="loginPage__centralbox__izq">
          <h1 className="paragraph--white paragraph--md">SUPPLAIER</h1>
          <h3 className="paragraph--white paragraph">Inicia sesión para acceder a la aplicación</h3>
          <img src="/login.png" alt="login" className="loginPage__centralbox__izq__img" />
        </div>
        <div className="loginPage__centralbox__der">
          <h1>Iniciar Sesión</h1>
          <hr className="hrGeneral"/>
          <div className="u-margin-top-small loginPage__centralbox__der__buttons">
            <button 
              className="btn btn--blue u-margin-right-medium"
              onClick={() => onLoginAsComprador(usuarioComp)}
            >
              Comprador
            </button>
            <button 
              className="btn btn--green u-margin-right-medium"
              onClick={() => onLoginAsProveedor(usuarioProv)}
            >
              Proveedor
            </button>
            <button 
              className="btn btn--red"
              onClick={() => onLoginAsAdministrador(usuarioAdm)}
            >
              Administrador
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
