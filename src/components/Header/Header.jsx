import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomModal from "../CustomModal/CustomModal";
import { toast } from "react-toastify";
import storage from "../../utils/firebase.util";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import request from "../../services/request";
import { path } from "../../API/apiPath";
import authSlice from "../../store/slice/authSlice";
export default function Header() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = React.useState(false)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [avatar, setAvatar] = React.useState(null)

  const upload = () => {
    console.log(avatar)
    const fileName = new Date().getTime() + avatar[0].name;
    const storageRef = ref(storage, `/videos/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, avatar);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        // eslint-disable-next-line default-case
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          startUpdateInfo(downloadURL)
        });
      }
    );
  };
  const startUpdateInfo = async (avatar_link) => {
    const res = await request("PUT", path.updateInfoUser, {body: {
      name,
      email,
      avatar: avatar_link
    }})
    setIsOpen(false)
    toast.success("Update data successfully")
    setEmail("")
    setName("")
    setAvatar(null)
  }
  const handleUpdateInfo = () => {
    if(!name || !email) {
      toast.error("Please enter your name and email")
      return;
    }
    upload()
  }

  const handleLogout = () => {
    dispatch(authSlice.actions.logout())
  }
  return (
    <header className="headerUser" data-header>
      <CustomModal title="Change my information" isOpen={isOpen} setIsOpen={setIsOpen} handleSubmit={handleUpdateInfo}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter your email"  value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="" >Avatar</label>
          <input type="file" name="file" onChange={(e) => setAvatar(e.target.files) }/>
        </div>
      </CustomModal>
      <nav className="navbarUser" data-navbar>
        <ul className="navbar-list">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/movies" className="navbar-link">Movies</Link></li>
          <li><Link to="/series" className="navbar-link">Series</Link></li>
          <li><Link to="/chat" className="navbar-link">Chat</Link></li>
          <li><Link to="/buy-vip" className="navbar-link">Buy VIP</Link></li>
        </ul>
        <ul className="navbar-list">
          <li><span className="name">Hello {auth.user?.name || "Anonymous"}</span></li>
          <li><span className="name" onClick={() => setIsOpen(true)}>Change info</span></li>
          <li><button className="navbar-link" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </header>
  );
}
