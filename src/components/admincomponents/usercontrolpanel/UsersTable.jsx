import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../../../css/admi/usersAdmi.css"

const UsersTable = ({ setTotalUsers }) => {
  const email = localStorage.getItem("email");
  const [selectedTable, setSelectedTable] = useState('users');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (!email) return;
    let cancelled = false;
    setLoading(true);

    axios.get(`http://localhost:8080/api/bookify/get-all/users`)
      .then(res => {
        if (!cancelled) {
          setUser(res.data.content);

          const totalUsers = res.data.content.filter(user => user.userRole.roleName === 'USER').length;
          setTotalUsers(totalUsers);
          console.log("USers: ", res.data.content);
          setError(null);
        }
      })
      .catch(err => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    }
  }, [email]);

  return (


    <div className="user-table-wrapper">
      <div className="user-table-header">
        <button
          className={`user-table-tab ${selectedTable === 'users' ? 'active' : ''}`}
          onClick={() => setSelectedTable('users')}
        >
          Usuarios
        </button>
        <button
          className={`user-table-tab ${selectedTable === 'admins' ? 'active' : ''}`}
          onClick={() => setSelectedTable('admins')}
        >
          Administradores
        </button>
        <input
          type="text"
          placeholder="Buscar por  nombre de usuario"
          className="user-search"
        />
      </div>

      {selectedTable === 'users' && (
        <table className="user-table">
          <thead>
            <tr>
              <th>Nombre de usuario</th>
              <th>Correo electrónico</th>
              <th>Libros</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {user.filter(user => user.userRole.roleName === 'USER').map((user) => (
              <tr key={user.userId}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.books.length}</td>
                <td>
                  <span className={`user-status ${user.active ? 'activo' : 'activo'}`}>
                    {user.active ? 'Activo' : 'Activo'}
                  </span>
                </td>
                <td>...</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedTable === 'admins' && (
        <table className="user-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Nombre de administrador</th>
              <th>Correo electrónico</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {user.filter(user => user.userRole.roleName === 'ADMIN').map((user) => (
              <tr key={user.userId}>
                <td>{user.name}</td>                            {/* Nombre */}
                <td>{user.userName}</td>                       {/* Nombre de administrador */}
                <td>{user.email}</td>                           {/* Correo electrónico */}
                <td>
                  <span className={`user-status ${user.active ? 'activo' : 'activo'}`}>
                    {user.active ? 'Activo' : 'Activo'}
                  </span>
                </td>                                           {/* Estado */}
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>

  )
}

export default UsersTable
