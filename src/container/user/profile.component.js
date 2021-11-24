
import React, { useState ,useEffect} from 'react';
import {Form,Input,Button,FormGroup,Label,Alert} from 'reactstrap';
import UserService from '../../services/item/user.service';
import AuthService from '../../services/item/auth.service';
const Profile = () => {


  const[userInfo,setUserInfo] = useState({
    username:"",
    email:"",
    phone:"",
  })


  const currentUser = AuthService.getCurrentUser();

  const[message,setMessage]=useState({
    isError:false,
    isSuccess:false,
    content:""
  });

  useEffect( async() => {
    if(currentUser!=null){
      const resultAPI = await UserService.getUserInfo(currentUser.id);
      console.log(resultAPI);
      setUserInfo(resultAPI.data)
      console.log(userInfo);
    }
    
  }, [])

  const handleInputChange =(e)=>{
    setUserInfo({...userInfo,[e.target.name]:e.target.value});
    console.log(userInfo);
  }
  
  const updateUserInfo = async (e)=>{
    try{
      e.preventDefault();
      const resultAPI = await UserService.updateUserInfo(currentUser.id,userInfo);
      console.log(resultAPI);  
      setMessage({
        isError:false,
        isSuccess:true,
        content:"Update Success"
    });
    }catch(error){
      console.log(error);
      setMessage({
          isError:true,
          isSuccess:false,
          content:"Something wrong!"
      });
    }
  }

  return (
    <Form onSubmit={updateUserInfo} >
        {message.isError &&(
            <Alert color="danger">{message.content}</Alert>
        )}
        {message.isSuccess &&(
            <Alert color="success">{message.content}</Alert>
        )}
      <FormGroup>
          <Label for="username">Username: </Label>
          <Input type="username" name="username" id="username" value={userInfo.username} onChange={handleInputChange} disabled/>
      </FormGroup>
      <FormGroup>
          <Label for="email">Email: </Label>
          <Input type="email" name="email" id="email" value={userInfo.email} onChange={handleInputChange} required/>
      </FormGroup>
      <FormGroup>
          <Label for="phone">Phone: </Label>
          <Input type="text" name="phone" id="phone" value={userInfo.phone} onChange={handleInputChange} required/>
      </FormGroup>
      <Button type="submit">Update</Button>
    </Form>
  );
};
export default Profile;