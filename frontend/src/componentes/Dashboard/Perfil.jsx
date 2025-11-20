import { useContext, useEffect, useState } from "react";
import { UsuarioContext } from "../useContext/UsuarioContext";
import { apiFetch } from "../Profesor/api"; 

const Perfil = () => {
const { usuario, logout } = useContext(UsuarioContext);
const [menuOpen, setMenuOpen] = useState(false);
const [info, setInfo] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
if (!usuario) return;
setLoading(true);
setError("");

```
(async () => {
  try {
    let data = {};
    if (usuario.role === "S") {
      // Cursos y tutorías del estudiante
      const cursos = await apiFetch(`/estudiante/${usuario.id}/cursos`);
      const tutorias = await apiFetch(`/estudiante/${usuario.id}/tutorias`);
      data = { cursos, proximasTutorias: tutorias.slice(0,5) };
    } else if (usuario.role === "T") {
      // Asignaturas y tutorías del profesor
      const asignaturas = await apiFetch(`/profesor/${usuario.id}/asignaturas`);
      const tutorias = await apiFetch(`/profesor/${usuario.id}/tutorias`);
      data = { asignaturas, tutoriasRealizadas: tutorias.length };
    }
    setInfo(data);
  } catch (err) {
    setError(err.message || "No se pudo cargar la información");
  } finally {
    setLoading(false);
  }
})();
```

}, [usuario]);

if (!usuario || loading)
return <p className="text-white text-center mt-10">Cargando perfil...</p>;

const nombreCompleto = `${usuario.first_name || ""} ${usuario.last_name || ""}`.trim();

return ( <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow w-full max-w-4xl mx-auto relative">

```
  {/* Header */}
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Perfil</h2>
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        Opciones ▾
      </button>

      {menuOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 border rounded shadow z-10 text-sm text-gray-900 dark:text-gray-100">
          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
            Editar perfil
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
            Cambiar foto
          </li>
          <li
            onClick={() => logout && logout()}
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
          >
            Cerrar sesión
          </li>
        </ul>
      )}
    </div>
  </div>

  <p><strong>Nombre:</strong> {nombreCompleto}</p>
  <p><strong>Email:</strong> {usuario.email}</p>
  <p><strong>Rol:</strong> {usuario.role === "S" ? "Estudiante" : "Profesor"}</p>

  {/* Error */}
  {error && <p className="text-red-500 mt-2">{error}</p>}

  {usuario.role === "S" && (
    <div className="mt-4 p-4 rounded-lg bg-gray-900/20 border border-gray-700">
      <p className="font-semibold mb-2">Cursos inscritos:</p>
      <ul className="list-disc list-inside">
        {info.cursos?.map((c, i) => <li key={i}>{c.nombre || c}</li>)}
      </ul>
      <p className="font-semibold mt-2">Próximas tutorías:</p>
      <ul className="list-disc list-inside">
        {info.proximasTutorias?.length
          ? info.proximasTutorias.map(t => (
              <li key={t.id}>
                {t.asignatura} - {new Date(t.fecha).toLocaleString()}
              </li>
            ))
          : <li>No hay tutorías próximas</li>}
      </ul>
    </div>
  )}

  {usuario.role === "T" && (
    <div className="mt-4 p-4 rounded-lg bg-gray-900/20 border border-gray-700">
      <p className="font-semibold mb-2">Asignaturas:</p>
      <ul className="list-disc list-inside">
        {info.asignaturas?.map((a, i) => <li key={i}>{a.nombre || a}</li>)}
      </ul>
      <p className="font-semibold mt-2">
        Tutorías realizadas: {info.tutoriasRealizadas || 0}
      </p>
    </div>
  )}

</div>
```

);
};

export default Perfil;
