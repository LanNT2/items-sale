import React from "react";
import { useState } from "react/cjs/react.development";
import { Form ,Button, FormGroup,Label,Input, Container } from "reactstrap";
import AuthService from "../../services/item/auth.service";
import { useHistory } from "react-router-dom";

const Register = ()=>{
    let history = useHistory();
    const [registerParams, setRegisterParams] = useState({
        username:"",
        email:"",
        password:""
    });

    const handleInputChange =(e)=>{
        setRegisterParams({...registerParams,[e.target.name]:e.target.value })
    }

    const submit = async (e)=>{
        e.preventDefault();
        console.log(registerParams)
        const result = await AuthService.register(registerParams.username,registerParams.email,registerParams.password);
        alert(result)
        history.push("/login");
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
                        <Label for="email">Email: </Label>
                        <Input type="email" name="email" id="email" placeholder="email" onChange={handleInputChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password: </Label>
                        <Input type="password" name="password" id="password" onChange={handleInputChange}/>
                    </FormGroup>
                <Button type="submit">Register</Button>
                </Form>
            </Container>
        </React.Fragment>
        
    )
}

export default Register