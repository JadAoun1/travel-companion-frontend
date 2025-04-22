import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import NavLink from "../microComponents/NavLink/NavLink";
import ButtonSecondary from "../microComponents/ButtonSecondary/ButtonSecondary";
import Divider from "../microComponents/Divider/Divider";
import styles from './NavBar.module.css';
import { useNavigate } from "react-router";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  return (
    <header className={styles.navbarContainer}>
      <div className={styles.contentWrapper}>
        {/* Left Section */}
        <div className={styles.navLeft}>
          {user ? (
            <NavLink to="/">Dashboard</NavLink>
          ) : (
            <NavLink to="/">Home</NavLink>
          )}
        </div>

        {/* Center Section */}
        <div className={styles.navCenter}>
          <h1>TripLab</h1>
        </div>

        {/* Right Section */}
        <div className={styles.navRight}>
          {user ? (
            <>
              {/* Maybe add username here? <span className={styles.username}>{user.username}</span> */}
              <ButtonSecondary onClick={handleSignOut}>Sign Out</ButtonSecondary>
            </>
          ) : (
            <>
              <NavLink to="/sign-up">Sign Up</NavLink>
              <NavLink to="/sign-in">Sign In</NavLink>
            </>
          )}
        </div>
      </div>
      <Divider />
    </header>
  );
};

export default NavBar;
