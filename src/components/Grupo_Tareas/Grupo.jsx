import Tarea from "../Tarea/Tarea";

import styled from 'styled-components';

const Centrado = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px; /* Espacio entre las tarjetas */
  padding: 20px;
`;

const Mensaje = styled.div
`
padding: 15px;
border-radius: 5px;
margin: 20px 0;
font-size: 16px;
font-weight: bold;
text-align: center;
color: #fff;
 background-color: #f44336;
border: 1px solid #d32f2f;
`;

function Grupo({ tareas, onEliminarTarea, onEditTarea }) {
  return (
    <div>
      <hr />
      <h1>Lista de Tareas:</h1><Centrado>
      {tareas.length === 0 ? (
        <Mensaje>No hay tareas.</Mensaje>
      ) : ( tareas.map(tarea => (

          <Tarea key={tarea.id} id={tarea.id} title={tarea.title} descripccion={tarea.descripccion} onEliminar={onEliminarTarea} onEdit={onEditTarea}/>

        ))
      )}</Centrado>
      <hr />
    </div>
  );
}

export default Grupo;
