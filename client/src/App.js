import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './Redux/Store/Store'
import Landing from './Components/landing/Landing';
import Home from './Components/Home/Home'
import GameDetail from './Components/GameDetail/GameDetail';
import CreateGame from './Components/CreateGame/CreateGame';
function App() {
  return (
   <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/Home" component={Home}/>
        <Route exact path='/videogame/:id' component={GameDetail}/>
        <Route exact path='/createGame' component={CreateGame}/>
      </div>
    </BrowserRouter>
   </Provider>
  );
}

export default App;
