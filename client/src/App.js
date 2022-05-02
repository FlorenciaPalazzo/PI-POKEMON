import { Route, Switch } from 'react-router-dom';

import './App.css';
import Home from './components/Home/Home';

import LandingPage from './components/LandingPage/LandingPage';
import Detail  from './components/Detail/Detail';
import Create from './components/Create/Create';


function App() {
  
  return (
    
    <div className="App">
      <Switch>
        <Route path ='/'exact component={LandingPage}/>
        <Route path ='/home'exact component={Home}/>
        <Route path ='/home/create' component={Create}/>
        <Route path ='/home/detail/:id' component={Detail}/>
      </Switch>
    </div>
    
  );
}

export default App;



