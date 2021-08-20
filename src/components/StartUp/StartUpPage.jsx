import { useEffect, useState } from 'react';
import { useHistory  } from 'react-router'
import styles from '../StartUp/StartUpPage.module.css'

const StartUpPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState('')

  /**
   * Checks if user is already logged in, the user gets re-directed to the translation page
   */
  useEffect(() => {
    if(localStorage.getItem('username')){
      history.push('/translator')
    }
  })

  /**
   * Tries to log in user, sets the user to logged in and re-directs the user to the translation page
   */
  const handleLogInBtn = () => {
    if(username !== ''){
      localStorage.clear();
      localStorage.setItem('username', username);
      postUser({"username": username});
      history.push('/translator')
    }
  }

  /**
   * Checks if the user exists in the database, if the user doesn't exist, the user is added to the database
   */
  const postUser = (user) => {
    const url = "https://polar-fortress-35611.herokuapp.com/users/";
    fetch((url+"?username="+username), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then(data => {
      //user doesn't exist, add to database
      if(data.length === 0){
        fetch((url), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        })
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  }

  /**
   * Sets the username to the value of the username input
   * @param {e} e, event of input change 
   */
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
      <button className={styles.loginButton} onClick={handleLogInBtn}>Login</button>
    </div>
  </div>
  )
}

export default StartUpPage;