import React, { useState } from 'react';
import { Form, Input, Button, Alert,Image } from 'antd';
import AuthService from '../../services/item/auth.service';
import userService from '../../services/item/user.service';

const ProfileImageUpload =() =>{
    const [profileImg,setProfileImage]= useState({
        image:"",
        preview:""
    });
    const currentUser = AuthService.getCurrentUser();

    const handleImageChange=(e) =>{
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
            setProfileImage({
                image: e.target.files[0],
                preview: reader.result
            })
          }
        }
        reader.readAsDataURL(e.target.files[0]);
      }

    const addProfileImage= async ()=>{
        let data = new FormData();
        data.append('image', profileImg.image);
        const resultAPI = await (userService.addProfileImage(currentUser.id,data));
        window.location.reload();
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return(
        <Form onFinish={addProfileImage} onFinishFailed={onFinishFailed} labelCol={{span:8}} wrapperCol={{span:16}} initialValues={{remember:true}}>
                <Form.Item label="Profile Image: " name="image">
                    <Input type="file" accept="image/*" name="image-upload" onChange={handleImageChange}/>
                </Form.Item>
                <Form.Item label={"  "} colon={false} wrapperCol={{offset:0,span:16}}>
                    {profileImg!=null && (<Image src={profileImg.preview} alt="" id="img" className="img"  width={200} height={200}/>)}
                </Form.Item>
                <Form.Item wrapperCol={{offset:8,span:16}}>
                    <Button type="primary" htmlType="submit">
                    Add
                    </Button>
                </Form.Item>
        </Form>
    )
}

export default ProfileImageUpload;