import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FooterComponent from './components/FooterComponents';
import HeaderComponent from './components/HeaderComponents';
import ListEmployeeComponents from './components/ListEmployeeComponents';
import AddEmployeeComponents from './components/AddEmployeeComponents';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className= "container">
          <Routes>
              <Route exact path = "/" element = {<ListEmployeeComponents/>}></Route>
              <Route path = "/employees" element = {<ListEmployeeComponents/>}></Route>
              <Route path = "/add-employee" element = {<AddEmployeeComponents/>} ></Route>
              <Route path = "/edit-employee/:id" element = {<AddEmployeeComponents/>}></Route>
            </Routes>
        </div>
        <FooterComponent />
        </Router>
    </div>
  );
}

export default App;