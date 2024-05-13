import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/UsersTable.css';
import Table from 'react-bootstrap/Table';
import { Trash, PlusSquare, EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import Modal from 'react-modal';

// Componente UsersTable que muestra una tabla de usuarios y permite agregar y eliminar usuarios
export default function UsersTable() {
  // Inicializa el estado de 'users' como un array vacío
  const [users, setUsers] = useState([]);
  // Inicializa el estado para los campos de entrada del nuevo usuario
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [showPasswordUser, setShowPasswordUser] = useState(false);


  // Utiliza 'useEffect' para hacer una solicitud GET a tu API cuando el componente se monta
  useEffect(() => {
    // Hace una solicitud GET a tu API
    axios.get('http://localhost:5000/users')
      .then(response => {
        // Actualiza el estado de 'users' con la respuesta de la API
        setUsers(response.data);
      });
    // El array vacío [] significa que 'useEffect' se ejecutará una vez después de que el componente se monte
  }, []);

  // Función para agregar un usuario
  const addUser = async () => {
    try {
      const newUser = { user_name: userName, full_name: fullName, email: email, password: password, age: age };
      const response = await axios.post('http://localhost:5000/add', newUser);

      if (response.data.error) {
        alert(response.data.error);
      } else {
        console.log(response.data);
        setUsers([...users, newUser]);
        setUserName("");
        setFullName("");
        setEmail("");
        setPassword("");
        setAge("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Función para eliminar un usuario
  const deleteUser = async (user_name) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        // Hace una solicitud DELETE a tu API para eliminar el usuario
        const response = await axios.delete(`http://localhost:5000/delete/${user_name}`);
        console.log(response.data);
        // Actualiza el estado de 'users' para eliminar el usuario del estado
        setUsers(users.filter(user => user.user_name !== user_name));
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  // Renderiza una tabla con los usuarios y campos de entrada para agregar un nuevo usuario
  return (
    <Table striped bordered >
      <thead className="thead-dark">
        <tr>
          <th className="text-center">#</th>
          <th className="text-center">Nombre de usuario </th>
          <th className="text-center">Nombre Completo</th>
          <th className="text-center">Email</th>
          <th className="text-center">Contraseña</th>
          <th className="text-center">Edad</th>
          <th className="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {/* Mapea el estado de 'users' a filas de tabla */}
        {users.map((user, index) => (
          <tr key={user.user_name}>
            <td className="text-center">{index + 1}</td>
            <td className="text-center">{user.user_name}</td>
            <td className="text-center">{user.full_name}</td>
            <td className="text-center">{user.email}</td>
            <td className="text-center password">
              <span className='asterisk'>
                {showPasswordUser === user.user_name ? user.password : '••••••••'}
              </span>


              <button className='eye-icon'
                onClick={() => setShowPasswordUser(showPasswordUser === user.user_name ? null : user.user_name)}
              >
                {showPasswordUser === user.user_name ? <EyeSlashFill /> : <EyeFill />}
              </button>
            </td>
            <td className="text-center">{user.age}</td>
            <td className="text-center">
              {/* Botón para eliminar el usuario */}
              <button className="action-button" onClick={() => deleteUser(user.user_name)}><Trash size={25} /></button>
            </td>
          </tr>
        ))}
        {/* Fila de entrada para agregar un nuevo usuario */}
        <tr>
          <td className="text-center">{users.length + 1}</td>
          <td className="text-center">
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </td>
          <td className="text-center">
            <input
              type="text"
              placeholder="Nombre Completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </td>
          <td className="text-center">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </td>
          <td className="text-center">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </td>
          <td className="text-center">
            <input
              type="number"
              placeholder="Edad"
              value={age}
              min="1"
              max="100"
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </td>
          <td className="text-center">
            {/* Botón para agregar un nuevo usuario */}
            <button className="action-button" onClick={addUser}><PlusSquare size={25} /></button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

