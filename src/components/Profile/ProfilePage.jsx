import { useEffect, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import Navbar from '../Navbar/Navbar'
import styles from '../Profile/ProfilePage.module.css'

const ProfilePage = () => {
  //const [arr, setArr] = useState([])
  const [translations, setTranslations] = useState(null)
  let arr = []

  useEffect(() => {
  const url = "http://localhost:3000/";
    fetch((url+"users/?username="+localStorage.getItem("username")), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then(data => {
        fetch((url+"searches?status=active&userId="+data[0].id+"&_limit=10"), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => response.json())
        .then(data => {
          setTranslations(data);
          arr = data;
          //setArr(data);
          console.log(arr[0].text)
        })
      
    })
    
    .catch((error) => {
      console.error('Error:', error);
    })
  }, [])

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
      {translations && translations.map((a, i) => {
          return (
            <div className={styles.card} key={i}>
              <p className={styles.userTranslation}>{translations[i].text}</p> 
              <button className={styles.deleteTranslationBtn} onClick={deleteTranslation}><FaRegTrashAlt /> Delete</button>
            </div>
         )
      })}
      </div>
      <div>{arr[0]}</div>
    </div>
  )
}

export default ProfilePage;