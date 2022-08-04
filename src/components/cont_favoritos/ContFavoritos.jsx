import { useContext, useEffect, useState } from "react";
import { apiUrl } from "../../apiUrl";
import { AuthContext } from "../../auth";
import { Cargando } from "../generales";
import { ContFavTitle } from "./ContFavTitle"
import { ContListaFav } from "./ContListaFav"

export const ContFavoritos = () => {

  //cargar lista de favoritos por comprador
  const {authState} = useContext(AuthContext);
  const {user: {id}} = authState;

  const [favoritos, setFavoritos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getFavoritos = async() => {
    setIsLoading(true);
    const resp = await fetch(`${apiUrl}/provFavoritos?idComprador=${id}`);
    const data = await resp.json();
    const {rows: favoritos} = data;
    setFavoritos(favoritos);
    setIsLoading(false);
  }

  useEffect(() => {
    !!id && getFavoritos();
    // eslint-disable-next-line
  }, [])
  
  return (
    <div className="favoritosProv">
      <ContFavTitle/>
      <hr className="hrGeneral"/>
      {isLoading
      ? <Cargando/>
      : <ContListaFav favoritos={favoritos}/>
      }
    </div>
  )
}
