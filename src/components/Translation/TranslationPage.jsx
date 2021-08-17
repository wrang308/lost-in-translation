import { useState } from 'react'
import { useHistory  } from 'react-router'
import styles from '../Translation/TranslationPage.module.css'

const TranslationPage = () => {
  const history = useHistory();
  const [clicked, setClicked] = useState(false)

  const handleTranslateBtn = () => {
    setClicked(true)
  }

  if(!localStorage.getItem('username')){
    history.goBack(history.length-1)
  }

  const handleLogOut = () => {
      localStorage.clear();
      history.goBack(history.length-1)
  }


  return (
    <div className={styles.container}>
    <div className={styles.top}></div>
    <div className={styles.bottom}></div>
    <div className={styles.center}>
      <div className={styles.card}>
        <input className={styles.translatorInput} type="text" name="translation" id="translation" placeholder="Please type what you wish to translate" />

        <button className={styles.translateBtn} onClick={handleTranslateBtn}>Translate</button>
        {clicked === true && (
          <div className={styles.translationContainer}></div>
        )}
        <button className={styles.translateBtn} onClick={handleLogOut}>log out</button>
      </div>
    </div>
    </div>
  )
}

export default TranslationPage;