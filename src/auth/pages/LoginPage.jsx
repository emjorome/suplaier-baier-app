import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../apiUrl";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../context";

export const LoginPage = () => {

  const navigate = useNavigate();
  const {login} = useContext(AuthContext);

  const {username, password, onInputChange} = useForm({username: "", password: ""})
  const [usernameIsValid, setUsernameIsValid] = useState(true);

  const getAuthResponse = async() => {
    const body = { 
      usuario: username,
      pass: password,
    }
    const resp = await fetch(`${apiUrl}/auth`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const data = await resp.json();

    if (data.length === 0){    
      setUsernameIsValid(false);
      return null;
    }
    else {
      return data[0];
    } 
    
  }

  const onSubmitLogin = (e) => {
    e.preventDefault();
    getAuthResponse()
      .then(user => {
        if(!!user) {
          login(user);
          switch (user.Rol) {
          //comprador
          case "comprador":
            navigate("/comprador", {
              replace: true,
            }); 
            return;
          //proveedor
          case "proveedor":
            navigate("/proveedor", {
              replace: true,
            }); 
            return;
          //administrador
          default:
            navigate("/administrador", {
              replace: true,
            }); 
            return;
        }

        }
      });
  }

  const onClickRegistro = () => {
    navigate("/signup", {
      replace: true,
    }); 
  }

  useEffect(() => {
    setUsernameIsValid(true);
  }, [username])
  

  return (
    <div className="loginPage">
      {/* div central */}
      <div className="loginPage__centralbox">
        <div className="loginPage__centralbox__izq">
          <img 
            src="suplaier_horizontal celeste.png" 
            alt="logo_suplaier" 
            className="loginPage__centralbox__izq__logoImg" 
          />
          <img 
            src="/login.png" 
            alt="login" 
            className="loginPage__centralbox__izq__img" 
          />
        </div>
        <div className="loginPage__centralbox__der">
          <h1 className="loginPage__title">Iniciar Sesión</h1>
          <p className="paragraph paragraph--primary">Inicia sesión para acceder a la aplicación</p>
          <div className="loginPage__centralbox__der__loginBox">
            <form onSubmit={onSubmitLogin}>
              <div className="loginPage__centralbox__der__loginBox__entryBox">
                <label htmlFor="username">
                  <p className="paragraph paragraph--sm paragraph--blue">Usuario</p>
                </label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  placeholder="Example"
                  className="loginPage__centralbox__der__loginBox__entryBox__input"
                  onChange={onInputChange} 
                  required
                />
                {
                  !usernameIsValid &&
                  <p className="paragraph--red">Usuario no válido</p>
                }
              </div>
              <div  className="loginPage__centralbox__der__loginBox__entryBox">
                <label htmlFor="password">
                  <p className="paragraph paragraph--sm paragraph--blue">Contraseña</p>
                </label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  className="loginPage__centralbox__der__loginBox__entryBox__input"
                  placeholder="Password"
                  onChange={onInputChange}
                  required
                />
              </div>
              <div className="loginPage__centralbox__der__loginBox__btnBox">
                <button 
                  type="submit"
                  className="btn btn--blue"
                >Iniciar sesión</button>
              </div>
            </form>
          </div>
          <div className="loginPage__centralbox__der__signupBox">
            <p className="paragraph paragraph--sm paragraph--green">¿Primera vez por aquí?</p>
            <button 
              onClick={onClickRegistro}
              className="btn btn--green"
            >Registrarme</button>
          </div>
        </div>
      </div>
    </div>
  )
}
