import { useEffect, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import Navbar from '../Navbar/Navbar'
import styles from '../Profile/ProfilePage.module.css'
import firebase from '../../firebase';

const ProfilePage = () => {
  const [translations, setTranslations] = useState(null)
  const ref = firebase.firestore().collection("users");

  /**
   * Fetches the logged in user's 10 latest translations,
   * marked as active
   */
  useEffect(() => {
    if(localStorage.getItem('username')){
      ref.where("username", "==", localStorage.getItem("username"))
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            setTranslations(doc.data().translations)
  
        });
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }, [])

  /**
   * Deletes the logged in user's translations
   */
  const deleteTranslation = async() => {
    ref.where("username", "==", localStorage.getItem("username"))
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        ref
        .doc(doc.id)
        .update({"username": doc.data().username, "translations": []})
        .catch((err) => {
          console.error(err);
        });

      });
    })
    .catch((err) => {
      console.error(err);
    });
    setTranslations(null)
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.top}></div>
      <div className={styles.bottom}></div>
      <div className={styles.center}>
      <h2 className={styles.usersTranslationsTitle}>Your last translations</h2>
      <div>
      <button className={styles.deleteTranslationBtn} onClick={deleteTranslation}><FaRegTrashAlt /> Delete all translations</button>
      </div>
      <div className={styles.cardsContainer}>
        {translations && translations.map((a, i) => {
            return (
              <div className={styles.card} key={i}>
                <p className={styles.userTranslation}>{translations[i]}</p> 
              </div>
          )
        })}
      </div>
      </div>
    </div>
  )
}

export default ProfilePage;