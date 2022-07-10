import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../../ui"
import { MainCompPage } from "../pages"

export const CompRoutes = () => {
  return (
    <>
      <Navbar/>
      <div>
        <Routes>
          <Route path="comprador" element={<MainCompPage/>}/>

          <Route path="/*" element={<Navigate to="comprador"/>}/>
        </Routes>
      </div>  
    </>
  )
}
