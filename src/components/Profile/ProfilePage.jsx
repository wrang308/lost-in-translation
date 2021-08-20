import { useEffect, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import Navbar from '../Navbar/Navbar'
import styles from '../Profile/ProfilePage.module.css'

const ProfilePage = () => {
  const [translations, setTranslations] = useState(null)
  const url = "http://localhost:3000/";

  /**
   * Fetches the logged in user's 10 latest translations,
   * marked as active
   */
  useEffect(() => {
    if(localStorage.getItem('username')){
      fetch((url+"users/?username="+localStorage.getItem("username")), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then(data => {
          fetch((url+"searches?status=active&userId="+data[0].id+"&_sort=id&_order=desc&_limit=10"), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((response) => response.json())
          .then(data => {
            setTranslations(data);
          })
        
      })
      .catch((error) => {
        console.error('Error:', error);
      })
    }
  }, [])

  /**
   * Deletes the logged in user's translations
   */
  const deleteTranslation = async() => {
    const userId = await getUserIdByUserName(localStorage.getItem("username"))
    const userIdData = await userId.json()

    const getTranslations = await getAllActiveTranslationsByUserId(userIdData[0].id)
    const translationsData = await getTranslations.json()

    await deleteAllActiveTranslations(translationsData);
    setTranslations(null)
  }

  /**
   * Fetches the user id by username
   * @param {userName} userName is used to get the user id
   * @returns response with user id
   */
  const getUserIdByUserName = async (userName) => {
    return await fetch(url+"users/?username="+userName, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    } )
  }

  /**
   * Fetches all translations that are active for the logged in user
   * @param {userId} userId is used to get the translations for the specific user
   * @returns response with all translations that are active for that user
   */
  const getAllActiveTranslationsByUserId = async (userId) => {
    return await fetch((url+"searches?status=active&userId="+userId), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  /**
   * Iterates through all translations and sets their status to 'deleted'
   * @param {translations} translations are all fetched translations that will be set to 'deleted'
   */
  const deleteAllActiveTranslations = async (translations) => {
    for (let i = 0; i < translations.length; i++) {
        await fetch((url+"searches/"+translations[i].id), {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"status":"deleted"})
        })
    }
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
                <p className={styles.userTranslation}>{translations[i].text}</p> 
              </div>
          )
        })}
      </div>
      </div>
    </div>
  )
}

export default ProfilePage;