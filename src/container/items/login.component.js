import React from "react";
import { useState } from "react/cjs/react.development";
import { Form ,Button, FormGroup,Label,Input, Container } from "reactstrap";
import AuthService from "../../services/item/auth.service";
import { useHistory } from "react-router-dom";

const Login = ()=>{
    let history = useHistory();
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
        history.push("");
        window.location.reload();
    }

    return(
        <React.Fragment>
            <Container>
                <Form onSubmit={submit} >
                    <FormGroup>
                        <Label for="username">Username: </Label>
                        <Input type="username" name="username" id="username" placeholder="username" onChange={handleInputChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password: </Label>
                        <Input type="password" name="password" id="password" onChange={handleInputChange}/>
                    </FormGroup>
                    <Button type="submit">Login</Button>
                </Form>
            </Container>
        </React.Fragment>   
    )
}

export default Login