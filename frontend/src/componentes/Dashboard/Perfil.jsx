import { useContext, useState, useEffect } from "react";
import { UsuarioContext } from "../useContext/UsuarioContext";

const Perfil = () => {
  const { usuario } = useContext(UsuarioContext);
  const [info, setInfo] = useState({});
  const [menuOpen, setMenuOpen] = useState(false); // estado para mostrar/ocultar menú

  useEffect(() => {
    // Datos simulados según rol
    if (usuario?.role === "S") {
      setInfo({
        nombre: usuario.first_name + " " + usuario.last_name,
        email: usuario.email,
        rol: "Estudiante",
        cursos: ["Matemáticas", "Física", "Programación"],
        promedio: 8.5,
        asistencia: "92%",
        intereses: ["Robótica", "Videojuegos", "Cómics"]
      });
    } else if (usuario?.role === "T") {
      setInfo({
        nombre: usuario.first_name + " " + usuario.last_name,
        email: usuario.email,
        rol: "Profesor",
        asignaturas: ["Matemáticas", "Programación"],
        horario: "Lunes a Viernes 10:00-14:00",
        oficina: "Edificio B, Aula 203",
        contacto: "profesor@example.com"
      });
    }
  }, [usuario]);

  if (!usuario?.role) return <p className="text-white">Cargando perfil...</p>;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow w-full max-w-4xl mx-auto relative">
      {/* Título y botón de opciones */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Perfil {info.rol}
        </h2>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Opciones ▾
          </button>
          {menuOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 border rounded shadow z-10">
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                Editar perfil
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                Cambiar foto
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                Cerrar sesión
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Información del usuario */}
      <p><strong>Nombre:</strong> {info.nombre}</p>
      <p><strong>Email:</strong> {info.email}</p>
      <p><strong>Rol:</strong> {info.rol}</p>

      {usuario?.role === "S" && (
        <>
          <p><strong>Cursos inscritos:</strong> {info.cursos?.join(", ")}</p>
          <p><strong>Promedio:</strong> {info.promedio}</p>
          <p><strong>Asistencia:</strong> {info.asistencia}</p>
          <p><strong>Intereses:</strong> {info.intereses?.join(", ")}</p>
        </>
      )}

      {usuario?.role === "T" && (
        <>
          <p><strong>Asignaturas que enseña:</strong> {info.asignaturas?.join(", ")}</p>
          <p><strong>Horario disponible:</strong> {info.horario}</p>
          <p><strong>Oficina:</strong> {info.oficina}</p>
          <p><strong>Contacto:</strong> {info.contacto}</p>
        </>
      )}
    </div>
  );
};

export default Perfil;
