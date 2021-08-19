import { useEffect, useState } from 'react';
import { useHistory  } from 'react-router'
import styles from '../StartUp/StartUpPage.module.css'

const StartUpPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState('')

  useEffect(() => {
    if(localStorage.getItem('username')){
      history.push('/translator')
    }
  })

  const handleOnClick = () => {
    if(username !== ''){
      localStorage.clear();
      localStorage.setItem('username', username);
      postUser({"username":username, "searches": []});
      history.push('/translator')
    }
  }

  const postUser = (user) => {
    const url = "http://localhost:3000/users/";
    fetch((url+"?username="+username), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then(data => {
      console.log(JSON.stringify(user));
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