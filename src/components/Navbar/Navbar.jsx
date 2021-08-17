import { NavLink } from 'react-router-dom';
import { useHistory  } from 'react-router'

import styles from '../Navbar/Navbar.module.css'

const Navbar = () => {
  const history = useHistory()

  const handleLogOut = () => {
    localStorage.clear();
    // history.goBack(history.length-1)
    history.push('/')
  }

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