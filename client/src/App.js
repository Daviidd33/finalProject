import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/Movies/MovieList';
import MovieDetails from './components/Movies/MovieDetails';
import AddMovie from './components/Movies/AddMovie';
//import EditMovie from './components/EditMovie';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<MovieList />} />
            <Route exact path="/movies/:id" element={<MovieDetails />} />
            <Route exact path="/add" element={<AddMovie />} />
            {/* <Route exact path="/edit/:id" element={<EditMovie />} /> */}
            <Route component={() => <h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
