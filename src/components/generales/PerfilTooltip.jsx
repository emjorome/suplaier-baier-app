import { useContext, useEffect, useRef } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth";

export const PerfilTooltip = ({onClickOutside}) => {
  
  const ref = useRef(null);
  const {logout} = useContext(AuthContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClickOutside])

  
  return (
    <div 
      ref={ref} 
      className="perfiltooltip"
    >
      <Link
        to={`/mi_perfil`} 
        className="perfiltooltip__option"
      >
        <span className="material-symbols-rounded">
          account_circle
        </span>
        <p className="paragraph--sm">Mi Perfil</p>
      </Link>
      <hr className="hrGeneral"/>
      <div className="perfiltooltip__option"
        onClick={() => logout()}
      >
        <span className="material-symbols-rounded">
          logout
        </span>
        <p className="paragraph--sm">Cerrar sesión</p>
      </div>
    </div>
  )
}
