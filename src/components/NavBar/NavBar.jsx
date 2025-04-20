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
        <div className={styles.navLinks}>
          {user ? (
            <NavLink to="/">Dashboard</NavLink>
          ) : (
            <NavLink to="/">Home</NavLink>
          )}
        </div>

        <div className={styles.userActions}>
          {user ? (
            <>
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
