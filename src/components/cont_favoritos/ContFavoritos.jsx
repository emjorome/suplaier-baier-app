import React from "react"
import { useContext, useEffect, useState } from "react";
import { apiUrl } from "../../apiUrl";
import { AuthContext } from "../../auth";
import { Cargando } from "../generales";
import { ContFavTitle } from "./ContFavTitle"
import { ContListaFav } from "./ContListaFav"

export const ContFavoritos = () => {

  const [isOpen, setIsOpen] = useState(false);
  const {authState} = useContext(AuthContext);
  const {user: {IdUsuario}} = authState;
  const [favoritos, setFavoritos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getFavoritos = async() => {
    setIsLoading(true);
    const resp = await fetch(`${apiUrl}/provFavoritos?idUsuarioComp=${IdUsuario}`);
    const data = await resp.json();
    const {rows: favoritos} = data;
    setFavoritos(favoritos);
    setIsLoading(false);
  }

  useEffect(() => {
    getFavoritos();
  }, [IdUsuario])
  
  return (
    <div className="favoritosProv sidebar-section">
      <ContFavTitle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}/>
      {isOpen && (
        <div className="sidebar-section__content animate-slide-down">
          {isLoading
            ? <Cargando/>
            : <ContListaFav favoritos={favoritos}/>
          }
        </div>
      )}
    </div>
  )
}