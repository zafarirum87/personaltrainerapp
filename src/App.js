import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Calander from './components/Calander';
import PersistentDrawerLeft from './components/AppDrawer';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <PersistentDrawerLeft />
        <Routes>
          <Route exact path="/" element={<CustomerList />} />
          <Route path="/TrainingList" element={<TrainingList />} />
          <Route path="/Calander" element={<Calander />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
