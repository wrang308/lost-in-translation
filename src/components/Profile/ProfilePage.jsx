import { useEffect, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import Navbar from '../Navbar/Navbar'
import styles from '../Profile/ProfilePage.module.css'

const ProfilePage = () => {
  const [translations, setTranslations] = useState(null)
  const url = "http://localhost:3000/";

  useEffect(() => {
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
  }, [])

  const deleteTranslation = async() => {
    const userId = await getUserIdByUserName(localStorage.getItem("username"))
    const userIdData = await userId.json()

    const getTranslations = await getAllActiveTranslationsByUserId(userIdData[0].id)
    const translationsData = await getTranslations.json()

    await deleteAllActiveTranslations(translationsData);
    setTranslations(null)
  }

  const getUserIdByUserName = async (userName) => {
    return await fetch(url+"users/?username="+userName, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    } )
  }

  const getAllActiveTranslationsByUserId = async (userId) => {
    return await fetch((url+"searches?status=active&userId="+userId), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const deleteAllActiveTranslations = async (data) => {
    for (let i = 0; i < data.length; i++) {
        await fetch((url+"searches/"+data[i].id), {
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