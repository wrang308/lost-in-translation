import { NavLink } from 'react-router-dom';
import { useHistory  } from 'react-router'
import styles from '../Navbar/Navbar.module.css'
import { useEffect } from 'react';

const Navbar = () => {
  const history = useHistory()

  /**
   * When the user clicks on the log out button, the local storage gets cleared
   * and user gets re-directed to the start page.
   */
  const handleLogOut = () => {
    localStorage.clear();
    history.goBack('/');
  }

  /**
   * Checks if a user is logged in or not,
   * if not logged in, the user gets re-directed to the start page.
   */
  useEffect(() => {
    if(!localStorage.getItem('username')){
      history.push('/')
    }
  })

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Lost in translation</h1>
        <nav className={styles.navbar}>
          <NavLink exact to="/translator" activeStyle={{fontWeïght: "bold", color: '#ecaf81'}} className={styles.navlinkTranslate}>
            Translation
          </NavLink>
          <NavLink exact to="/profile"  activeStyle={{fontWeight: "bold", color: "#ecaf81"}} className={styles.navlinkProfile}>
            Profile
          </NavLink>
          <button className={styles.logOutBtn} onClick={handleLogOut}>log out</button>
        </nav>
      </header>
    </div>
  )
}

export default Navbar