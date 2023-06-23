import {Link } from "react-router-dom";

import { auth } from "../config/firebase";

import {useAuthState} from "react-firebase-hooks/auth";

import { signOut } from "firebase/auth";

export const Navbar = () => {

  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  }

  return (

    <div>

      
      <Link to="/">Home</Link> | 
      {!user ? <Link to="/login">Login</Link> : <Link to="/createpost">Create Post</Link>}

      

      <div>

        {user && 
          (<div>
          <p>{auth.currentUser?.displayName}</p>
          <img src={auth.currentUser?.photoURL || ""} width={20} height={20}/>
          <button onClick={signUserOut}>Logout</button>
          </div>)
        }
      </div>

      

    </div>
  );
};