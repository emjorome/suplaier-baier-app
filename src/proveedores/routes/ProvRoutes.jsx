import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../../ui"
import { MainProvPage } from "../pages"

export const ProvRoutes = () => {
  return (
    <>
      <Navbar/>
      <div>
        <Routes>
          <Route path="proveedor" element={<MainProvPage/>}/>

          <Route path="/*" element={<Navigate to="proveedor"/>}/>
        </Routes>
        
      </div>  
    </>
  )
}
