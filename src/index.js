import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import App from "./App";
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import Login from './container/items/login.component';

ReactDOM.render(
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/items">Item List</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
    <Switch>
      <Route path="/items">
        <App/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);


