import { useState } from 'react'
import styles from '../Translation/TranslationPage.module.css'

const TranslationPage = () => {
  const [clicked, setClicked] = useState(false)

  const handleTranslateBtn = () => {
    setClicked(true)
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
      </div>
    </div>
    </div>
  )
}

export default TranslationPage;