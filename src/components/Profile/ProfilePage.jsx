import { FaRegTrashAlt } from 'react-icons/fa'
import Navbar from '../Navbar/Navbar'
import styles from '../Profile/ProfilePage.module.css'

const ProfilePage = () => {
  const arr = [1, 2, 3]

  const deleteTranslation = () => {
    //delete translation
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.top}></div>
      <div className={styles.bottom}></div>
      <div className={styles.center}>
      <h2 className={styles.usersTranslationsTitle}>Your last translations</h2>
      {arr.map((a, i) => {
          return (
            <div className={styles.card} key={i}>
              <p className={styles.userTranslation}>Translate Translate Translate Translate</p> 
              <button className={styles.deleteTranslationBtn} onClick={deleteTranslation}><FaRegTrashAlt /> Delete</button>
            </div>
         )
      })}
      </div>
    </div>
  )
}

export default ProfilePage;