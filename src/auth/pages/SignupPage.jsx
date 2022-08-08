import { Link } from "react-router-dom"

export const SignupPage = () => {

  return (
    <div className="loginPage">
      <div className="loginPage__centralbox animate__animated animate__fadeInUpBig">
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
          <h2>Selecciona tu rol</h2>
          <Link
            to={`/signup_comprador`}
          >
            <button 
              className="btn btn--blue"
            >
              Comprador
            </button>
          </Link>
          <Link
            to={`/signup_proveedor`}
          >
            <button 
              className="btn btn--green"
            >
              Proveedor
            </button>
          </Link>

        </div>
      </div>
    </div>
  )
}
