import About from './component/About';
import Home from './component/Home';
import Navbar from './component/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import NoteState from './context/NoteState';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';

function App() {
  return (
<>
<NoteState>
<Router>
<Navbar/>
<Alert message ="This is iNotebook"/>
<div className='container'>
<Routes>
  
  <Route exact path="/" element ={<Home/>} />

  <Route exact path="/about" element={<About/>} />

  <Route exact path ='/login' element ={<Login/>} />

  <Route exact path = '/signup' element ={<Signup/>}/>

</Routes>
</div>
</Router>
</NoteState>
</>
  );
}

export default App;
