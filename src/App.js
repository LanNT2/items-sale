import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ItemList from "./container/items/item-list.component";
import { BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import Login from './container/items/login.component';
import Register from "./container/items/register.component";
import AuthService from "./services/item/auth.service";
import { Container } from "reactstrap";
import { Space, Typography, Divider } from 'antd';
import {AiOutlineLogout} from "react-icons/ai";

const App =()=> {
  const[currentUser,setCurrentUser]= useState(undefined);
  useEffect(async () =>{
    const user = await AuthService.getCurrentUser();
    if(user){
      setCurrentUser(user);
    }
  },[]);

  const logOut=()=>{
    AuthService.logout();
  }

  return (
    <React.Fragment>
      <Container>
      <Router>
       {(currentUser!=null) ? (
          <div>
            <div className="mt-2" style={{color:"#6ff542", textAlign:"center"}}>
              <h3>Hello {currentUser.username} !</h3>
              <div style={{textAlign:"right"}}>
                <a href="/login" onClick={logOut} style={{color:"red"}}>
                    <AiOutlineLogout /> LogOut
                </a>
              </div>
            </div>
            <Link to="/items">
              <h4 style={{color:"blue"}}>Item List</h4>
            </Link>
            
          </div>
        ) : (
          <Space split={<Divider type="vertical" />}>
            <Typography.Link>
            <Link to={"/login"} className="nav-link">Login</Link>
            </Typography.Link>
            <Typography.Link>
            <Link to={"/register"} className="nav-link">Sign Up </Link>
            </Typography.Link>
          </Space>
        )}
        
        <Switch>
          <Route path="/items">
            <ItemList />
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
        </Switch>
      </Router>
      </Container>
    </React.Fragment>
  
  );
}

export default App;