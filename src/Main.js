import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { Layout, Menu, Breadcrumb,Avatar, Image} from 'antd';
import { UserOutlined, LaptopOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import "./index.css";
import {BrowserRouter as Router, Link,Switch,Route} from 'react-router-dom';
import ItemList from './container/items/item-list.component';
import AuthService from './services/item/auth.service';
import Login from './container/items/login.component';
import LogOut from './container/items/logout.component';
import Profile from './container/user/profile.component';
import ChangePassword from './container/user/change-password.component';
import ProfileImageUpload from './container/user/profile-image-upload.component'; 
import Cart from './container/user/cart.component';
import UserService from './services/item/user.service';
import ProfileImage from './container/user/avatar.component';
import { useSelector, useDispatch } from "react-redux";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const Main =() =>{
    const currentUser = AuthService.getCurrentUser();

    console.log(currentUser);

    const counter = useSelector((state) => state.counter);
    console.log(counter);

    const ItemCount = UserService.getItemCountInCart();

    console.log(ItemCount);
    return(
        <Layout>
      <Router>
        <Header className="header">
          <div className="logo" />
          <Menu  theme="dark" mode="horizontal"  style={{ padding: '0 1300px' }}>
            <Menu.Item key="6" icon={<ShoppingCartOutlined style={{fontSize:"20px"}}/>}>
              <Link to="/cart">Cart {ItemCount}</Link>
            </Menu.Item>
            {(currentUser!=null)?(
              <Menu.Item>
                <Avatar className="pl-2" src={<Image alt="preview image" src={ "http://localhost:8080/users/profile-image/view/"+ currentUser.id} style={{ width: 32 }}/>} />
              </Menu.Item>
            ):(
              <Menu.Item><Link to="/login">Login</Link></Menu.Item>
            )}  
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} className="menu-font">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200} >
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                className="menu-font"
              >
                <SubMenu key="cosmetics" icon={<LaptopOutlined />} title="Items" style={{backgroundColor:"#fad2e3"}}>
                  <Menu.Item key="5">
                    <Link to="/items">Item List</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="account" icon={<UserOutlined />} title="Account & Order" style={{backgroundColor:"#fad2e3"}}>
                  <Menu.Item key="1">
                    <Link to="/profile">Your Profile</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                  <Link to="/change-password">Change Password</Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                  <Link to="/profile-image/add">Change Profile Image</Link>
                  </Menu.Item>
                  <Menu.Item key="4">Your Orders</Menu.Item>
                  <Menu.Item key="5"><LogOut /></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 800 }}>
            <Switch>
              <Route path="/items">
                <ItemList />
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/profile">
                <Profile/>
              </Route>
              <Route path="/change-password">
                <ChangePassword/>
              </Route>
              <Route path="/profile-image/add">
                <ProfileImageUpload/>
              </Route>
              <Route path ="/cart">
                <Cart />
              </Route>
            </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Router> 
    </Layout>
    )
}

export default Main;