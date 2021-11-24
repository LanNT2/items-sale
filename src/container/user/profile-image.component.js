import React, { useState,useEffect } from 'react';
import { Avatar,Image, Input } from 'antd';
import AuthService from '../../services/item/auth.service';
import UserService from '../../services/item/user.service';

const ProfileImage = ()=>{
    const currentUser = AuthService.getCurrentUser();

    const [image,setImage] = useState({
        url:""
    });

    useEffect( async() => {
        const resultApi = await UserService.getUserProfileImage(currentUser.id);
        setImage({url:resultApi.data})
        console.log(resultApi);
        console.log(image.url);
        return resultApi;
    }, [])

    return(
        <Avatar classname="pl-2" src={<Image src={image.url} style={{ width: 32 }}/>} />
        
    )
}
export default ProfileImage;