
import 'bootstrap/dist/css/bootstrap.min.css';



import './App.css'
import Intro from './pages/intro';
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import HomePage from './pages/homepage';
import DetailsPage from './pages/detailspage';

function App() {
  

  return (
    <BrowserRouter>
   <Routes>
    <Route path='/' element={<Intro/>}/>
   <Route path="/home" element={<HomePage/>} />
   <Route path="/details" element={<DetailsPage/>}/>
   
   </Routes>
   
    </BrowserRouter>
  )
}

export default App
