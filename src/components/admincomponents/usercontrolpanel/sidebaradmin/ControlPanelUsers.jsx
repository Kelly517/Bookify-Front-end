import React, { useState } from 'react'
import UsersTable from '../UsersTable';
import { USers, Book, User, NewUser} from '../../../../icons/Icons';
import "../../../../css/admi/usersAdmi.css"

const ControlPanelUsers = () => {
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ totalUsers, setTotalUsers ] = useState(0);


  const handleSubmit = () => {
    console.log("Barra de búsqueda");
  }

  return (
    <div>
      <h2>Gestión de usuarios</h2>
      <div></div>
      <div className="user-stats-container">
  <div className="user-stats-card">
    <div className="user-stats-icon">
      <USers />
    </div>
    <div>
      <p className="user-stats-label">Total de usuarios al año</p>
      <p className="user-stats-value">{totalUsers} usuarios</p>
    </div>
  </div>

  <div className="user-stats-card">
    <div className="user-stats-icon">
      <Book />
    </div>
    <div>
      <p className="user-stats-label">Total de usuarios en el mes</p>
      <p className="user-stats-value">{totalUsers} usuarios</p>
    </div>
  </div>

  <div className="user-stats-card">
    <div className="user-stats-icon">
      <NewUser />
    </div>
    <div>
      <p className="user-stats-label">Total de usuarios esta semana</p>
      <p className="user-stats-value">{totalUsers} usuarios</p>
    </div>
  </div>

  <div className="user-stats-card">
    <div className="user-stats-icon">
      <User />
    </div>
    <div>
      <p className="user-stats-label">Usuarios nuevos hoy</p>
      <p className="user-stats-value">2 personas</p>
    </div>
  </div>
</div>

      
      {/* <form className='' onSubmit={handleSubmit}>
        <input 
        className=''
        placeholder='Buscar por nombre de usuario'
        value={searchTerm}
        onChange={(e) => setSearchTerm}
        />
      </form> */}

      <UsersTable setTotalUsers={setTotalUsers} />
    </div>
  )
}

export default ControlPanelUsers
