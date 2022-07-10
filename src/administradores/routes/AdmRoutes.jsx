import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../../ui"
import { MainAdmPage } from "../pages"

export const AdmRoutes = () => {
  return (
    <>
      <Navbar/>
      <div>
        <Routes>
          <Route path="administrador" element={<MainAdmPage/>}/>

          <Route path="/*" element={<Navigate to="administrador"/>}/>
        </Routes>
      </div>  
    </>
  )
}
