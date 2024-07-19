import styled from 'styled-components';

const Tarjeta = styled.div`
 border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 16px;
  background-color: #fff;
  max-width: 300px;
`

const Titulo = styled.div`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 8px;
`

function Tarea({ id, title, descripccion, onEliminar, onEdit }) {
    return (
      <Tarjeta>
        <Titulo>Titulo: {title}</Titulo>
        <h2>Descripcion: {descripccion}</h2>
        <button onClick={() => onEliminar(id)}>Eliminar</button>
        <button onClick={() => onEdit(id)}>Editar</button>
      </Tarjeta>
    );
  }
  
  export default Tarea;
  