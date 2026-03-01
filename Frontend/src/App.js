
import About from './component/About';
import Home from './component/Home';
import Navbar from './component/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'


function App() {
  return (
<>
<Router>
<Navbar/>
<h1>This is iNotebook </h1>
<Routes>
  
  <Route exact path="/" element ={<Home/>} />

  <Route exact path="/about" element={<About/>} />

</Routes>
</Router>
</>
  );
}

export default App;
