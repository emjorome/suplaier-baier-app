import { ContListaNav } from "./ContListaNav"

export const ContNavegar = () => {
  return (
    <div className="contNavegarAdm">
      <div className="explorarCat__title">
        <span className="material-symbols-rounded icon--md">
          moving
        </span>
        <p className="paragraph--mid--2"><b>Navegación</b></p>
      </div>
      <hr className="hrGeneral"/>
      <ContListaNav/>
    </div>
  )
}
