
import { useEffect } from "react";
import Collegeask from "./component/Collegeask";
import Navbar from "./component/Navbar";
import Login from "./component/auth/Login";
import { login, logout, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {auth} from "./firebase";


function App() {
  const user= useSelector(selectUser);
  const dispatch= useDispatch();

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
       if(authUser){
        dispatch(login({
          uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            photo: authUser.photoURL,
        }))
        console.log(authUser);
       }
       else{
        dispatch(logout());
       }
    });
    
  },[dispatch]);
  return (
    <div className="App">
      {
        user ? (<Collegeask/>) : (<Login/>)
      }
      
    </div>
  );
}

export default App;
