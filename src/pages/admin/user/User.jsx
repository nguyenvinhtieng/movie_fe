import {  MailOutline, PermIdentity, Publish } from "@mui/icons-material"
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import "./user.css"
const ROLES = ['ROLE_USER', 'ROLE_ADMIN']

const User = () => {
    const location = useLocation();
    const { users, success, error } = useSelector((state) => state.user);
    const id = location.pathname.split("/")[3];
    const user = users.find((user) => user.id === Number(id));
    const [updateUser, setUpdateUser] = useState({
        name: user.name, 
        email: user.email, 
        avatar: user.avatar, 
        role: user.role, 
        vip: user.vip, 
      });
      const handleChange = (e) => {
        let value = e.target.value;
    
        if ([e.target.name] === "active" || [e.target.name] === "vip") {
          value = value === "0" ? false : true;
        }
        if ([e.target.name] === "limitAge") {
          value = Number(value);
        }
    
        console.log("a");
    
        setUpdateUser({ ...user, [e.target.name]: value });
      };
      const handleAutoCompleteChange = (e, value) => {
		setUpdateUser({...user, role: value.map(el=>el)})
	}
    return (
        <div className="user">
            <div className="user__container">
                <div className="user-show">
                    <div className="user-show__top">
                        <img 
                            src={user.avatar}
                            alt="" 
                            className="user-show--img"
                        />
                        <div className="user-show__top--title">
                            <div className="user-show--username">{user.name}</div>
                        </div>
                    </div>
                    <div className="user-show__bottom">
                        <span className="user-show--title">Account Details</span>
                        <div className="user-show__info">
                            <PermIdentity className="user-show__icon" />
                            <span className="user-show__info--title">{user.username}</span>     
                        </div>
        
                        <span className="user-show--title">Contact Details</span>
                        <div className="user-show__info">
                            <MailOutline className="user-show__icon" />
                            <span className="user-show__info--title">{user.email}</span>
                        </div>
                        <div className="user-show__info">
                            <MailOutline className="user-show__icon" />
                            <span className="user-show__info--title">{user.vip}</span>
                        </div>
                    </div>
                </div>
                <div className="user-update">
                    <span className="user-update--title">Edit</span>
                    <form className="user-update__form">
                        <div className="user-update-left">
                            
                            <div className="user-update--item">
                                <label htmlFor="">Full name</label>
                                <input type="text" 
                                    onChange={handleChange}
                                    placeholder={user.name}
                                    name="name"
                                    className="user-update--input" 
                                />
                            </div>
                            <div className="user-update--item">
                                <label htmlFor="">{user.email}</label>
                                <input type="text" 
                                    onChange={handleChange}
                                    placeholder={user.email}
                                    name="email"
                                    className="user-update--input" 
                                />
                            </div>
                            
                            <div className="addProductItem">
                                <label>Categories</label>
                                <Autocomplete
                                multiple
                                id="tags-standard"
                                options={ROLES}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    placeholder="Chọn danh mục"
                                />
                                )}
                                            onChange={handleAutoCompleteChange}
                            />
                            </div>
                        </div>
                        <div className="user-update__right">
                            <div className="user-update-upload">
                                <img 
                                    src="https://image-us.eva.vn/upload/1-2020/images/2020-03-20/3-1584713048-659-width800height700.jpg" 
                                    alt="" 
                                    className="user-update--img"
                                />
                                <label htmlFor="file"><Publish className="user-update--icon"/></label>
                                <input type="file" id="file" style={{display: "none"}} />
                            </div>
                            <button className="user-update__button">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default User
