import styles from '../StartUp/StartUpPage.module.css'

const StartUpPage = () => {
  return (
  <div className={styles.container}>
    <div className={styles.top}></div>
    <div className={styles.bottom}></div>
    <div className={styles.center}>
      <h2>Please sign in</h2>
      <input type="text" placeholder="username"/>
      <button className={styles.loginButton}>Login</button>
    </div>
  </div>
  )
}

export default StartUpPage;