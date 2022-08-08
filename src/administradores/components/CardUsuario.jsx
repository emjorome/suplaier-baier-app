
export const CardUsuario = ({usuario}) => {

  const onEditarUsuario = () => {
    console.log("Editando usuario")
  }

  const onBloquearUsuario = () => {
    console.log("Bloqueando usuario")
  }

  return (
    <div className="cardUsuarioContainer">
      <div className="cardUsuarioContainer--datosUser">
        <p className="paragraph"><b>{usuario.Nombre}</b></p>
        <p className="paragraph">{usuario.Email}</p>
      </div>
      <div className="cardUsuarioContainer--botonesBox">
        <button
          onClick={onEditarUsuario}
          className="cardUsuarioContainer--botonesBox--btn"
        >
          Editar
        </button>

        <button
          onClick={onBloquearUsuario}
          className="cardUsuarioContainer--botonesBox--btn"
        >
          Bloquear
        </button>
      </div>
    </div>
  )
}
