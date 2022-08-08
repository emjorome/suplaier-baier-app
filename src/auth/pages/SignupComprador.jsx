import { FormRegistrarComprador } from "../components"

export const SignupComprador = () => {
  return (
    <div className="loginPage">
      <div className="loginPage__centralbox">
        <div className="loginPage__centralbox__izq">
          <h1>Signup as comprador</h1>
          <FormRegistrarComprador/>
        </div>
        <div className="loginPage__centralbox__der">
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
      </div>
    </div>
  )
}
