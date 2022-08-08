import { FormRegistrarProveedor } from "../components"

export const SignupProveedor = () => {
  return (
    <div className="loginPage">
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
          <h1>Signup as proveedor</h1>
          <FormRegistrarProveedor/>
        </div>
      </div>
    </div>
  )
}
