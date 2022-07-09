import { useState } from "react"
import { OfertaCard } from "./components/OfertaCard"

export const App = () => {

  const [listaOfertas, setListaOfertas] = useState([{
    idOferta: 123,
    idProducto: 1,
    cantMin: 6000,
    cantMax: 8000,
    descripcion: "Consideraciones adicionales de la oferta...",
    actualProductos: 3000,
    fechaLimite: "05/Agosto/2022",
    fechaCreacion: "05/Julio/2022",
    estado: "En Curso",
  }])

  return (
    //esto es temporal, manana se construyen las ventanas
    //juntando los componentes creados :)
    <>
      <h1>Algunos Componentes</h1>
      <hr />
      <h2>Componentes generales</h2>
      <hr />
      {/* botones */}
      <div className="u-margin-bottom-small">
        <button className="btn btn--blue">Aceptar</button>
        <button className="btn btn--red">Cancelar</button>
        <button className="btn btn--green">Subir Producto</button>
      </div>

      {/* Oferta */}
      <div className="u-margin-bottom-small">
        {listaOfertas.map(oferta => (
          <OfertaCard 
            key={oferta.idOferta}
            oferta={oferta}
          />
        ))}
      </div>
      
      {/* Menu Categorias */}

      <h2>Componentes compradores</h2>
      <hr />

      {/* Menu Favoritos */}

      <h2>Componentes proveedores</h2>
      <hr />
      <h2>Componentes administradores</h2>
      <hr />
    </>
  )
}
