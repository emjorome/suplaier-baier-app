import { AppRouter } from "./router/AppRouter"
import { AuthProvider } from "./auth"

export const App = () => {
  
  return (
    <>
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </>
  )
}
