import { useEffect, useState } from "react"
import { getTokenUser } from "../../firebase/firebaseInit";

export const Notificaciones = () => {

  const [isTokenFound, setIsTokenFound] = useState(false);
  console.log("Token found: ", isTokenFound)

  useEffect(() => {
    let data; 
    async function tokenFunc() {
      data = await getTokenUser(setIsTokenFound);
      if (data) {
        console.log("Notificacion token.", data)
      }
      return data;
    }

    tokenFunc();
  }, [setIsTokenFound])

  return (
    <></>
  )
}
