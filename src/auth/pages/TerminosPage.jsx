import { useState } from "react";
import { Terminos } from "../components";

export const TerminosPage = ({uploadUser, setShowAccionExitosa, setShowTerminos}) => {

  const [acepta, setAcepta] = useState(true);

  const onClickRegistrar = async(e) => {
    e.preventDefault()
    const checkbox = document.getElementById("aceptBox")
    if(checkbox.checked){
      await uploadUser()
        .then((res) =>{
          setShowTerminos(false);
          setShowAccionExitosa(true)

        })

    }
    else {
      setAcepta(false);
    }
  }

  return (
    // <div className="signupPage">
    // <div className="signupPage__centralbox">
    <div 
    className="terminosModal animate__animated animate__fadeIn">
    <div className="terminosModal__box animate__animated animate__slideInDown">
      {/* <div className="signupPage__centralbox__titleBox">
        <div className="signupPage__centralbox__titleBox__logoBox">
          <img 
            src="suplaier_horizontal celeste.png" 
            alt="logo_suplaier" 
            className="signupPage__centralbox__titleBox__logoBox__logoImg" 
          />
        </div>
        <p className="paragraph paragraph--white paragraph--mid">Registro</p>
        <span className="material-symbols-rounded icon-white icon--sm">
        arrow_forward_ios
        </span>
        <p className="paragraph paragraph--white paragraph--mid">Selecciona tu rol</p>
        <span className="material-symbols-rounded icon-white icon--sm">
          arrow_forward_ios
        </span>
        <p className="paragraph paragraph--white paragraph--mid">Términos y condiciones</p>
      </div> */}
      <div className="signupPage__centralbox__contentTerminos">
        <Terminos/>
        <form onSubmit={onClickRegistrar}>
          <div className="compraProducto__box">
            <div className="signupPage__centralbox__contentTerminos__aceptarLabel">
              <input 
                type="checkbox"  
                id="aceptBox"
                value="si_acepta_terminos"
                name="acepta_terminos"
              /> 
              <label 
                className="paragraph--sm"
                htmlFor="aceptBox"
              >
                Aceptar términos y condiciones
              </label>
            </div>
            {
              !acepta &&
              <p className="paragraph--red" align="center">Acepta los términos y condiciones para poder registrarte</p>
            }
            <div className="metodoPago__btnBox">
              <button
                type="submit" 
                className="btn btn--blue"
                >Registrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}
