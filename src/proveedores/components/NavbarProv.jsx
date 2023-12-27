import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PerfilTooltip } from "../../components";
import { Buscador } from "../../ui";

export const NavbarProv = () => {
  const [showPerfilTooltip, setShowPerfilTooltip] = useState(false);

  const nagivate = useNavigate();

  // const onClickOfertas = () => {
  //   nagivate("/historial_ofertas");
  // }

  const onClickAlertas = () => {
    nagivate("/notificaciones");
  };

  const onShowReportarTooltip = () => {
    setShowPerfilTooltip(true);
  };

  const onClickOutside = () => {
    setShowPerfilTooltip(false);
  };

  return (
    <div className="navigation navigation-prov">
      <div className="navigation__icon">
        <Link to={"/proveedor"} className="navigation__icon__imgBox">
          <img
            src="suplaier_horizontal celeste.png"
            alt="logo_suplaier"
            className="navigation__icon__imgBox__img"
          />
        </Link>
      </div>
      <div className="navigation__search">
        <Buscador />
      </div>
      <div className="navigation__leftButtons">
        <div className="navigation__leftButtons__box">
          <div
            className="navigation__leftButtons__box__ind"
            onClick={onClickAlertas}
          >
            <span className="material-symbols-rounded icon--bg">
              notifications
            </span>
            <p className="paragraph--sm">Alertas</p>
          </div>
          <div
            className="navigation__leftButtons__box__indRespHidden"
            onClick={onClickAlertas}
          >
            <span className="material-symbols-rounded icon--bg">
              shopping_cart
            </span>
            <p className="paragraph--sm">Demandas</p>
          </div>
          {/* <div 
            className="navigation__leftButtons__box__ind"
            onClick={onClickOfertas}
          >
            <span className="material-symbols-rounded icon--bg">
              import_contacts
            </span>
            <p className="paragraph--sm">Ofertas</p>
          </div> */}
          <div
            className="navigation__leftButtons__box__ind"
            onClick={onShowReportarTooltip}
          >
            <span className="material-symbols-rounded icon--bg">person</span>
            <p className="paragraph--sm">Cuenta</p>
            {showPerfilTooltip && (
              <PerfilTooltip onClickOutside={onClickOutside} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
