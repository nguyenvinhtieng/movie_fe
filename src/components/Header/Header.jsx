import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import CustomModal from "../CustomModal/CustomModal";
import { RxDropdownMenu } from "react-icons/rx"
import { toast } from "react-toastify";
import storage from "../../utils/firebase.util";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import request from "../../services/request";
import { path } from "../../API/apiPath";
import authSlice from "../../store/slice/authSlice";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export default function Header() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = React.useState(false)
  const [showConfirmReset, setShowConfirmReset] = React.useState(false)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [avatar, setAvatar] = React.useState(null)
  const [showMenu, setShowMenu] = React.useState(false)
  const menuRef = React.useRef()
  const upload = () => {
    const fileName = new Date().getTime() + avatar[0].name;
    const storageRef = ref(storage, `/avatar/${fileName}`);
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
  const resetPass = async () => {
    const res = await request("POST", path.resetPass, {body: {
      email: auth.user.email,
      username: auth.user.username,
      path: window.location.origin + "/reset-password"
    }});
    setShowConfirmReset(false)
    toast.success("Please check your email to reset password")
  }
  const handleLogout = () => {
    dispatch(authSlice.actions.logout())
  }
  useOnClickOutside(menuRef, () => setShowMenu(false));
  return (
    <>
      <CustomModal title="Change my information" isOpen={isOpen} setIsOpen={setIsOpen} handleSubmit={()=>handleUpdateInfo()}>
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
      <CustomModal title="Reset password" isOpen={showConfirmReset} setIsOpen={setShowConfirmReset} handleSubmit={resetPass} danger={true} button="Reset">
        Are you sure want to reset password?
      </CustomModal>
      <header className="headerUser">
        <nav className="navbarUser">
          <ul className="NavList">
            <li><NavLink to="/" className={({isActive}) => isActive ? "navbarLink active" : "navbarLink"}>Home</NavLink></li>
            <li><NavLink to="/movies" className={({isActive}) => isActive ? "navbarLink active" : "navbarLink"}>Movies</NavLink></li>
            <li><NavLink to="/series" className={({isActive}) => isActive ? "navbarLink active" : "navbarLink"}>Series</NavLink></li>
            <li><NavLink to="/chat" className={({isActive}) => isActive ? "navbarLink active" : "navbarLink"}>Chat</NavLink></li>
            <li><NavLink to="/buy-vip" className={({isActive}) => isActive ? "navbarLink active" : "navbarLink"}>Buy VIP</NavLink></li>
          </ul>
          <div className="NavBarRight">
            <span className="NavBarName">Hello <b> {auth.user?.name || "Anonymous"} </b></span>
            <span className="NavBarMenu" ref={menuRef}>
              <span className="ico" onClick={()=>setShowMenu(prev => !prev)}>
              <RxDropdownMenu></RxDropdownMenu>
              </span>
              <div className={`NavBarMenu__wrapper ${showMenu ? "active" : ""}`}>
                <div className="NavBarMenu__item">
                  <span onClick={() => setIsOpen(true)}>Change info</span>
                </div>
                <div className="NavBarMenu__item">
                  <span onClick={() => setShowConfirmReset(true)}>Reset password</span>
                </div>
                <div className="NavBarMenu__item">
                  <span onClick={()=> handleLogout()}>Logout</span>
                </div>
              </div>
            </span>
            {/* <li><span className="changeinfo" onClick={() => setIsOpen(true)}>Change info</span></li>
            <li><span className="changeinfo" onClick={() => setShowConfirmReset(true)}>Reset password</span></li>
            <li><button onClick={handleLogout} className="navbarLink">Logout</button></li> */}
          </div>
        </nav>
      </header>
    </>
  );
}
