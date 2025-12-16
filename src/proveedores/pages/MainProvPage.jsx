import React from "react";
import { ContExplorar, ContFavoritos } from "../../components";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth";
import { apiUrl } from "../../apiUrl";
import { ContMenu } from "../../components/cont_menu/ContMenu";
import { obtainUserPermission } from "../../firebase";
import { Link } from "react-router-dom";

export const MainProvPage = React.memo(() => {
  
  const { authState } = useContext(AuthContext);
  const { user } = authState;

  // Estado para las ofertas
  const [ofertasProv, setOfertasProv] = useState([]);

  // Lógica del Saludo Automático
  const getSaludo = () => {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) return "Buenos días";
    if (hora >= 12 && hora < 19) return "Buenas tardes";
    return "Buenas noches";
  };

  const saludo = getSaludo();

  // Obtener ofertas reales
  const getOfertasProv = async() => {
    try {
        if (!user?.IdUsuario) return;
        const resp = await fetch(`${apiUrl}/ofertas?idProveedor=${user.IdUsuario}`);
        const data = await resp.json();
        const {rows: ofertas} = !!data && data;
        setOfertasProv(ofertas || []);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getOfertasProv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  obtainUserPermission();

  return (
    <div className="comp-main-container u-margin-top-navbar">
      
      <div className="comp-main-container__izqCont">
        <ContMenu/>
        <ContExplorar/>
        <ContFavoritos/>
      </div>

      <div className="comp-main-container__medCont dashboard-container">
        
        <div className="dashboard-header">
            <h1>{saludo}, <span className="text-blue">{user?.Nombre || "Usuario"}</span> 👋</h1>
            <p>Aquí tienes un resumen de tu actividad en SUPLAIER</p>
        </div>

        <div className="dashboard-grid">
            <Link to="/mis_ofertas" className="stat-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="stat-card__top">
                    <div className="icon-box blue">
                        <span className="material-symbols-rounded">inventory_2</span>
                    </div>
                    <span className="material-symbols-rounded arrow">north_east</span>
                </div>
                <h3>{ofertasProv.length}</h3>
                <p className="label">Ofertas activas</p>
                <p className="trend green">Total histórico</p>
            </Link>

            <div className="stat-card">
                <div className="stat-card__top">
                    <div className="icon-box green">
                        <span className="material-symbols-rounded">trending_up</span>
                    </div>
                    <span className="material-symbols-rounded arrow">north_east</span>
                </div>
                <h3>$0</h3>
                <p className="label">Ventas del mes</p>
                <p className="trend green">Ponte pilas pues mi llave</p>
            </div>

            <Link to="/ordenes_por_confirmar" className="stat-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="stat-card__top">
                    <div className="icon-box orange">
                        <span className="material-symbols-rounded">schedule</span>
                    </div>
                    <span className="material-symbols-rounded arrow">north_east</span>
                </div>
                <h3>0</h3>
                <p className="label">Órdenes pendientes</p>
                <p className="trend blue">Por confirmar</p>
            </Link>

             <Link to="/demandas" className="stat-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="stat-card__top">
                    <div className="icon-box purple">
                        <span className="material-symbols-rounded">shopping_cart</span>
                    </div>
                    <span className="material-symbols-rounded arrow">north_east</span>
                </div>
                <h3>0</h3>
                <p className="label">Demandas nuevas</p>
                <p className="trend green">En tu categoría</p>
            </Link>
        </div>

        {/* --- ACCIONES RÁPIDAS --- */}
        <h2 className="section-title">Acciones rápidas</h2>

        <div className="dashboard-grid">
            
            <Link to="/subir_producto" className="action-card">
                <div className="icon-circle green">
                    <span className="material-symbols-rounded">add</span>
                </div>
                <h4>Subir Producto</h4>
                <p>Agrega un nuevo producto a tu catálogo</p>
            </Link>

            <Link to="/crear_nueva_oferta" className="action-card">
                <div className="icon-circle blue">
                    <span className="material-symbols-rounded">local_offer</span>
                </div>
                <h4>Nueva Oferta</h4>
                <p>Crea una oferta para tus productos</p>
            </Link>

            <Link to="/mis_ofertas" className="action-card">
                <div className="icon-circle gray">
                    <span className="material-symbols-rounded">list_alt</span>
                </div>
                <h4>Ver Mis Ofertas</h4>
                <p>Gestiona todas tus ofertas activas</p>
            </Link>

            <Link to="/demandas" className="action-card">
                <div className="icon-circle gray">
                    <span className="material-symbols-rounded">search</span>
                </div>
                <h4>Explorar Demandas</h4>
                <p>Encuentra nuevas oportunidades</p>
            </Link>

        </div>
      </div>
    </div>
  )
});