import './App.css';
import LoginButton from './components/LoginButton';
import AuthButton from './components/AuthButton';
import {useAuth0} from '@auth0/auth0-react';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';

function App() {
    const {user, isAuthenticated} = useAuth0();
  return (
    <>
        <LoginButton />
        <LogoutButton />
        <AuthButton />
        <h3>User is {isAuthenticated ? "Logged in" : "Not Logged in"}</h3>
        <Profile />

    </>
  );
}
export default App;
