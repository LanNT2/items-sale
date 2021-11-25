import React, { useState, useEffect } from 'react';
import { Image,Avatar } from 'antd';
import AuthService from '../../services/item/auth.service';
import UserService from '../../services/item/user.service';

const ProfileImage = () =>{
    // const [image,setImage]= useState({
    //     url:""
    // })

    const currentUser = AuthService.getCurrentUser();

    // useEffect( async () => {
    //   const result = await UserService.getUserProfileImage(currentUser.id);
    //   console.log(result);
    // }, [])

    const url = "localhost:8080/users/profile-image/view/"+currentUser.id;
    console.log(url);
    return (
        <Avatar className="pl-2" src={<Image src={url} style={{ width: 32 }}/>} />
    )
}

export default ProfileImage;