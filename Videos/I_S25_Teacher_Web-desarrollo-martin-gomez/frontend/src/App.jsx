import { useState } from "react"
import Register from "./componentes/Registro.jsx";
import Dashboard from "./componentes/Dashboard/Dashboard.jsx";



function App() {
  const [userRegistered, setUserRegistered] = useState(true) // poner true para probar Dashboard

  return (
    <main className="w-full h-full min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-t from-zinc-950 to-slate-700">
      {userRegistered ? (
        <Dashboard />
      ) : (
        <Register onRegister={() => setUserRegistered(true)} />
      )}
    </main>
  )
}

export default App
