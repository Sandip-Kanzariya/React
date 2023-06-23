import React from 'react'
import {auth, provider} from "../config/firebase";

import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () =>{
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    navigate("/");
  };

  return (
    <div>
      <p>Sign in with Google to Continue</p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  )
}
