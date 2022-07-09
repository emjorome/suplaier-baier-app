
export const Buscador = () => {

  return (
    <div className="buscador">
      <input 
        type="text"
        placeholder="Buscar producto"
        className="buscador__input paragraph"
      />
      <div 
        className="buscador__searchBtn" 
        onClick={() => {console.log("buscando...")}}
      >
        <span className="material-symbols-rounded icon-white">search</span>
      </div>
    </div>
  )
}
