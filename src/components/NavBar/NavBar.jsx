import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
  const { user } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <nav>
      {user ? (
        <ul>
        {/* Do we want to keep this as a welcome message or have it display something else. */}
          <li>Welcome, {user.username}</li> 
          <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
