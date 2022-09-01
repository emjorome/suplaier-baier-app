import { Link } from "react-router-dom"

export const ContListaMenu = () => {


  return (
    <div className="explorarCat__lista">
      <Link 
        to={`/ordenes_compra`} 
        key={3} 
        className="explorarCat__lista__item"
      >
        <span className="material-symbols-rounded icon--sm">
          shopping_bag
        </span>
          <p className="paragraph--mid--2">Órdenes de compra</p>
      </Link>
      <Link 
        to={`/ofertas_pendientes`} 
        key={1} 
        className="explorarCat__lista__item"
      >
        <span className="material-symbols-rounded icon--sm">
          autorenew
        </span>
          <p className="paragraph--mid--2">Ofertas pendientes</p>
      </Link>
      
      <Link 
        to={`/ordenes_por_confirmar`} 
        key={4} 
        className="explorarCat__lista__item"
      >
        <span className="material-symbols-rounded icon--sm">
          thumb_up
        </span>
          <p className="paragraph--mid--2">Por confirmar</p>
      </Link>
      <Link 
        to={`/ofertas_canceladas`} 
        key={2} 
        className="explorarCat__lista__item"
      >
        <span className="material-symbols-rounded icon--sm">
          cancel
        </span>
          <p className="paragraph--mid--2">Canceladas</p>
      </Link>
      <Link 
        to={`/ordenes_finalizadas`} 
        key={5} 
        className="explorarCat__lista__item"
      >
        <span className="material-symbols-rounded icon--sm">
          check_circle
        </span>
          <p className="paragraph--mid--2">Finalizadas</p>
      </Link>
    </div>
  )
}
