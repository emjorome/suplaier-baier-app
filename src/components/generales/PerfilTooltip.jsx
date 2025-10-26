import { useContext, useEffect, useRef } from "react"
import { AuthContext } from "../../auth";
import React from "react";
const PerfilTooltip = ({onClickOutside, onMiPerfilClick}) => {
  
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
      <div
        onClick={onMiPerfilClick}
        className="perfiltooltip__option"
        style={{ cursor: 'pointer' }}
      >
        <span className="material-symbols-rounded">
          account_circle
        </span>
        <p className="paragraph--sm">Mi Perfil</p>
      </div>
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
export default React.memo(PerfilTooltip);
