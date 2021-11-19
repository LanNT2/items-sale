import React from "react";
import { useState } from "react/cjs/react.development";
import { Form ,Button, FormGroup,Label,Input } from "reactstrap";
import App from "../../App";
import { Route,Redirect } from "react-router";

import AuthService from "../../services/item/auth.service";

const Login = ()=>{
    const [loginParams, setLoginParams] = useState({
        username:"",
        password:""
    });

    const handleInputChange =(e)=>{
        setLoginParams({...loginParams,[e.target.name]:e.target.value })
    }

    const submit =(e)=>{
        e.preventDefault();
        console.log(loginParams);
        AuthService.login(loginParams.username,loginParams.password);
    }

    return(
        <Form onSubmit={submit} >
            <FormGroup>
                <Label for="username">Username: </Label>
                <Input type="username" name="email" id="username" placeholder="username" onChange={handleInputChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="password">Password: </Label>
                <Input type="password" name="password" id="password" onChange={handleInputChange}/>
            </FormGroup>
            <Button type="submit">Login</Button>
        </Form>
    )
}

export default Login