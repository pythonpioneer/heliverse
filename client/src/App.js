import './App.css';
import Navbar from './components/app/Navbar';
import Users from './components/app/Users';
import { Routes, Route } from 'react-router-dom';
import UserForm from './components/app/UserForm';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Users key={'user-profile'} />} />
        <Route exact path='create-user' element={<UserForm key={'create-user'} />} />
      </Routes>
      
    </>
  );
}

export default App;
