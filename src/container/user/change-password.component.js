
import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import UserService from '../../services/item/user.service';
import AuthService from '../../services/item/auth.service';
const ChangePassword = () => {
  const currentUser = AuthService.getCurrentUser();

  const[message,setMessage]=useState({
    isError:false,
    isSuccess:false,
    content:""
  });
  
  const changePassword = async (values)=>{
    try{
        console.log(values);
      const resultAPI = await UserService.changePassword(currentUser.id,values);
      console.log(resultAPI);  
      setMessage({
        isError:false,
        isSuccess:true,
        content:"Change password success"
    });
    }catch(error){
      console.log(error.response);
      setMessage({
          isError:true,
          isSuccess:false,
          content:"Something wrong!"
      });
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
      <>
        <Form labelCol={{span:8}} wrapperCol={{span:16}} initialValues={{remember:true}} onFinish={changePassword} onFinishFailed={onFinishFailed} autoComplete="off" >
            {message.isError &&(
                <Form.Item label=" " colon={false}>
                    <Alert message={message.content} type="error" showIcon  />
                </Form.Item>
                
            )}
            {message.isSuccess &&(
                <Form.Item label=" " colon={false}>
                    <Alert message={message.content} type="success" showIcon></Alert>
                </Form.Item>
                
            )}
            <Form.Item label="oldPassword" name="oldPassword" rules={[{required:true,message:"please input your old password"}]}>
                <Input.Password />
            </Form.Item>
            <Form.Item label="newPassword" name="newPassword" rules={[{required:true,message:"please input your old password"}]}>
                <Input.Password />
            </Form.Item>
            <Form.Item label="confirmPassword" name="confirmPassword" rules={[{required:true,message:"please input your old password"}]}>
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{offset:8,span:16}}>
                <Button type ="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
      </>
  );
};
export default ChangePassword;