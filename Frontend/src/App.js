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

</Routes>
</div>
</Router>
</NoteState>
</>
  );
}

export default App;
