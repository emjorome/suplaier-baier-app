import { Link } from "react-router-dom"

export const ContListaCat = ({categorias}) => {
  return (
    <div className="explorarCat__lista">
      {
        categorias.map(cat => (
          <Link to={"/"} key={cat.nombre} className="explorarCat__lista__item">
            <span className="material-symbols-rounded icon--sm">
              {cat.googleCodeRoundedIcon}
            </span>
              <p className="paragraph--mid--2">{cat.nombre}</p>
          </Link>
        ))
      }
    </div>
  )
}
