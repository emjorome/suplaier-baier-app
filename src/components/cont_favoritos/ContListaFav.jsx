import { Link } from "react-router-dom"

export const ContListaFav = ({favoritos}) => {
  
  return (
    <div className="explorarCat__lista">
      {
        favoritos.map(fav => (
          <Link to={`/perfil_proveedor?q=${fav.idProveedor}`} key={fav.nombre} className="explorarCat__lista__item">
            <span className="material-symbols-rounded icon--sm">
              star
            </span>
            <p className="paragraph--mid--2">{fav.nombre}</p>
          </Link>
        ))
      }
    </div>
  )
}
