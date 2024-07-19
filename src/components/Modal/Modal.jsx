import styled from 'styled-components';
import { useState, useEffect } from 'react';

const Fondo = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Forma = styled.div`
  background-color: #FFFFFF;
  padding: 30px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
`;

function Modal({ abrir, cerrar, tarea, guardado }) {
  const [editarTarea, setEditarTarea] = useState(tarea);

  useEffect(() => {
    setEditarTarea(tarea);
  }, [tarea]);

  if (!abrir) return null;

  const mostrarGuardaro = () => {
    guardado(editarTarea);
    cerrar();
  };

  return (
    <Fondo>
      <Forma>
        <h2>Editar Tarea</h2>
        <label>
          Título:
          <input type="text"value={editarTarea?.title || ''} onChange={(e) => setEditarTarea({ ...editarTarea, title: e.target.value })}/>
        </label>
        <br />
        <label>
          Descripción:
          <textarea value={editarTarea?.descripccion || ''} onChange={(e) => setEditarTarea({ ...editarTarea, descripccion: e.target.value })}
          />
        </label>
        <br />
        <button onClick={mostrarGuardaro}>Guardar</button>
        <button onClick={cerrar}>Cerrar</button>
      </Forma>
    </Fondo>
  );
}

export default Modal;
