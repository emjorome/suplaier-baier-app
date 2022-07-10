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
    <>
      <h1>Login</h1>
      <hr />
      <div>
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
    </>
  )
}
