import { useState } from 'react';
import { useHistory  } from 'react-router'
import styles from '../StartUp/StartUpPage.module.css'

const StartUpPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState('')

  if(localStorage.getItem('username')){
    history.push('/translator')
  }

  const handleOnClick = () => {
    
    if(username != ''){
      localStorage.clear();
      localStorage.setItem('username', username);
      history.push('/translator')
    }
  }
  const handleUsernameChange = e => {
    setUsername(e.target.value);
  }

  return (
  <div className={styles.container}>
    <div className={styles.top}></div>
    <div className={styles.bottom}></div>
    <div className={styles.center}>
      <h2>Please sign in</h2>
      <input type="text" placeholder="username" onChange={handleUsernameChange}/>
      <button className={styles.loginButton} onClick={handleOnClick}>Login</button>
    </div>
  </div>
  )
}

export default StartUpPage;