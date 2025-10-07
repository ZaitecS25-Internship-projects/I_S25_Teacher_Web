import Sidebar from "./Sidebar"
import ProfileCard from "./ProfileCard"
import { useState } from "react"

const Dashboard = () => {

    // Datos de ejemplo
    const [user] = useState({
        nombre: "Martín Gómez",
        email: "martin@ejemplo.com",
        rol: "Alumno"
    })

    const [asignaturas] = useState([
        "Matemáticas",
        "Física",
        "Programación",
        "Historia"
    ])

    return (
        <div className="flex min-h-screen w-full bg-gray-100 dark:bg-gray-900">
            <Sidebar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Dashboard
                </h1>
                <ProfileCard user={user} />
                <section className="mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Asignaturas</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {asignaturas.map((asig, i) => (
                            <li key={i} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
                                {asig}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    )
}

export default Dashboard
