import { useState } from 'react'
import { useHistory  } from 'react-router'
import styles from '../Translation/TranslationPage.module.css'

const TranslationPage = () => {
  const history = useHistory();
  const [translationText, setTranslationText] = useState('')
  const [clicked, setClicked] = useState(false)

  const handleTranslateBtn = () => {
    
    console.log(translationText)
    setClicked(true)
    //även automatiskt spara translations till db
  }

  if(!localStorage.getItem('username')){
    history.goBack(history.length-1)
  }

  const handleLogOut = () => {
      localStorage.clear();
      history.goBack(history.length-1)
  }

<<<<<<< HEAD
  const handleTranslationTextChange = e => {
    setTranslationText(e.target.value);
  }

  return (
    <div className={styles.container}>
    <div className={styles.top}></div>
    <div className={styles.bottom}></div>
    <div className={styles.center}>
      <div className={styles.card}>
        <input className={styles.translatorInput} type="text" name="translation" id="translation" placeholder="Please type what you wish to translate"  onChange={handleTranslationTextChange}/>

        <button className={styles.translateBtn} onClick={handleTranslateBtn}>Translate</button>
        {clicked === true && (
          <div className={styles.translationContainer}></div>
        )}
        <button className={styles.translateBtn} onClick={handleLogOut}>log out</button>
=======
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
          <button className={styles.logOutBtn} onClick={handleLogOut}>log out</button>
        </div>
>>>>>>> d8ffc481d9b4da5ac4f176a2945c6ccec4d27fb4
      </div>
    </div>
  )
}

export default TranslationPage;