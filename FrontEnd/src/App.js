
import './styles/App.css';
import UsersTable from './components/UsersTable.js';
import Container from 'react-bootstrap/Container';
function App() {
  return (
    <Container className="App"> {/* Usa el componente Container de Bootstrap */}
      <h1 className='title'>Gestión de Usuarios</h1>
      <UsersTable/>
    </Container>
  );
}

export default App;
