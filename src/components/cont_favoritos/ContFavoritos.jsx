import { useContext } from "react";
import { apiUrl } from "../../apiUrl";
import { AuthContext } from "../../auth";
import { useFetch } from "../../hooks";
import { Cargando } from "../generales";
import { ContFavTitle } from "./ContFavTitle"
import { ContListaFav } from "./ContListaFav"

export const ContFavoritos = () => {

  //cargar lista de favoritos por comprador
  const {authState} = useContext(AuthContext);
  const {user: {id}} = authState;

  const {data, isLoading} = useFetch(`${apiUrl}/provFavoritos?idComprador=${id}`);
  const {rows: favoritos} = !!data && data;

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
