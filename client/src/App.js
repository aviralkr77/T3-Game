import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard/dashboard'
import Gameboard from './components/Gameboard/gameboard'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
       <Router>
        <Switch>
        <Route  exact path="/" component={Dashboard}></Route>
        <Route  exact path="/game" component={Gameboard}></Route>
        </Switch>
        </Router>

  
    </div>
  );
}

export default App;
