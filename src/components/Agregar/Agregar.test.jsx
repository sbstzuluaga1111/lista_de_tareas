import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Agregar from './Agregar';


// Mock para los componentes hijos
jest.mock('../Grupo_Tareas/Grupo', () => (props) => (
  <div data-testid="grupo-tareas">
    {props.tareas.map(tarea => (
      <div key={tarea.id}>
        <span>{tarea.title}</span>
        <button onClick={() => props.onEliminarTarea(tarea.id)}>Eliminar</button>
        <button onClick={() => props.onEditTarea(tarea.id)}>Editar</button>
      </div>
    ))}
  </div>
));

jest.mock('../Modal/Modal', () => (props) => (
  <div data-testid="modal" style={{ display: props.abrir ? 'block' : 'none' }}>
    {props.tarea && (
      <div>
        <h2>{props.tarea.title}</h2>
        <textarea defaultValue={props.tarea.descripccion} />
        <button onClick={() => props.guardar({ ...props.tarea, descripccion: 'Updated Description' })}>Guardar</button>
        <button onClick={props.cerrar}>Cerrar</button>
      </div>
    )}
  </div>
));

test('debería renderizar el formulario y agregar una tarea', () => {
  render(<Agregar />);

  const inputNombre = screen.getByLabelText(/Nombre/i);
  const inputDescripcion = screen.getByLabelText(/Descripción/i);
  const botonAgregar = screen.getByText(/Agregar/i);

  // Simula la entrada en los campos del formulario
  fireEvent.change(inputNombre, { target: { value: 'Tarea 1' } });
  fireEvent.change(inputDescripcion, { target: { value: 'Descripción de la tarea' } });

  // Simula el envío del formulario
  fireEvent.click(botonAgregar);

  // Verifica que la tarea se haya agregado
  expect(screen.getByText(/Tarea 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Descripción de la tarea/i)).toBeInTheDocument();
});

test('debería eliminar una tarea', () => {
  render(<Agregar />);

  // Agrega una tarea para poder eliminarla
  const inputNombre = screen.getByLabelText(/Nombre/i);
  const inputDescripcion = screen.getByLabelText(/Descripción/i);
  const botonAgregar = screen.getByText(/Agregar/i);

  fireEvent.change(inputNombre, { target: { value: 'Tarea para eliminar' } });
  fireEvent.change(inputDescripcion, { target: { value: 'Descripción para eliminar' } });
  fireEvent.click(botonAgregar);

  // Asegúrate de que la tarea se haya agregado
  expect(screen.getByText(/Tarea para eliminar/i)).toBeInTheDocument();

  // Simula la eliminación de la tarea
  const botonEliminar = screen.getByText(/Eliminar/i);
  fireEvent.click(botonEliminar);

  // Verifica que la tarea se haya eliminado
  expect(screen.queryByText(/Tarea para eliminar/i)).not.toBeInTheDocument();
});

test('debería abrir y cerrar el modal para editar una tarea', () => {
  render(<Agregar />);

  // Agrega una tarea para poder editarla
  const inputNombre = screen.getByLabelText(/Nombre/i);
  const inputDescripcion = screen.getByLabelText(/Descripción/i);
  const botonAgregar = screen.getByText(/Agregar/i);

  fireEvent.change(inputNombre, { target: { value: 'Tarea para editar' } });
  fireEvent.change(inputDescripcion, { target: { value: 'Descripción para editar' } });
  fireEvent.click(botonAgregar);

  // Simula la edición de la tarea
  const botonEditar = screen.getByText(/Editar/i);
  fireEvent.click(botonEditar);

  // Verifica que el modal está visible
  expect(screen.getByTestId('modal')).toBeVisible();

  // Simula el guardado de la tarea editada
  const botonGuardar = screen.getByText(/Guardar/i);
  fireEvent.click(botonGuardar);

  // Verifica que la descripción de la tarea ha cambiado
  expect(screen.getByText(/Updated Description/i)).toBeInTheDocument();
});
