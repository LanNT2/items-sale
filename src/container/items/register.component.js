import React from "react";
import { useState } from "react/cjs/react.development";
import { Form ,Button, FormGroup,Label,Input, Container,Alert } from "reactstrap";
import AuthService from "../../services/item/auth.service";
import { useHistory } from "react-router-dom";

const Register = ()=>{
    let history = useHistory();
    const [registerParams, setRegisterParams] = useState({
        username:"",
        email:"",
        password:""
    });

    const[message,setMessage]=useState({
        isError:false,
        isSuccess:false,
        content:""
    });

    const handleInputChange =(e)=>{
        setRegisterParams({...registerParams,[e.target.name]:e.target.value })
    }

    const submit = async (e)=>{
        try{
            e.preventDefault();
            console.log(registerParams)
            const result = await AuthService.register(registerParams.username,registerParams.email,registerParams.password);
            history.push("/login");
            window.location.reload();
        }catch(error){
            console.log(error);
            setMessage({
                isError:true,
                isSuccess:false,
                content:"Username already exist!"
            });
        }
    }

    return(
        <React.Fragment>
            <Container>
                {message.isError &&(
                    <Alert color="danger">{message.content}</Alert>
                )} 
                <Form onSubmit={submit} >
                    <FormGroup>
                        <Label for="username">Username: </Label>
                        <Input type="username" name="username" id="username" placeholder="username" onChange={handleInputChange} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email: </Label>
                        <Input type="email" name="email" id="email" placeholder="email" onChange={handleInputChange} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password: </Label>
                        <Input type="password" name="password" id="password" onChange={handleInputChange} required/>
                    </FormGroup>
                <Button type="submit">Register</Button>
                </Form>
            </Container>
        </React.Fragment>
        
    )
}

export default Register