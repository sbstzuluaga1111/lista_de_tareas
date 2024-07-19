import { useState, useRef } from "react";
import Grupo from "../Grupo_Tareas/Grupo";
import Modal from "../Modal/Modal";

function Agregar() {

  const [tareas, setTareas] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const [mostrarTarea, setMostrarTarea] = useState(null);

  const inputTarea = useRef();
  const inputDescripcion = useRef();

  const envioPeticion = (event) => {
    event.preventDefault();

    const nuevaTarea = inputTarea.current.value.trim();
    const nuevaDescripcion = inputDescripcion.current.value.trim();

    if (nuevaTarea === '' || nuevaDescripcion === '') {
      alert('Por favor, complete todos los campos.');
      return;
    }

    setTareas(prevTareas => [
      ...prevTareas,
      {
        id: prevTareas.length,
        title: nuevaTarea,
        descripccion: nuevaDescripcion
      }
    ]);

    inputTarea.current.value = '';
    inputDescripcion.current.value = '';
  };

  const eliminarTarea = (id) => {
    setTareas(prevTareas => prevTareas.filter(tarea => tarea.id !== id));
  };

  const abriModal = (id) => {
    const editTarea = tareas.find(tarea => tarea.id === id);
    setMostrarTarea(editTarea);
    setAbrirModal(true);
  };

  const cerrarModal = () => {
    setAbrirModal(false);
    setMostrarTarea(null);
  };

  const guardarTarea = (actualizarTarea) => {
    setTareas(prevTareas =>
      prevTareas.map(tarea =>
        tarea.id === actualizarTarea.id ? actualizarTarea : tarea
      )
    );
  };

  return (
    <div>
      <form onSubmit={envioPeticion}>
        <div><h1>Agregar Tarea</h1></div>

        <div>
        <div>
          <label>Nombre</label></div>
          <input
            type="text"
            name="title"
            ref={inputTarea}
          />
        </div>

        <div>
            <div>
          <label>Descripción</label></div>
          <textarea
            name="descripccion"
            ref={inputDescripcion}
          />
        </div>

        <input type="submit" value="Agregar" />
      </form>

      <Grupo tareas={tareas} onEliminarTarea={eliminarTarea} onEditTarea={abriModal} />
      <Modal abrir={abrirModal} cerrar={cerrarModal} tarea={mostrarTarea} guardado={guardarTarea}/>

    </div>
  );
}

export default Agregar;
