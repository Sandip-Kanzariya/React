import {Link } from "react-router-dom";

import { auth } from "../config/firebase";

import {useAuthState} from "react-firebase-hooks/auth";

import { signOut } from "firebase/auth";
import { Form, Button, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Navbar1 = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");
  }

  return (
    /*
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
    */
    <Navbar bg="dark" variant="dark" >
      <Navbar.Brand href="/" className="m-2">Home</Navbar.Brand>
      <Nav className="mr-auto">
        {!user ? (
          <Nav.Link href="/login">Login</Nav.Link>
        ) : (
          <Nav.Link href="/createpost">Create Post</Nav.Link>
        )}
      </Nav>
      <Nav>
        {user && (
          <NavDropdown title={auth.currentUser?.displayName || 'User'} id="basic-nav-dropdown"  >

            <NavDropdown.Item>
              <img src={auth.currentUser?.photoURL || ''} width={20} height={20} alt="User Avatar" />{' '}
              {auth.currentUser?.displayName}
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={signUserOut}>Logout</NavDropdown.Item>
          </NavDropdown>
        )}
      </Nav>
    </Navbar>
  );
};