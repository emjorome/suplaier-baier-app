
export const EtiquetaOferta = ({estado, styleName = "oferta-card__etiqueta"}) => {
  return (
    <div className={styleName}>
      <p className="paragraph">{estado}</p>
    </div>
  )
}
