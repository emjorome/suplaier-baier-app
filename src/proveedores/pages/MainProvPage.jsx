import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ContExplorar, ContFavoritos } from "../../components";
import { AuthContext } from "../../auth";
import { apiUrl } from "../../apiUrl";
import { ContMenu } from "../../components/cont_menu/ContMenu";
import { obtainUserPermission } from "../../firebase";

const DEFAULT_ACTIONS = [
    {
        id: 'subir_producto',
        path: '/subir_producto',
        icon: 'add',
        color: 'green',
        title: 'Subir Producto',
        desc: 'Agrega un nuevo producto a tu catálogo'
    },
    {
        id: 'nueva_oferta',
        path: '/crear_nueva_oferta',
        icon: 'local_offer',
        color: 'blue',
        title: 'Nueva Oferta',
        desc: 'Crea una oferta para tus productos'
    },
    {
        id: 'mis_ofertas',
        path: '/mis_ofertas',
        icon: 'list_alt',
        color: 'gray',
        title: 'Ver Mis Ofertas',
        desc: 'Gestiona todas tus ofertas activas'
    },
    {
        id: 'explorar_demandas',
        path: '/demandas',
        icon: 'search',
        color: 'gray',
        title: 'Explorar Demandas',
        desc: 'Encuentra nuevas oportunidades'
    }
];

export const MainProvPage = React.memo(() => {
    const { authState } = useContext(AuthContext);
    const { user } = authState;
    const [ofertasProv, setOfertasProv] = useState([]);
    const [quickActions, setQuickActions] = useState(DEFAULT_ACTIONS);

    useEffect(() => {
        const storageKey = `stats_proveedor_${user?.IdUsuario || 'guest'}`;
        const storedStats = JSON.parse(localStorage.getItem(storageKey)) || {};

        const sortedActions = [...DEFAULT_ACTIONS].sort((a, b) => {
            const countA = storedStats[a.id] || 0;
            const countB = storedStats[b.id] || 0;
            return countB - countA;
        });

        setQuickActions(sortedActions.slice(0, 4));

    }, [user]);

    const handleActionClick = (actionId) => {
        const storageKey = `stats_proveedor_${user?.IdUsuario || 'guest'}`;
        const storedStats = JSON.parse(localStorage.getItem(storageKey)) || {};
        storedStats[actionId] = (storedStats[actionId] || 0) + 1;
        localStorage.setItem(storageKey, JSON.stringify(storedStats));

        const sortedActions = [...DEFAULT_ACTIONS].sort((a, b) => {
            const countA = storedStats[a.id] || 0;
            const countB = storedStats[b.id] || 0;
            return countB - countA;
        });
        setQuickActions(sortedActions.slice(0, 4));
    };

    const getSaludo = () => {
        const hora = new Date().getHours();
        if (hora >= 5 && hora < 12) return "Buenos días";
        if (hora >= 12 && hora < 19) return "Buenas tardes";
        return "Buenas noches";
    };

    const saludo = getSaludo();

    const getOfertasProv = async () => {
        try {
            if (!user?.IdUsuario) return;
            const resp = await fetch(`${apiUrl}/ofertas?idProveedor=${user.IdUsuario}`);
            const data = await resp.json();
            const { rows: ofertas } = !!data && data;
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
                <ContMenu />
                <ContExplorar />
                <ContFavoritos />
            </div>

            <div className="comp-main-container__medCont dashboard-container">

                <div className="dashboard-header">
                    <h1>{saludo}, <span className="text-blue">{user?.Nombre || "Usuario"}</span> 👋</h1>
                    <p>Aquí tienes un resumen de tu actividad en SUPLAIER</p>
                </div>

                {/* MÉTRICAS (STAT CARDS)*/}
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
                    {quickActions.map((action) => (
                        <Link
                            key={action.id}
                            to={action.path}
                            className="action-card"
                            onClick={() => handleActionClick(action.id)}
                        >
                            <div className={`icon-circle ${action.color}`}>
                                <span className="material-symbols-rounded">{action.icon}</span>
                            </div>
                            <h4>{action.title}</h4>
                            <p>{action.desc}</p>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    )
});