import React,{ useState } from "react";
import { Form ,Button, FormGroup,Label,Input, Container, Alert } from "reactstrap";
import AuthService from "../../services/item/auth.service";
import { useHistory } from "react-router-dom";

const Login = ()=>{
    let history = useHistory();
    const [loginParams, setLoginParams] = useState({
        username:"",
        password:""
    });

    const[message,setMessage]=useState({
        isError:false,
        isSuccess:false,
        content:""
    });

    const handleInputChange =(e)=>{
        setLoginParams({...loginParams,[e.target.name]:e.target.value })
    }

    const submit = async (e)=>{
        try{
            e.preventDefault();
            console.log(loginParams);
            await AuthService.login(loginParams.username,loginParams.password);
            history.push("/items");
            window.location.reload();
        }catch(error){
            console.log(error);
            setMessage({
                isError:true,
                isSuccess:false,
                content:"Invalid username or password!"
            });
        }
    }

    return(
        <React.Fragment>
            <Container>
                {message.isError &&(
                    <Alert color="danger">{message.content}</Alert>
                )} 
                <h3 style={{textAlign:"center"}}>Login</h3>
                <Form onSubmit={submit} >
                    <FormGroup>
                        <Label for="username">Username: </Label>
                        <Input type="username" name="username" id="username" placeholder="username" onChange={handleInputChange} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password: </Label>
                        <Input type="password" name="password" id="password" onChange={handleInputChange} required/>
                    </FormGroup>
                    <Button type="submit">Login</Button>
                </Form>
            </Container>
        </React.Fragment>   
    )
}

export default Login